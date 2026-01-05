from django.contrib import admin
from .models import Project, Task
# Register your models here.

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display=['id', 'title', 'description', 'created_at', 'owner' ]
    
@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display=['id', 'title', 'description','priority', 'deadline', 'status']