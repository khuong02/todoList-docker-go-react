FROM golang:1.14.0-stretch

WORKDIR /app

COPY . .

RUN go mod download

RUN apt update && apt upgrade -y && \
    apt install -y git \
    make openssh-client

# The ENTRYPOINT defines the command that will be ran when the container starts up
# In this case air command for hot reload go apps on file changes
RUN curl -fLo install.sh https://raw.githubusercontent.com/cosmtrek/air/master/install.sh \
    && chmod +x install.sh && sh install.sh && cp ./bin/air /bin/air

CMD air