from django.db import models


class ContactInquiry(models.Model):
    """Store contact/demo request form submissions."""
    PLAN_CHOICES = [
        ('starter', 'Starter'),
        ('growth', 'Growth'),
        ('enterprise', 'Enterprise'),
        ('custom', 'Custom'),
    ]

    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    company = models.CharField(max_length=255, blank=True)
    employees = models.CharField(max_length=100, blank=True)
    plan_interest = models.CharField(max_length=50, choices=PLAN_CHOICES, blank=True)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Inquiry'
        verbose_name_plural = 'Contact Inquiries'

    def __str__(self):
        return f"{self.name} ({self.email}) — {self.created_at.strftime('%Y-%m-%d')}"
