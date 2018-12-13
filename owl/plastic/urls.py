from django.urls import path

from . import views
from . import api

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login, name='login'),
    path('library', views.library, name='library'),
    path('api/songs', api.songs, name='songs'),
]