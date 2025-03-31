document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const counterDisplay = document.getElementById('counter');
    const minusBtn = document.getElementById('minus');
    const plusBtn = document.getElementById('plus');
    const heartBtn = document.getElementById('heart');
    const pauseBtn = document.getElementById('pause');
    const likesList = document.querySelector('.likes');
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentsList = document.querySelector('.comments');
  
    // State
    let counter = 0;
    let timer;
    let isPaused = false;
    const likes = {};
  
    // Initialize timer
    startTimer();
  
    // Event Listeners
    minusBtn.addEventListener('click', decrementCounter);
    plusBtn.addEventListener('click', incrementCounter);
    heartBtn.addEventListener('click', likeNumber);
    pauseBtn.addEventListener('click', togglePause);
    commentForm.addEventListener('submit', addComment);
  
    // Functions
    function startTimer() {
      timer = setInterval(() => {
        if (!isPaused) {
          counter++;
          counterDisplay.textContent = counter;
        }
      }, 1000);
    }
  
    function incrementCounter() {
      if (!isPaused) {
        counter++;
        counterDisplay.textContent = counter;
      }
    }
  
    function decrementCounter() {
      if (!isPaused) {
        counter--;
        counterDisplay.textContent = counter;
      }
    }
  
    function likeNumber() {
      if (isPaused) return;
  
      const currentNumber = counter;
      likes[currentNumber] = (likes[currentNumber] || 0) + 1;
  
      // Update or create like display
      const existingLike = document.querySelector(`[data-number="${currentNumber}"]`);
      if (existingLike) {
        existingLike.textContent = `${currentNumber} has ${likes[currentNumber]} likes`;
      } else {
        const newLike = document.createElement('li');
        newLike.dataset.number = currentNumber;
        newLike.textContent = `${currentNumber} has 1 like`;
        likesList.appendChild(newLike);
      }
    }
  
    function togglePause() {
      isPaused = !isPaused;
  
      if (isPaused) {
        clearInterval(timer);
        pauseBtn.textContent = 'resume';
        disableButtons(true);
      } else {
        startTimer();
        pauseBtn.textContent = 'pause';
        disableButtons(false);
      }
    }
  
    function disableButtons(disabled) {
      minusBtn.disabled = disabled;
      plusBtn.disabled = disabled;
      heartBtn.disabled = disabled;
    }
  
    function addComment(e) {
      e.preventDefault();
      const commentText = commentInput.value.trim();
      if (commentText) {
        const commentElement = document.createElement('p');
        commentElement.textContent = commentText;
        commentsList.appendChild(commentElement);
        commentInput.value = '';
      }
    }
  });