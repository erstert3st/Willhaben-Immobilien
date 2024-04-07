# Use Red Hat's Universal Base Image 8 as the base image
FROM registry.access.redhat.com/ubi9/nodejs-20:latest
USER 0
# Install Python
RUN dnf -y install python311 && dnf clean all

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Change the owner of the /app directory to the user
RUN chown -R 1001:0 /app && chmod -R 777 /app
# USER 1001
# Run the application
CMD ["python3", "-m", "your-python-script"]