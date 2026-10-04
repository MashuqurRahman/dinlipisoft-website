"""
Views for dinlipi_app.
All pages use class-based or function-based views.
"""
from django.shortcuts import render
from django.http import HttpResponse


# ─── Context helpers ───────────────────────────────────────────────
def _base_context(page_title, meta_description=''):
    """Return a base context dict shared by all views."""
    return {
        'page_title': page_title,
        'meta_description': meta_description,
    }


# ─── Pages ─────────────────────────────────────────────────────────

def home(request):
    context = _base_context(
        page_title='HR & Payroll Software for RMG Teams in Bangladesh | Dinlipi',
        meta_description=(
            'Dinlipi is specialized HR & Payroll software for Bangladesh RMG factories — '
            'attendance, leave, payroll, employee records and reports. Book a free demo.'
        ),
    )
    return render(request, 'dinlipi_app/pages/index.html', context)


def get_started(request):
    context = _base_context(
        page_title='Get Started — Book a Free Demo | Dinlipi',
        meta_description='Book a free demo of Dinlipi HR & Payroll software for your RMG factory.',
    )
    return render(request, 'dinlipi_app/pages/get_started.html', context)


# ─── Blog list ─────────────────────────────────────────────────────

def blog_list(request):
    context = _base_context(
        page_title='HR & Payroll Blog | Dinlipi',
        meta_description='Expert insights on HR management, payroll automation, and workforce solutions for Bangladesh RMG industry.',
    )
    return render(request, 'dinlipi_app/pages/blog.html', context)


# ─── Blog articles ─────────────────────────────────────────────────

def blog_hr_management_software(request):
    context = _base_context(
        page_title='HR Management Software | Dinlipi Blog',
        meta_description='Learn how HR management software transforms workforce operations in RMG factories.',
    )
    return render(request, 'dinlipi_app/blog/blog_hr_management_software.html', context)


def blog_employee_management_software(request):
    context = _base_context(
        page_title='Employee Management Software | Dinlipi Blog',
        meta_description='Discover how employee management software simplifies workforce tracking and compliance.',
    )
    return render(request, 'dinlipi_app/blog/blog_employee_management_software.html', context)


def blog_employee_data_management(request):
    context = _base_context(
        page_title='Employee Data Management | Dinlipi Blog',
        meta_description='Best practices for employee data management in garment factories.',
    )
    return render(request, 'dinlipi_app/blog/blog_employee_data_management.html', context)


def blog_employee_attendance_tracking(request):
    context = _base_context(
        page_title='Employee Attendance Tracking | Dinlipi Blog',
        meta_description='How automated attendance tracking reduces errors and improves productivity.',
    )
    return render(request, 'dinlipi_app/blog/blog_employee_attendance_tracking.html', context)


def blog_employee_attendance_management_system(request):
    context = _base_context(
        page_title='Employee Attendance Management System | Dinlipi Blog',
        meta_description='A complete guide to attendance management systems for RMG factories.',
    )
    return render(request, 'dinlipi_app/blog/blog_employee_attendance_management_system.html', context)


def blog_employee_leave_management(request):
    context = _base_context(
        page_title='Employee Leave Management | Dinlipi Blog',
        meta_description='Streamline leave management with automated policies and workflows.',
    )
    return render(request, 'dinlipi_app/blog/blog_employee_leave_management.html', context)


def blog_hr_payroll_automation(request):
    context = _base_context(
        page_title='HR Payroll Automation | Dinlipi Blog',
        meta_description='How payroll automation saves time and eliminates costly errors.',
    )
    return render(request, 'dinlipi_app/blog/blog_hr_payroll_automation.html', context)


def blog_payroll_processing_software(request):
    context = _base_context(
        page_title='Payroll Processing Software | Dinlipi Blog',
        meta_description='Choosing the right payroll processing software for your factory.',
    )
    return render(request, 'dinlipi_app/blog/blog_payroll_processing_software.html', context)


def blog_overtime_management_software(request):
    context = _base_context(
        page_title='Overtime Management Software | Dinlipi Blog',
        meta_description='Control overtime costs with intelligent overtime management software.',
    )
    return render(request, 'dinlipi_app/blog/blog_overtime_management_software.html', context)


def blog_hr_software_for_growing_businesses(request):
    context = _base_context(
        page_title='HR Software for Growing Businesses | Dinlipi Blog',
        meta_description='Scale your HR operations with software built for growing RMG businesses.',
    )
    return render(request, 'dinlipi_app/blog/blog_hr_software_for_growing_businesses.html', context)
