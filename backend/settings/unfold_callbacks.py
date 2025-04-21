def dashboard_callback(request, context):
    context.update({"sample": "User dashboard"})
    return context

def environment_callback(request):
    return ["Development", "info"]

def environment_title_prefix_callback(request):
    return "[Dev]"


