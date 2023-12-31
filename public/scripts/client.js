$(document).ready(function() {

  //Hide the error message
  $('.tweetError').hide();

  //On button submit
  const onsubmit = function(event) {
    event.preventDefault();
    //Variables
    const form = $(this);
    const textArea = $(form).find("textarea");
    const data = form.serialize();
    let dataLength = (textArea.val().length);
    let errorMsg = "";
    let errorDiv = $('.tweetError');
    //Error Logic
    if (data !== "text=" && dataLength <= 140) {
      $.ajax({ url: '/tweets', method: 'POST', data: data })
        .then(()=> {
          loadTweets();
          textArea.val(""); //Reset text area
          $(form).find('.counter').text('140'); // Reset character counter
        });
    } else if (dataLength >= 141) {
      errorMsg = "Too many characters. Limit is 140";
    } else if (dataLength === 0) {
      errorMsg = "Please input a Tweet.";
    }

    if (errorMsg) {
      errorDiv.text(errorMsg);
      errorDiv.slideDown();
    } else {
      errorDiv.hide();
    }
  };

  //Escape the content of the tweet
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Get tweets from the server
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: "GET",
      success: function(res) {
        renderTweets(res);
      }
    }
    );
  };
  
  //Loop through each tweet so it can be loaded to the server
  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (let tweet of tweets) {
      let renderTweet = createTweetElement(tweet);
      $('#tweets-container').prepend(renderTweet);
    }
  };

  //add an event listener for the form
  $('#tweeter-form').on('submit', onsubmit);

  //Format for the new tweet
  const createTweetElement = function(tweet) {
    const newTweet =
    `
    <article class="tweet">
      <div class="tweetHeader">
        <div class="tweetAvatarName">
          <img src="${tweet.user.avatars}" width="40" height="40"></i>
          <p>&nbsp&nbsp ${tweet.user.name}</p>
        </div>  
        <p>${tweet.user.handle}</p>
      </div>
      <section class="tweetText">
        <p>${escape(tweet.content.text)}</p>
      </section>
      <footer class="tweetFooter">
        <p class="dateText">${timeago.format(tweet.created_at)}</p>
          <div>
            <i class="tweetIcon fa-solid fa-flag">&nbsp&nbsp</i>
            <i class="tweetIcon fa-solid fa-retweet">&nbsp&nbsp</i>
            <i class="tweetIcon fa-solid fa-heart">&nbsp&nbsp</i>      
          </div>
      </footer>
    </article>
    `;
    return $(newTweet);
  };

  loadTweets();
}
);
