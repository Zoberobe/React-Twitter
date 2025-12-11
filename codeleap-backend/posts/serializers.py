from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    is_liked = serializers.SerializerMethodField()


    class Meta:
        model = Post
        fields = ['id', 
                  'username', 
                  'created_datetime', 
                  'title', 
                  'content', 
                  'is_liked', 
                  'likes_count']
        read_only_fields = ['created_datetime'] 

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(id=request.user.id).exists()
        return False