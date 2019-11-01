const textarea = document.getElementById("tweet");
const tweetList = document.getElementById('tweet-list');
const charCount = document.querySelector(".charCount");

eventListener();

function eventListener() {
     document.getElementById('form').addEventListener('submit',newTweet);
     tweetList.addEventListener('click',removeTweet);
     document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

function newTweet(e) {
     e.preventDefault();

     const tweet = document.getElementById('tweet').value;

     if (tweet.trim().length){
          const removeBtn = document.createElement('a');
          removeBtn.classList = 'remove-tweet';
          removeBtn.textContent = 'X';

          const li = document.createElement('li');
          li.textContent = tweet;

          li.appendChild(removeBtn);

          tweetList.appendChild(li);

          addTweetLocalStorage(tweet);
          counter();
          form.reset();
     }
}

function removeTweet(e) {
     if (e.target.classList.contains('remove-tweet')){
          e.target.parentElement.remove();
     }
}

function addTweetLocalStorage(tweet) {
     let tweets = getTweetsFromStorage();

     tweets.push(tweet);

     localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetsFromStorage() {
     let tweets;
     const tweetsLs = localStorage.getItem('tweets');

     if (tweetsLs === null){
          tweets = [];
     } else {
          tweets = JSON.parse(tweetsLs);
     }

     return tweets;
}

function localStorageOnLoad() {
     let tweets = getTweetsFromStorage();

     tweets.forEach(function (tweet) {
          const removeBtn = document.createElement('a');
          removeBtn.classList = 'remove-tweet';
          removeBtn.textContent = 'X';

          const li = document.createElement('li');
          li.textContent = tweet;

          li.appendChild(removeBtn);

          tweetList.appendChild(li);
     })
}

function counter() {
     var maxChar = 140;
     var limit = 0;

     charCount.innerHTML = maxChar;

     textarea.onkeyup = function () {
          var result = maxChar - textarea.value.length;

          if (result >= limit) {
               charCount.innerHTML = result;
          } else {
               return false;
          }
     }
}

counter();