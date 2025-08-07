from django.urls import path
from .views import AgentListCreateView

urlpatterns = [
    path('', AgentListCreateView.as_view(), name='agent-list-create'),
]
