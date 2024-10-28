const morningTasks = `
  <h4>朝活のタスクリスト</h4>
  <form>
    <label><input type="checkbox" class="morningTask"> 朝 引き違いA 鍵開け</label><br>
    <label><input type="checkbox" class="morningTask"> 朝 ワゴン 鍵開け</label><br>
    <label><input type="checkbox" class="morningTask"> 朝 保管庫 鍵開け</label><br>
    <label><input type="checkbox" class="morningTask"> 朝 ブレーカー 鍵開け、ON</label><br>
    <label><input type="checkbox" class="morningTask"> 朝 エアーワゴン 鍵開け</label><br>
    <label><input type="checkbox" class="morningTask"> 朝 デジタルサイネージを出す</label><br>
    <label><input type="checkbox" class="morningTask"> 朝 棚かけ工具確認</label><br>
    <label><input type="checkbox" class="morningTask"> 朝 メール確認</label><br>
    <label><input type="checkbox" class="morningTask"> 朝 ポットのお湯、5Lまで入れる</label><br>
    <label><input type="checkbox" class="morningTask"> 朝 掃き掃除</label><br>
  </form>
`;

const eveningTasks = `
  <h4>締め活のタスクリスト</h4>
  <form>
    <label><input type="checkbox" class="eveningTask"> 夜 引き違いA 鍵閉め</label><br>
    <label><input type="checkbox" class="eveningTask"> 夜 ワゴン 鍵閉め</label><br>
    <label><input type="checkbox" class="eveningTask"> 夜 保管庫 鍵閉め</label><br>
    <label><input type="checkbox" class="eveningTask"> 夜 ブレーカー 鍵閉め、OFF</label><br>
    <label><input type="checkbox" class="eveningTask"> 夜 エアーワゴン 鍵閉め</label><br>
    <label><input type="checkbox" class="eveningTask"> 夜 窓・カーテン閉め</label><br>
    <label><input type="checkbox" class="eveningTask"> 夜 PCエリア電源確認</label><br>
    <label><input type="checkbox" class="eveningTask"> 夜 メール確認</label><br>
    <label><input type="checkbox" class="eveningTask"> 夜 ポットの水捨て</label><br>
    <label><input type="checkbox" class="eveningTask"> 夜 ごみ捨て</label><br>
    <label><input type="checkbox" class="eveningTask"> 夜 換気扇 OFF</label><br>
    <label><input type="checkbox" class="eveningTask"> 夜 エリアロープをはる</label><br>
  </form>
`;

// 現在の曜日に基づいてタスクリストを表示
function displayTaskList() {
  const now = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = dayNames[now.getDay()];
  document.getElementById('currentDay').innerText = `${currentDay}のタスク`;

  const taskListContainer = document.getElementById('taskListContainer');
  taskListContainer.innerHTML = '';

  // 保存されたチェック状態を復元
  const savedStates = JSON.parse(localStorage.getItem('taskStates')) || {};
  const morningChecked = savedStates[`${currentDay}Morning`] || false;
  const eveningChecked = savedStates[`${currentDay}Evening`] || false;

  if (morningChecked) {
    taskListContainer.innerHTML += morningTasks;
  }
  if (eveningChecked) {
    taskListContainer.innerHTML += eveningTasks;
  }

  // 復元した状態でチェックボックスを更新
  document.querySelectorAll('.morningTask').forEach((checkbox, index) => {
    checkbox.checked = savedStates[`morningTask${index}`] || false;
  });

  document.querySelectorAll('.eveningTask').forEach((checkbox, index) => {
    checkbox.checked = savedStates[`eveningTask${index}`] || false;
  });
}

// 保存機能
document.getElementById('saveButton').addEventListener('click', () => {
  const now = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = dayNames[now.getDay()];

  const states = {};
  states[`${currentDay}Morning`] = document.querySelector('.morningTask') ? true : false;
  states[`${currentDay}Evening`] = document.querySelector('.eveningTask') ? true : false;

  document.querySelectorAll('.morningTask').forEach((checkbox, index) => {
    states[`morningTask${index}`] = checkbox.checked;
  });

  document.querySelectorAll('.eveningTask').forEach((checkbox, index) => {
    states[`eveningTask${index}`] = checkbox.checked;
  });

  localStorage.setItem('taskStates', JSON.stringify(states));
  alert('設定を保存しました！');
});

// ページが読み込まれたときにタスクリストを表示
window.onload = displayTaskList;
