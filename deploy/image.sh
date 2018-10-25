#!/bin/bash
registry='localhost:5000'
image='dockerfarm-frontend'

docker build -t ${image} --no-cache .
docker tag ${image} ${registry}/${image}:${BUILD_NUMBER}
docker push ${registry}/${image}:${BUILD_NUMBER}
docker rmi -f ${image} ${registry}/${image}:${BUILD_NUMBER}
