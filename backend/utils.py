import csv
from pathlib import Path
from datetime import datetime
from collections import Counter

def get_roll_file(username: str) -> Path:
    return Path("sessions") / f"rolls_{username}.csv"

def get_user_rolls(username: str):
    file = get_roll_file(username)
    if not file.exists():
        return []

    rolls = []
    with file.open("r", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                roll_value = int(row["roll"])
                # if you want to preserve chronological order, you can parse timestamp
                # timestamp = datetime.fromisoformat(row["timestamp"])
                rolls.append(roll_value)
            except Exception as e:
                # Skip bad rows
                continue
    return rolls

def add_roll(username: str, roll: int):
    file = get_roll_file(username)
    file.parent.mkdir(exist_ok=True)
    exists = file.exists()
    with file.open("a", newline="") as f:
        writer = csv.writer(f)
        if not exists:
            writer.writerow(["roll", "timestamp"])
        writer.writerow([roll, datetime.utcnow().isoformat()])

def clear_rolls(username: str):
    file = get_roll_file(username)
    if file.exists():
        file.unlink()

def get_stats(username):
    rolls = get_user_rolls(username)
    total = len(rolls)
    freq_counter = Counter(rolls)

    # Include all possible dice sums (2 to 12)
    frequencies = {str(i): freq_counter.get(i, 0) for i in range(2, 13)}
    probabilities = {
        str(i): freq_counter.get(i, 0) / total if total > 0 else 0.0
        for i in range(2, 13)
    }

    # Format rolls like: [{ "value": 8 }]
    roll_objs = [{"value": r} for r in reversed(rolls)]  # reverse for most recent first

    return {
        "frequencies": frequencies,
        "probabilities": probabilities,
        "total": total,
        "rolls": roll_objs,
    }