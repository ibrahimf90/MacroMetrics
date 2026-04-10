document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("calculator-form");
  const inputSection = document.querySelector(".input-section");
  const resultsSection = document.getElementById("results");
  const recalculateBtn = document.getElementById("recalculate-btn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const sex = document.querySelector('input[name="sex"]:checked').value;
    const age = parseInt(document.getElementById("age").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const activity = parseFloat(document.getElementById("activity").value);
    const goal = document.getElementById("goal").value;

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    let bmiCategory = "Normal";
    if (bmi < 18.5) bmiCategory = "Underweight";
    else if (bmi >= 25 && bmi < 29.9) bmiCategory = "Overweight";
    else if (bmi >= 30) bmiCategory = "Obese";

    let bmr = 10 * weight + 6.25 * height - 5 * age;
    if (sex === "male") {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    const tdee = bmr * activity;

    let targetCalories = tdee;
    let macroSplit = { protein: 0.3, fat: 0.3, carbs: 0.4 }; // Default maintenance

    if (goal === "lose") {
      targetCalories -= 500;
      macroSplit = { protein: 0.4, fat: 0.3, carbs: 0.3 };
    } else if (goal === "gain") {
      targetCalories += 500;
      macroSplit = { protein: 0.25, fat: 0.25, carbs: 0.5 };
    }

    if (sex === "female" && targetCalories < 1200) targetCalories = 1200;
    if (sex === "male" && targetCalories < 1500) targetCalories = 1500;

    const proteinKcals = targetCalories * macroSplit.protein;
    const carbsKcals = targetCalories * macroSplit.carbs;
    const fatKcals = targetCalories * macroSplit.fat;

    const proteinGrams = Math.round(proteinKcals / 4);
    const carbsGrams = Math.round(carbsKcals / 4);
    const fatGrams = Math.round(fatKcals / 9);

    document.getElementById("result-calories").textContent =
      Math.round(targetCalories).toLocaleString();
    document.getElementById("result-bmi").textContent = bmi.toFixed(1);
    document.getElementById("result-bmi-category").textContent = bmiCategory;

    document.getElementById("result-protein").textContent = proteinGrams + "g";
    document.getElementById("perc-protein").textContent =
      Math.round(macroSplit.protein * 100) + "%";
    document.getElementById("fill-protein").style.width = "0%";

    document.getElementById("result-carbs").textContent = carbsGrams + "g";
    document.getElementById("perc-carbs").textContent =
      Math.round(macroSplit.carbs * 100) + "%";
    document.getElementById("fill-carbs").style.width = "0%";

    document.getElementById("result-fat").textContent = fatGrams + "g";
    document.getElementById("perc-fat").textContent =
      Math.round(macroSplit.fat * 100) + "%";
    document.getElementById("fill-fat").style.width = "0%";

    inputSection.classList.add("hidden");
    setTimeout(() => {
      inputSection.style.display = "none";
      resultsSection.style.display = "block";

      requestAnimationFrame(() => {
        resultsSection.classList.remove("hidden");

        setTimeout(() => {
          document.getElementById("fill-protein").style.width =
            macroSplit.protein * 100 + "%";
          document.getElementById("fill-carbs").style.width =
            macroSplit.carbs * 100 + "%";
          document.getElementById("fill-fat").style.width =
            macroSplit.fat * 100 + "%";
        }, 100);
      });
    }, 300);
  });

  recalculateBtn.addEventListener("click", () => {
    resultsSection.classList.add("hidden");
    setTimeout(() => {
      resultsSection.style.display = "none";
      inputSection.style.display = "block";

      requestAnimationFrame(() => {
        inputSection.classList.remove("hidden");
      });
    }, 400);
  });
});
