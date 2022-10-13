/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



const arrayOfTweets = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1665410186959
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1665496586959
  }
];
const tweetObject = arrayOfTweets[0];
const tweetObjectTest = {
  "user": {
    "name": "Rhoda Jacobs",
    "avatars": "./images/profile-hex.png",
    "handle": "@MrsJacobs"
  },
  "content": {
    "text": "Hello World!"
  },
  "created_at": 1665410186959
};


const tweetLayout = `
<article class="tweet">
<header>
<span class="user">
<img src="./images/profile-hex.png">
<span>
      Rhoda Jacobs
    </span> 
    </span>
    
    <span class="account-name">@MrsJacobs</span>
    </header>
    <span class="tweet-bottom">
    <span class="content">Hello World! </span>
    <footer>
    <span class="post-time">10 days ago</span>
    <span class="reactions">
    <i class="fa-solid fa-flag react"></i>
    <i class="fa-solid fa-arrows-rotate react"></i>
    <i class="fa-solid fa-heart react"></i>      
    </span>
    </footer>
    </span>  
    
    </article>
    `
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
    const textLength = inputBox.textLength
    if (textLength === 0) {
      $('#form-error').text("There is no message to post");
      $('#form-error').slideDown();
      return;
    }

    if (textLength > 140) {
      $('#form-error').text("Content is too long");
      $('#form-error').slideDown();
      return;
    }
    $('#form-error').slideUp(); 
    const query = $( this ).serialize();
    
    $.ajax('/tweets/', { method: 'POST', data: query})
      .then(function (data, error) {
        console.log(data);
        inputBox.value = "";
        return $.ajax('/tweets/', { method: 'GET'});
      })
      .then (function (tweets) {
        renderTweets(tweets.slice(-1));
      });
     

  });

  const loadTweets = function() {
    $.ajax('/tweets/', { method: 'GET'})
    .then(tweets => {
      renderTweets(tweets);
    })
    .catch(error => console.log(error));
  }

  loadTweets();

});


