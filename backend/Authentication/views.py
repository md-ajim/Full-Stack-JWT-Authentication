from django.shortcuts import render
from Authentication.views import *
from Authentication.serializers import *
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import CreateAPIView
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, AllowAny
from django.core.cache import cache
from django.core.mail import send_mail
from django.contrib.auth import get_user_model , login , authenticate
from rest_framework_simplejwt.tokens import RefreshToken , AccessToken
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from rest_framework.views import csrf_exempt
from social_core.exceptions import MissingBackend , AuthForbidden , AuthTokenError
from social_core.backends.oauth import BaseOAuth2
from social_django.utils import load_backend , load_strategy
from rest_framework import permissions
from requests import HTTPError
from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render
from Authentication.models import CustomUser

User = get_user_model()

import random


def generate_otp_code():
    return  str(random.randint(100000,900000))





def store_otp_in_cache(email, otp):
    cache_key = f"otp_{email}"
    cache.set(cache_key, otp, timeout=600)  # Timeout in seconds (10 minutes)
    

def verify_otp(email, otp):
    cache_key = f"otp_{email}"
    stored_otp = cache.get(cache_key)
    return stored_otp == otp




def  send_activation_mail(username , email , otp):
    subject = 'Activation Mail'
    message = f'Hello {username}, Please submit {otp} code in register form for active account'
    from_email = 'auth@gmail.com' 
    recipient_list = [email]
    send_mail(subject, message, from_email,recipient_list)

class SendOtpViews(CreateAPIView):
    serializer_class = OTPSerializer

    def post(self,request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data['username']
        email = serializer.validated_data['email']
        otp = generate_otp_code()
        store_otp_in_cache(email, otp)
        send_activation_mail(username,email,otp)
        return Response ({ 'username' : username , 'email' : email , 'otp' : otp}, status=200)


class VerifyOTPViews (generics.GenericAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
    
        username = serializer.validated_data['username']
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        otp = serializer.validated_data['otp']
        if verify_otp(email, otp):
            user = User.objects.filter(username=username, email= email).first()
            if not user:
                user = User(username=username , email=email)
                user.set_password(password)
                user.is_active = True
                user.save() 
            
            authenticate_user = authenticate(username=username, password=password) 
            if not authenticate_user :
                Response({ 'message': 'user is not authenticate'} , status=401)
            login(request, authenticate_user)     
            refresh = RefreshToken.for_user(user)
             
            response_user = {
                'id' : authenticate_user.id,
                'username' : authenticate_user.username,
                'email' : authenticate_user.email,
                'access' : str(refresh.access_token),
                'refresh' : str(refresh)
            }
            return Response(data=response_user, status=201)
                
                              
        else :
             return  Response({ 'error' : 'otp code is expire or invalid'} , status=401)        
            
        

@method_decorator(csrf_exempt, name='dispatch')
class SocialOAuth2Views(generics.GenericAPIView):
    serializer_class = SocialLogInSerializer
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        provider = serializer.validated_data['provider']
        access_token = serializer.validated_data['access_token']
        print(provider, 'provider')
        print(access_token, 'access_token')
        social_strategy = load_strategy(request)
        
        try:
            backend = load_backend(strategy=social_strategy, name=provider, redirect_uri=None)
        except MissingBackend :
            return Response({ 'error' : 'Provide is not valid please provide valid provider' })
        
        try : 
            if isinstance(backend , BaseOAuth2):
                user = backend.do_auth(access_token=access_token)
                if user :
                    print(f'authenticated {user}')
                else :
                    return Response({ 'message': 'user is not authenticated'})
        
        except AuthForbidden as error :
            return Response({ 'error' : 'Invalid credentials' , 'massage' : str(error)},status=status.HTTP_400_BAD_REQUEST)
        except HTTPError as error :
            return Response({ 'error' : 'Access_token is invalid', 'massage' : str(error)},status=status.HTTP_400_BAD_REQUEST)
        except AuthTokenError as error:
            return Response({ 'error' : 'invalid credentials' , 'massage' : str(error)},status=status.HTTP_400_BAD_REQUEST)
        
        if user.is_active:
            login(request, user)
            print(user, 'user')
            
            refresh = RefreshToken.for_user(user)
            response_data = {
                'id' : user.id,
                'username' : user.username,
                'email' : user.email,
                'access_token': str(refresh.access_token),
                'refresh' : str(refresh)
            }
            return Response(data=response_data , status= status.HTTP_200_OK)
        
        return Response ({ 'error' : 'User is not active'} , status=status.HTTP_400_BAD_REQUEST)
            
               
                    
                
                
                
             

        



class UserSeriaLizersViews( ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSeriaLizers
    permission_classes =[AllowAny]

        

class SendOTPSerializersViews(generics.GenericAPIView):
    serializer_class = SendOTPSerializers
    permission_classes =[AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data.get('email')
        user = User.objects.filter(email=email).first()
        print(user,'user')
        if user:
             otp = generate_otp_code()
             store_otp_in_cache(email=email , otp=otp)
             send_mail(
             subject='Forget Password otp code',
             message= f'otp code message{otp}',
             from_email='example@gmail.com',
             recipient_list=[email],)
             return Response(status=status.HTTP_201_CREATED , data={'message': 'Send OTP code successfully', 'email': user.email , 'otp': otp})
        return Response(status=status.HTTP_400_BAD_REQUEST, data={ 'Error' : 'Email is not exist'})     


class OTPVerifySerializersViews(generics.GenericAPIView):
    serializer_class = OTPVerifySerializers
    permission_classes =[AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data.get('email')
        otp = serializer.validated_data.get('otp')
        password = serializer.validated_data.get('password')
        if verify_otp(email,otp):
            user = User.objects.get(email=email)
            print(user, 'user-v')
            if user:
                user.set_password(password)
                user.save()
                return Response(status=status.HTTP_201_CREATED,data={'id': user.id, 'username': user.username, 'email':user.email , 'password': password})   

            return Response(status=status.HTTP_400_BAD_REQUEST,data={'error': 'user is not exist'})
        return Response(status=status.HTTP_403_FORBIDDEN, data={'error' : 'Invalid OTP Code'})     

      







        

# @staff_member_required
# def active_users_views(request):
#     users = CustomUser.objects.filter(is_active=True)
#     return render(request,'admin/active_users.html',{ 'users': users})

   
       



