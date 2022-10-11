$(document).ready(function() {
  $('section.new-tweet > form > textarea').on('input', function (event) {
    const { value, textLength } = this;
    const counter = $(this).parent().find('.counter').get(0); 
    const countValue = 140 - this.textLength;
    counter.innerHTML = countValue;
    console.log(countValue);
  });

});

// Test input
// This is a great commenting system. What do you think? Will it pass the great counter number test? Let us see in a few seconds. How