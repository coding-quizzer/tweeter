$(document).ready(function() {
  const form = $('section.new-tweet').children('form');
  const textBox = form.children('textarea');
  textBox.on('input', function (event) {
    const { value, textLength } = this;
    const counter = $(this).parent().find('.counter').get(0); 
    const newCount = 140 - textLength;
    counter.innerHTML = newCount;
    assignLengthClass(counter);
  });

});

const assignLengthClass = function(counter) {
  if( parseInt(counter.innerHTML) < 0) {
    $(counter).addClass('invalid-length');
    return;
  }

  $(counter).removeClass('invalid-length');
};