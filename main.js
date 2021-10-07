'use strict';

let game = {
  words: [
    'red',
    'blue',
    'yellow',
    'green',
  ],
  currentWord: '',
  matchedIndex: 0,
  startTime: null,
  isPlaying: false,
  mainArea: document.getElementById('main'),
  resultArea: document.getElementById('result'),
  start: function() {
    game.isPlaying = true;
    game.startTime = Date.now();
    game.setWord();
  },
  setWord: function() {
    game.currentWord = game.words.shift() || '';
    game.matchedIndex = 0;
    game.displayWord();
  },
  isFinished: function() {
    return game.words.length === 0;
  },
  displayResult: function() {
    const currentTime = Date.now();
    const elapsedTime = formattedSeconds(currentTime - game.startTime);
    game.resultArea.innerHTML = `<p>${elapsedTime} 秒かかりました。</p><p><i class="material-icons">refresh</i>もう一度プレイする場合にはブラウザをリロードしてください。</p>`;
    game.isPlaying = false;
  },
  displayWord: function() {
    game.mainArea.innerText = '_'.repeat(game.matchedIndex) + game.currentWord.substring(game.matchedIndex);
  },
}

document.onclick = () => {
  if (game.isPlaying === false) {
    game.start();
  }
}

document.onkeydown = (e) => {
  if (e.key !== game.currentWord[game.matchedIndex]) {
    return;
  }

  game.matchedIndex++;
  game.displayWord();

  if (game.matchedIndex === game.currentWord.length) {
    if (game.isFinished()) {
      game.displayResult();
    }
    game.setWord();
  }
};

// utils
function formattedSeconds(ms) {
  return (ms / 1000).toFixed(2);
}