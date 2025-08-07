from django.urls import path
from .views import IssueListCreateView

urlpatterns = [
    path('', IssueListCreateView.as_view(), name='issue-list-create'),
]
