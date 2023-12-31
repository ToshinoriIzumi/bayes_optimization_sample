import datetime
import os

from typing import Tuple

import numpy as np
import pandas as pd
from sqlmodel import Session
from sklearn.preprocessing import StandardScaler
from sklearn.gaussian_process import GaussianProcessRegressor
from sklearn.gaussian_process.kernels import RBF, WhiteKernel, ConstantKernel

from src.models.material import MaterialCreate, MaterialRead
from src.crud.material import MaterialCrud


class MaterialPredict:
    _scaler = None
    _model = None
    _combinations = None

    @classmethod
    def load_combinations(cls) -> None:
        if cls._combinations is not None:
            return
        print('test', flush=True)
        app_root_path = os.path.dirname(
            os.path.dirname(
                os.path.abspath(__file__)
            )
        )

        combinations_path = os.path.join(app_root_path,
                                         'data',
                                         'combinations.csv')
        cls._combinations = pd.read_csv(combinations_path)

    @classmethod
    def init_combinations(cls):
        cls._combinations = None

    @classmethod
    def predict(cls, db: Session) -> MaterialRead:
        X, y = cls._create_training_data(
            cls._load_experiment_results(db)
        )
        cls._make_scaler(X)
        X_train = cls._scaler.transform(X)
        y_train = y
        cls._train_model(X_train, y_train)
        return cls._get_next(len(X_train))

    @classmethod
    def _load_experiment_results(cls, db: Session) -> MaterialRead:
        return MaterialCrud.search_all(db)

    @classmethod
    def _create_training_data(cls, experiment_results: list[MaterialRead]) -> Tuple[pd.DataFrame, pd.Series]:
        df = pd.DataFrame([s.model_dump() for s in experiment_results])
        X = df.loc[:, ["water", "carbonated_water", "calpis_nomal"]]
        y = df.loc[:, "deliciousness"]
        return X, y

    @classmethod
    def _make_scaler(cls, X: pd.DataFrame) -> None:
        cls._scaler = StandardScaler()
        cls._scaler.fit(X)

    @classmethod
    def _train_model(cls, X: pd.DataFrame, y: pd.Series) -> None:
        kernel = ConstantKernel() * RBF() + WhiteKernel()
        cls._model = GaussianProcessRegressor(
            alpha=1e-3,
            kernel=kernel,
            normalize_y=True
        )
        cls._model.fit(X, y)

    @classmethod
    def _get_next(cls, experiment_count: int) -> MaterialRead:
        X = cls._scaler.transform(cls._combinations)
        y_mean, y_var = cls._model.predict(X, return_std=True)
        acq_index = np.argmax(
            y_mean + ((np.log(experiment_count) / experiment_count) ** 0.5 * y_var))
        next_sample = cls._combinations.iloc[acq_index, :]
        cls._combinations.drop(acq_index, inplace=True)
        cls._combinations.reset_index(drop=True, inplace=True)

        return MaterialRead(
            id=0,
            water=next_sample.water,
            carbonated_water=next_sample.carbonated_water,
            calpis_nomal=next_sample.calpis_nomal,
            deliciousness=0,
            created_at=datetime.datetime.utcnow(),
            updated_at=datetime.datetime.utcnow(),
        )
