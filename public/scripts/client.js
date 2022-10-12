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

  
  const createTweetElement = function(tweetObject) {
    const {user, content, created_at: dateCreated} = tweetObject;

    const $tweet = $('<article>');
    
    const $header = $('<header>');
    
    
    const $user = $(`
    <span class="user">
    <img src=${user.avatars}>
    <span>
    ${user.name}
    </span>
    </span> 
    `)
    
    const $handle = $(`
    <span class="account-name">${user.handle}</span>
    `);

    $header.append([$user, $handle]);

    const $body = $(`
    <span class="content"> ${content.text} </span>
    `)


    const $footer = $('<footer>');

    const $postTime = $(`
    <span class="post-time">${dateCreated} milliseconds ago</span>
    `);

    const $reactionsTest=$(`
    <span class="reactions">
      <i class="fa-solid fa-flag react"></i>
      <i class="fa-solid fa-arrows-rotate react"></i>
      <i class="fa-solid fa-heart react"></i>      
    </span>
    `);

    const $reactions=$(`<span>`);

    $reactions.addClass('reactions');

    $reactions.append($('<i class="fa-solid fa-flag react"></i>'))
      .append($('<i class="fa-solid fa-arrows-rotate react"></i>'))
      .append($('<i class="fa-solid fa-heart react"></i>'));

    $footer.append([$postTime, $reactions]);

    const $tweetBottom = $('<span>');
    $tweetBottom.addClass('tweet-bottom');
    $tweetBottom.append([$body, $footer]);


    $tweet.addClass('tweet');
    $tweet.append([$header, $tweetBottom]);

    console.log($reactions.get(0));
    console.log($reactionsTest.get(0));
    
    
    return $tweet;
    
  };

  const $tweet = createTweetElement(tweetObject);

  
  console.log($tweet);

  $('#main-container').append($tweet);
})


