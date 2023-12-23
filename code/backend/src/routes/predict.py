from fastapi import APIRouter, HTTPException
from src.models.material import Material

from src.analysis.material import MaterialPredict

router = APIRouter()


@router.post("/predict", response_model=Material)
async def predict_material(material: Material):
    print(material, flush=True)
    return MaterialPredict.predict(material)
