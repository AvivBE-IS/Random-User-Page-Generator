export function fetchUsers() {
  return $.ajax({
    url: "https://randomuser.me/api/?results=7",
    dataType: "json",
  });
}

export function fetchKanyeQuote() {
  return $.ajax({
    url: "https://api.kanye.rest/",
    dataType: "json",
  });
}

export function fetchRandomPokemon() {
  const id = Math.floor(Math.random() * 1025) + 1; // 1 to 1025
  return $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/${id}`,
    dataType: "json",
  });
}
