from rest_framework.serializers import ModelSerializer
from rest_framework.validators import UniqueValidator
from django.contrib.auth import password_validation
from rest_framework import serializers
from django.contrib.auth import get_user_model
from Authentication.models import *

User = get_user_model()


class CustomUserSerializer(ModelSerializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(write_only=True)
    def validate_password( self , value):
        password_validation.validate_password(value)
        if(len(value) < 8):
            raise serializers.ValidationError('Password most be at least 8 characters long')
        
        return value
    otp = serializers.CharField(max_length=6)    
        
    class Meta:
        model = User
        fields = ['username' , 'email', 'password', 'otp']




class OTPSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()

   

class SocialLogInSerializer(serializers.Serializer):
    provider = serializers.CharField(max_length=255, required=True)
    access_token = serializers.CharField(max_length=4095, required=True,  trim_whitespace=True)


class UserSeriaLizers(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ["id", 'profile_pic', "username" , "email", "last_login","is_superuser" ,"first_name" , "last_name" ,"is_active",  "date_joined" , "full_name"  ]
        
    


class SendOTPSerializers( serializers.Serializer):
    email = serializers.EmailField()
  

 
class OTPVerifySerializers(serializers.Serializer):
    otp = serializers.CharField(max_length=6)
    email = serializers.CharField()
    password = serializers.CharField()