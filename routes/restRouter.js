const express = require("express");
const router = new express.Router();

router.post("/rest",(req,res)=>{
    const data = req.body
    if (data.Method === 'GET') {
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
          res.json(data)
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
            res.send(data)
          })
          .catch(error => {
            res.json(error);
          });
      }
  
})

module.exports=router