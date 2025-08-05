from django.urls import path
from . import views

urlpatterns = [
    path('', views.IotDatatListView.as_view(), name='iot-list'),
]
