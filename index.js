//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser"

const app = express();
const port = 3000;

// 1.middleware for getting the body.
app.use(bodyParser.urlencoded({ extended: true }));

// 2.create middleware for authorisation
var isAuthorised = false;
function authenticate(req, res, next)
{
    var _password = req.body["password"];
    if (_password === "ILoveProgramming")
    {
        isAuthorised = true;
    }
    //once authorised, move on to next method
    next();
}

//use authorisation middleware
app.use(authenticate);


const _dirname = dirname(fileURLToPath(import.meta.url));
app.get("/", (req,res) => {
    res.sendFile(_dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
    if (isAuthorised) {
        res.sendFile(_dirname + "/public/secret.html");
    }
    else {
        res.sendFile(_dirname + "/public/index.html");
    }
});

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});