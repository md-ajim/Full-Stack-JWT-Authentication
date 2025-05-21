from django.db import models
from django.contrib.auth.models import AbstractUser
from simple_history.models import HistoricalRecords


class CustomUser(AbstractUser):
    profile_pic = models.ImageField(upload_to='profile/', null=True, blank=True) 
    full_name = models.CharField(max_length=50 , blank=True , null= True)
    history = HistoricalRecords()
    
    ROLE_CHOICES=(
        ('admin' ,'Admin'),
        ('user', 'User') )
    
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    def __str__(self):
        return self.role
    
    






