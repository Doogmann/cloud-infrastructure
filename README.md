# cloud-infrastructure




dogman11

docker build -t dogman11/flask-swarm-test:latest .
docker push dogman11/flask-swarm-test:latest




sudo docker service update \
  --image dogman11/flask-swarm-test:latest \
  flask-swarm




docker run --rm -p 5000:5000 dogman11/flask-swarm-test:latest