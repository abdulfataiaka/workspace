FROM python:3.10.4-alpine

RUN set -ex && apk --no-cache add sudo

RUN apk update && apk upgrade && apk add --update bash

RUN pip install --upgrade pip

WORKDIR /django-app

RUN sudo pip install pipenv

COPY Pipfile Pipfile.lock ./

RUN PIPENV_VENV_IN_PROJECT=1 pipenv install --deploy

ENV PATH="${PWD}/.venv/bin:${PATH}"

COPY . .
