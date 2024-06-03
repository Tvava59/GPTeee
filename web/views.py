from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import random

# Create your views here.
def user_login(request):
    if request.method == 'POST':
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('/index/')
        else:
            error_message = "Invalid username or password. Please try again."
            return render(request, 'login.html', {'error_message': error_message})
    else:
        return render(request, 'login.html')

def index(request):
    return render(request,"index.html")

def user_register(request):
    if request.method == "POST":
        username = request.POST.get('username')
        email = request.POST.get('email')
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')

        if password1 != password2:
            error_message = "Passwords do not match."
            return render(request, "register.html", {'error_message': error_message})
        try:
            user = User.objects.create_user(username=username, email=email, password=password1)
            user.save()
            success_message = "Registration successful. Please log in."
            return render(request, "register.html", {'success_message': success_message})
        except Exception as e:
            error_message = str(e)
            return render(request, "register.html", {'error_message': error_message})
    else:
        return render(request, "register.html")
    
@csrf_exempt
def chatbot(request):
    if request.method == 'POST':
        user_message = request.POST.get('message')
        response_message = generate_response(user_message)
        return JsonResponse({'response': response_message})
    return render(request, "chatbot.html")

def generate_response(user_message):
    responses = ['Hello!', 'How can I help you?', 'Nice to meet you!']
    return random.choice(responses)