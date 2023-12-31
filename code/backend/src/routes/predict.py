from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session
from src.analysis.material import MaterialPredict
from src.crud.material import MaterialCrud
from src.db import get_db
from src.models.material import Material, MaterialRead, MaterialCreate

router = APIRouter()


@router.post("/predict", response_model=list[MaterialRead])
async def predict_material(material: MaterialCreate, db: Session = Depends(get_db)):
    result = MaterialCrud.create(db, material)
    MaterialPredict.load_combinations()
    result.append(MaterialPredict.predict(db))
    return result


@router.delete("/init_experiments")
async def delete_material(db: Session = Depends(get_db)):
    MaterialCrud.delete_all(db)
    MaterialPredict.init_combinations()
    return {"message": "success"}
