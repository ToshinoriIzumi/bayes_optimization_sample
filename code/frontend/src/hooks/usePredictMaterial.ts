import { useState, useCallback } from 'react';
import type { Material } from '../types/material';
import  axios  from 'axios';
import { URL } from '../utils/const';

export const usePredictMaterial = () => {
    const [materials, setMaterials] = useState<Material[] | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const predictMaterial = useCallback(async (material: Material) => {
        await axios.post<Material[]>(URL + '/predict', material)
        .then((res) => {
            console.log(res);
            setMaterials(res.data);
        })
        .catch((err) => {setError(err)});
    }, [materials]);
    return { predictMaterial, error, materials };
};