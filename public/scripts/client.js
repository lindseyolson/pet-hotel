$(document).ready(function() {
  console.log('JSJQ');
  getPets();
  $('#registerButton').on('click', registerButton);
});

//register button click function
var registerButton = function() {
  //create requestObject
  var requestObject = {
    firstName: $('#firstName').val(),
    lastName: $('#lastName').val()
  };
  //send requestObject
  $.ajax({
    type: 'POST',
    url: '/pets',
    data: requestObject,
    success: getPets
  });

}; //end registerButton

//get call for pets table
var getPets = function() {
  console.log('in getPets function');
  $.ajax({
    url: '/pets',
    type: 'GET',
    success: function(response) {
      populateTable(response);
    }
  });
}; //end get

//fills DOM with items from DB
function populateTable(arr) {
  $('table>#petRow').remove();
  //loop through array and append to DOM
  for (var i = 0; i < arr.length; i++) {
    //put in table
    var $tableRow = $('<tr id="petRow">');
    $tableRow.append('<td>' + arr[i].owner_first_name + ' ' + arr[i].owner_last_name + ' ' + '</td>');
    $tableRow.append('<td>' + arr[i].pet_name + '</td>');
    $tableRow.append('<td>' + arr[i].breed + '</td>');
    $tableRow.append('<td>' + arr[i].color + '</td>');
    $tableRow.append('<td> <button id="updateButton">Go</button></td>');
    $tableRow.append('<td> <button id="deleteButton">X</button></td>');
    $tableRow.append('<td> <button id="checkInOut">In</button></td>');
    $('table').append($tableRow);
    //add owner name to dropdown
    $('#ownerName').append('<option>' + arr[i].owner_first_name + ' ' + arr[i].owner_last_name + '</option>');
  } //end loop
} //end populateTable
