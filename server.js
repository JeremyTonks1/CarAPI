
const fs = require('fs');
const {parseString, Builder} = require('xml2js');

//Setup the Server
const path = require('path')
const express = require('express')
const app = express()
const port = 3000

//Home page.
app.get('', (request, response) => {
  response.sendFile(path.join(__dirname + '/index.html'));
});

//HTTP Request for XML data.
app.post('/add', (request, response) =>{
  fs.readFile('xml/Cars.xml',  function(err, xml){
    parseString(xml, function(err, data) {
      var _car = {
        ID: data.Info.IDCounter,
        Year: request.query.Year,
        Brand: request.query.Brand,
        Model: request.query.Model,
        EngineType: request.query.Engine,
      }

      data.Info.CarStorage[0].Car.push(_car)
      data.Info.IDCounter = parseInt(data.Info.IDCounter) + 1

      //Convert the JS Object to XML
      const builder = new Builder();
      const _xml = builder.buildObject(data);
      fs.writeFile('xml/Cars.xml', _xml, function (err, file){
        if(err) throw err;
      })
    })
  })
})

//HTTP Request for XML data.
app.post('/update', (request, response) =>{
  fs.readFile('xml/Cars.xml',  function(err, xml){
    parseString(xml, function(err, data) {

      //Convert each Car into a Table Row.
      for(let i = 0; i < data.Info.CarStorage[0].Car.length; i ++){
        //Searching
        if(data.Info.CarStorage[0].Car[i].ID == request.query.ID){

          data.Info.CarStorage[0].Car[i].Year = request.query.Year
          data.Info.CarStorage[0].Car[i].Brand = request.query.Brand
          data.Info.CarStorage[0].Car[i].Model = request.query.Model
          data.Info.CarStorage[0].Car[i].EngineType = request.query.Engine

          //Convert the JS Object to XML
          const builder = new Builder();
          const _xml = builder.buildObject(data);
          fs.writeFile('xml/Cars.xml', _xml, function (err, file){
            if(err) throw err;
          })

        }
      }
    })
  })
})

//HTTP Request for XML data.
app.post('/delete', (request, response) =>{
  fs.readFile('xml/Cars.xml',  function(err, xml){

    parseString(xml, function(err, data) {
      //Convert each Car into a Table Row.
      for(let i = 0; i < data.Info.CarStorage[0].Car.length; i ++){
        //Searching
        if(data.Info.CarStorage[0].Car[i].ID == request.query.ID){
          data.Info.CarStorage[0].Car.splice(i, 1)

          //Convert the JS Object to XML
          const builder = new Builder();
          const _xml = builder.buildObject(data);
          fs.writeFile('xml/Cars.xml', _xml, function (err, file){
            if(err) throw err;
          })
        }
      }
    })
  })
})

//HTTP Request for XML data.
app.get('/data', (request, response) =>{
  let row = [];

  fs.readFile('xml/Cars.xml',  function(err, _xml){
    parseString(_xml, function(err, data) {
      //Convert each Car into a Table Row.
      for(let i = 0; i < data.Info.CarStorage[0].Car.length; i ++){
        let _carID = data.Info.CarStorage[0].Car[i].ID[0]
        let _carYear = data.Info.CarStorage[0].Car[i].Year[0]
        let _carBrand = data.Info.CarStorage[0].Car[i].Brand[0]
        let _carModel = data.Info.CarStorage[0].Car[i].Model[0]
        let _carEngine = data.Info.CarStorage[0].Car[i].EngineType[0]
        //Searching
        if(_carID == request.query.ID || '' == request.query.ID){
          let _car = [_carID, _carYear, _carBrand, _carModel, _carEngine]
          row.push(_car)
        }
      }
      //Return HTML
      response.send(row);
    })
  })

});

//Server Directories.
app.use(express.static('Cars'))
app.use('/css',express.static(__dirname + '/css'))
app.use('/js',express.static(__dirname + '/js'))
app.use('/xml',express.static(__dirname + '/xml'))

//Server Listener.
app.listen(port, () => console.info('listening on port ' + port))
