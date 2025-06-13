from django.db import models


class AuditableModel(models.Model):
    """
    Abstract base model that provides created and modified timestamps.
    """
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    modified_at = models.DateTimeField(auto_now=True, verbose_name="Modified At")

    class Meta:
        abstract = True
        ordering = ['-created_at']
        get_latest_by = 'created_at'
        verbose_name = "Auditable Model"
        verbose_name_plural = "Auditable Models"