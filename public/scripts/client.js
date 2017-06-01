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
      console.log(response);
    }
  });
};
