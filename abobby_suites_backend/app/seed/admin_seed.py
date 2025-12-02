from app.database import SessionLocal
from app.models import User
from app.utils import hash_password

db = SessionLocal()

admin = User(
    full_name="Admin",
    email="admin@abobby.com",
    password=hash_password("admin123"),
    role="admin"
)
db.add(admin)
db.commit()
print("Admin user created!")
