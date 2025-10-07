import csv
import bcrypt
from pathlib import Path

USERS_FILE = Path("users.csv")

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode(), hashed.encode())

def user_exists(username: str) -> bool:
    if not USERS_FILE.exists():
        return False
    with USERS_FILE.open("r", newline="") as f:
        reader = csv.DictReader(f)
        return any(row["username"] == username for row in reader)

def save_user(username: str, password: str):
    hashed_pw = hash_password(password)
    file_exists = USERS_FILE.exists()
    needs_header = not file_exists or USERS_FILE.stat().st_size == 0

    with USERS_FILE.open("a", newline="") as f:
        writer = csv.writer(f)
        if needs_header:
            writer.writerow(["username", "password"])
        writer.writerow([username, hashed_pw])


def authenticate_user(username: str, password: str) -> bool:
    if not USERS_FILE.exists():
        return False
    with USERS_FILE.open("r", newline="") as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row["username"] == username:
                return verify_password(password, row["password"])
    return False
