// API TEST

// https://dog.ceo/api/breed/Chihuahua/image/random

console.log("run first");

const dogImage = document.getElementById("dogImage");
const getImage = document.getElementById("generate");

const getDogImage = () => {
  fetch("https://dog.ceo/api/breeds/image/random")
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Failed to Fetch Image");
      }
      return resp.json();
    })
    .then(
      (json) =>
        (dogImage.innerHTML = `<img src='${json.message}' height=300 width=300 style='padding: 20px'/>`)
    )
    .catch((error) => console.error(error));
};

getImage.onclick = () => getDogImage();

/* console.log(fetch("https://dog.ceo/api/breeds/image/random")); */

const promise1 = Promise.resolve(`First Promise's Value`);
const promise2 = new Promise((resolve) => {
  setTimeout(resolve, 3000, `Second Promise's Value`);
});
const promise3 = new Promise((res) =>
  setTimeout(res, 2000, `Third Promise's Value `)
);

const getPromise = Promise.all([promise1, promise2, promise3]);

getPromise.then((values) => {
  values.forEach((value) => console.log(value));
});

// https://superheroapi.com/api/access-token/id
// 858743342537599

const generate = document.getElementById("generateSuperhero");
const superhero = document.getElementById("SuperheroImage");
const URL_BASE = "https://superheroapi.com/api.php/858743342537599";
const randomSuperhero = document.getElementById("generateRandom");

// Generate Random Superhero
const getSuperhero = async (id) => {
  try {
    const response = await fetch(`${URL_BASE}/${id}`);
    if (!response.ok) {
      throw new Error("Failed To fetch image URL");
    }
    const json = await response.json();
    getHeroData(json);
  } catch (e) {
    console.error(e);
  }
};

const getHeroData = (hero) => {
  const name = `<p>${hero.name}</p>`;
  const image = `<img src="${hero.image.url}" height=200 width=200 class="imageSuperhero">`;

  const appearanceTitle = `<h1 style="color: red; margin: 20px 0">APPEARANCE : </h1>`;
  const appearance = Object.keys(hero.appearance)
    .map((get) => {
      return `<p >${get} : ${hero.appearance[get]}</p>`;
    })
    .join("");

  const statsTitle = `<h1 style="color: red; margin: 20px 0">STATS : </h1>`;
  const stats = Object.keys(hero.powerstats)
    .map((statistic) => {
      return `<p>${statistic} : ${hero.powerstats[statistic]} </p>`;
    })
    .join("");

  superhero.innerHTML = `${name}${image}${statsTitle}${stats}${appearanceTitle}${appearance}`;
};

const getNumberSuperhero = () => {
  const numberSuperhero = 731;
  return Math.floor(Math.random() * numberSuperhero) + 1;
};

randomSuperhero.onclick = () => {
  getSuperhero(getNumberSuperhero());
};

// Search Button
const getSearchedSuperhero = async (SuperheroName) => {
  const response = await fetch(`${URL_BASE}/search/${SuperheroName}`);
  try {
    if (!response.ok) {
      throw new Error("Failed To fetch image URL");
    }
    const json = await response.json();
    const hero = json.results[0];
    const heroName = hero.name;

    superhero.innerHTML = `${heroName}<img src="${hero.image.url}" height=200 width=200 class="imageSuperhero"/>`;
    superhero.innerHTML += `<p>Intelligence : ${hero.powerstats.intelligence}</p>`;

    console.log("Hero Stats : ", hero.powerstats);
  } catch (e) {
    console.error(e.message);
  }
};

generate.addEventListener("click", () => {
  const inputID = document.getElementById("inputID");
  const valueInput = inputID.value;
  if (isNaN(valueInput)) {
    getSearchedSuperhero(valueInput);
  } else {
    throw new Error(
      "input harus  berupa Nama Hero dan input tidak boleh kosong"
    );
  }
});
