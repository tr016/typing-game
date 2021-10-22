# typing-game
[https://npo-clack.github.io/typing-game/](https://npo-clack.github.io/typing-game/)

# タイピングゲームを作る
英単語のタイピングゲームを作ります。
```
index.html
main.js
style.css
```

## HTML
タイピングゲームで単語を表示するを枠を作ります。
```html:index.html
<body>
  <div id="main">クリックでスタート。</div>
  <div id=result></div>

  <script src="main.js"></script>
</body>
```
この段階で`index.html`を開くと，「クリックでスタート。」と表示されるのみ。

## Javascript
### 準備
`game`オブジェクトを作ります。
```js
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
}
```

### ゲームスタート
`game`オブジェクトにタイピングゲームをスタートさせる関数を追加します。
```js:main.js
game = {
  ...
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
  displayWord: function() {
    game.mainArea.innerText = '_'.repeat(game.matchedIndex) + game.currentWord.substring(game.matchedIndex);
  },
}
```
また、画面クリック時に単語を表示するようにイベントハンドラーを設定します。
```js:main.js
document.onclick = () => {
  if (game.isPlaying === false) {
    game.start();
  }
}
```

### 文字を消す
タイピングが一致していた場合に1文字ずつ消していきます。
```js:main.js
document.onkeydown = (e) => {
  if (e.key !== game.currentWord[game.matchedIndex]) {
    return;
  }

  game.matchedIndex++;
  game.displayWord();
};
```

### 単語送り
1単語を全て消すと次の単語を表示するようにします。
```js:main.js
document.onkeydown = (e) => {
  ...
  if (game.matchedIndex === game.currentWord.length) {
    game.setWord();
  }
};
```

### ゲーム終了
全ての単語を消した後にかかった時間を表示します。
`game`オブジェクトに結果を表示する関数を追加します。
```js:main.js
let game = {
  ...
  isFinished: function() {
    return game.words.length === 0;
  },
  displayResult: function() {
    const currentTime = Date.now();
    const elapsedTime = formattedSeconds(currentTime - game.startTime);
    game.resultArea.innerText = `${elapsedTime} 秒かかりました。\n もう一度プレイする場合にはブラウザをリロードしてください。`;
    game.isPlaying = false;
  },
}

// utils
function formattedSeconds(ms) {
  return (ms / 1000).toFixed(2);
}
```
全単語を消した時に結果を表示します。
```js:main.js
document.onkeydown = (e) => {
...
  if (game.matchedIndex === game.currentWord.length) {
    if (game.isFinished()) {
      game.displayResult();
    }
    game.setWord();
  }
};
```

## CSS
タイピングゲームの見た目を整えます。
フォントなどは自由に変えてください。
```css
body {
  text-align: center;
  padding: 50px;

  /* font */
  font-family: serif;
}

#main {
  font-size: 72px;
  letter-spacing: .1em;
}

#result {
  font-size: 36px;
}
```
