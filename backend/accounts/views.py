from django.shortcuts import render

# Create your views here.
from .serializers import UserRegistrationSerializer, UserLoginSerializer
from rest_framework.response import Response
from rest_framework import status 
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

def get_user_tokens(user):
    refresh=RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token)
    }

class UserRegistrationView(APIView):
    def post(self,request):
        serializer=UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user=serializer.save()
            token=get_user_tokens(user)
            return Response({
                'token':token,
                'user':UserRegistrationSerializer(user).data,
                'message':'User created successfully'
            },status=status.HTTP_201_CREATED)

        return Response({
            "message": serializer.errors
        },status=status.HTTP_400_BAD_REQUEST)  
    
class UserLoginView(APIView):
    def post(self,request):
        serializer=UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email=serializer.validated_data['email']
            password=serializer.validated_data['password']
            user=authenticate(email=email,password=password)
            if user is not None:
                token=get_user_tokens(user)
                return Response({
                    'token':token,
                    'message':'Login successful'
                },status=status.HTTP_200_OK)
            return Response({
                'errors':{
                    'non_field_errors':'Invalid Credentials'
                }
            },status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class UserLogoutView(APIView):
    # permission_classes = (IsAuthenticated, )

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully."}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(e)
            return Response({"error": "Invalid token or token already blacklisted."},
                            status=status.HTTP_400_BAD_REQUEST)