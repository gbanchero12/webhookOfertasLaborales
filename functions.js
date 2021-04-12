
const sender = require('./axios/sender');

function mapDataFromRequest(req){
  if (req.body !== undefined && Array.isArray(req.body.queryResult.outputContexts)) {
    let firstContext = req.body.queryResult.outputContexts[0].name + "";
    firstContext = firstContext.split("/");
    const TEXT = req.body.queryResult.queryText;
    const ACTION = req.body.queryResult.action;
    const PARAMS = req.body.queryResult.parameters;
    const SESSION_ID = firstContext[4];
    const RESPONSE_ID = req.body.responseId;
    const PROYECT_ID = "cobra-lijklx"; // va en variables de enviroment
    return {firstContext,SESSION_ID,RESPONSE_ID,ACTION,PARAMS,PROYECT_ID,TEXT};
}
else{
  console.error("Data not recived well, check the request.")
}
}

function basicResponse(text, context, sessionId, lifespanCount = 1, proyectId = "cobra-lijklx") {
  let respuesta = {
    "fulfillmentText": text,
    "outputContexts": [
      {
        "name": `projects/${proyectId}/agent/sessions/${sessionId}/contexts/${context}`,
        "lifespanCount": lifespanCount
      }]
  }
  return respuesta;
}
/*
*Respuesa para generar formulario con 1 fecha
*/
function datePikerResponse(text, context, sessionId, lifespanCount = 1, proyectId = "cobra-lijklx") {
  return {

    "outputContexts": [
      {
        "name": `projects/${proyectId}/agent/sessions/${sessionId}/contexts/${context}`,
        "lifespanCount": lifespanCount
      }],
    "fulfillmentMessages": [
      {
        "payload": {
          "platform": "kommunicate",
          "message": text,
          "metadata": {
            "payload": [
              {
                "type": "date",
                "data": {
                  "label": "Fecha de nacimiento:",
                  "name": "fechaNacimiento",
                  "validation": { "errorText": "Field is mandatory" }
                }
              },              
              {
                "data": {
                  "action": {
                    "type": "submit",
                    "label": "Enviar",
                    "formAction": "https://abastible-chatbot.herokuapp.com/postData",
                    "requestType": "postBackToBotPlatform"
                  },
                  "name": "Enviar",
                  "type": "submit"
                },
                "type": "submit"
              }
            ],
            "contentType": "300",
            "templateId": "12"
          }
        }
      }
    ],

  }
}


/*
*Respuesa para generar formulario para modificación de cuenta
*/
function formResponse(text, context, sessionId, lifespanCount = 1, proyectId = "cobra-lijklx") {
  return {
    "outputContexts": [
      {
        "name": `projects/${proyectId}/agent/sessions/${sessionId}/contexts/${context}`,
        "lifespanCount": lifespanCount
      }],
    "fulfillmentMessages": [
      {
        "payload": {
          "platform": "kommunicate",
          "message": text,
          "metadata": {
            "payload": [
              {
                "type": "text",
                "data": {
                  "label": "Nombre",
                  "name": "nombre",                 
                  "validation": { "regex": "[A-Za-z0-9]",
                  "errorText": "Campo obligatorio"}
                }
              },
              {
                "type": "text",
                "data": {
                  "label": "Apellido",
                  "name": "apellido",                  
                  "validation": { "regex": "[A-Za-z0-9]",
                  "errorText": "Campo obligatorio"}
                }
              },
              {
                "type": "text",
                "data": {
                  "label": "Email",
                  "placeholder": "Ingrese su email",
                  "validation": {
                  "regex": "^(([^<>()\\[\\]\\.;:\\s@\"]+(\\.[^<>()[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$",
                  "errorText": "Verifique su correo"
                }
                }
              },
              {
                "data": {
                  "action": {
                    "type": "submit",
                    "label": "Enviar",
                    "formAction": "https://abastible-chatbot.herokuapp.com/postData",
                    "requestType": "postBackToBotPlatform"
                  },
                  "name": "Enviar",
                  "type": "submit"
                },
                "type": "submit"
              }
            ],
            "contentType": "300",
            "templateId": "12"
          }
        }
      }
    ],

  }
}


/*
*Respuesa para generar formulario para modificación de cuenta
*/
function formResponseHidden(text, context, sessionId, lifespanCount = 1, proyectId = "cobra-lijklx", nombre, apellido) {
  return {
    "outputContexts": [
      {
        "name": `projects/${proyectId}/agent/sessions/${sessionId}/contexts/${context}`,
        "lifespanCount": lifespanCount
      }],
    "fulfillmentMessages": [
      {
        "payload": {
          "platform": "kommunicate",
          "message": text,
          "metadata": {
            "payload": [
              {
                "type": "hidden",
                "data": {
                  "name": "Nombre",
                  "value": nombre
                }
              },
              {
                "type": "hidden",
                "data": {
                  "name": "Apellido",
                  "value": apellido
                }
              },
              {
                "type": "text",
                "data": {
                  "label": "Email",
                  "placeholder": "Ingrese su email",
                  "validation": {
                  "regex": "^(([^<>()\\[\\]\\.;:\\s@\"]+(\\.[^<>()[\\]\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$",
                  "errorText": "Verifique su correo"
                }
                }
              },
              {
                "data": {
                  "action": {
                    "type": "submit",
                    "label": "Enviar",
                    "formAction": "https://abastible-chatbot.herokuapp.com/postData",
                    "requestType": "postBackToBotPlatform"
                  },
                  "name": "Enviar",
                  "type": "submit"
                },
                "type": "submit"
              }
            ],
            "contentType": "300",
            "templateId": "12"
          }
        }
      }
    ],

  }
}

/*
SI NO
*/
function suggestionChipsResponseYesNo(text, context, sessionId, lifespanCount = 1, proyectId = "cobra-lijklx") {
  return {"outputContexts": [
    {
      "name": `projects/${proyectId}/agent/sessions/${sessionId}/contexts/${context}`,
      "lifespanCount": lifespanCount
    }],
  "fulfillmentMessages": [
    {
      "payload": {
        "message": text,
        "platform": "kommunicate",
        "metadata": {
          "contentType": "300",
          "templateId": "6",
          "payload": [{
            "title": "Si",
            "message": "Si"
          }]
        }
      }
    }
  ],
}
}


function suggestionChipsResponseAreas(text, context, sessionId, lifespanCount = 1, proyectId = "cobra-lijklx") {
  return {"outputContexts": [
    {
      "name": `projects/${proyectId}/agent/sessions/${sessionId}/contexts/${context}`,
      "lifespanCount": lifespanCount
    }],
  "fulfillmentMessages": [
    {
      "payload": {
        "message": text,
        "platform": "kommunicate",
        "metadata": {
          "contentType": "300",
          "templateId": "6",
          "payload": [{
            "title": "Ventas",
            "message": "Ventas"
          }, {
            "title": "Contabilidad",
            "message": "Contabilidad"
          }, {
            "title": "RRHH",
            "message": "RRHH"
          }, {
            "title": "Bodegas",
            "message": "Bodegas"
          }, {
            "title": "Compras",
            "message": "Compras"
          }]
        }
      }
    }
  ],
}
}

function suggestionChipsResponseCargosVentas(text, context, sessionId, lifespanCount = 1, proyectId = "cobra-lijklx") {
  return {"outputContexts": [
    {
      "name": `projects/${proyectId}/agent/sessions/${sessionId}/contexts/${context}`,
      "lifespanCount": lifespanCount
    }],
  "fulfillmentMessages": [
    {
      "payload": {
        "message": text,
        "platform": "kommunicate",
        "metadata": {
          "contentType": "300",
          "templateId": "6",
          "payload": [{
            "title": "Vendedor telefonico",
            "message": "Vendedor telefonico"
          }, {
            "title": "Vendedor online",
            "message": "Vendedor online"
          }, {
            "title": "Vendedor terreno",
            "message": "Vendedor terreno"
          }]
        }
      }
    }
  ],
}
}


/*
*Interección con API de MC
*/
function sendRemplazo(rut, sessionId) { return sender.sendRemplazo(rut,sessionId) }

function sendRemplazo2(rut, sessionId) { return sender.sendRemplazo2(rut,sessionId) }

function sendDate(fechaDesde, fechaHasta, sessionId) { return sender.sendDate(fechaDesde,fechaHasta,sessionId) }

function sendDesbloqueo(rut, sessionId) { return sender.sendDesbloqueo(rut,sessionId) }


module.exports = {
  basicResponse,
  datePikerResponse,
  mapDataFromRequest,
  sendRemplazo,
  sendRemplazo2,
  sendDate,
  sendDesbloqueo,
  formResponse,
  formResponseHidden,
  suggestionChipsResponseYesNo,
  suggestionChipsResponseAreas,
  suggestionChipsResponseCargosVentas
}

