const searchBarEl = document.querySelector('#search-planet');
const planetOverlay = document.querySelector('.planet-overlay');
const prevPlanetBtn = document.querySelector('.pagination-btn--prev');
const nextPlanetBtn = document.querySelector('.pagination-btn--next');
let currentPlanetIndex;
let planetsArray;

drawPlanets();

async function drawPlanets() {
  try {
    planetsArray = await loadPlanets();

    const container = document.getElementById("planet-container");

    planetsArray.forEach((planet) => {
      const element = document.createElement("div");
      element.classList.add("planet");
      element.classList.add(planet.name.toLowerCase());
      element.addEventListener("click", () => openPlanetOverlay(planet));
      container.appendChild(element);
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
    console.log('index of planet in list: ', currentPlanetIndex);
    document.querySelector('.planet-name').innerHTML = planet.name;
    planetOverlay.style.display = 'block';
};

// prev dog btn event listener
prevPlanetBtn.addEventListener('click', () => {
    openPlanetOverlay(planetsArray[currentPlanetIndex - 1]);
});

nextPlanetBtn.addEventListener('click', () => {
    openPlanetOverlay(planetsArray[currentPlanetIndex + 1]);
});