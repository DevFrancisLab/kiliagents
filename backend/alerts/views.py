from rest_framework.views import APIView
from rest_framework.response import Response

class AlertListView(APIView):
    def get(self, request):
        return Response({"message": "Alert list will go here."})
