const buildHTML = (XHR) => { //buildHTML関数定義（新規メモのHTML生成）
  const item = XHR.response.post; //この記述(.post)で値が取れるのは、postsコントローラーのcreateアクションのrender json: {post: post}の記述のpostと紐づいているから。
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post (){
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => { //submit フォームの投稿が実行されたときにイベント発火
    e.preventDefault(); //ブラウザからサーバにリクエストが送信されることを防ぐ（リクエストはJS経由のみにする）
    const formData = new FormData(form); //フォームの値を取得
    const XHR = new XMLHttpRequest(); //XMLHttpRequest 非同期通信を行うためのオブジェクト
    XHR.open("POST", "/posts", true); //リクエストの内容を指定するためのメソッド
    XHR.responseType = "json";
    XHR.send(formData); //リクエストを送信するメソッド
    XHR.onload = () => { //onloadプロパティ：リクエストの送信が成功したときに呼び出されるプロパティ
      if (XHR.status != 200) { //レスポンスに何らかの問題があった場合の条件式
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null
      };
      const list = document.getElementById("list");
      const formText = document.getElementById("content"); //メモ投稿後にフォーム上のメモ消すための変数定義
      list.insertAdjacentHTML("afterend", buildHTML(XHR)); //insert~：HTMLを指定した箇所に挿入するメソッド。buildHTML関数呼び出し
      formText.value = ""; //メモ投稿後にフォーム上のメモ消している
    };
  });
};

window.addEventListener('turbo:load', post); //turbo:load ページが読み込まれたときに実行