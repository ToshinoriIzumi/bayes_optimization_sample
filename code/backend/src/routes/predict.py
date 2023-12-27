from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session
from src.analysis.material import MaterialPredict
from src.crud.material import MaterialCrud
from src.db import get_db
from src.models.material import MaterialRead, MaterialCreate

router = APIRouter()


@router.post("/predict", response_model=list[MaterialRead])
async def predict_material(material: MaterialCreate, db: Session = Depends(get_db)):
    result = MaterialCrud.create(db, material)
    result.append(MaterialPredict.predict(material))
    print(result, flush=True)
    return result
