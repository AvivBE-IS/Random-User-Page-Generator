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

// Helper to update dropdown with saved users
function updateSavedUsersDropdown() {
  const usersObj = JSON.parse(localStorage.getItem("savedUserPages") || "{}");
  const $dropdown = $(".saved-users-dropdown");
  $dropdown.empty();
  $dropdown.append(`<option value="">Select a user...</option>`);
  Object.keys(usersObj).forEach((key) => {
    $dropdown.append(`<option value="${key}">${key}</option>`);
  });
}

// Save User Page
$(".save-btn").on("click", function () {
  if (currentPageData) {
    let usersObj = JSON.parse(localStorage.getItem("savedUserPages") || "{}");
    const username = `${currentPageData.mainUser.firstName} ${currentPageData.mainUser.lastName}`;
    usersObj[username] = currentPageData;
    localStorage.setItem("savedUserPages", JSON.stringify(usersObj));
    updateSavedUsersDropdown();
    alert("User page saved!");
  }
});

// Load User Page
$(".load-btn").on("click", function () {
  const selected = $(".saved-users-dropdown").val();
  if (!selected) {
    alert("Please select a user to load.");
    return;
  }
  const usersObj = JSON.parse(localStorage.getItem("savedUserPages") || "{}");
  const data = usersObj[selected];
  if (data) {
    currentPageData = data;
    renderer.renderMainUser(data.mainUser);
    renderer.renderFriends(data.friends);
    renderer.renderQuote(data.quote);
    renderer.renderPokemon(data.pokemon);
    renderer.renderAbout(data.about);
  } else {
    alert("No saved user page found for this selection.");
  }
});

// On page load, update dropdown
$(document).ready(function () {
  updateSavedUsersDropdown();
});
