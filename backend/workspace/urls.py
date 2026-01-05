from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import (ProjectViewSet, TaskViewSet, AISuggestionViewSet, ProjectProgressViewSet, ProjectDetail,
    TaskListCreate,
    TaskDetail,
    ProjectStates   
)
router=DefaultRouter()

router.register('projects', ProjectViewSet, basename='projects')
router.register('tasks', TaskViewSet, basename='tasks')

urlpatterns = router.urls

urlpatterns += [
    path('ai-suggestions/', AISuggestionViewSet.as_view(), 
name='ai-suggestions'),
    
    path('project-progress/', ProjectProgressViewSet.as_view(), 
name='project-progress'),
    path("projects/<int:pk>/", ProjectDetail.as_view(), name="project-detail"),

    # NESTED TASK ROUTES
    path("projects/<int:id>/tasks/", TaskListCreate.as_view(), name="task-list-create"),
    path("tasks/<int:pk>/", TaskDetail.as_view(), name="task-detail"),
    path("pro_stat/<int:projectId>/", ProjectStates.as_view(), name="project-task-detail"),
    ]
