"""
URL configuration for dinlipi_app.
"""
from django.urls import path
from . import views

app_name = 'dinlipi_app'

urlpatterns = [
    # ---- Pages ----
    path('', views.home, name='home'),
    path('get-started/', views.get_started, name='get_started'),

    # ---- Blog ----
    path('blog/', views.blog_list, name='blog_list'),
    path('blog/hr-management-software/', views.blog_hr_management_software, name='blog_hr_management_software'),
    path('blog/employee-management-software/', views.blog_employee_management_software, name='blog_employee_management_software'),
    path('blog/employee-data-management/', views.blog_employee_data_management, name='blog_employee_data_management'),
    path('blog/employee-attendance-tracking/', views.blog_employee_attendance_tracking, name='blog_employee_attendance_tracking'),
    path('blog/employee-attendance-management-system/', views.blog_employee_attendance_management_system, name='blog_employee_attendance_management_system'),
    path('blog/employee-leave-management/', views.blog_employee_leave_management, name='blog_employee_leave_management'),
    path('blog/hr-payroll-automation/', views.blog_hr_payroll_automation, name='blog_hr_payroll_automation'),
    path('blog/payroll-processing-software/', views.blog_payroll_processing_software, name='blog_payroll_processing_software'),
    path('blog/overtime-management-software/', views.blog_overtime_management_software, name='blog_overtime_management_software'),
    path('blog/hr-software-for-growing-businesses/', views.blog_hr_software_for_growing_businesses, name='blog_hr_software_for_growing_businesses'),
]
