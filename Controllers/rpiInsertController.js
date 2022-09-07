// file specifically for esp32 inserts with get parameters
const RpiPoint = require("../Models/rpiPointModel");
const con = require("../Models/sqlModel");
const Authenticator = require("./authenticateController");
const fs = require("fs");


// function that handles requests from esp
const handleRpiPost = (req, res) => {
    // no data just respond OK
    if(parseInt(req.query.empty) == 1) {
        res.sendStatus(200);
        return;
    }
    
    
    // Authenticate name of sensor module and password
    Authenticator(req.query.name, req.query.password, (isAutheticated) => {
        
        // if authenticated
        if(isAutheticated) {
            // user is authenticated, do NOT delete the video, instead save filename to database
            // saving exptension as will, just in case we ever have to switch extensions
            RpiPoint.insertPoint(req.query.name, req.file.filename);
            
            // debug
            console.log(req.file);
            
            // Send OK
            res.sendStatus(200);
        
        } else {
            // Not authorized, we must delete the video
            fs.unlink(req.file.path, (err) => {
                if(err) console.log(err);
                else console.log("file removed");
            });
            // send not authorized http code
            res.sendStatus(403);
        }
    })
}

module.exports = handleRpiPost;