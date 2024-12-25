// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const output = document.getElementById('output');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const spriteHere = document.getElementById("sprite-here");

const fetchData = async () => {
  const pokeNameOrId = searchInput.value.trim().toLowerCase();
  if (!pokeNameOrId) {
    alert("Please enter a Pokémon name or ID");
    return;
  }

  try {
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokeNameOrId}`);
    if (!res.ok) throw new Error("Pokémon not found");
    const data = await res.json();

    pokemonName.textContent = data.name.toUpperCase();
    pokemonId.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    spriteHere.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front sprite">`;

    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    types.innerHTML = data.types
      .map(obj => `<span class="type ${obj.type.name}">${obj.type.name.toUpperCase()}</span>`)
      .join(' ');

  } catch (error) {
    resetInput();
    alert("Pokémon not found");
  }
};

const resetInput = () => {
  const sprite = document.getElementById("sprite");
  if (sprite) sprite.remove();

  pokemonName.textContent = '';
  pokemonId.textContent = '';
  types.innerHTML = '';
  height.textContent = '';
  weight.textContent = '';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';
};

searchBtn.addEventListener("click", fetchData);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    fetchData();
  }
});
