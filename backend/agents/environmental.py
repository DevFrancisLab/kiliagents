from .activity_log import log_agent_activity

def handle_environmental(report):
    """Handles environmental reports."""
    # Example: Just store or respond
    action_taken = f"Environmental issue logged: {report.content}"
    log_agent_activity(agent="EnvironmentalAgent", action=action_taken)
    return {"status": "processed", "message": action_taken}
