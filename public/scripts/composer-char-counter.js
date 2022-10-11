$(document).ready(function() {
  const textBox = $('section.new-tweet > form > textarea');
  textBox.on('input', function (event) {
    const { value, textLength } = this;
    const counter = $(this).parent().find('.counter').get(0); 
    const newCount = 140 - textLength;
    counter.innerHTML = newCount;
    console.log(newCount);
  });

});

// Test input
// This is a great commenting system. What do you think? Will it pass the great counter number test? Let us see in a few seconds. How