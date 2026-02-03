document.addEventListener("DOMContentLoaded", () => {

  /* =======================
     DAILY CHECKLIST LOGIC
     ======================= */

  const today = new Date().toLocaleDateString();
  const todayDate = document.getElementById("todayDate");

  if (todayDate) {
    todayDate.textContent = `Today: ${today}`;
  }

  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const resetBtn = document.getElementById("resetDay");

  const savedData = JSON.parse(localStorage.getItem(today)) || {};

  checkboxes.forEach(box => {
    const task = box.dataset.task;

    if (task) {
      box.checked = savedData[task] || false;

      box.addEventListener("change", () => {
        savedData[task] = box.checked;
        localStorage.setItem(today, JSON.stringify(savedData));
      });
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("Reset today’s progress?")) {
        localStorage.removeItem(today);
        location.reload();
      }
    });
  }

  /* =======================
     TOPIC & CONTENT LOGIC
     ======================= */

  const topics = [
    "Month 1: HTML, CSS, JavaScript Basics",
    "Month 2: Advanced JavaScript & APIs",
    "Month 3: Backend Development",
    "Month 4: Database & Auth Basics",
    "Month 5: OAuth & Social Login",
    "Month 6: React",
    "Month 7: React Native",
    "Month 8: Deployment",
    "Month 9: Projects & Portfolio"
  ];

  const monthData = [
    ["Learn HTML", "Practice CSS", "JavaScript basics", "Mini websites"],
    ["Advanced JS", "Async / Await", "APIs"],
    ["Backend basics", "REST APIs", "Auth system"],
    ["Databases", "JWT & Sessions", "Protected routes"],
    ["OAuth 2.0", "Google login", "Facebook login"],
    ["React basics", "Hooks", "Routing"],
    ["React Native basics", "Navigation", "API integration"],
    ["Deployment", "Env variables", "Testing"],
    ["Final projects", "Portfolio", "Revision"]
  ];

  let currentTopicIndex =
    Number(localStorage.getItem("currentTopicIndex")) || 0;

  const currentTopicText = document.getElementById("currentTopicText");
  const monthContent = document.getElementById("monthContent");
  const completeTopicBtn = document.getElementById("completeTopicBtn");
  const prevTopicBtn = document.getElementById("prevTopicBtn");

  function renderTopic() {
    if (currentTopicText) {
      currentTopicText.textContent =
        "Current Topic: " + topics[currentTopicIndex];
    }

    if (monthContent) {
      monthContent.innerHTML = "";

      const h2 = document.createElement("h2");
      h2.textContent = topics[currentTopicIndex];
      monthContent.appendChild(h2);

      monthData[currentTopicIndex].forEach(item => {
        const p = document.createElement("p");
        p.textContent = "• " + item;
        monthContent.appendChild(p);
      });
    }
  }

  renderTopic();

  if (completeTopicBtn) {
    completeTopicBtn.addEventListener("click", () => {
      if (currentTopicIndex < topics.length - 1) {
        currentTopicIndex++;
        localStorage.setItem("currentTopicIndex", currentTopicIndex);
        renderTopic();
      } else {
        alert("🎉 All topics completed!");
      }
    });
  }

  if (prevTopicBtn) {
    prevTopicBtn.addEventListener("click", () => {
      if (currentTopicIndex > 0) {
        currentTopicIndex--;
        localStorage.setItem("currentTopicIndex", currentTopicIndex);
        renderTopic();
      }
    });
  }

});
