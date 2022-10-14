/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$('document').ready(function() {
      
      $('#form-error').hide()
      
      const createTweetElement = function(tweetObject) {
        const {user, content, created_at: dateCreated} = tweetObject;
        
        const $tweet = $('<article class="tweet">');
        
        const $header = $('<header>');
        
        
        const $user = $('<span class="user">');
        
        console.log('user', user);
        
        const $userImage = $('<img>')
        .attr('src', user.avatars);
        
        
        const $userName = $(`<span>`)
        .text(user.name);
        
        $user.append($userImage)
        .append($userName);
        
        
        const $handle = $('<span class="account-name">')
        .text(user.handle);
        
        
        $header.append([$user, $handle]);
        
        const $body = $(`<span class="content">`)
        .text(content.text);


    const $footer = $('<footer>');

   const timePosted = timeago.format(dateCreated);

    const $postTime = $('<span class="post-time">')
      .text(timePosted);

    const $reactions=$(`
    <span class="reactions">
      <i class="fa-solid fa-flag react>
      <i class="fa-solid fa-flag react"></i>
      <i class="fa-solid fa-arrows-rotate react"></i>
      <i class="fa-solid fa-heart react"></i>
    </span>
      `);
    $footer.append([$postTime, $reactions]);

    const $tweetBottom = $('<span class="tweet-bottom">')
      .append([$body, $footer]);


    $tweet.append([$header, $tweetBottom]);
    
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
    console.log(counter);
    $('#form-error').slideUp(() => {
      try{
        postText(this, inputBox, counter); 
      } catch (error) {
        renderError(error.message);
      }
    });
  });

  const renderError = function (error) {
    $('#form-error').text(error);
      $('#form-error').slideDown();
      return;
  };

  const postText = function(form, inputBox, counter) {
    const { textLength } = inputBox

    if (textLength === 0) throw new Error("There is no message to post");
    if (textLength > 140) throw new Error("Content is too long");

    const query = $( form ).serialize();
    
    $.ajax('/tweets/', { method: 'POST', data: query})
      .then(function (data, error) {
        inputBox.value = "";
        counter.text("140");
        return $.ajax('/tweets/', { method: 'GET'});
      })
      .then (function (tweets) {
        renderTweets(tweets.slice(-1));
        
      });

  }

  const loadTweets = function() {
    $.ajax('/tweets/', { method: 'GET'})
    .then(tweets => {
      renderTweets(tweets);
    })
    .catch(error => console.log(error));
  }

  loadTweets();

});


