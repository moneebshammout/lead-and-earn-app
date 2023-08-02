from django.core.exceptions import ValidationError


class CharacterPasswordValidator:
    """
    Validate that the password must be a mix of letters and numbers not entirly alphabetic.
    """

    def validate(self, password, user=None):
        if password.isalpha():
            raise ValidationError("Password is entirely alphabetic.")
