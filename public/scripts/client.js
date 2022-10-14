/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$('document').ready(function() {
      
  $('#form-error').hide();
  
  const createTweetElement = function(tweetObject) {
    const {user, content, created_at: dateCreated} = tweetObject;
    
    const $tweet = $('<article class="tweet">');
    
    const $header = $('<header>')
      .appendTo($tweet);
    
    
    const $user = $('<span class="user">')
      .appendTo($header);
    
    const $userImage = $('<img>')
      .attr('src', user.avatars)
      .appendTo($user);
    
    
    const $userName = $(`<span>`)
      .text(user.name)
      .appendTo($user);
    
    const $handle = $('<span class="account-name">')
      .text(user.handle)
      .appendTo($header);
      
    const $tweetMain = $('<span class="tweet-main">')
      .appendTo($tweet);
      
    const $body = $(`<span class="content">`)
      .text(content.text)
      .appendTo($tweetMain);


    const $footer = $('<footer>')
      .appendTo($tweetMain);

    const timePosted = timeago.format(dateCreated);

    const $postTime = $('<span class="post-time">')
      .text(timePosted)
      .appendTo($footer);

    const $reactions = $(`
    <span class="reactions">
      <i class="fa-solid fa-flag">
      <i class="fa-solid fa-flag "></i>
      <i class="fa-solid fa-arrows-rotate"></i>
      <i class="fa-solid fa-heart react"></i>
    </span>
      `)
      .appendTo($footer);
    
    return $tweet;
    
  };

  const renderTweets = function(tweets) {
    tweets.forEach(element => $('#main-container').prepend(createTweetElement(element)));
  };

  const form = $('section.new-tweet').children('form');

  form.submit(function(event) {

    event.preventDefault();
    const inputBox = $(this).children('#tweet-tweet')[0];
    const counter = $(this).children('.footer').children('.counter');
    $('#form-error').slideUp(() => {
      try {
        postText(this, inputBox, counter);
      } catch (error) {
        renderError(error.message);
      }
    });
  });

  const renderError = function(error) {
    $('#form-error').text(error);
    $('#form-error').slideDown();
    return;
  };

  const postText = function(form, inputBox, counter) {
    const { textLength } = inputBox;

    if (textLength === 0) throw new Error("There is no message to post");
    if (textLength > 140) throw new Error("Content is too long");

    const query = $(form).serialize();
    
    $.ajax('/tweets/', { method: 'POST', data: query})
      .then(function() {
        inputBox.value = "";
        counter.text("140");
        return $.ajax('/tweets/', { method: 'GET'});
      })
      .then(function(tweets) {
        renderTweets(tweets.slice(-1));
        
      });

  };

  const loadTweets = function() {
    $.ajax('/tweets/', { method: 'GET'})
      .then(tweets => {
        renderTweets(tweets);
      })
      .catch(error => console.log(error));
  };

  loadTweets();

});


