from django.http import HttpResponse, JsonResponse
from .dummy import get_library_data

def songs(request):
	if request.method == 'GET':
		return JsonResponse(get_library_data(), safe=False)