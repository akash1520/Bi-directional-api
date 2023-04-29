const express = require("express");
const router = new express.Router();
const bodyParser = require('body-parser');
const bodyParserXML = require('body-parser-xml');
const js2xmlparser = require('js2xmlparser');


// configure body-parser-xml middleware
bodyParserXML(bodyParser);

// configure body-parser middleware to handle JSON and urlencoded requests
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.xml());


function traverseObject(obj, path = "") {
  for (const key in obj) {
    const newPath = path ? `${path}.${key}` : key;
    const value = obj[key];

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      traverseObject(value, newPath);
    } else {
      return (value[0]);
    }
  }
}




router.post('/soap', (req, res) => {
  try {
    const agent = req.headers

    // console.log(agent)
    // Access the SOAP body
    const soapBody = req.body['soap:Envelope'];
    //   console.log(soapBody);
    const data = traverseObject(soapBody);

    if (data.Method[0] === 'GET') {
      fetch(data.Url, {
        method: data.Method,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const xmlData = js2xmlparser.parse('xmlData', data);
        res.send(xmlData)
      })
      .catch(error => {
        console.error(error);
      });
    }
    else {
      fetch(data.Url, {
        method: data.Method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: data.Data })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const xmlData = js2xmlparser.parse('xmlData', data);
          res.send(xmlData)
        })
        .catch(error => {
          res.json(error);
        });
    }



    // Traverse the SOAP body and log the data for each tag

  } catch (error) {
    console.error(error);
    res.status(400).send('Invalid SOAP request');
  }
});

module.exports = router;

