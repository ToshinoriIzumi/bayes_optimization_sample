from datetime import datetime
from typing import Optional
from sqlalchemy import null

from sqlmodel import Field, SQLModel


class MaterialBase(SQLModel):
    water: float
    carbonated_water: float
    calpis_nomal: float
    deliciousness: float


class Material(MaterialBase, table=True):
    __tablename__ = "materials"
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class MaterialCreate(MaterialBase):
    pass


class MaterialRead(MaterialBase):
    id: int
    created_at: datetime
    updated_at: datetime
