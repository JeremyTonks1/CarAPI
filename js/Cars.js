//Car table
var table
//Car API
const CarAPI = {
  searchID: '',
  searchYear: '',
  searchBrand: '',
  selectedID: -1,
  AddCar: function(){
    //Is the user input valid.
    let valid = true;
    //Remove any existing error messages.
    $('.errorMessage').remove()
    //Validate user input.
    if( $("#addYear").val() === "" ||  $("#addYear").val() === null){
      $('#addYear').after('<p class="errorMessage">Year is required.</p>');
      valid = false;
    }
    if( $("#addBrand").val() === "" ||  $("#addBrand").val() === null){
      $('#addBrand').after('<p class="errorMessage">Brand is required.</p>');
      valid = false;
    }
    if( $("#addModel").val() === "" ||  $("#addModel").val() === null){
      $('#addModel').after('<p class="errorMessage">Model is required.</p>');
      valid = false;
    }
    if( $("#addEngine").val() === "" ||  $("#addEngine").val() === null){
      $('#addEngine').after('<p class="errorMessage">Engine is required.</p>');
      valid = false;
    }
    //If the input is valid send a POST request to the server.
    if(valid){
      //POST request.
      $.post("/Add?Year=" + $("#addYear").val() +
      "&Brand=" + $("#addBrand").val() +
      "&Model=" + $("#addModel").val() +
      "&Engine=" + $("#addEngine").val(),
      function(data, status){
          //Clear input values.
          $("#addYear").val('');
          $("#addBrand").val('');
          $("#addModel").val('');
          $("#addEngine").val('');
          //Hide the modal.
          $('#addModal').modal('hide');
          //Search for cars.
          CarAPI.SearchCars();
      });
    }
  },
  UpdateCar: function(){
    //Is the user input valid.
    let valid = true;
    //Remove any existing error messages.
    $('.errorMessage').remove()
    //Validate user input.
    if( $("#updateYear").val() === "" ||  $("#updateYear").val() === null){
      $('#updateYear').after('<p class="errorMessage">Year is required.</p>');
      valid = false;
    }
    if( $("#updateBrand").val() === "" ||  $("#updateBrand").val() === null){
      $('#updateBrand').after('<p class="errorMessage">Brand is required.</p>');
      valid = false;
    }
    if( $("#updateModel").val() === "" ||  $("#updateModel").val() === null){
      $('#updateModel').after('<p class="errorMessage">Model is required.</p>');
      valid = false;
    }
    if( $("#updateEngine").val() === "" ||  $("#updateEngine").val() === null){
      $('#updateEngine').after('<p class="errorMessage">Engine is required.</p>');
      valid = false;
    }
    //If the input is valid send a POST request to the server.
    if(valid){
      //POST request.
      $.post("/Update?ID=" + this.selectedID +
      "&Year=" + $("#updateYear").val() +
      "&Brand=" + $("#updateBrand").val() +
      "&Model=" + $("#updateModel").val() +
      "&Engine=" + $("#updateEngine").val(),
      function(data, status){
        //Hide the Modal
        $('#editModal').modal('hide');
        //Search for cars.
        CarAPI.SearchCars();
      });
    };
  },
  DeleteCar: function(carID){
    //POST request.
    $.post("/Delete?ID=" + this.selectedID,
    function(data, status){
      //Search for cars.
      CarAPI.SearchCars();
    });
  },
  SetSearch: function(){
    //Update what the user is searching for.
    this.searchID = $("#searchID").val()
    this.searchYear = $("#searchYear").val()
    this.searchBrand = $("#searchBrand").val()
    //Search for cars.
    CarAPI.SearchCars();
  },
  SearchCars: function(){
    $.get("/data?ID=" + this.searchID +
      '&Year=' + this.searchYear +
      '&Brand=' + this.searchBrand,
      function(data, status){
        //Clear table.
        table.clear().draw()
        //Add each car as a row.
        for(let i = 0; i < data.length; i ++){
          table.row.add(data[i])
        }
        //Draw Table.
        table.draw()
        //Each row opens the edit modal for each car.
        $('#carContent').on('click', 'tr', function() {
          //Remove any existing error messages.
          $('.errorMessage').remove()
          //Open the edit modal.
          $('#editModal').modal('show');
          //Display the details of the car in the selected row.
          $('#updateTitle').html('Car ' + table.row( this ).data()[0])
          $('#updateYear').val(table.row( this ).data()[1]);
          $('#updateBrand').val(table.row( this ).data()[2]);
          $('#updateModel').val(table.row( this ).data()[3]);
          $('#updateEngine').val(table.row( this ).data()[4]);
          //Update the selected row ID to the car ID.
          CarAPI.selectedID = table.row(this).data()[0];
        })
    //If the search fails draw an empty table.
    }).fail(function() {
      table.clear().draw()
    });
  }
}

function openAddModal(){
  //Remove any existing error messages.
  $('.errorMessage').remove()
  //Clear input values.
  $("#addYear").val('');
  $("#addBrand").val('');
  $("#addModel").val('');
  $("#addEngine").val('');
  //Open the add modal.
  $('#addModal').modal('show');
}

//When the page is running.
$(document).ready( function () {
  //Turn the car table into a DataTable.
  table = $('#example').DataTable({
    ordering: false,
    searching: false,
    lengthMenu: [[5,10,20],[5,10,20]]
  });
  //Search for cars.
  CarAPI.SearchCars()
});
