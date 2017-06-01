$(document).ready(function() {
  console.log('JSJQ');
  getPets();
});

var getPets = function() {
  console.log('in getPets function');
  $.ajax({
    url: '/pets',
    type: 'GET',
    success: function(response) {
      populateTable(response);
    }
  });
};

function populateTable(arr) {
  $('table>#petRow').remove();
  //loop through array and append to DOM
  for (var i = 0; i < arr.length; i++) {
    //put on DOM
    var $tableRow = $('<tr id="petRow">');
    $tableRow.append('<td>' + arr[i].owner_first_name + ' ' + arr[i].owner_last_name + ' ' + '</td>');
    $tableRow.append('<td>' + arr[i].pet_name + '</td>');
    $tableRow.append('<td>' + arr[i].breed + '</td>');
    $tableRow.append('<td>' + arr[i].color + '</td>');
    $tableRow.append('<td> <button id="updateButton">Go</button></td>');
    $tableRow.append('<td> <button id="deleteButton">X</button></td>');
    $tableRow.append('<td> <button id="checkInOut">In</button></td>');
    $('table').append($tableRow);
  } //end loop
} //end populateTable
