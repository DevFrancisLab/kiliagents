from django.urls import path
from . import views

urlpatterns = [
    path('', views.AgentListView.as_view(), name='agent-list'),
]
