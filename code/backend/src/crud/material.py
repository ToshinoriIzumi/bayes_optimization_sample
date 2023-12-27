from sqlmodel import Session, select

from src.models.material import MaterialCreate, MaterialRead, Material


class MaterialCrud:
    @classmethod
    def search_all(cls, db: Session) -> list[MaterialRead]:
        result = db.exec(
            select(Material).order_by(Material.created_at)
        )
        return result.all()

    @classmethod
    def create(cls, db: Session, material: MaterialCreate) -> list[MaterialRead]:
        db_material = Material.model_validate(material)
        db.add(db_material)
        db.commit()
        db.refresh(db_material)
        return cls.search_all(db)
