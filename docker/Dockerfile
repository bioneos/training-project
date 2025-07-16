# Dockerfile
FROM node:20-slim

# Get latest npm
RUN npm i npm@latest -g

# "For Windows
# Map host system's user id and group to user in container
# So that when we bind mount our files into the container
# there are not any permission issues
ARG UID
ARG GID
# Update UNAME and UGROUP to whatever you like 
ARG UNAME="training-project"
ARG UGROUP="training-project"

RUN apt-get update && apt-get install -y openssl && apt-get -y install git && apt-get -y install vim

# # Copy the entrypoint script
# COPY docker/entrypoint.sh /app/docker/entrypoint.sh

# # Make the entrypoint script executable
# RUN chmod +x /app/docker/entrypoint.sh

# # Use custom entrypoint script
# ENTRYPOINT ["./docker/entrypoint.sh"]

# Expose the port Nuxt will run on
EXPOSE ${APP_PORT}

# For Windows
RUN echo UID=${UID} UNAME=${UNAME}
RUN echo GID=${GID} UGROUP=${UGROUP}
# Create our user
RUN groupadd -g ${GID} -o ${UGROUP}
RUN useradd -ms /bin/bash -u ${UID} -g ${UGROUP} ${UNAME}

# Create user
USER ${UNAME}

# Create app directory
WORKDIR /app

# Install app dependencies
COPY --chown=${UNAME}:${UGROUP} package.json package-lock.json* ./
RUN NUXT_TELEMETRY_DISABLED=1 npm ci && npm cache clean --force

# Copy in as node user, so permissions match what we need
WORKDIR /app/src
COPY --chown=${UNAME}:${UGROUP} . .




