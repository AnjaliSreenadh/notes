# notes/urls.py
from django.urls import path
from .views import get_notes, add_note

urlpatterns = [
    path('notes/', get_notes),
    path('add/', add_note),
]