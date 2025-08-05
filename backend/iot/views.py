from rest_framework.views import APIView
from rest_framework.response import Response

class IotDataListView(APIView):
    def get(self, request):
        return Response({"message": "Iot data list will go here."})
