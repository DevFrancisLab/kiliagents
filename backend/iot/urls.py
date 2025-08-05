from django.urls import path
from . import views

urlpatterns = [
    path('', views.IotDataListView.as_view(), name='iot-list'),
]
