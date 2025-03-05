from typing import List, Any, Dict
from pydantic import BaseModel


class Response(BaseModel):
    content: str
    role: str


class Source(BaseModel):
    url: str
    chunk: str


class Metadata(BaseModel):
    sources: List[Source]
    display_sources: bool #TODO: remove if needed all the time


class ChatResponse(BaseModel):
    response: Response
    metadata: Dict[Any, Any]


class Message(BaseModel):
    content: str
    role: str


class ChatRequest(BaseModel):
    messages: List[Message]
