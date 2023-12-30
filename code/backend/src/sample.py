import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.gaussian_process import GaussianProcessRegressor
from sklearn.gaussian_process.kernels import RBF, WhiteKernel, ConstantKernel

example_data = {
    "water": [5.0, 10.0, 15.0, 30.0, 5.0],
    "carbonated_water": [65.0, 60.0, 55.0, 40.0, 65.0],
    "calpis_nomal": [30.0, 30.0, 30.0, 30.0, 30.0],
    "deliciousness": [100.0, 75.0, 75.0, 80.0, 60],
}

df = pd.DataFrame(example_data)

scaler = StandardScaler()
scaler.fit(df.loc[:, ["water", "carbonated_water", "calpis_nomal"]])

X = df.loc[:, ["water", "carbonated_water", "calpis_nomal"]]
y = df.loc[:, "deliciousness"]

X_train = scaler.transform(X)
y_train = y

kernel = ConstantKernel() * RBF() + WhiteKernel()
model = GaussianProcessRegressor(
    alpha=1e-3,
    kernel=kernel,
    normalize_y=True
)

model.fit(X_train, y_train)

n = len(X_train)
acq_list = []

df = pd.read_csv("combinations.csv")


x = scaler.transform(df)
y_mean, y_var = model.predict(x, return_std=True)
acq_index = np.argmax(y_mean + ((np.log(n) / n) ** 0.5 * y_var))
next_sample = df.iloc[acq_index, :]
print(next_sample)
