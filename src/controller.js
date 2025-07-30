import {
  fetchUsers,
  fetchKanyeQuote,
  fetchRandomPokemon,
  fetchBaconIpsum,
} from "./model.js";
import Renderer from "./view.js";

const renderer = new Renderer();

let currentPageData = null;

function generateUserPage() {
  fetchUsers().then((data) => {
    const users = data.results;

    const mainUser = {
      firstName: users[0].name.first,
      lastName: users[0].name.last,
      picture: users[0].picture.large,
      city: users[0].location.city,
      state: users[0].location.state,
    };

    const friends = users.slice(1).map((user) => ({
      firstName: user.name.first,
      lastName: user.name.last,
    }));

    // Fetch all data in parallel
    Promise.all([fetchKanyeQuote(), fetchRandomPokemon(), fetchBaconIpsum()]).then(
      ([kanyeData, pokemonData, baconData]) => {
        const properName =
          pokemonData.name.charAt(0).toUpperCase() +
          pokemonData.name.slice(1).toLowerCase();
        const pokemon = {
          name: properName,
          image: pokemonData.sprites.front_default,
        };
        const quote = kanyeData.quote;
        const about = baconData[0];

        // Save current page data for saving
        currentPageData = {
          mainUser,
          friends,
          quote,
          pokemon,
          about,
        };

        renderer.renderMainUser(mainUser);
        renderer.renderFriends(friends);
        renderer.renderQuote(quote);
        renderer.renderPokemon(pokemon);
        renderer.renderAbout(about);
      }
    );
  });
}

// Initial page load
generateUserPage();

// Save User Page
$(".save-btn").on("click", function () {
  if (currentPageData) {
    localStorage.setItem("savedUserPage", JSON.stringify(currentPageData));
    alert("User page saved!");
  }
});

// Load User Page
$(".load-btn").on("click", function () {
  const saved = localStorage.getItem("savedUserPage");
  if (saved) {
    const data = JSON.parse(saved);
    currentPageData = data;
    renderer.renderMainUser(data.mainUser);
    renderer.renderFriends(data.friends);
    renderer.renderQuote(data.quote);
    renderer.renderPokemon(data.pokemon);
    renderer.renderAbout(data.about);
  } else {
    alert("No saved user page found.");
  }
});

// Generate new user page
$(".generate-btn").on("click", function () {
  generateUserPage();
});
