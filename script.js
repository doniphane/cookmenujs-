const cardContainer = document.querySelector(".card-container");
let Recherches= "";

document.getElementById("baraudebut").addEventListener("input", function () {
  document.getElementById("barfin").innerText = this.value;
  nouriture();
});

document.getElementById("valeursaisie").addEventListener("change", function () {
  Recherches= this.value.toLowerCase();
  nouriture();
});

async function nouriture() {
  const urlapi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${Recherches}`;
  const result = await fetch(urlapi);
  const data = await result.json();
  cardContainer.innerHTML = "";

  if (data.meals) {
    const ValeurSlice = Math.min(
      data.meals.length,
      parseInt(document.getElementById("baraudebut").value)
    );

    const filtredMeals = data.meals.filter((meal) =>
      meal.strMeal.toLowerCase().includes(Recherches)
    );
    const slicedMeals = filtredMeals.slice(0, ValeurSlice);

    slicedMeals.forEach((meal) => {
      const card = document.createElement("div");
      card.classList.add("carte");

      card.innerHTML = `<h2>${meal.strMeal}</h2>
                        <img src="${meal.strMealThumb}" alt="nouriture ${meal.strMeal}">
                        <p>Origine: ${meal.strArea}</p>
                        <p class="maxiumline">Decriptif: ${meal.strInstructions}</p>`;

      cardContainer.appendChild(card);
    });
  } 
}

nouriture();
