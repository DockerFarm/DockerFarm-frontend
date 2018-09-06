# DockerFarm-frontend
> DockerFarm is a system that can easily manage a Docker.

![Build Status](http://jenkins.dockerfarm.cf/buildStatus/icon?job=DockerFarm-frontend/master)
![image](https://user-images.githubusercontent.com/2585676/45164345-3824ac00-b22d-11e8-8582-f401e7b9dca8.png)


## ✨ Feature

- [x] DashBoard
- [x] EndPoint Management
- [x] Registry Management
- [x] Container Management
- [x] Image Management
- [x] Volumne Management
- [x] Network Management
- [ ] Swarm Management
- [ ] Event Log

## Built With

* react
* redux 
* redux-pender
* semantic-ui-react
* socket.io-client
* styled-components
* immutable.js
* react-intl 

## Versioning
We use SemVer for versioning. For the versions available, see the tags on this repository.

## Development setup 
1. First, Install [yarn](https://yarnpkg.com/en/) global 


2. Second, Clone this Project & Install node module via yarn 

```sh
//clone project
git clone https://github.com/DockerFarm/DockerFarm-frontend.git

//move project folder
cd DockerFarm-frontend

//install node module
yarn 
```

3. Finally Starting Project via npm script

```sh
yarn start 
//launch browser and navigate to http://localhost:3000
```

## License 

This project is licensed under the MIT License