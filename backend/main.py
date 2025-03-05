import logging

import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import utils.logging
from core.pydantic import ChatRequest, ChatResponse
from core.llm import run_model


# Declare constants
HOST = "http://localhost"
PORT = 5203
DEBUG = False


# Define methods
def create_application() -> FastAPI:
    app = FastAPI()
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    return app


app = create_application()


@app.get("/")
async def hello_world() -> dict:
    return {"msg": "Hello, World!"}


@app.post("/api/bonbot/completion/")
async def complete(request: ChatRequest) -> ChatResponse:
    try:
        query = request.messages[-1].content
        logging.info(f"Received query: {query}")
        answer = run_model(query)
        logging.info(f"Returned answer: {answer}")
        return {
            "response": {
                "content": answer.get("content"),
                "role": "assistant",
            },
            "metadata": {
                "sources": answer.get("sources"),
                "display_sources": True,
            },
        }
    except Exception as e:
        logging.error(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    utils.logging.set_logging_config(DEBUG)
    uvicorn.run(app, host=HOST, port=PORT)
