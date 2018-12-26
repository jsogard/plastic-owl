from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseBadRequest
from .dummy import get_library_data


# Create your views here.

def index(request):
	if request.session.get('user') == None:
		# print('redirecting to login')
		return redirect('/login')
	# print('rendering the index')
	return render(request, 'plastic/index.html', {})

def login(request):
	if request.method == 'GET':
		# print('rendering login')
		return render(request, 'plastic/login.html', {})
	if request.method == 'POST':
		valid = True
		if valid:
			# print('redirecting to index')
			request.session['user'] = { 'username': request.POST.get('username') }
			return HttpResponse('Successful login')
		else:
			# print('bad login')
			return HttpResponseBadRequest('Bad login')
		
	return None

def library(request):
	if request.method == 'GET':
		return render(request, 'plastic/library.html', {})

