from typing import List, Any, Dict
from pydantic import BaseModel


class Response(BaseModel):
    content: str
    role: str


# class Metadata(BaseModel):
#     products: List[Any]
#     topic: str
#     offers: List[Any]


class ChatResponse(BaseModel):
    response: Response
    metadata: Dict[Any, Any]


class Message(BaseModel):
    content: str
    role: str


class ChatRequest(BaseModel):
    messages: List[Message]
