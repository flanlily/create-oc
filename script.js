const morningTasks = `
  <h4>朝活のタスクリスト</h4>
  <form>
    <label><input type="checkbox"> 朝 引き違いA 鍵開け</label><br>
    <label><input type="checkbox"> 朝 ワゴン 鍵開け</label><br>
    <label><input type="checkbox"> 朝 保管庫 鍵開け</label><br>
    <label><input type="checkbox"> 朝 ブレーカー 鍵開け、ON</label><br>
    <label><input type="checkbox"> 朝 エアーワゴン 鍵開け</label><br>
    <label><input type="checkbox"> 朝 デジタルサイネージを出す</label><br>
    <label><input type="checkbox"> 朝 棚かけ工具確認</label><br>
    <label><input type="checkbox"> 朝 メール確認</label><br>
    <label><input type="checkbox"> 朝 ポットのお湯、5Lまで入れる</label><br>
    <label><input type="checkbox"> 朝 掃き掃除</label><br>
  </form>
`;

const eveningTasks = `
  <h4>締め活のタスクリスト</h4>
  <form>
    <label><input type="checkbox"> 夜 引き違いA 鍵閉め</label><br>
    <label><input type="checkbox"> 夜 ワゴン 鍵閉め</label><br>
    <label><input type="checkbox"> 夜 保管庫 鍵閉め</label><br>
    <label><input type="checkbox"> 夜 ブレーカー 鍵閉め、OFF</label><br>
    <label><input type="checkbox"> 夜 エアーワゴン 鍵閉め</label><br>
    <label><input type="checkbox"> 夜 窓・カーテン閉め</label><br>
    <label><input type="checkbox"> 夜 PCエリア電源確認</label><br>
    <label><input type="checkbox"> 夜 棚かけ工具確認</label><br>
    <label><input type="checkbox"> 夜 メール確認</label><br>
    <label><input type="checkbox"> 夜 ポットの水捨て</label><br>
    <label><input type="checkbox"> 夜 ごみ捨て</label><br>
    <label><input type="checkbox"> 夜 換気扇 OFF</label><br>
    <label><input type="checkbox"> 夜 エリアロープをはる</label><br>
  </form>
`;

// タスクリストを動的に更新する関数
function updateTaskList(day, morningCheckbox, eveningCheckbox, taskListContainer) {
  let taskContent = '';
  if (morningCheckbox.checked) {
    taskContent += morningTasks;
  }
  if (eveningCheckbox.checked) {
    taskContent += eveningTasks;
  }
  taskListContainer.innerHTML = taskContent;
}

// 各曜日のチェックボックスとタスクリストを連動させる
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', (e) => {
    const day = e.target.name.replace(/Morning|Evening/, '');
    const morningCheckbox = document.querySelector(`input[name="${day}Morning"]`);
    const eveningCheckbox = document.querySelector(`input[name="${day}Evening"]`);
    const taskListContainer = document.getElementById(`${day}TaskList`);
    
    updateTaskList(day, morningCheckbox, eveningCheckbox, taskListContainer);
  });
});

// 通知設定
const notificationTimes = {
  Monday: { morning: "09:00", evening: "19:00" },
  Tuesday: { morning: "09:00", evening: "19:00" },
  Wednesday: { morning: "09:00", evening: "19:00" },
  Thursday: { morning: "09:00", evening: "19:00" },
  Friday: { morning: "09:00", evening: "19:00" },
  Saturday: { morning: "09:00", evening: "16:30" },
};

// 通知をチェックする関数
function checkNotifications() {
  const now = new Date();
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = dayNames[now.getDay()];
  const currentTime = now.toTimeString().slice(0, 5); // "HH:MM" 形式

  if (notificationTimes[currentDay]) {
    const { morning, evening } = notificationTimes[currentDay];
    
    const morningCheckbox = document.querySelector(`input[name="${currentDay.toLowerCase()}Morning"]`);
    const eveningCheckbox = document.querySelector(`input[name="${currentDay.toLowerCase()}Evening"]`);

    if (currentTime === morning && morningCheckbox.checked) {
      alert("朝活の通知です！");
    }
    if (currentTime === evening && eveningCheckbox.checked) {
      alert("締め活の通知です！");
    }
  }
}

// 通知をチェックするために1分ごとに関数を呼び出す
setInterval(checkNotifications, 60000);

// 保存ボタンにクリックイベントを追加
document.getElementById('saveButton').addEventListener('click', () => {
  const states = {};
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
  checkboxes.forEach(checkbox => {
    states[checkbox.name] = checkbox.checked;
  });

  localStorage.setItem('taskStates', JSON.stringify(states));
  alert('設定を保存しました！');
});

// ページが読み込まれたときにローカルストレージから状態を復元
window.onload = () => {
  const savedStates = JSON.parse(localStorage.getItem('taskStates'));

  if (savedStates) {
    for (const [key, value] of Object.entries(savedStates)) {
      const checkbox = document.querySelector(`input[name="${key}"]`);
      if (checkbox) {
        checkbox.checked = value;
        const day = key.replace(/Morning|Evening/, '');
        const taskListContainer = document.getElementById(`${day}TaskList`);
        updateTaskList(day, checkbox, checkbox, taskListContainer); // 変更された状態でタスクリストを更新
      }
    }
  }
};
