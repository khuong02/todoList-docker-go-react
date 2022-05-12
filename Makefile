build:
	docker-compose up -d --build

run:
	docker-compose up

stop: 
	docker stop $(docker ps -aq) 

rm:
	docker rm $(docker ps -aq) 
