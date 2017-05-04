from django.conf.urls import url
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^?P<user_Id>(id=[0-9]+)/$', views.get_user)
]
