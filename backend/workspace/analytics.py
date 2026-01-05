from datetime import date

def get_task_completion_stats(tasks):
    today=date.today()
    total=len(tasks)
    completed_task=len([t for t in tasks if t.status=="completed"])
    pending_tasks=len([t for t in tasks if t.status=="pending"])
    overdue_tasks=len([t for t in tasks if t.status!="completed" and t.deadline and t.deadline.date()< today])
    high_priority_tasks=len([t for t in tasks if t.priority=="high" and t.status!="completed"])
    in_progress=len([t for t in tasks if t.status=='in_progress'])
    progress_percent= (completed_task/len(tasks))*100 if tasks else 0
    return {
        "total_tasks":total
,        "completed_tasks":completed_task,
        "pending_tasks":pending_tasks,
        "overdue_tasks":overdue_tasks,
        "high_priority_tasks":high_priority_tasks,
        "in_progress":in_progress,
        "progress_percent":round(progress_percent,2)
    }
from datetime import date

def get_project_completion_stats(tasks):
    today = date.today()

    total = len(tasks)

    completed_tasks = 0
    pending_tasks = 0
    in_progress = 0
    overdue_tasks = 0

    high_priority_tasks = 0
    medium_priority_tasks = 0
    low_priority_tasks = 0

    for t in tasks:
        status = t.status.lower()
        priority = t.priority.lower()

        if status == "completed":
            completed_tasks += 1
        elif status == "pending":
            pending_tasks += 1
        elif status == "in_progress":
            in_progress += 1

        if status != "completed":
            if priority == "high":
                high_priority_tasks += 1
            if priority == "medium":
                medium_priority_tasks += 1
            if priority == "low":
                low_priority_tasks += 1

            if t.deadline and t.deadline.date() < today:
                overdue_tasks += 1

    progress_percent = (completed_tasks / total * 100) if total else 0

    return {
        "total_tasks": total,
        "completed_tasks": completed_tasks,
        "pending_tasks": pending_tasks,
        "in_progress": in_progress,
        "overdue_tasks": overdue_tasks,
        "high_priority_tasks": high_priority_tasks,
        "medium_priority_tasks": medium_priority_tasks,
        "low_priority_tasks": low_priority_tasks,
        "progress_percent": round(progress_percent, 2),
    }
