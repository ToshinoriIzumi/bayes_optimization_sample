import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteExperiment } from '../hooks/useDeleteExperiment';

const InitExperiment = () => {
    const navigate = useNavigate();
    const { deleteExperiment, error, loading } = useDeleteExperiment();
    
    const RedirectHome = () => {
        navigate('/');
    }

    useEffect(() => {
        deleteExperiment();        
    }, []);

    return (
        <>
            <div>実験を初期化しました。</div>
            <button onClick={RedirectHome}>Homeへ</button>
        </>
    )
}

export default InitExperiment