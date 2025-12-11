from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    
    username = models.CharField(max_length=255)
    created_datetime = models.DateTimeField(auto_now_add=True) 
    title = models.CharField(max_length=255)
    content = models.TextField()

    class Meta:
        ordering = ['-created_datetime'] 

    def __str__(self):
        return f"{self.username} - {self.title}"
    
    likes = models.ManyToManyField(User, related_name='liked_posts', blank=True)

    
    def total_likes(self):
        return self.likes.count()