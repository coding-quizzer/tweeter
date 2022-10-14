$(document).ready(function() {
  const form = $('section.new-tweet').children('form');
  const textBox = form.children('textarea');
  textBox.on('input', function() {
    const { textLength } = this;
    const counter = $(this).parent().find('.counter').get(0);
    const newCount = 140 - textLength;
    counter.innerHTML = newCount;
    assignLengthClass(counter, isTooLong);
  });

});

const isTooLong = (count => count < 0);

const assignLengthClass = function(counter, callback) {
  const count = parseInt(counter.innerHTML);
  if (callback(count)) {
    $(counter).addClass('invalid-length');
    return;
  }

  $(counter).removeClass('invalid-length');
};