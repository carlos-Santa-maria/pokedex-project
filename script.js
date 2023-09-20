const pokemonList = document.getElementById("pokemon-list");

const headerbtns = document.querySelectorAll(".btn-header");

let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i = 1; i <= 151; i++) {
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => getPokemon(data));
}

function getPokemon(data) {
  // getting pokemon types

  let types = data.types.map(
    (type) => `<p  class="type" id="${type.type.name}">${type.type.name}</p>`
  );
  types = types.join("");

  // adding 0 & 00 to the pokeid

  let pokeId = data.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }

  const div = document.createElement("div");
  div.classList.add("pokemon");
  div.innerHTML = `<p class="pokemon-id-back">#${pokeId}
    </p>
    <div class="pokemon-img-container">
      <img
      src="${data.sprites.other["official-artwork"].front_default} " alt="${data.name}"
      />
    </div>
    <div class="pokemon-info">
      <div class="name-container">
        <p class="pokemon-id">#${pokeId}</p>
        <h2 class="pokemon-name">${data.name}</h2>
      </div>
      <div class="pokemon-type">
        ${types}
      </div>
      <div class="pokemon-stats">
        <p class="stats">${data.height}M</p>
        <p class="stats">${data.weight}KG</p>
      </div>
    </div> `;
  pokemonList.append(div);
}

headerbtns.forEach((button) =>
  button.addEventListener("click", (event) => {
    const idButton = event.currentTarget.id;

    pokemonList.innerHTML = " ";

    for (let i = 1; i <= 151; i++) {
      fetch(URL + i)
        .then((response) => response.json())
        .then((data) => {
          // showing all pokemon
          if (idButton === "all") {
            getPokemon(data);
          } else {
            const pokemonTypes = data.types.map((type) => type.type.name);
            if (pokemonTypes.some((type) => type.includes(idButton))) {
              getPokemon(data);
            }
          }
        });
    }
  })
);
