import React from 'react'
import { useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteExperiment } from '../hooks/useDeleteExperiment';

const InitExperiment: FC = () => {
    const navigate = useNavigate();
    const { deleteExperiment, error, loading } = useDeleteExperiment();
    
    const redirectHome = () => {
        navigate('/');
    }

    useEffect(() => {
        deleteExperiment();        
    }, []);

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-md text-center">
            <h2 className="text-lg font-bold mb-4">実験を初期化しました。</h2>
            <button
                onClick={redirectHome}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Homeへ
            </button>
        </div>
    )
}

export default InitExperiment