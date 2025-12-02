from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey , Float
from sqlalchemy.orm import relationship
from app.database import Base

target_metadata = Base.metadata


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, default="user")

class Room(Base):
    __tablename__ = "rooms"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    is_available = Column(Boolean, default=True)



class Contact(Base):
    __tablename__ = "contact"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    message = Column(String)

class Admin(Base):
    __tablename__ = "admin"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    room_id = Column(Integer, ForeignKey("rooms.id"))
    check_in = Column(Date, nullable=False)
    check_out = Column(Date, nullable=False)
    total_price = Column(Float, nullable=False)

    # NEW FIELDS
    payment_proof = Column(String, nullable=True)
    payment_status = Column(String, default="pending")

    user = relationship("User", back_populates="bookings")
    room = relationship("Room", back_populates="bookings")
