var table

//Car API
const CarAPI = {
  selectedID: -1,
  AddCar: function(){
    $.post("/Add?Year=" + $("#addYear").val() +
    "&Brand=" + $("#addBrand").val() +
    "&Model=" + $("#addModel").val() +
    "&Engine=" + $("#addEngine").val());
  },
  UpdateCar: function(){
    //Finds the cars index value using the car ID.
    $.post("/Update?ID=" + this.selectedID +
    "&Year=" + $("#updateYear").val() +
    "&Brand=" + $("#updateBrand").val() +
    "&Model=" + $("#updateModel").val() +
    "&Engine=" + $("#updateEngine").val());
  },
  DeleteCar: function(carID){
    //Finds the cars index value using the car ID.
    $.post("/Delete?ID=" + this.selectedID);
    this.SearchCars('','','')
  },
  //Finds Car Entries.
  SearchCars: function(carID,carYear,carBrand){
    $.get("/data?ID=", function(data, status){
      //Draw Table
      table.clear().draw()
      for(let i = 0; i < data.length; i ++){
        table.row.add(data[i])
      }

      table.draw()
    });
  }
}

$(document).ready( function () {

  table = $('#example').DataTable({
    ordering: false,
    searching: false,
    lengthMenu: [[5,10,20],[5,10,20]]
  });

  //Each Row Function
  $('#carContent').on('click', 'tr', function() {
    $('#myModal2').modal('show');
    //$('#deleteButton').attr('onclick','CarAPI.DeleteCar(' +
    //  table.row( this ).data()[0]) +')');

    $('#updateTitle').html('Car ' + table.row( this ).data()[0])
    $('#updateYear').val(table.row( this ).data()[1]);
    $('#updateBrand').val(table.row( this ).data()[2]);
    $('#updateModel').val(table.row( this ).data()[3]);
    $('#updateEngine').val(table.row( this ).data()[4]);

    //This is being referenced from the button
    CarAPI.selectedID = table.row(this).data()[0];
  });

  CarAPI.SearchCars('','','')
});
