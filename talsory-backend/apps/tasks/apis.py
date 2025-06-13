from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters
from rest_framework_simplejwt.authentication import JWTAuthentication
from apps.core.pagination import StandardPagination
from .models import Task
from .serializers import TaskSerializer


class TaskFilter(filters.FilterSet):
    status = filters.ChoiceFilter(
        choices=Task.STATUS_CHOICES,
        method='filter_by_status'
    )
    priority = filters.ChoiceFilter(
        choices=Task.PRIORITY_CHOICES,
        method='filter_by_priority'
    )

    class Meta:
        model = Task
        fields = ['status', 'priority']

    def filter_by_status(self, queryset, name, value):
        return queryset.filter(status=value)

    def filter_by_priority(self, queryset, name, value):
        return queryset.filter(priority=value)


class TaskViewSet(ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = StandardPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = TaskFilter
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'due_date', 'priority']
    ordering = ['-created_at']

    def get_queryset(self):
        return Task.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
