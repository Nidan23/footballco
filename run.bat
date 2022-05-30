docker stop footballco

docker rm footballco

docker image rm footballco

docker build -t footballco .

docker run -dp 3000:3000 --name footballco footballco