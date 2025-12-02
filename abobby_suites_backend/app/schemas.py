from pydantic import BaseModel, EmailStr
from datetime import date

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class RoomCreate(BaseModel):
    name: str
    price: int

class BookingCreate(BaseModel):
    user_id: int
    room_id: int
    start_date: date
    end_date: date

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    message: str

class ResetPassword(BaseModel):
    email: str
    otp: str
    new_password: str