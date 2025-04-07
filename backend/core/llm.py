import os
import uuid
from dotenv import load_dotenv

from haystack import Document
from haystack.document_stores.in_memory import InMemoryDocumentStore
from haystack.components.writers import DocumentWriter
from haystack.components.embedders import (
    SentenceTransformersDocumentEmbedder,
    SentenceTransformersTextEmbedder,
)
from haystack.components.preprocessors.document_splitter import DocumentSplitter
from haystack import Pipeline
from haystack.utils import ComponentDevice
from haystack.components.retrievers.in_memory import (
    InMemoryBM25Retriever,
    InMemoryEmbeddingRetriever,
)
from haystack.components.joiners import DocumentJoiner
from haystack.components.rankers import TransformersSimilarityRanker
from haystack.components.builders import PromptBuilder
from haystack.components.builders.answer_builder import AnswerBuilder
from haystack.components.generators import OpenAIGenerator

load_dotenv()

openai_api_key = os.getenv("OPENAI_API_KEY")
OPENAI_MODEL = "gpt-3.5-turbo"
MAX_TOKENS = 250


def run_model(query: str) -> dict:
    response = basic_rag_pipeline.run(
        {
            "text_embedder": {"text": query},
            "prompt_builder": {"question": query},
            "answer_builder": {"query": query},
        }
    )
    answer = response.get("answer_builder").get("answers")[0]
    return {
        "content": answer.data,
        "sources": [
            {
                "url": f'https://bonpote.com/{document.meta.get("title")}',
                "chunk": document.content,
            }
            for document in answer.documents[:3]
        ],
    }


document_store = InMemoryDocumentStore()

# Look if document store is available
if os.path.exists("data/document_store"):
    document_store = InMemoryDocumentStore.load_from_disk("data/document_store")
else:
    docs = []
    ARTICLES_DIR = os.path.join("data", "articles")
    articles_titles = [name for name in os.listdir(ARTICLES_DIR)]

    for title in articles_titles:
        path = os.path.join(ARTICLES_DIR, title)
        with open(path, "r") as file:
            content = file.read()
            docs.append(
                Document(content=content, meta={"title": title, "pmid": uuid.uuid4().urn})
            )

    document_splitter = DocumentSplitter(
        split_by="word", split_length=512, split_overlap=32
    )
    document_embedder = SentenceTransformersDocumentEmbedder(
        model="BAAI/bge-small-en-v1.5"
    )
    document_writer = DocumentWriter(document_store)

    indexing_pipeline = Pipeline()
    indexing_pipeline.add_component("document_splitter", document_splitter)
    indexing_pipeline.add_component("document_embedder", document_embedder)
    indexing_pipeline.add_component("document_writer", document_writer)

    indexing_pipeline.connect("document_splitter", "document_embedder")
    indexing_pipeline.connect("document_embedder", "document_writer")

    indexing_pipeline.run({"document_splitter": {"documents": docs}})

    document_store.save_to_disk("data/document_store")

in_memory_retriever = InMemoryEmbeddingRetriever(document_store)

template = """
You are Bonbot, a virtual assistant that answers questions related to climate. The topics you cover are climate change, its impacts, and socio-economic news.

You must answer the question based on the excerpts of articles given in the context. You can only rely on the information contained in these excerpts. 

You must adopt the context author's point of vue.

Context:
{% for document in documents %}
    {{ document.content }}
{% endfor %}

Question: {{question}}
Answer:
"""

prompt_builder = PromptBuilder(template=template)

generator = OpenAIGenerator(
    model=OPENAI_MODEL, generation_kwargs={"temperature": 0, "max_tokens": MAX_TOKENS}
)

retriever = InMemoryEmbeddingRetriever(document_store)
embedder = SentenceTransformersTextEmbedder(model="BAAI/bge-small-en-v1.5")

basic_rag_pipeline = Pipeline()
# Add components to your pipeline
# TODO change retriever for hybrid
basic_rag_pipeline.add_component("text_embedder", embedder)
basic_rag_pipeline.add_component("retriever", retriever)
basic_rag_pipeline.add_component("prompt_builder", prompt_builder)
basic_rag_pipeline.add_component("llm", generator)
basic_rag_pipeline.add_component("answer_builder", AnswerBuilder())

# Now, connect the components to each other
basic_rag_pipeline.connect("text_embedder.embedding", "retriever.query_embedding")
basic_rag_pipeline.connect("retriever", "prompt_builder.documents")
basic_rag_pipeline.connect("prompt_builder", "llm")
basic_rag_pipeline.connect("llm.replies", "answer_builder.replies")
basic_rag_pipeline.connect("llm.meta", "answer_builder.meta")
basic_rag_pipeline.connect("retriever", "answer_builder.documents")
