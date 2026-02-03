const checkboxes = document.querySelectorAll("input[type='checkbox']");
const todayDate = document.getElementById("todayDate");
const resetBtn = document.getElementById("resetDay");

// Get today's date
const today = new Date().toLocaleDateString();
todayDate.textContent = `Today: ${today}`;

// Load saved data
const savedData = JSON.parse(localStorage.getItem(today)) || {};

checkboxes.forEach(box => {
  const task = box.dataset.task;

  // Restore checkbox state
  box.checked = savedData[task] || false;

  // Save on change
  box.addEventListener("change", () => {
    savedData[task] = box.checked;
    localStorage.setItem(today, JSON.stringify(savedData));
  });
});

// Reset only today
resetBtn.addEventListener("click", () => {
  if (confirm("Reset today’s progress?")) {
    localStorage.removeItem(today);
    location.reload();
  }
});
