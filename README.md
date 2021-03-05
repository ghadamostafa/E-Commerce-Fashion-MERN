<p align="center">
  <img src="https://image.freepik.com/free-vector/shopping-bag-icon-illustration_24640-50313.jpg" width="200">
</p>
<h1 align="center">
Online Fashion E-Commerce Application
</h1>
<p align="center">
MongoDB, Expressjs, React, Nodejs
</p>



## Clone or download
```terminal
$ git clone https://github.com/ghadamostafa/E-Commerce-Fashion-MERN.git
$ npm i
```

## Project structure
```terminal
package.json
server/
   package.json
   .env (to create .env, check [prepare your secret session])
client/
   package.json
...
```

# Usage (run fullstack app on your machine)

## Prerequirements
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/)
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd client   // go to client folder
$ npm i       // npm install pacakges
$ npm start // run it locally

```

## Server-side usage(PORT: 5000)

### Prepare your .env

(You need to make .env file in /server and add the following data)

```terminal
ACCSESS_TOKEN_SECRET=your secret token
ACCESS_TOKEN_EXPIRATION_DATE=secret token expiration date ex. "1 day"
DATABASE_URI=mogod uri
PORT=server port
NODE_ENV = development
```

### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install pacakges
$ npm run dev // run it locally
```
### Run both client and server at the same time
(in the main directory run these commands)
```terminal
$ npm i 
$ npm run dev
``` 
### Dependencies(tech-stacks)
Client-side | Server-side
--- | ---
axios: ^0.15.3 |bcryptjs: ^2.4.3
react-router-bootstrap: ^0.25.0|body-parser: ^1.19.0
bootstrap: ^4.6.0| cors: ^2.8.5
react: ^16.2.0 | dotenv: ^8.2.0
react-dom: ^16.2.0 | express: ^4.17.1
react-router-dom: ^4.2.2 | jsonwebtoken: ^8.5.1
antd:^4.13.0 | mongoose: ^5.11.18
bootstrap: ^4.6.0 |cookie-parser: ^1.4.5
font-awesome: ^4.7.0|mongoose-float: ^1.0.4
react-bootstrap: ^1.5.0|mongoose-slug-updater: ^3.3.0
react-hook-form: ^6.15.4|mongoose-tree: ^0.2.2
react-multi-carousel:^2.6.1|mongoose-unique-validator: ^2.0.3
sweetalert: ^2.1.2|validator: ^13.5.2


## Standard

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Author
Ghada Mostafa

### License
MIT
