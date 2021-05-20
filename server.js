const http = require("http");

const app = require("./app");

const temp = require('pi-temperature');

const port = 3001;
// 0 - 65556
// 21: Filoverføring
// 80: Http / Web 
// <100 : Forhåndsdefinert

const server = http.createServer(app);

try {
    server.listen(port);
    temp.measure((err, temp) => {
        if (err) 
            console.error(err);
        else 
            console.log("It's " + temp + " celsius.");
    });
} catch(error) {
    console.log(error);
}