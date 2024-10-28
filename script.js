// 現在の曜日を取得する関数
function getCurrentDay() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.
  return days[today];
}

// 曜日ごとのタスクを定義
const tasksByDay = {
  Monday: {
    morning: `
      <h4>月曜日の朝活のタスクリスト</h4>
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
      </form>`,
    evening: `
      <h4>月曜日の締め活のタスクリスト</h4>
      <form>
        <label><input type="checkbox" class="eveningTask"> 夜 引き違いA 鍵閉め</label><br>
        <label><input type="checkbox" class="eveningTask"> 夜 ワゴン 鍵閉め</label><br>
        <label><input type="checkbox" class="eveningTask"> 夜 保管庫 鍵閉め</label><br>
        <label><input type="checkbox" class="eveningTask"> 夜 ブレーカー 鍵閉め、OFF</label><br>
        <label><input type="checkbox" class="eveningTask"> 夜 エアーワゴン 鍵閉め</label><br>
        <label><input type="checkbox" class="eveningTask"> 夜 窓・カーテン閉め</label><br>
        <label><input type="checkbox" class="eveningTask"> 夜 PCエリア電源確認</label><br>
        <label><input type="checkbox" class="eveningTask"> 夜 棚かけ工具確認</label><br>
        <label><input type="checkbox" class="eveningTask"> 夜 メール確認</label><br>
        <label><input type="checkbox" class="eveningTask"> 夜 ポットの水捨て</label><br>
        <label><input type="checkbox" class="eveningTask"> 夜 ごみ捨て</label><br>
        <label><input type="checkbox" class="eveningTask"> 夜 換気扇 OFF</label><br>
        <label><input type="checkbox" class="eveningTask"> 夜 エリアロープをはる</label><br>
      </form>`
  },
  // 他の曜日の設定 (例: 火曜日、金曜日なども同様に設定)
  Tuesday: {
    morning: `
      <h4>火曜日の朝活のタスクリスト</h4>
      <!-- 火曜日のタスクリスト -->`,
    evening: `
      <h4>火曜日の締め活のタスクリスト</h4>
      <!-- 火曜日のタスクリスト -->`
  },
  // 水曜日以降の曜日も同様に設定
};

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

    if (currentTime === morning && morningCheckbox && morningCheckbox.checked) {
      alert("朝活の通知です！");
      checkMorningTasks(morningCheckbox);
    }
    if (currentTime === evening && eveningCheckbox && eveningCheckbox.checked) {
      alert("締め活の通知です！");
      checkEveningTasks(eveningCheckbox);
    }
  }
}

// タスクリストの状態を確認する関数
function checkMorningTasks(morningCheckbox) {
  const allMorningTasks = document.querySelectorAll('.morningTask');
  const allChecked = Array.from(allMorningTasks).every(task => task.checked);
  
  if (allChecked) {
    alert("朝活が終わりました!");
  }
}

function checkEveningTasks(eveningCheckbox) {
  const allEveningTasks = document.querySelectorAll('.eveningTask');
  const allChecked = Array.from(allEveningTasks).every(task => task.checked);
  
  if (allChecked) {
    alert("締め活が終わりました!");
  }
}

// ページ読み込み時に現在の曜日に応じたタスクリストを表示
window.onload = function() {
  const currentDay = getCurrentDay(); // 現在の曜日を取得
  const taskListContainer = document.getElementById('taskList'); // タスクリストを表示するコンテナ

  // 現在の曜日に応じてタスクリストを表示
  if (tasksByDay[currentDay]) {
    taskListContainer.innerHTML = tasksByDay[currentDay].morning + tasksByDay[currentDay].evening;
  } else {
    taskListContainer.innerHTML = '<p>今日はタスクがありません。</p>';
  }

  // 1分ごとに通知をチェック
  setInterval(checkNotifications, 60000);
};

// 保存ボタンをクリックして設定を保存
document.getElementById('saveButton').addEventListener('click', () => {
  const states = {};
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
  checkboxes.forEach(checkbox => {
    states[checkbox.name] = checkbox.checked;
  });

  localStorage.setItem('taskStates', JSON.stringify(states));
  alert('設定を保存しました！');
});

// ページ読み込み時に保存された状態を復元
window.onload = () => {
  const savedStates = JSON.parse(localStorage.getItem('taskStates'));

  if (savedStates) {
    for (const [key, value] of Object.entries(savedStates)) {
      const checkbox = document.querySelector(`input[name="${key}"]`);
      if (checkbox) {
        checkbox.checked = value;
      }
    }
  }

  // 現在の曜日に基づいたタスクを表示する
  const currentDay = getCurrentDay();
  const taskListContainer = document.getElementById('taskList');
  if (tasksByDay[currentDay]) {
    taskListContainer.innerHTML = tasksByDay[currentDay].morning + tasksByDay[currentDay].evening;
  } else {
    taskListContainer.innerHTML = '<p>今日はタスクがありません。</p>';
  }

  // 通知チェックを定期的に行う
  setInterval(checkNotifications, 60000);
};
