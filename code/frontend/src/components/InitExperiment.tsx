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
        <>
            <div>実験を初期化しました。</div>
            <button onClick={redirectHome}>Homeへ</button>
        </>
    )
}

export default InitExperiment