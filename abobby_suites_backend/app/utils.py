from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
import random
from app.config import SECRET_KEY, ALGORITHM

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ----------------------
# Password utils
# ----------------------
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# ----------------------
# JWT utils
# ----------------------
def create_token(data: dict, expires_minutes: int = 30) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_minutes)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

# ----------------------
# OTP utils
# ----------------------
def generate_otp(length: int = 6) -> str:
    """Generate numeric OTP of given length"""
    return ''.join(str(random.randint(0, 9)) for _ in range(length))

def send_otp_email(email: str, otp: str):
    """Send OTP to user email (replace with real email service in production)"""
    print(f"[DEBUG] Sending OTP {otp} to {email}")
