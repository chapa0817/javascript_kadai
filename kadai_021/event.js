const btn = document.getElementById('btn');
 
btn.addEventListener ('click',() => {
    var bclick = document.getElementById('text');
  bclick.replace ('bclick', 'ボタンをクリックしました');
  })