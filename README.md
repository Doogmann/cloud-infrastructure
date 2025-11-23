# cloud-infrastructure




dogman11

docker build -t dogman11/flask-swarm-test:latest .
docker push dogman11/flask-swarm-test:latest

docker tag flask-swarm-test:latest dogman11/flask-swarm-test:latest


sudo docker service update \
  --image dogman11/flask-swarm-test:latest \
  flask-swarm




docker run --rm -p 5000:5000 dogman11/flask-swarm-test:latest




skapa en ny venv
python -m venv venv

source venv/Scripts/active


Installera paket
pip install -r requirements.txt

Starta app
python app.py


### Lista alla instanser som är registrerade i SSM

aws ssm describe-instance-information \
  --region eu-west-1 \
  --query "InstanceInformationList[].InstanceId" \
  --output table


### Starta en SSM-session till en instans
aws ssm start-session --region eu-west-1 --target i-0f97a4d5a51a2b79c


