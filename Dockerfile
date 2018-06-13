FROM node:carbon

#Create app directory 
WORKDIR /usr/src/app

COPY . ./

RUN npm install -g yarn \ 
 && yarn global add serve
    
RUN yarn 

EXPOSE 2000

cmd ["yarn", "serve"]