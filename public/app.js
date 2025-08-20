// public/app.js
const form = document.getElementById("math-form");
const input = document.getElementById("problem");
const output = document.getElementById("answer");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const problem = input.value.trim();
  if (!problem) return;

  output.textContent = "Solving...";

  try {
    const response = await fetch("/solve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ problem }),
    });

    const data = await response.json();

    if (data.error) {
      output.textContent = `Error: ${data.error}`;
    } else {
      output.textContent = data.answer;
    }
  } catch (err) {
    console.error(err);
    output.textContent = "Error fetching answer";
  }
});
