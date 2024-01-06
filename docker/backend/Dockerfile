FROM python:3.11-buster

RUN apt-get update && \
    apt-get install vim -y && \
    groupadd -g 1100 app_user && \
    useradd -m -s /bin/bash -u 1100 -g 1100 app_user

RUN mkdir -p /opt/app && chown -R app_user:app_user /opt/app
WORKDIR /opt/app

# poetryの定義ファイルをコピー (存在する場合)
COPY ./code/backend/pyproject.toml ./

# poetryでライブラリをインストール (pyproject.tomlが既にある場合)
RUN pip install poetry && \
    poetry config virtualenvs.in-project true && \
    poetry config virtualenvs.create false && \
    if [ -f pyproject.toml ]; then poetry update package && poetry install --no-root; fi

USER app_user
ENV PYTHONPATH=/opt/app