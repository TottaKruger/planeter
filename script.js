const searchBarEl = document.querySelector("#search-planet");
const planetOverlay = document.querySelector(".planet-overlay");
const prevPlanetBtn = document.querySelector(".pagination-btn--prev");
const nextPlanetBtn = document.querySelector(".pagination-btn--next");
const planetsContainerEl = document.getElementById("planet-container");

let currentPlanetIndex;
let planetsArray;

load();

searchBarEl.addEventListener("keyup", function () {
  let input = searchBarEl.value;
  let matches = [];

  planetsArray.forEach((planet) => {
    if (planet.name.toLowerCase().includes(input.toLowerCase())) {
      matches.push(planet);
    }
  });

  console.log("matches", matches);

  if (matches.length > 0) {
    drawPlanets(matches);
  } else {
    planetsContainerEl.innerHTML =
      "Inga matchningar hittades, var god sök igen.";
  }
});

async function load() {
  planetsArray = await loadPlanets();
  drawPlanets(planetsArray);
}

async function drawPlanets(planets) {
  try {
    planetsContainerEl.innerHTML = "";

    planets.forEach((planet) => {
      const element = document.createElement("div");
      element.classList.add("planet");
      element.classList.add(planet.name.toLowerCase());
      element.addEventListener("click", () => openPlanetOverlay(planet));
      planetsContainerEl.appendChild(element);
    });
  } catch (error) {
    console.log(error);
  }
}

async function loadPlanets() {
  const res = await fetch("https://majazocom.github.io/Data/solaris.json");
  const planets = await res.json();
  return planets;
}

function openPlanetOverlay(planet) {
  currentPlanetIndex = planetsArray.indexOf(planet);
  console.log("index of planet in list: ", currentPlanetIndex);
  document.querySelector(".planet-name").innerHTML = planet.name;
  document.querySelector(".planet-desc").innerHTML = planet.desc;
  document.querySelector(".planet-orbitalPeriod").innerHTML = planet.orbitalPeriod;
  document.querySelector(".planet-moons").innerHTML = planet.moons;
  document.querySelector(".planet-type").innerHTML = planet.type;
  document.querySelector(".planet-latinName").innerHTML = planet.latinName;
  document.querySelector(".planet-rotation").innerHTML = planet.rotation;
  document.querySelector(".planet-circumference").innerHTML = planet.circumference;
  document.querySelector(".planet-temp").innerHTML = planet.temp;
  document.querySelector(".planet-distance").innerHTML = planet.distance;
  planetOverlay.style.display = "block";
}

prevPlanetBtn.addEventListener("click", () => {
  openPlanetOverlay(planetsArray[currentPlanetIndex - 1]);
});

nextPlanetBtn.addEventListener("click", () => {
  openPlanetOverlay(planetsArray[currentPlanetIndex + 1]);
});
