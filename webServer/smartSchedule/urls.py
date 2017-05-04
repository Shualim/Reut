from django.conf.urls import url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^id=(?P<user_id>[0-9]+)$', views.get_user)
]
