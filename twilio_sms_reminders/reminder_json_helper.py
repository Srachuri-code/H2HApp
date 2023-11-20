import os
import json


def read_reminder_json():
    """Reads the JSON file and returns the data."""
    # Check if the file exists and is not empty
    if os.path.exists('reminders.json') and os.path.getsize('reminders.json') > 0:
        with open('reminders.json', 'r') as file:
            data = json.load(file)
            return data
    else:
        # Return an empty dictionary if the file is empty or doesn't exist
        return {"reminders": {}}

def write_reminder_json(data):
    """Writes the updated data to the JSON file."""
    with open('reminders.json', 'w') as file:
        json.dump(data, file, indent=4)

def create_reminder_json(new_reminder):
    """Creates a new reminder."""
    data = read_reminder_json()  # Get the current data
    
    # Use the reminder's unique ID as the key
    reminder_id = new_reminder['id']
    data['reminders'][reminder_id] = new_reminder  # Add the new reminder to the dictionary
    
    write_reminder_json(data)  # Write the updated data back to the JSON file

def update_reminder_json(reminder_id, updated_reminder):
    """Updates an existing reminder."""
    data = read_reminder_json()  # Get the current data
    
    # Check if the reminder ID exists
    if reminder_id in data['reminders']:
        data['reminders'][reminder_id].update(updated_reminder)  # Update the reminder
        write_reminder_json(data)  # Write the updated data back to the JSON file
    else:
        raise ValueError("Reminder with ID {} does not exist.".format(reminder_id))

def delete_reminder_json(reminder_id):
    """Deletes an existing reminder."""
    data = read_reminder_json()  # Get the current data
    
    # Check if the reminder ID exists
    if reminder_id in data['reminders']:
        del data['reminders'][reminder_id]  # Delete the reminder
        write_reminder_json(data)  # Write the updated data back to the JSON file
    else:
        raise ValueError("Reminder with ID {} does not exist.".format(reminder_id))

# Example usage:
# new_reminder = {
#     'id': 'unique_id3',
#     'phone_number': '+1234567890',
#     'message': 'Test message',
#     'interval': 'monthly',
#     'due_date': '2023-11-08'
# }
# create_reminder_json(new_reminder)