from django.test import TestCase
from rest_framework.test import APIClient

from incidents.models import Subscriber


class SubscribeUserTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        Subscriber.objects.create(email="test@jmourisca.com")

    def test_subscribe_without_post_data(self):
        response = self.client.post('/api/subscribe')
        assert response.status_code == 400

    def test_subscribe_with_post_data(self):
        response = self.client.post('/api/subscribe', {'email': 'hello@djangowaves.com'})
        assert response.status_code == 200

    def test_subscribe_with_invalid_post_data(self):
        response = self.client.post('/api/subscribe', {'email': 'somethingsomething'})
        assert response.status_code == 400

    def test_duplicate_subscriber(self):
        response = self.client.post('/api/subscribe', {'email': 'test@jmourisca.com'})
        assert Subscriber.objects.count() == 1
        assert response.status_code == 400

    def test_duplicate_subscriber_caps(self):
        response = self.client.post('/api/subscribe', {'email': 'TEST@jmourisca.com'})
        assert Subscriber.objects.count() == 1
        assert response.status_code == 400

    # def test_duplicate_subscriber_plus_sign(self):
    #     sub = Subscriber.objects.all().first()
    #     response = self.client.put('/api/subscribe', {'id': sub.id})
    #     assert response.status_code == 200
    #     assert Subscriber.objects.filter(unique_id=sub.unique_id).exists() == False