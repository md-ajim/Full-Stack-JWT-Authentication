from django.urls import include , path
from rest_framework_simplejwt.views import TokenObtainPairView , TokenRefreshView
from Authentication.views import *

from rest_framework import routers

router = routers.DefaultRouter()
router.register('users', UserSeriaLizersViews)
urlpatterns = router.urls



urlpatterns +=[

      path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
      path('refresh/', TokenRefreshView.as_view(), name='refresh_token'),
      path('send-otp/' , SendOtpViews.as_view(), name='send-otp'),
      path('verify-account/', VerifyOTPViews.as_view(), name='verify-account'),
      path('social-login/', SocialOAuth2Views.as_view() , name='social-login'),
      path('forget-password-send/', SendOTPSerializersViews.as_view(), name='send-otp'),
      path('reset-password/', OTPVerifySerializersViews.as_view(), name='reset-password'),
      # path('admin/active-users/' , active_users_views, name='active_users_views' ),
] 
