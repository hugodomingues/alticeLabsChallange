#### First STEP
Go to cities-service.service.ts and change the url in line 12 to point for your crud endpoint

### CREATE AND RUN THE DOCKER CONTAINER 

# Build the Docker image
docker build -t angular-docker

# Run the Docker container
docker run -p 4201:4200 angular docker