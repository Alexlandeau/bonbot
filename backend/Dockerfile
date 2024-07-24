FROM pytorch/pytorch:2.1.2-cuda12.1-cudnn8-runtime

RUN mkdir -p /app \
    && adduser --disabled-login app_user \
    && chown -R app_user /app

USER app_user
COPY . /app
WORKDIR /app

RUN pip install --upgrade pip \
    && pip install -r python_env/requirements.txt --no-cache-dir

EXPOSE 5203

CMD [ "python3", "-m" , "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5203"]
