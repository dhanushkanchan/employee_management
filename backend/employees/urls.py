from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EmployeeViewSet, EmployeeStatistics, organization_hierarchy, upload_csv

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('hierarchy/', organization_hierarchy, name='organization_hierarchy'),
    path('upload_csv/', upload_csv, name='upload_csv'),
    path('statistics/', EmployeeStatistics.as_view(), name='employee_statistics'),
]
