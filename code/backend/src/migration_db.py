from sqlmodel import SQLModel

from src.db import engine
from src.models.material import Material


def reset_db():
    SQLModel.metadata.drop_all(engine)
    SQLModel.metadata.create_all(engine)


if __name__ == "__main__":
    reset_db()
