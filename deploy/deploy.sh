#!/bin/bash
registry='localhost:5000'
image='dockerfarm-frontend'

docker pull ${registry}/${image}:${BUILD_NUMBER}
docker rm -f ${image} || true
docker run -d -p 2000:2000 \
    --restart always \
    --name ${image} \
    ${registry}/${image}:${BUILD_NUMBER}
