# reports/urls.py
from django.urls import path
from .views import ReportListView, incoming_report

urlpatterns = [
    path('', ReportListView.as_view(), name='report-list'),
    path('incoming/', incoming_report, name='incoming-report'),
]
