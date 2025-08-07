from django.db import models

class Alert(models.Model):
    message = models.TextField()
    sent_to = models.CharField(max_length=100)  # phone/email/etc
    method = models.CharField(max_length=20, choices=[('sms', 'SMS'), ('email', 'Email'), ('whatsapp', 'WhatsApp')])
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Alert to {self.sent_to} via {self.method}"

