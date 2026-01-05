from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from .models import Task,Project
from .serializers import ProjectSerializer,TaskSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .ai_logics import generate_ai_suggestion
from .analytics import get_task_completion_stats
from .analytics import get_project_completion_stats
from rest_framework.views import APIView
class ProjectViewSet(ModelViewSet):
    serializer_class=ProjectSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        return Project.objects.filter(owner=self.request.user)
    
    def perform_create(self, serializer):
        # print(self.request.user)
        serializer.save(owner=self.request.user)
        return Response({'message':serializer.error})

class TaskViewSet(ModelViewSet):
    serializer_class=TaskSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user)

    # def perfrom_create(self, serializer):
    #     serializer.save(owner=self.request.user)
        
        
class AISuggestionViewSet(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request):
        tasks=Task.objects.filter(owner=request.user)
        suggestions=generate_ai_suggestion(tasks)
        return Response({'suggestions':suggestions})
    
class ProjectProgressViewSet(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request):
        projects=Task.objects.filter(owner=request.user)
        summaries=get_task_completion_stats(projects)
        return Response({'project_summaries':summaries})
    
class ProjectStates(APIView):
    permission_classes=[IsAuthenticated]
    def get(self, request, projectId):
        tasks=Task.objects.filter(project=projectId,owner=request.user)   
        task_details=get_project_completion_stats(tasks)
        return Response({'task_details':task_details})
    
from rest_framework import generics
from .models import Project, Task
from .serializers import ProjectSerializer, TaskSerializer

# ---------- PROJECT CRUD ----------
class ProjectListCreate(generics.ListCreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


# ---------- NESTED TASKS ----------
class TaskListCreate(generics.ListCreateAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        project_id = self.kwargs['id']
        return Task.objects.filter(owner=self.request.user, project_id=project_id)

    def perform_create(self, serializer):
        project_id = self.kwargs['id']
        serializer.save(owner=self.request.user, project_id=project_id)


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user)

class ProjectTaskDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, projectId):
        return Task.objects.filter(project=projectId, owner=self.request.user)