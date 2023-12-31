import { useState } from 'react';
import axios from 'axios';
import { URL } from '../utils/const';

export const useDeleteExperiment = () => {
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const deleteExperiment = async () => {
        setLoading(true);
        await axios.delete(URL + '/init_experiments')
        .catch((err) => {setError(err)})
        .finally(() => {setLoading(false)});
    }
    return { deleteExperiment, error, loading };
};