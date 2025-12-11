from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_datetime')
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'username', 'content']

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        post = self.get_object()
        
        username = request.data.get('username')
        
        if not username:
            return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)

        from django.contrib.auth.models import User
        user, created = User.objects.get_or_create(username=username)

        if post.likes.filter(id=user.id).exists():
            post.likes.remove(user)
            liked = False
        else:
            post.likes.add(user)
            liked = True

        return Response({
            'liked': liked, 
            'likes_count': post.likes.count()
        })