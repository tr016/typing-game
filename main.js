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
    game.currentWord = sample(game.words) || '';
    game.matchedIndex = 0;
    game.displayWord();
  },
  isFinished: function() {
    return game.words.length === 0;
  },
  displayResult: function() {
    const currentTime = Date.now();
    const elapsedTime = formattedSeconds(currentTime - game.startTime);
    game.resultArea.innerText = `${elapsedTime} 秒かかりました。\n もう一度プレイする場合にはブラウザをリロードしてください。`;
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
function sample(list) {
  return list.splice(Math.floor(Math.random() * list.length), 1)[0];
}

function formattedSeconds(ms) {
  return (ms / 1000).toFixed(2);
}
