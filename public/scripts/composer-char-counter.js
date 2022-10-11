$(document).ready(function() {
  $('section.new-tweet > form > textarea').on('input', function (event) {
    const { value, textLength } = this;
    console.log('value', value, 'textLength', textLength);
    const counter = $(this).parent().children('.footer').children('output').get(0); 
    const countValue = 140 - this.textLength;
    counter.innerHTML = countValue;
    console.log($(this));
  });

});

// Test input
// This is a great commenting system. What do you think? Will it pass the great counter number test? Let us see in a few seconds. How