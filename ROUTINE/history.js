const historyContainer = document.getElementById("historyContainer");

// Get all saved keys (dates)
const allKeys = Object.keys(localStorage);

// If no data
if (allKeys.length === 0) {
  historyContainer.innerHTML = "<p>No saved data found.</p>";
}

// Sort dates (latest first)
allKeys.sort((a, b) => new Date(b) - new Date(a));

// Loop through each date
allKeys.forEach(date => {
  const tasks = JSON.parse(localStorage.getItem(date));

  if (!Array.isArray(tasks)) return;

  const dayBlock = document.createElement("div");
  dayBlock.className = "month";

  const heading = document.createElement("h2");
  heading.textContent = `📆 ${date}`;
  dayBlock.appendChild(heading);

  tasks.forEach(task => {
    const p = document.createElement("p");
    p.textContent = `${task.done ? "✅" : "❌"} ${task.text}`;
    dayBlock.appendChild(p);
  });

  historyContainer.appendChild(dayBlock);
});
