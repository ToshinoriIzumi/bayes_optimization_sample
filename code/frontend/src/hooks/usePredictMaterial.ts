import { useState, useCallback } from 'react';
import type { Material, ExpremintalMaterial, PredictedMaterial } from '../types/material';
import  axios  from 'axios';
import { URL } from '../utils/const';


interface MaterialResponse {
    experiments: ExpremintalMaterial[];
    predicted: PredictedMaterial;
}

export const usePredictMaterial = () => {
    const [materials, setMaterials] = useState<ExpremintalMaterial[] | null>(null);
    const [predictedMaterial, setPredictedMaterial] = useState<PredictedMaterial | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const predictMaterial = useCallback(async (material: Material) => {
        await axios.post<MaterialResponse>(URL + '/predict', material)
        .then((res) => {
            setMaterials(res.data.experiments);
            setPredictedMaterial(res.data.predicted);
        })
        .catch((err) => {setError(err)});
    }, [materials]);
    return { predictMaterial, error, materials, predictedMaterial };
};