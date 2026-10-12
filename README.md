# Dinlipi User Journey — Django Project

A professional Django web project for the **Dinlipi** HR & Payroll Software landing site.

## Project Structure

```
dinlipi_user_journey/
├── dinlipi_app/                    # Main Django application
│   ├── migrations/                 # Database migrations
│   ├── templates/
│   │   └── dinlipi_app/
│   │       ├── base.html           # Base template (nav + footer + scripts)
│   │       ├── pages/
│   │       │   ├── index.html      # Home page
│   │       │   ├── blog.html       # Blog listing page
│   │       │   └── get_started.html# Get started / contact page
│   │       └── blog/
│   │           ├── blog_hr_management_software.html
│   │           ├── blog_employee_management_software.html
│   │           ├── blog_employee_data_management.html
│   │           ├── blog_employee_attendance_tracking.html
│   │           ├── blog_employee_attendance_management_system.html
│   │           ├── blog_employee_leave_management.html
│   │           ├── blog_hr_payroll_automation.html
│   │           ├── blog_payroll_processing_software.html
│   │           ├── blog_overtime_management_software.html
│   │           └── blog_hr_software_for_growing_businesses.html
│   ├── templatetags/
│   │   └── dinlipi_tags.py         # Custom template tags & filters
│   ├── admin.py                    # Django admin configuration
│   ├── apps.py
│   ├── models.py                   # ContactInquiry model
│   ├── urls.py                     # App URL patterns
│   └── views.py                    # View functions
├── dinlipi_user_journey/
│   ├── settings.py                 # Django settings
│   ├── urls.py                     # Root URL configuration
│   ├── wsgi.py
│   └── asgi.py
├── static/
│   ├── css/
│   │   ├── dinlipi-main.css        # All site styles
│   │   ├── dinlipi-responsive.css  # Responsive breakpoints
│   │   ├── dinlipi-blog.css        # Blog-specific styles
│   │   └── dinlipi-get-started.css # Get-started page styles
│   ├── js/
│   │   └── dinlipi-main.js         # All site JavaScript
│   └── images/                     # Static image assets
├── manage.py
├── requirements.txt
└── README.md
```

## Quick Start

### 1. Clone / Extract & navigate to project
```bash
cd dinlipi_user_journey
```

### 2. Create virtual environment
```bash
python -m venv venv
source venv/bin/activate        # Linux / macOS
venv\Scripts\activate           # Windows
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Apply database migrations
```bash
python manage.py migrate
```

### 5. Create a superuser (for Django admin)
```bash
python manage.py createsuperuser
```

### 6. Collect static files (for production)
```bash
python manage.py collectstatic
```

### 7. Run the development server
```bash
python manage.py runserver
```

Visit **http://127.0.0.1:8000/** in your browser.

## URL Routes

| URL | View | Name |
|-----|------|------|
| `/` | `home` | `dinlipi_app:home` |
| `/get-started/` | `get_started` | `dinlipi_app:get_started` |
| `/blog/` | `blog_list` | `dinlipi_app:blog_list` |
| `/blog/hr-management-software/` | `blog_hr_management_software` | `dinlipi_app:blog_hr_management_software` |
| `/blog/employee-management-software/` | `blog_employee_management_software` | `dinlipi_app:blog_employee_management_software` |
| `/blog/employee-data-management/` | `blog_employee_data_management` | `dinlipi_app:blog_employee_data_management` |
| `/blog/employee-attendance-tracking/` | `blog_employee_attendance_tracking` | `dinlipi_app:blog_employee_attendance_tracking` |
| `/blog/employee-attendance-management-system/` | `blog_employee_attendance_management_system` | `dinlipi_app:blog_employee_attendance_management_system` |
| `/blog/employee-leave-management/` | `blog_employee_leave_management` | `dinlipi_app:blog_employee_leave_management` |
| `/blog/hr-payroll-automation/` | `blog_hr_payroll_automation` | `dinlipi_app:blog_hr_payroll_automation` |
| `/blog/payroll-processing-software/` | `blog_payroll_processing_software` | `dinlipi_app:blog_payroll_processing_software` |
| `/blog/overtime-management-software/` | `blog_overtime_management_software` | `dinlipi_app:blog_overtime_management_software` |
| `/blog/hr-software-for-growing-businesses/` | `blog_hr_software_for_growing_businesses` | `dinlipi_app:blog_hr_software_for_growing_businesses` |
| `/admin/` | Django Admin | — |

## Django Admin

Access the admin panel at **http://127.0.0.1:8000/admin/**  
Login with the superuser credentials you created.

**ContactInquiry** model stores all demo/contact form submissions.

## Template Tags

Custom tags available in templates after `{% load dinlipi_tags %}`:

- `{% active_link request 'view_name' %}` — Returns `'active'` CSS class for current page link
- `{{ value|truncate_words_html:20 }}` — Truncate text to N words with ellipsis

## Requirements

- Python 3.10+
- Django 4.2+

## Production Notes

- Set `DEBUG = False` in `settings.py`
- Update `ALLOWED_HOSTS` with your domain
- Change `SECRET_KEY` to a secure random value
- Run `python manage.py collectstatic` before deploying
- Use a production-grade server (Gunicorn + Nginx recommended)
