from rest_framework import serializers
from .models import MyUser as CustomUser

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model=CustomUser
        fields=['id','username','email','password']
        extra_kwargs={'password': {'write_only': True}}
        
    def validate(self,attrs):
        username=attrs.get('username')
        email=attrs.get('email')
        password=attrs.get('password')
        if username and CustomUser.objects.filter(username=username).exists():
            raise serializers.ValidationError("Username is already in use.")
        if email and CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email is already in use.")
        if password and len(password)<8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        return attrs
    
    def create(self,validated_data):
        return CustomUser.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
        
    class Meta:
        model=CustomUser
        fields=['email', 'password']