from rest_framework import viewsets
from .models import Employee
from .serializers import EmployeeSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Count, Avg
from django.utils.timezone import now
from rest_framework.views import APIView
import pandas as pd
import datetime
from django.db.models.functions import TruncMonth

class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


class EmployeeStatistics(APIView):
    def get(self, request, *args, **kwargs):
        total_employees = Employee.objects.count()
        current_month = now().month
        current_year = now().year
        new_employees_this_month = Employee.objects.filter(date_of_joining__month=current_month, date_of_joining__year=current_year).count()
        current_employees = Employee.objects.filter(is_current=True).count()
        former_employees = Employee.objects.filter(is_current=False).count()

        average_salary = Employee.objects.aggregate(Avg('salary'))['salary__avg']
        total_departments = Employee.objects.values('department').distinct().count()

        # Employees by department
        employees_by_department = Employee.objects.values('department').annotate(count=Count('department'))

        # Salary distribution
        salary_ranges = [
            (0, 30000), (30001, 45000), (45001, 60000), (60001, 75000), (75001, 90000), (90001, 120000), (120001, 150000), (1250001, 250000)
        ]
        salary_distribution = []
        for lower, upper in salary_ranges:
            count = Employee.objects.filter(salary__gte=lower, salary__lte=upper).count()
            salary_distribution.append({'range': f'{lower}-{upper}', 'count': count})

        # Monthly employee joinings for the past 5 years
        four_years_ago = now() - datetime.timedelta(days=4*365)
        # Employee count trend over last 5 years
        months = [four_years_ago + datetime.timedelta(days=30*i) for i in range(48)]
        
        employee_count = []
        monthly_joinings = []
        cumulative_count = 0
        for month in months:
            joinings_in_month = Employee.objects.filter(date_of_joining__year=month.year, date_of_joining__month=month.month).count()
            leavings_up_to_month = Employee.objects.filter(date_of_leaving__lte=month).count()
            cumulative_count = Employee.objects.filter(date_of_joining__lte=month).count() - leavings_up_to_month
            employee_count.append({'month': month.strftime('%Y-%m'), 'count': cumulative_count})
            monthly_joinings.append({'month': month.strftime('%Y-%m'), 'count': joinings_in_month})

        data = {
            'total_employees': total_employees,
            'new_employees_this_month': new_employees_this_month,
            'current_employees': current_employees,
            'former_employees': former_employees,
            'employees_by_department': employees_by_department,
            'salary_distribution': salary_distribution,
            'employee_count_trend': employee_count,
            'monthly_joinings': monthly_joinings,
            'average_salary': average_salary,
            'total_departments': total_departments
        }
        return Response(data, status=status.HTTP_200_OK)


@api_view(['POST'])
def upload_csv(request):
    file = request.FILES['file']
    if not file.name.endswith('.csv'):
        return Response({"error": "Only CSV file upload is supported!"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        df = pd.read_csv(file)
    except Exception as e:
        return Response({"error": f"Error reading CSV file: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

    expected_columns = [
        "first_name", "last_name", "email", "phone_number", "date_of_birth",
        "date_of_joining","date_of_leaving", "position", "department", "salary", "is_current", "supervisor_email"
    ]

    missing_columns = [col for col in expected_columns if col not in df.columns]

    if missing_columns:
        return Response({"error": f"Missing columns in CSV: {', '.join(missing_columns)}"}, status=status.HTTP_400_BAD_REQUEST)

    invalid_rows = []
    processed_employees = []

    for index, row in df.iterrows():
        employee_data = {
            "first_name": row["first_name"],
            "last_name": row["last_name"],
            "email": row["email"],
            "phone_number": row["phone_number"],
            "date_of_birth": row["date_of_birth"],
            "date_of_joining": row["date_of_joining"],
            "position": row["position"],
            "department": row["department"],
            "salary": row["salary"],
            "is_current": row["is_current"],
            "supervisor_email": row["supervisor_email"] if not pd.isna(row["supervisor_email"]) else None
        }

        try:
            employee = Employee.objects.get(email=employee_data["email"])
            for key, value in employee_data.items():
                if key != "supervisor_email":
                    setattr(employee, key, value)
            employee.save()
            processed_employees.append(employee_data)
        except Employee.DoesNotExist:
            employee_serializer = EmployeeSerializer(data=employee_data)
            if employee_serializer.is_valid():
                employee_serializer.save()
                processed_employees.append(employee_data)
            else:
                invalid_rows.append(index + 1)

    for employee_data in processed_employees:
        if employee_data["supervisor_email"]:
            try:
                employee = Employee.objects.get(email=employee_data["email"])
                supervisor = Employee.objects.get(email=employee_data["supervisor_email"])
                employee.supervisor = supervisor
                employee.save()
            except Employee.DoesNotExist:
                invalid_rows.append(employee_data["email"])

    if invalid_rows:
        return Response({"status": "success with errors", "invalid_rows": invalid_rows}, status=status.HTTP_207_MULTI_STATUS)
    
    return Response({"status": "success"}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def organization_hierarchy(request):
    top_level_employees = Employee.objects.filter(supervisor__isnull=True)
    hierarchy = [build_hierarchy(employee) for employee in top_level_employees]
    return Response(hierarchy)

def build_hierarchy(employee):
    hierarchy = {
        'employee': EmployeeSerializer(employee).data,
        'subordinates': [build_hierarchy(subordinate) for subordinate in employee.get_subordinates()]
    }
    return hierarchy
