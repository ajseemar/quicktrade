#!/bin/bash
START_PATH=$(pwd)

export COMPOSE_PROJECT_NAME='quicktrade-dev'
export COMPOSE_FILE='docker-compose.yml'

function cleanUp {
  cd $START_PATH;
  echo -e "\n🧹  Cleaning up services...\n";
  docker-compose down;
}

trap cleanUp EXIT
set -e;

echo -e "\n⏳ Starting persistent PostgreSQL for development...\n";
docker-compose up persistent-db;