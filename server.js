const http = require("http");

const app = require("./app");

const port = 3001;
// 0 - 65556
// 21: Filoverføring
// 80: Http / Web 
// <100 : Forhåndsdefinert

const server = http.createServer(app);

try {
    server.listen(port);
} catch(error) {
    console.log(error);
}