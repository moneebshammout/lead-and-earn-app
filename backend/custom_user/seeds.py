import sys
from django.db import transaction


@transaction.atomic
def create_initial_levels(sender, **kwargs):
    from .models import Level

    # Create inital Levels
    levels = [
        "Novice Referrer",
        "Expert Referrer",
        "Master Referrer",
        "Grand Master Referrer",
    ]

    for index, level in enumerate(levels):
        poinst_from = index * 10 + 1
        points_to = poinst_from + 9 if index < len(levels) - 1 else sys.maxsize
        try:
            Level.objects.create(
                badge=level, points_from=poinst_from, points_to=points_to
            )
        except:
            pass
