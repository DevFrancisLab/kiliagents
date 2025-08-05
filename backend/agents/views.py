from rest_framework.views import APIView
from rest_framework.response import Response

class AgentListView(APIView):
    def get(self, request):
        return Response({"message": "Agent list will go here."})
