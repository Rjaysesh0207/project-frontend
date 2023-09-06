from django.db import models

# Models are for setup template only. Change them according to the real project

class Todo(models.Model):
  title = models.CharField(max_length=120)
  description = models.TextField()
  completed = models.BooleanField(default=False)

  def __str__(self):
    return self.title
