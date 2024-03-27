from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient

# Create a FastAPI app
app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["mydatabase"]
users_collection = db["users"]

# User model
class User(BaseModel):
    userName: str
    email: str
    phone_number: str
    password: str

# Register endpoint
@app.post("/register/")
async def register_user(user: User):
    # Check if username already exists
    if users_collection.find_one({"userName": user.userName}):
        raise HTTPException(status_code=400, detail="Username already exists!")
    if users_collection.find_one({"phone_number": user.phone_number}):
        raise HTTPException(status_code=400, detail="phone_number already exists!")
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="email already exists!")

    # Additional validations
    if len(user.userName) < 5:
        raise HTTPException(status_code=400, detail="Username must be at least 5 characters long!")

    # Save user data to MongoDB
    users_collection.insert_one(user.dict())

    return {"message": "User registered successfully!"}
