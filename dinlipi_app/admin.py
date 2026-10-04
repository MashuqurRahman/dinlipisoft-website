from django.contrib import admin
from .models import ContactInquiry


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'company', 'plan_interest', 'created_at')
    list_filter = ('plan_interest', 'created_at')
    search_fields = ('name', 'email', 'company')
    readonly_fields = ('created_at',)
    ordering = ('-created_at',)
