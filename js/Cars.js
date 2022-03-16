//Car API

///Car storage object.
const CarStorage = {
  carID: 0,
  carArray: [],
  AddCar: function(carYear, carBrand, carModel, carEngine){
    //Creates a new car object, add it to the Car Storage.
    const _car = new Car(this.carID, carYear, carBrand, carModel, carEngine);
    this.carArray.push(_car);
    //Updates the unquie identifier.
    this.carID += 1;
  },
  UpdateCar: function(carID, carYear, carBrand, carModel, carEngine){
    //Finds the cars index value using the car ID.
    let index = this.FindCar(carID);
    //Updates the details of this car object.
    this.carArray[index].year = carYear;
    this.carArray[index].brand = carBrand;
    this.carArray[index].model = carModel;
    this.carArray[index].engineType = carEngine;
  },
  DeleteCar: function(carID){
    //Finds the cars index value using the car ID.
    let index = this.FindCar(carID);
    //Deletes this car object and then removes it from the array.
    delete this.carArray[index];
    this.carArray.splice(index, 1);
  },
  FindCar: function(carID){
    //Goes through each item in the car storage array.
    for(let i = 0; i < this.carArray.length; i += 1){
      let _car = this.carArray[i];
      //Finds the index of the car with this ID.
      if( _car.ID == carID){
          return i;
      }
    }
  },
  //Finds Car Entries.
  SearchCars: function(carID,carYear,carBrand){
    let results = [];
    //Goes through each item in the car storage array.
    for(let i = 0; i < this.carArray.length; i += 1){
      let _car = this.carArray[i];
      //Searches for car objects that matches the ID, year, and brand searched.
      if( _car.ID == carID || carID == '' ){
        if( _car.year == carYear || carYear == '' ){
          if( _car.brand.toLowerCase() == carBrand.toLowerCase() || carBrand.toLowerCase() == '' ){
            results.push(this.carArray[i]);
          }
        }
      }
    }
    //Returns an array of the results that matched the search request.
    return results;
  },
  ImportCar: function(carID, carYear, carBrand, carModel, carEngine){
    //Creates a new car object, add it to the Car Storage.
    const _car = new Car(carID, carYear, carBrand, carModel, carEngine);
    this.carArray.push(_car);
  },
}
//Car Class
class Car{
    constructor(carID, carYear, carBrand, carModel, carEngine){
      this.ID = carID;
      this.year = carYear;
      this.brand = carBrand;
      this.model = carModel;
      this.engineType = carEngine;
    }
}





//Debugging !!!!!!Remove in Final Release!!!!!!!!!!
/*
//npm install prompt-sync
//const ps = require('prompt-sync');
const prompt = ps();

// String Formating Function
String.prototype.format = function () {
  // store arguments in an array
  var args = arguments;
  // use replace to iterate over the string
  // select the match and check if related argument is present
  // if yes, replace the match with the argument
  return this.replace(/{([0-9]+)}/g, function (match, index) {
    // check if the argument is present
    return typeof args[index] == 'undefined' ? match : args[index];
  });
};

//Setup up some data for the debug tool.
CarStorage.AddCar("2017","Honda","Jazz","Petrol");
CarStorage.AddCar("2004","Nissan","Maxima","Petrol");
CarStorage.AddCar("2011","Ford","Mondeo","Diesel");
CarStorage.AddCar("2013","Holden","Captiva","Diesel");
CarStorage.AddCar("2006","Honda","Odyssey","Petrol");
CarStorage.AddCar("2006","Porsche","Cayenne","Petrol");
CarStorage.AddCar("2018","Honda","Jazz","Petrol");

//Display this to the user when they load the program on Node.
console.log("Car API Debugging Tool: \nType \"help\" to see all the " +
  "commands, and type \"exit\" to close the program type.")
while (true){
  let input = prompt(">> ").toLowerCase();
  //User wants to see all the available commands.
  if(input == 'help'){
    console.log("\n\"add\" - adds a car entry.")
    console.log("\"update\" - updates a car entry.")
    console.log("\"delete\" - deletes a car entry.")
    console.log("\"search\" - searches for car entries.")
    console.log("\"exit\" - closes the program.\n")
  }
  //User wants to add a car entry.
  else if (input == 'add'){
    console.log("\nAdd a car by typing in the cars <year>, <brand>," +
    " <model>, <engine type>. \nFor example: \"2017, Honda, Jazz, Petrol\".")
    let inputAdd = prompt(">> ").replace(/\s+/g, '');
    let _result = inputAdd.split(",")
    //Has the user put in the required request?
    if(_result.length == 4){
      CarStorage.AddCar(_result[0],_result[1],_result[2],_result[3]);
      //Success message.
      console.log("This car has been added.\n")
    } else{
      //Error message.
      console.log("The input requires a <year>, <brand>, <model>," +
      " <engine type>.")
      console.log("make sure there are commas inbetween.\n")
    }
  }
  //User wants to update a car entry.
  else if (input == 'update'){
    console.log("\nType in the ID of the car you want to change."+
  "type in what you want to change <ID>, <year>, <brand>, <model>," +
  "<engine type>.\nFor example: \"0, 2017, Honda, Jazz, Petrol\".")
    let inputAdd = prompt(">> ").replace(/\s+/g, '');
    let _result = inputAdd.split(",")
    //Has the user put in the required request?
    if(_result.length == 5){
      CarStorage.UpdateCar(_result[0],_result[1],_result[2],_result[3],_result[4]);
      //Success message.
      console.log("This car has been updated.\n")
    } else{
      //Error message.
      console.log("The input requires an <ID>, <year>, <brand>, <model>," +
      " <engine type>.")
      console.log("make sure there are commas inbetween.\n")
    }
  }
  //User wants to delete an entry.
  else if (input == 'delete'){
    console.log("\nType in the ID of the car you want to delete.")
    let inputID = prompt(">> ").replace(/\s+/g, '');
    //Is this not an existing car that is able to be deleted?
    if(CarStorage.FindCar(inputID) == undefined){
      //Error message
      console.log("car " + inputID + " cannot be found.\n")
    } else{
      //Success message.
      CarStorage.DeleteCar(inputID);
      console.log("car " + inputID + " has been removed.\n")
    }
  }
  //User wants to find cars.
  else if (input == 'search'){
    console.log("\nAdd in the cars <id>, <year>, <brand> " +
    "to search for. \nFor example: \"0, 2017, Honda\".")
    let inputAdd = prompt(">> ").replace(/\s+/g, '');
    let _result = inputAdd.split(",")
    let _searchResults = [];
    //Has the User put in the required request?
    if(_result.length == 3){
      _searchResults = CarStorage.SearchCars(_result[0],_result[1],_result[2]);
    } else{
      _searchResults = CarStorage.SearchCars('','','');
    }
    //Format and display the results to the user.
    for(let i = 0; i < _searchResults.length; i += 1){
      let _carID = _searchResults[i].ID;
      let _carYear = _searchResults[i].year;
      let _carBrand = _searchResults[i].brand;
      let _carModel = _searchResults[i].model;
      let _carEngine = _searchResults[i].engineType;
      let sentence = ("ID: {0}, Year: {1}, Brand: {2}," +
      " Model: {3}, Engine: {4}.").format(_carID, _carYear, _carBrand,
      _carModel, _carEngine)
      console.log(sentence)
    }
    //Add some space inbetween.
    console.log("")
  }
  //Exit the program.
  else if (input == 'exit'){
    return;
  }
}
*/

$(document).ready( function () {

  let row = ''
  let table = document.getElementById('carContent')

  $.ajax({
    url: 'xml/Cars.xml',
    dataType: 'xml',
    type: "GET",
    success: function(response){
      $(response).find("Car").each(function(){
        let _carID = $(this).find("ID").text();
        let _carYear = $(this).find("Year").text();
        let _carBrand = $(this).find("Brand").text();
        let _carModel = $(this).find("Model").text();
        let _carEngine = $(this).find("EngineType").text();

        CarStorage.ImportCar(_carID, _carYear, _carBrand, _carModel, _carEngine);
        row += createString(_carID,_carYear,_carBrand,_carModel,_carEngine)

      });
      table.innerHTML = row

      //Constructs the Table
      $('#example').DataTable({
        ordering: false,
        searching: false,
        lengthMenu: [[5,10,20],[5,10,20]]
      });
    },
    error: function(){

    }
  });

  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

  $('#myUpdateModal').on('shown.bs.modal2', function () {
    $('#myInput').trigger('focus')
  })
});

function createString(_carID, _carYear, _carBrand, _carModel, _carEngine){
  let row = "<tr data-bs-toggle=\"modal2\" data-bs-target=\"#myUpdateModal\">" +
            "<th scope=\"row\">" + _carID + "</th>" +
            "<td>" + _carYear + "</td>" +
            "<td>" + _carBrand + "</td>" +
            "<td>" + _carModel + "</td>" +
            "<td>" + _carEngine + "</td>" +
          "</tr>"
  return row
}
