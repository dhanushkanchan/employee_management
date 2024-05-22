from rest_framework import viewsets
from .models import Employee
from .serializers import EmployeeSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import pandas as pd


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer


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
        "date_of_joining", "position", "department", "salary", "is_current", "supervisor_email"
    ]

    missing_columns = [col for col in expected_columns if col not in df.columns]

    if missing_columns:
        return Response({"error": f"Missing columns in CSV: {', '.join(missing_columns)}"}, status=status.HTTP_400_BAD_REQUEST)

    employees_to_update = []
    for _, row in df.iterrows():
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
        except Employee.DoesNotExist:
            employee_serializer = EmployeeSerializer(data=employee_data)
            if employee_serializer.is_valid():
                employee_serializer.save()
            else:
                return Response(employee_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        employees_to_update.append(employee_data)

    for employee_data in employees_to_update:
        if employee_data["supervisor_email"]:
            try:
                employee = Employee.objects.get(email=employee_data["email"])
                supervisor = Employee.objects.get(email=employee_data["supervisor_email"])
                employee.supervisor = supervisor
                employee.save()
            except Employee.DoesNotExist:
                return Response({"error": "Supervisor or employee not found"}, status=status.HTTP_400_BAD_REQUEST)

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
