# Technical requirements

- Python 3.10
- An OpenAI api key
- A Redis server installed (for caching) and running on localhost:6379

# Installation

Create and activate the python virtual environment

```
python3.11 -m venv venv
source venv/bin/activate
```

Install required dependencies

```
pip install --upgrade pip
pip install -r python_env/requirements.txt
```

The project needs a .env file at its root to retrieve necessary env variables. The needed .env file looks as follows:

```
OPENAI_API_KEY=your_api_key
```

Start the different tools (each of them needs the environment variables set in their terminal before launch)

```
uvicorn main:app --host 0.0.0.0 --port 5203 --reload
```
