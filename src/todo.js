import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  // 押された削除ボタンの親タグ（div）を未完了リストから削除
  document.getElementById("incomplete-list").removeChild(target);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // div生成
  const div = document.createElement("div");
  div.className = "list-row";

  // liタグ生成
  const li = document.createElement("li");
  li.innerText = text;

  // button(完了)タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの親タグ（div）を未完了リストから削除
    deleteFromIncompleteList(completeButton.parentNode);

    // 再利用
    const addTarget = completeButton.parentNode; // div要素
    const text = addTarget.firstChild.innerText; // text取得

    // div配下を初期化(divの型を作成)
    addTarget.textContent = null;

    // liタグ生成
    const li = document.createElement("li");
    li.innerText = text;

    // ボタンを生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    // イベントハンドラ登録
    backButton.addEventListener("click", () => {
      // 押された戻すボタンの親タグ（div）を完了リストから削除
      document
        .getElementById("complete-list")
        .removeChild(backButton.parentNode);
      // 再利用
      const deleteTarget = backButton.parentNode; // div要素
      const text = deleteTarget.firstChild.innerText; // text取得
      // 未完了Todoに追加
      createIncompleteList(text);
    });

    // divタグの子要素に各要素を設定
    addTarget.appendChild(li);
    addTarget.appendChild(backButton);

    // ulタグの子要素にdivタグを挿入し、未完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  // button(削除)タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ（div）を未完了リストから削除
    deleteFromIncompleteList(deleteButton.parentNode);
  });

  // divタグの子要素に各要素を設定
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // ulタグの子要素にdivタグを挿入し、未完了リストに追加
  document.getElementById("incomplete-list").appendChild(div);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
