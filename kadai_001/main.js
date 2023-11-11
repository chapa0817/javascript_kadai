 // 変数の初期化
 let untyped = '';
 let typed = '';
 let score = 0;

 // 必要なHTML要素の取得
 const untypedfield = document.getElementById('untyped'); 
 const typedfield = document.getElementById('typed');
 const wrap = document.getElementById('wrap');
 const start = document.getElementById('start');
 const count = document.getElementById('count');
 const scorefield = document.getElementById('scorefield');

 // 複数のテキストを格納する配列
  const textLists = [
    'The best revenge is massive success.',
    'The harder you work, the luckier you get.',
    'Life is really simple, but we insist on making it complicated.',
    'Do what you can, with what you have, where you are.',
    'It does not matter how slowly you go as long as you do not stop.',
    'The secret to getting ahead is getting started.',
    'Success usually comes to those who are too busy to be looking for it.',
    'Your life does not get better by chance, it gets better by change.',
    'Strive not to be a success, but rather to be of value.',
    'There are no shortcuts to any place worth going.',
    'The best revenge is massive success.',
    'Dream big and dare to fail.',
    'Every strike brings me closer to the next home run.',
    'The only limit to our realization of tomorrow will be our doubts of today.',
    'Life is either a daring adventure or nothing at all.',
    'The path to success is to take massive, determined actions.',
    'I find that the harder I work, the more luck I seem to have.',
    'Failure is simply the opportunity to begin again, this time more intelligently.',
    'Genius is 1% inspiration and 99% perspiration.',
    'The future belongs to those who believe in the beauty of their dreams.',
    'The only place where success comes before work is in the dictionary.',
    'The secret of success is to know something nobody else knows.',
    'The way to get started is to quit talking and begin doing.',
    'Success is not the key to happiness. Happiness is the key to success.',
    'If you want to achieve greatness, stop asking for permission.',
    'The only limit to our realization of tomorrow will be our doubts of today.',
    'I find that the harder I work, the more luck I seem to have.',
    'Strive not to be a success, but rather to be of value.',
    'The only way to do great work is to love what you do.',
    'It does not matter how slowly you go as long as you do not stop.',
    'Your life does not get better by chance, it gets better by change.',
    'A journey of a thousand miles begins with a single step.',
    'The best way to predict the future is to create it.',
    'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    'Life is 10% what happens to us and 90% how we react to it.',
    'The only way to do great work is to love what you do.',
    'In the middle of every difficulty lies opportunity.',
    'The journey of a thousand miles begins with a single step.',
    
  ];
 
 // ランダムなテキストを表示
 const createText = () => {

     // 正タイプした文字列をクリア
     typed = '';
     typedfield.textContent = typed;

  // 配列のインデックス数からランダムな数値を生成する
  let random = Math.floor(Math.random() * textLists.length);
    // 配列からランダムにテキストを取得し画面に表示する
    untyped = textLists[random];
  untypedfield.textContent = untyped;
};

 // キー入力の判定
 const keyPress = e => {

   // 誤タイプの場合
   if(e.key !== untyped.substring(0, 1)) {
    wrap.classList.add('mistyped');
         // 100ms後に背景色を元に戻す
         setTimeout(() => {
          wrap.classList.remove('mistyped');
        }, 100);
    return;
  }

  // 正タイプの場合
  // スコアのインクリメント
  score++;
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;
  scorefield.textContent = score;
  
  // テキストがなくなったら新しいテキストを表示
  if(untyped === '') {
    createText();
  }
};

// タイピングスキルのランクを判定
 const rankCheck = score => {
 
  // テキストを格納する変数を作る
  let text = '';
  
  // スコアに応じて異なるメッセージを変数textに格納する
  if(score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
  } else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
  } else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;    
  }
 
  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
 };


// ゲームを終了
const gameOver = id => {
  clearInterval(id);

  const result = confirm(rankCheck(score));

  // OKボタンをクリックされたらリロードする
  if(result == true) {
    window.location.reload();
  }
};

// カウントダウンタイマー
const timer = () => {

  // タイマー部分のHTML要素（p要素）を取得する
  let time = count.textContent;

  const id = setInterval(() => {

    // カウントダウンする
    time--;
    count.textContent = time;

    // カウントが0になったらタイマーを停止する
    if(time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {

  // カウントダウンタイマーを開始する
  timer();

  // ランダムなテキストを表示する
  createText();

  // 「スタート」ボタンを非表示にする
  start.style.display = 'none';

  // キーボードのイベント処理
  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';