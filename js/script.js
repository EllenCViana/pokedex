const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');


const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200){
   const data = await APIResponse.json();
    return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    
    if (data && data.id < 650 && data.id > 0 ) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonImage.style.opacity = "1";
    input.value = '';
    searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.opacity = "0";
        input.value = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () =>
{
    searchPokemon -= 1;
    if (searchPokemon <=0) {
        searchPokemon = 649;
    }
    renderPokemon(searchPokemon);

});

buttonNext.addEventListener('click', () =>
{
    searchPokemon += 1;
    if (searchPokemon >= 650) {
        searchPokemon = 1;
    }
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);