from pydantic import BaseModel


class Material(BaseModel):
    water: float
    carbonated_water: float
    calpis_nomal: float
    deliciousness: float
