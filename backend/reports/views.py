from rest_framework.views import APIView
from rest_framework.response import Response

class ReportListView(APIView):
    def get(self, request):
        return Response({"message": "Report list will go here."})
