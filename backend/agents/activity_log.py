from datetime import datetime

def log_agent_activity(agent, action):
    # This could be improved to save logs in DB or file
    print(f"[{datetime.now()}] Agent: {agent} - Action: {action}")
