from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    supervisor = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), required=False)

    class Meta:
        model = Employee
        fields = '__all__'
