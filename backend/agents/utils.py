from .models import Agent, AgentActivity


def log_agent_activity(agent_name, action):
    """
    Logs an action performed by a specific agent.
    """
    try:
        agent = Agent.objects.get(name=agent_name)
    except Agent.DoesNotExist:
        raise ValueError(f"Agent '{agent_name}' does not exist.")

    AgentActivity.objects.create(
        agent=agent,
        action=action
    )

    print(f"[LOG] {agent_name} -> {action}")
