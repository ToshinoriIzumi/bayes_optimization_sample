from math import e
import os
from dotenv import load_dotenv

from sqlmodel import create_engine, Session

load_dotenv()

DB_URL = f"postgresql+psycopg2://{os.environ['DB_USER']}:{os.environ['DB_PASSWORD']}@{os.environ['DB_HOST']}:{os.environ['DB_PORT']}/{os.environ['DB_NAME']}"

engine = create_engine(DB_URL)


def get_db():
    with Session(engine) as session:
        yield session
