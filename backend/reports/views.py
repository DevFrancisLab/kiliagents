from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Report
from .serializers import ReportSerializer
from agents.ai import classify_report
from agents.environmental import handle_environmental
from agents.utils import log_agent_activity  # updated utils file

class ReportListView(generics.ListAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer


@api_view(["POST"])
def incoming_report(request):
    content = request.data.get("content", "")
    voice = request.FILES.get("voice_file")
    video = request.FILES.get("video_file")
    image = request.FILES.get("image_file")

    # For simplicity, classify by text if available, else default category
    if content:
        category = classify_report(content)
    else:
        category = "other"  # fallback

    log_agent_activity(agent="CoordinatorAgent", action=f"Classified as {category}")

    if category == "environmental":
        result = handle_environmental(request)
    else:
        result = {"status": "ignored", "message": "Not environmental"}

    # Save the report to DB
    report = Report.objects.create(
        content=content,
        category=category,
        voice_file=voice,
        video_file=video,
        image_file=image,
        user=request.user if request.user.is_authenticated else None,
    )

    return Response({"category": category, "result": result, "report_id": report.id})
