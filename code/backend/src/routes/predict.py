from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session
from src.analysis.material import MaterialPredict
from src.crud.material import MaterialCrud
from src.db import get_db
from src.models.material import MaterialCreate, ResponseMaterial

router = APIRouter()


@router.post("/predict", response_model=ResponseMaterial)
async def predict_material(material: MaterialCreate, db: Session = Depends(get_db)):
    experiments = MaterialCrud.create(db, material)
    MaterialPredict.load_combinations()
    res_data = {
        'experiments': experiments,
        'predicted': MaterialPredict.predict(db)
    }
    return res_data


@router.delete("/init_experiments")
async def delete_material(db: Session = Depends(get_db)):
    MaterialCrud.delete_all(db)
    MaterialPredict.init_combinations()
    return {"message": "success"}
