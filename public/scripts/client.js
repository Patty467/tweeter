$(document).ready(function() {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: "GET",
      success: function(res) {
        renderTweets(res);
      }
    }
    )
  }
  
  const renderTweets = function(tweets) {
    $('#tweets-container').empty()
    for (let tweet of tweets) {
     let renderTweet = createTweetElement(tweet) 
     $('#tweets-container').prepend(renderTweet)
    }
  };

  const createTweetElement = function (tweet) {
    const newTweet = 
    `
    <article class="tweet">
      <div class="tweetHeader">
        <div style="align-items: center;" >
          <i "${tweet.user.avatars}"></i>
          <p>&nbsp&nbsp ${tweet.user.name}</p>
        </div>  
        <p>${tweet.user.handle}</p>
      </div>
      <form class="tweetText">
        <p>${escape(tweet.content.text)}</p>
      </form>
      <footer class="tweetFooter">
        <p id="dateText">${timeago.format(tweet.created_at)}</p>
          <div>
            <i id="tweetIcon" class="fa-solid fa-flag">&nbsp&nbsp</i>
            <i id="tweetIcon" class="fa-solid fa-retweet">&nbsp&nbsp</i>
            <i id="tweetIcon" class="fa-solid fa-heart">&nbsp&nbsp</i>      
          </div>
      </footer>
    </article>
    `
      return $(newTweet)
}

loadTweets();
}
)