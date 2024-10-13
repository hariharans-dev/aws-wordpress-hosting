from datetime import datetime, timedelta

# Function to check if current time in IST is between from_time and to_time
def check_date_valid(from_time, to_time):
    # Get the current time in UTC
    current_time_utc = datetime.utcnow()

    # Convert the current UTC time to IST by adding 5 hours and 30 minutes
    ist_offset = timedelta(hours=5, minutes=30)
    current_time_ist = current_time_utc + ist_offset

    # Parse from_time and to_time as datetime objects (assuming they are strings)
    if isinstance(from_time, str):
        from_time = datetime.strptime(from_time, "%Y-%m-%d %H:%M:%S")
    if isinstance(to_time, str):
        to_time = datetime.strptime(to_time, "%Y-%m-%d %H:%M:%S")

    # Add the same IST offset to from_time and to_time to ensure they are also in IST
    from_time_ist = from_time + ist_offset
    to_time_ist = to_time + ist_offset

    # Check if the current time in IST is between from_time and to_time
    return from_time_ist <= current_time_ist <= to_time_ist

# Example usage
from_time = "2024-10-15T08:00:00"  # Example from_time in string format
to_time = "2024-10-13 12:00:00"    # Example to_time in string format

is_valid = check_date_valid(from_time, to_time)

if is_valid:
    print("The current time is within the range.")
else:
    print("The current time is outside the range.")
