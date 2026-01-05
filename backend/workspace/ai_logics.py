from datetime import date

def generate_ai_suggestion(tasks):
    today = date.today()
    overdue=[]
    high_priority=[]
    completed=[]
    todo=[]
    
    for task in tasks:
        if task.status=='Completed':
            completed.append(task)
        else:
            if task.priority=='High':
                high_priority.append(task)
            if task.deadline and task.deadline.date()< today:
                overdue.append(task)
            if task.status=='Pending':
                todo.append(task)
    suggestions=[]
    
    if overdue:
        suggestions.append(f"You have {len(overdue)} overdue tasks. Consider addressing them as soon as possible.")
    
    if high_priority:
        suggestions.append(f"You have {len(high_priority)} high priority tasks. Focus on these to meet your goals.")
     
    if completed:
        suggestions.append(f"Great job! You have completed {len(completed)} tasks recently.") 
        
    if todo:
        suggestions.append(f"You have {len(todo)} tasks pending. Plan your day accordingly.")
    
    if len(tasks)==0:
        suggestions.append("You have no tasks at the moment. Enjoy your free time or consider adding new tasks.")
       
    if not suggestions:
        suggestions.append("Everything looks good! You are on track with your tasks.") 
    
    return suggestions
def summarize_project_progress(projects):
    summaries=[]
    for project in projects:
        total_tasks=project.tasks.count()
        completed_tasks=project.tasks.filter(status='Completed').count()
        if total_tasks==0:
            progress=0
        else:
            progress=(completed_tasks/total_tasks)*100
        summaries.append({
            'project_name':project.name,
            'total_tasks':total_tasks,
            'completed_tasks':completed_tasks,
            'progress_percentage':round(progress,2)
        })
    return summaries

