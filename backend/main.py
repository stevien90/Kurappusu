from fastapi import FastAPI, Form, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from utils import add_roll, clear_rolls, get_stats
from auth import user_exists, save_user, authenticate_user
import uuid

sessions = {}
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register")
def register(username: str = Form(...), password: str = Form(...)):
    if user_exists(username):
        raise HTTPException(status_code=400, detail="Username already exists")
    save_user(username, password)
    return {"message": "User registered successfully"}

@app.post("/login")
def login(username: str = Form(...), password: str = Form(...)):
    if not authenticate_user(username, password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Generate a unique token and store session
    token = str(uuid.uuid4())
    sessions[token] = username
    return {"token": token}

@app.post("/roll")
def roll(token: str = Form(...), value: int = Form(...)):
    username = get_username_from_token(token)
    # Validate value here
    add_roll(username, value)
    return {"message": "Roll recorded"}

@app.get("/stats")
def stats(token: str = Query(...)):
    username = get_username_from_token(token)
    stats = get_stats(username)
    return {
        "total": stats["total"],
        "frequencies": stats["frequencies"],
        "probabilities": stats["probabilities"],
        "rolls": stats["rolls"],
    }

@app.post("/clear")
def clear(token: str = Form(...)):
    username = get_username_from_token(token)
    clear_rolls(username)
    return {"message": "Session cleared"}

def get_username_from_token(token: str) -> str:
    username = sessions.get(token)
    if not username:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return username
