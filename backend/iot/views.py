from rest_framework import generics
from .models import SensorReading
from .serializers import SensorReadingSerializer

class SensorReadingListCreateView(generics.ListCreateAPIView):
    queryset = SensorReading.objects.all().order_by('-timestamp')
    serializer_class = SensorReadingSerializer
