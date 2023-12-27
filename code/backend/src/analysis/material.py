import datetime
from src.models.material import MaterialCreate, MaterialRead


class MaterialPredict:
    @classmethod
    def predict(cls, material: MaterialCreate) -> MaterialRead:
        return MaterialRead(
            id=1,
            water=material.water,
            carbonated_water=material.carbonated_water,
            calpis_nomal=material.calpis_nomal,
            deliciousness=material.deliciousness,
            created_at=datetime.datetime.utcnow(),
            updated_at=datetime.datetime.utcnow(),
        )
