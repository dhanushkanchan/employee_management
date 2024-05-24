from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    supervisor = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), required=False)
    supervisor_name = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = '__all__'
        extra_kwargs = {
            'supervisor': {'required': False, 'allow_null': True}
        }

    def get_supervisor_name(self, obj):
        if obj.supervisor:
            return f"{obj.supervisor.first_name} {obj.supervisor.last_name}"
        return 'N/A'