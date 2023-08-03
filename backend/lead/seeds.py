import sys
from django.db import transaction


@transaction.atomic
def create_initial_lead_category(sender, **kwargs):
    from .models import LeadCategory

    # Create inital Levels
    lead_points = [5, 7, 10]

    for index, points in enumerate(lead_points):
        leads_from = index * 5 + 1
        leads_to = leads_from + 4 if index < len(lead_points) - 1 else sys.maxsize
        try:
            LeadCategory.objects.create(
                points=points, leads_from=leads_from, leads_to=leads_to
            )
        except:
            pass
