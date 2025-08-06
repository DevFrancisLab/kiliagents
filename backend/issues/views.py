import requests
from rest_framework import generics
from .models import Issue
from .serializers import IssueSerializer

class IssueListCreateView(generics.ListCreateAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer

    def perform_create(self, serializer):
        # Extract latitude and longitude from the validated data
        lat = serializer.validated_data.get('latitude')
        lon = serializer.validated_data.get('longitude')
        place_name = serializer.validated_data.get('place_name')

        # If place_name is missing and we have coordinates, fetch it
        if not place_name and lat is not None and lon is not None:
            try:
                # Use OpenStreetMap's Nominatim API for reverse geocoding
                url = f"https://nominatim.openstreetmap.org/reverse?format=json&lat={lat}&lon={lon}"
                response = requests.get(url, headers={'User-Agent': 'KiliAgents/1.0'})
                response.raise_for_status()  # Raise an exception for bad status codes
                data = response.json()
                # Save the fetched display name
                place_name = data.get('display_name', 'Unknown Location')
            except requests.RequestException as e:
                # In case of network error or bad response, log it and proceed
                print(f"Could not fetch place name: {e}")
                place_name = 'Location lookup failed'
        
        # Save the instance with the potentially new place_name
        serializer.save(place_name=place_name)
