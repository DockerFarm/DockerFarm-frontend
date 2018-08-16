FROM node:carbon

#Create app directory 
WORKDIR /usr/src/app

COPY . ./

RUN yarn global add serve
    
RUN yarn 

EXPOSE 2000

cmd ["yarn", "serve"]