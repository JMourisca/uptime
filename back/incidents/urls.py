from rest_framework import routers
from django.urls import path, include
from incidents import views

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'incidents', views.IncidentViewSet, 'incidents')
router.register(r'sites', views.SiteViewSet, 'sites')
router.register(r'update', views.UpdateViewSet, 'update')

urlpatterns = [
    path('', include(router.urls)),
    path('subscribe', views.SubscriberView.as_view()),
]
