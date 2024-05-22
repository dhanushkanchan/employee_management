from django.db import models

class Employee(models.Model):
    employee_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    date_of_joining = models.DateField(blank=True, null=True)
    position = models.CharField(max_length=100, blank=True, null=True)
    department = models.CharField(max_length=100, blank=True, null=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    is_current = models.BooleanField(default=True)
    supervisor = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL, related_name='subordinates')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def get_subordinates(self):
        return Employee.objects.filter(supervisor=self)

