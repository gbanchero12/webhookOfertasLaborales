//https://docs.google.com/spreadsheets/d/1NmS-f5ujEJg7uCrbhlRd59gyoPobd1ipa_ARqzzhnTA/edit?usp=sharing
const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const functions = require('./functions');
const googleSheets = require('./googleSheets/index');

server.use(bodyParser.json());

googleSheets.readEntitiesFromGoogleSheets();
googleSheets.readResponsesFromGoogleSheets();

server.get("/updateRows", async (req, res) => {
    //googleSheets.readEntitiesFromGoogleSheets();
    //googleSheets.readResponsesFromGoogleSheets();
    res.send("Ok"); //evitar multiples request
});

server.post("/", async (req, res) => {

googleSheets.readEntitiesFromGoogleSheets();
googleSheets.readResponsesFromGoogleSheets();
    
await processResponse(req, res);
    
    
    
    
});




!process.env.LOCAL ? server.listen(8000) : server.listen(8000);





const processResponse = async (req, res) => {
    
    const request = functions.mapDataFromRequest(req);
    const SESSION_ID = request.SESSION_ID;
    const RESPONSE_ID = request.RESPONSE_ID;
    const PROYECT_ID = request.PROYECT_ID;
    const ACTION = request.ACTION;
    const PARAMETERS = request.PARAMS;

    const entities_rows = googleSheets.getEntities();
    const text_rows = googleSheets.getResponses();
    

    let respuesta;
    try {
        
        
    /**
     * Chatbot Ofertas Laborales 1.0 
     * @param entities_rows[x][y]; "x" -> flujo "y"-> entidad
     * 
     */

        if (ACTION === "input.welcome") {
            const index = 0;
            let entity = entities_rows[0][index];
            let textResponse = text_rows[0][index];
            respuesta = functions.basicResponse(textResponse.replace(/\n/g,' '),"DWI-followup", SESSION_ID, 1);
            return res.status(200).json(respuesta);
        }

        if (ACTION === "DWI.1") {
            const index = 1;
            let entity = entities_rows[0][index];
            let textResponse = text_rows[0][index];
            respuesta = functions.basicResponse(textResponse,"DWI-1-followup", SESSION_ID, 1);
            return res.status(200).json(respuesta);
        }

        if (ACTION === "DWI.2") {
            const index = 2;
            let entity = entities_rows[0][index];
            let textResponse = text_rows[0][index];
            respuesta = functions.basicResponse(textResponse,"DWI-1-2-followup",SESSION_ID, 1);
            return res.status(200).json(respuesta);
        }

        if (ACTION === "DWI.3") {
            const index = 3;
            let entity = entities_rows[0][index];
            let textResponse = text_rows[0][index];
            respuesta = functions.basicResponse(textResponse,"DWI-1-2-3-followup",SESSION_ID, 1);
            return res.status(200).json(respuesta);
        }
        
        
    } catch (error) {
        console.log("Error:" + error);
    }
}