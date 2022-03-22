//Node modules for reading/writing to the XML file.
const fs = require('fs');
const {parseString, Builder} = require('xml2js');
//Setup the Express Server.
const path = require('path')
const express = require('express')
const app = express()
const port = 3000
//Home page.
app.get('', (request, response) => {
  response.sendFile(path.join(__dirname + '/index.html'));
});
//POST request to add a car to the XML file.
app.post('/add', (request, response) =>{
  fs.readFile('xml/Cars.xml',  function(err, xml){
    //Convert the XML file to a JS object.
    parseString(xml, function(err, data) {
      //Initialise car object.
      var _car = {
        ID: data.Info.IDCounter,
        Year: request.query.Year,
        Brand: request.query.Brand,
        Model: request.query.Model,
        EngineType: request.query.Engine,
      }
      //Add new car object.
      data.Info.CarStorage[0].Car.push(_car)
      //Increment the unique number.
      data.Info.IDCounter = parseInt(data.Info.IDCounter) + 1
      //Convert the JS Object to the XML file.
      const builder = new Builder();
      const _xml = builder.buildObject(data);
      fs.writeFile('xml/Cars.xml', _xml, function (err, file){
        if(err) throw err;
      })
    })
  })
  //Confirm action.
  response.send()
})
//POST request to update a car on the XML file.
app.post('/update', (request, response) =>{
  fs.readFile('xml/Cars.xml',  function(err, xml){
    //Convert the XML file to a JS object.
    parseString(xml, function(err, data) {
      //Search for the car with the matching ID to update.
      for(let i = 0; i < data.Info.CarStorage[0].Car.length; i ++){
        if(data.Info.CarStorage[0].Car[i].ID == request.query.ID){
          //Update the cars details.
          data.Info.CarStorage[0].Car[i].Year = request.query.Year
          data.Info.CarStorage[0].Car[i].Brand = request.query.Brand
          data.Info.CarStorage[0].Car[i].Model = request.query.Model
          data.Info.CarStorage[0].Car[i].EngineType = request.query.Engine
          //Convert the JS Object to the XML file.
          const builder = new Builder();
          const _xml = builder.buildObject(data);
          fs.writeFile('xml/Cars.xml', _xml, function (err, file){
            if(err) throw err;
          })

        }
      }
    })
  })
  //Confirm action.
  response.send()
})
//POST request to delete a car from the XML file.
app.post('/delete', (request, response) =>{
  fs.readFile('xml/Cars.xml',  function(err, xml){
    //Convert the XML file to a JS object.
    parseString(xml, function(err, data) {
      //Convert each Car into a Table Row.
      for(let i = 0; i < data.Info.CarStorage[0].Car.length; i ++){
        //Search for the car with the matching ID to Delete..
        if(data.Info.CarStorage[0].Car[i].ID == request.query.ID){
          //Delete the car
          data.Info.CarStorage[0].Car.splice(i, 1)
          //Convert the JS Object to the XML file.
          const builder = new Builder();
          const _xml = builder.buildObject(data);
          fs.writeFile('xml/Cars.xml', _xml, function (err, file){
            if(err) throw err;
          })
        }
      }
    })
  })
  response.send()
})
//GET request to recieve all the matching cars from the XML file.
app.get('/data', (request, response) =>{
  fs.readFile('xml/Cars.xml',  function(err, _xml){
    //Convert the XML file to a JS object.
    parseString(_xml, function(err, data) {
      //Is the data readable.
      if(data != undefined){
          //Is the car array empty.
          if(data.Info.CarStorage[0].Car != undefined){
            let row = [];
            //Convert each Car into a Table Row.
            for(let i = 0; i < data.Info.CarStorage[0].Car.length; i ++){
              let _carID = data.Info.CarStorage[0].Car[i].ID[0]
              let _carYear = data.Info.CarStorage[0].Car[i].Year[0]
              let _carBrand = data.Info.CarStorage[0].Car[i].Brand[0]
              let _carModel = data.Info.CarStorage[0].Car[i].Model[0]
              let _carEngine = data.Info.CarStorage[0].Car[i].EngineType[0]
              //Searching
              if(_carID == request.query.ID || '' == request.query.ID){
                if(_carYear == request.query.Year || '' == request.query.Year){
                  if(_carBrand == request.query.Brand || '' == request.query.Brand){
                    let _car = [_carID, _carYear, _carBrand, _carModel, _carEngine]
                    row.push(_car)
                  }
                }
              }
            }
            //Return an array of rows to display to the user.
            response.send(row);
          }else{
          //Cars array is empty.
          response.status(400)
        }
      }else{
        //Cars is not avaible.
        response.status(400)
      }
    })
  })
});
//Server file directories.
app.use(express.static('Cars'))
app.use('/css',express.static(__dirname + '/css'))
app.use('/js',express.static(__dirname + '/js'))
app.use('/xml',express.static(__dirname + '/xml'))
//Server listener.
app.listen(port, () => console.info('listening on port ' + port))
