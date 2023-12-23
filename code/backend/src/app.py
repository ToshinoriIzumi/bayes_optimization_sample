from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routes import predict

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://frontend:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


app.include_router(predict.router)
