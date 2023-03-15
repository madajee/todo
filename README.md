# Todo express application
This application creates an express app and listens on port 3000. It serves a static angularjs pages. UI allow you to get todo list, add and edit a todo.

The source code runs inside 
a docker container on your local machine or a web-server.
Because the web application uses Docker, it is 
assumed that Docker is installed on your machine or the web server
that will host the application.
Instructions on how to install Docker on a *Mac* can be found 
[here](https://docs.docker.com/desktop/mac/install/) and for 
*Ubuntu* [here](https://docs.docker.com/engine/install/ubuntu/).

# Building the docker image

Once docker is setup on your machine, you may clone this repository
to your local directory. You may do that by typing the following command
in your terminal:

`git clone https://github.com/madajee/todo.git`

You can then navigate to the todo directory:

cd todo

Once the repository is cloned and you have naviagated inside the todo directory, 
you can build the Docker image by running the command:

`docker build -f Dockerfile -t todo:latest .`

# Running the docker image as a container locally

Once the image has been built, you can run a local instance of the *todo*
web application by running:

`docker run -d -p 3000:3000 todo:latest`

If everything works, you can visit your web-app using the address
`http://localhost:3000/` in your browser.

# Cleanup

To check the status of your running container you may use the command:

`docker ps`

To stop a running container you can use the command:

`docker stop <CONTAINER ID>`,

where the `<CONTAINER ID>` can be found in the first column of the output
of `docker ps`.

To remove all containers and all images (stop the containers first)
you may use:

`docker rm -vf $(docker ps -aq)`

`docker rmi -f $(docker images -aq)`