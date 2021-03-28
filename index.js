//https://docs.google.com/spreadsheets/d/1NmS-f5ujEJg7uCrbhlRd59gyoPobd1ipa_ARqzzhnTA/edit?usp=sharing
const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const functions = require('./functions');
const googleSheets = require('./googleSheets/gs');
const cached = require('./cached');

server.use(bodyParser.json());

googleSheets.readEntitiesFromGoogleSheets();
googleSheets.readResponsesFromGoogleSheets();

server.get("/updateRows", async (req, res) => {
    googleSheets.readEntitiesFromGoogleSheets();
    googleSheets.readResponsesFromGoogleSheets();
    res.send("Ok"); //evitar multiples request
});

server.post("/", async (req, res) => {


    await processResponse(req, res);




});




process.env.LOCAL ? server.listen(process.env.PORT) : server.listen(8000);





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
         * @param text_rows[x][y]; "x" -> flujo "y"-> texto
         * 
         */


        if (ACTION === "input.welcome") {

            googleSheets.readEntitiesFromGoogleSheets();
            googleSheets.readResponsesFromGoogleSheets();
            orchestrateEntity(res, entities_rows, text_rows, SESSION_ID, 0, 0, "DWI-followup");
        }

        if (ACTION === "DWI.1") {
            const index = 1;                //caseArea()
            cached.hash[request.SESSION_ID] = [0,undefined]
            respuesta = orchestrateEntity(res, entities_rows, text_rows, SESSION_ID, index, 0, "DWI-1-followup");
            
        }

        if (ACTION === "DWI.2") { 
            let session = cached.hash[request.SESSION_ID];   //guardo el cargo:
            cached.hash[request.SESSION_ID] = [session[0],caseCargo(request.TEXT)];   
                   
            let cargoIndex = caseCargo(request.TEXT);
            const index = 2;
            respuesta = orchestrateEntity(res, entities_rows, text_rows, SESSION_ID, index, cargoIndex, "DWI-1-2-followup");
        }

        normalPath(res, entities_rows, text_rows, SESSION_ID, request);

        


    } catch (error) {
        console.log("Error:" + error);
    }
}

/**
     * Orchestrate the entity type response
     * @param entities_rows[x][y]; "x" -> flujo "y"-> entidad
     * @param text_rows[x][y]; "x" -> flujo "y"-> texto
     * 
     */
const orchestrateEntity = (res, entities_rows, text_rows, SESSION_ID, index, cargoIndex, context) => {
    
    let entity = entities_rows[cargoIndex][index];
    let textResponse = text_rows[cargoIndex][index];
    
    
    let respuesta;
    switch (entity) {
        case "AREA":
            respuesta = functions.suggestionChipsResponseAreas(textResponse.replace(/\n/g, ' '), context, SESSION_ID, 1);
            break;
        case "CARGO":
            respuesta = functions.suggestionChipsResponseCargosVentas(textResponse.replace(/\n/g, ' '), context, SESSION_ID, 1);
            break;
        case "SINO":
            respuesta = functions.suggestionChipsResponseYesNo(textResponse.replace(/\n/g, ' '), context, SESSION_ID, 1);
            break;
        case "Fecha_Nacimiento":
            respuesta = functions.datePikerResponse(textResponse.replace(/\n/g, ' '), context, SESSION_ID, 1);
            break;
        default:
            respuesta = functions.basicResponse(textResponse.replace(/\n/g, ' '), context, SESSION_ID, 1);

    }

    return res.status(200).json(respuesta);


}

function caseCargo(cargo) {
    switch (cargo) {
        case "Vendedor telefonico":
            return 0;
        case "Vendedor online":
            return 1;
        case "Vendedor terreno":
            return 2;
    }
}

const normalPath = (res, entities_rows, text_rows, SESSION_ID, request) => {

    let respuesta;

    if (request.ACTION === "DWI.3") {
        let session = cached.hash[request.SESSION_ID];
        let cargoIndex = session[1];
            console.log(session)
        const index = 3;
        respuesta = orchestrateEntity(res, entities_rows, text_rows, SESSION_ID, index, cargoIndex, "DWI-1-2-3-followup");
    }

    if (request.ACTION === "DWI.4") {
        let session = cached.hash[request.SESSION_ID];
        let cargoIndex = session[1];
        const index = 4;
        respuesta = orchestrateEntity(res, entities_rows, text_rows, SESSION_ID, index, cargoIndex, "DWI-1-2-3-4-followup");
    }

    if (request.ACTION === "DWI.5") {
        let session = cached.hash[request.SESSION_ID];
        let cargoIndex = session[1];
        const index = 5;
        respuesta = orchestrateEntity(res, entities_rows, text_rows, SESSION_ID, index, cargoIndex, "DWI-1-2-3-4-5-followup");
    }

    if (request.ACTION === "DWI.6") {
        let session = cached.hash[request.SESSION_ID];
        let cargoIndex = session[1];
        const index = 6;
        respuesta = orchestrateEntity(res, entities_rows, text_rows, SESSION_ID, index, cargoIndex, "DWI-1-2-3-4-5-6-followup");
    }

    if (request.ACTION === "DWI.7") {
        let session = cached.hash[request.SESSION_ID];
        let cargoIndex = session[1];
        const index = 7;
        respuesta = orchestrateEntity(res, entities_rows, text_rows, SESSION_ID, index, cargoIndex, "DWI-1-2-3-4-5-6-7-followup");
    }

    if (request.ACTION === "DWI.8") {
        let session = cached.hash[request.SESSION_ID];
        let cargoIndex = session[1];
        const index = 8;
        respuesta = orchestrateEntity(res, entities_rows, text_rows, SESSION_ID, index, cargoIndex, "DWI-1-2-3-4-5-6-7-8-followup");
    }

    if (request.ACTION === "DWI.9") {
        let session = cached.hash[request.SESSION_ID];
        let cargoIndex = session[1];
        const index = 9;
        respuesta = orchestrateEntity(res, entities_rows, text_rows, SESSION_ID, index, cargoIndex, "DWI-1-2-3-4-5-6-7-8-9-followup");
    }

    if (request.ACTION === "DWI.10") {
        let session = cached.hash[request.SESSION_ID];
        let cargoIndex = session[1];
        const index = 10;
        respuesta = functions.basicResponse("Su solicitud fue enviada", entities_rows, text_rows, SESSION_ID, index, cargoIndex, "DWI-1-2-3-4-5-6-7-8-9-10-followup");
    }

    return res.status(200).json(respuesta);
}


