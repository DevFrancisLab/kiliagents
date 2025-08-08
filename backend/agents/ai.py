import os
import requests

# Example: Using Gemini API (replace with actual key)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

CATEGORIES = ["environmental", "security", "urban_development", "other"]

def classify_report(content):
    """Classifies incoming report text into a predefined category."""
    prompt = f"Classify this report into one of {CATEGORIES}:\n{content}"
    
    response = requests.post(
        f"{GEMINI_URL}?key={GEMINI_API_KEY}",
        json={
            "contents": [{"parts": [{"text": prompt}]}]
        }
    )
    data = response.json()
    category = data["candidates"][0]["content"]["parts"][0]["text"].lower().strip()
    
    if category not in CATEGORIES:
        category = "other"
    return category
