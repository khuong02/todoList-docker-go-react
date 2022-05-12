#base image
FROM node:14.17.3-buster as ui-builder

# set working directory
RUN mkdir /usr/src/app
#copy all files from current directory to docker
COPY . /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

# install and cache app dependencies
RUN yarn

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . ./

# start app
CMD ["npm", "start"]