"""
Custom template tags and filters for dinlipi_app.
"""
from django import template

register = template.Library()


@register.simple_tag
def active_link(request, url_name):
    """Return 'active' CSS class if current URL matches url_name."""
    from django.urls import reverse
    try:
        resolved = reverse(url_name)
        if request.path == resolved:
            return 'active'
    except Exception:
        pass
    return ''


@register.filter
def truncate_words_html(value, num):
    """Truncate a string to a given number of words."""
    words = str(value).split()
    if len(words) > num:
        return ' '.join(words[:num]) + '…'
    return value
