// 通知の許可リクエスト
function requestNotificationPermission() {
  if ("Notification" in window) {
    Notification.requestPermission();
  } else {
    alert("このブラウザは通知をサポートしていません。");
  }
}

window.addEventListener('load', requestNotificationPermission);

// 曜日ごとのタスクリスト
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
    <label><input type="checkbox" class="morningTask"> 朝 両頭グラインダー確認</label><br>
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
    <label><input type="checkbox" class="eveningTask"> 夜 棚かけ工具確認</label><br>
    <label><input type="checkbox" class="eveningTask"> 夜 いす整頓</label><br>
    <label><input type="checkbox" class="eveningTask"> 夜 デジタルサイネージをしまう</label><br>
    <label><input type="checkbox" class="eveningTask"> 夜 給湯器の電源OFF</label><br>
    <label><input type="checkbox" class="eveningTask"> 夜 換気扇 OFF</label><br>
    <label><input type="checkbox" class="eveningTask"> 夜 エリアロープをはる</label><br>
    <label><input type="checkbox" class="eveningTask"> 夜 メール確認</label><br>
    <label><input type="checkbox" class="eveningTask"> 夜 ポットの水捨て</label><br>
    <label><input type="checkbox" class="eveningTask"> 夜 ごみ捨て</label><br>
    <label><input type="checkbox" class="eveningTask"> 夜 水切りネット交換</label><br>
  </form>
`;

// タスクリストの動的表示
function updateTaskList(day, morningCheckbox, eveningCheckbox, taskListContainer) {
  let taskContent = '';
  if (morningCheckbox.checked) taskContent += morningTasks;
  if (eveningCheckbox.checked) taskContent += eveningTasks;
  taskListContainer.innerHTML = taskContent;
}

// 各曜日のチェックボックスとタスクリストの連動
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', (e) => {
    const day = e.target.name.replace(/Morning|Evening/, '');
    const morningCheckbox = document.querySelector(`input[name="${day}Morning"]`);
    const eveningCheckbox = document.querySelector(`input[name="${day}Evening"]`);
    const taskListContainer = document.getElementById(`${day}TaskList`);
    updateTaskList(day, morningCheckbox, eveningCheckbox, taskListContainer);
  });
});

// 通知時間
const notificationTimes = {
  Monday: { morning: "09:00", evening: "19:00" },
  Tuesday: { morning: "09:00", evening: "19:00" },
  Wednesday: { morning: "09:00", evening: "19:00" },
  Thursday: { morning: "09:00", evening: "19:00" },
  Friday: { morning: "09:00", evening: "19:00" },
  Saturday: { morning: "09:00", evening: "16:30" },
};

// 通知チェック関数
function checkNotifications() {
  const now = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = dayNames[now.getDay()];
  const currentTime = now.toTimeString().slice(0, 5);

  if (notificationTimes[currentDay]) {
    const { morning, evening } = notificationTimes[currentDay];
    const morningCheckbox = document.querySelector(`input[name="${currentDay.toLowerCase()}Morning"]`);
    const eveningCheckbox = document.querySelector(`input[name="${currentDay.toLowerCase()}Evening"]`);

    if (currentTime === morning && morningCheckbox.checked) {
      alert("朝活の通知です！");
      checkAllTasks("morningTask", "朝活が終わりました!");
    }
    if (currentTime === evening && eveningCheckbox.checked) {
      alert("締め活の通知です！");
      checkAllTasks("eveningTask", "締め活が終わりました!");
    }
  }
}

// タスクの完了チェック
function checkAllTasks(taskClass, completionMessage) {
  const tasks = document.querySelectorAll(`.${taskClass}`);
  const allChecked = Array.from(tasks).every(task => task.checked);
  if (allChecked) alert(completionMessage);
}

// 通知チェックの定期実行
setInterval(checkNotifications, 60000);

// 設定の保存
document.getElementById('saveButton').addEventListener('click', () => {
  const states = {};
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    states[checkbox.name] = checkbox.checked;
  });
  localStorage.setItem('taskStates', JSON.stringify(states));
  alert('設定を保存しました！');
});

// 保存状態の復元
window.onload = () => {
  const savedStates = JSON.parse(localStorage.getItem('taskStates'));
  if (savedStates) {
    for (const [key, value] of Object.entries(savedStates)) {
      const checkbox = document.querySelector(`input[name="${key}"]`);
      if (checkbox) {
        checkbox.checked = value;
        const day = key.replace(/Morning|Evening/, '');
        const taskListContainer = document.getElementById(`${day}TaskList`);
        updateTaskList(day, checkbox, checkbox, taskListContainer);
      }
    }
  }
};
