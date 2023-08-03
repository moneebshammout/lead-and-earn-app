from django.core.exceptions import ValidationError


class CharacterPasswordValidator:
    """
    Validate that the password must be a mix of letters and numbers not entirly alphabetic.
    """

    def validate(self, password, user=None):
        if password.isalpha():
            raise ValidationError("Password is entirely alphabetic.")


def validate_file_size(value):
    """
    Validate that the file size is not greater than 5 MB.

    """
    max_size = 5 * 1024 * 1024

    if value.size > max_size:
        raise ValidationError(("File size exceeds the maximum allowed limit (5 MB)."))
