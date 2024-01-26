
# Build the Docker image
docker build -t angular-docker
# Run the Docker container
docker run -p 4201:4200 angular docker
