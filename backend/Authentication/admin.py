from django.contrib import admin
from unfold.admin import ModelAdmin  # Unfold এর Custom Admin
from simple_history.admin import SimpleHistoryAdmin
from .models import CustomUser


class UnfoldHistoryAdmin(SimpleHistoryAdmin, ModelAdmin):
    """Unfold + SimpleHistory combo admin"""
    pass


@admin.register(CustomUser)
class CustomUserAdmin(UnfoldHistoryAdmin):
    list_display = ("username", "email", "role", "is_active", 'date_joined' ,"last_login" )
    list_filter = ("role", "is_active")
    search_fields = ("username", "email")
    ordering = ("-date_joined",)


