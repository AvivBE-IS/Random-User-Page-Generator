import {
  fetchUsers,
  fetchKanyeQuote,
  fetchRandomPokemon,
  fetchBaconIpsum,
} from "./model.js";
import Renderer from "./view.js";

const renderer = new Renderer();

const $generateBtn = $(".generate-btn");
const $saveBtn = $(".save-btn");
const $loadBtn = $(".load-btn");
const $savedUsersDropdown = $(".saved-users-dropdown");

let currentPageData = null;

function showError(message) {
  $(".error-message").remove();
  $(".container").prepend(
    `<div class="error-message" style="color:red; margin-bottom:10px;">${message}</div>`
  );
  setTimeout(
    () =>
      $(".error-message").fadeOut(500, function () {
        $(this).remove();
      }),
    4000
  );
}

function generateUserPage() {
  fetchUsers()
    .then((data) => {
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
      Promise.all([fetchKanyeQuote(), fetchRandomPokemon(), fetchBaconIpsum()])
        .then(([kanyeData, pokemonData, baconData]) => {
          const properName =
            pokemonData.name.charAt(0).toUpperCase() +
            pokemonData.name.slice(1).toLowerCase();
          const pokemon = {
            name: properName,
            image: pokemonData.sprites.front_default,
          };
          const quote = kanyeData.quote;
          const about = baconData[0];
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
        })
        .catch(() =>
          showError(
            "Failed to fetch data from one or more APIs. Please try again."
          )
        );
    })
    .catch(() => showError("Failed to fetch users. Please try again."));
}

generateUserPage();

function updateSavedUsersDropdown() {
  const usersObj = JSON.parse(localStorage.getItem("savedUserPages") || "{}");
  $savedUsersDropdown.empty();
  $savedUsersDropdown.append(`<option value="">Select a user...</option>`);
  Object.keys(usersObj).forEach((key) => {
    $savedUsersDropdown.append(`<option value="${key}">${key}</option>`);
  });
}

$saveBtn.on("click", function () {
  if (currentPageData) {
    let usersObj = JSON.parse(localStorage.getItem("savedUserPages") || "{}");
    const username = `${currentPageData.mainUser.firstName} ${currentPageData.mainUser.lastName}`;
    if (usersObj[username]) {
      alert(
        "A user with this name already exists. Please generate a new user or use a unique name."
      );
      return;
    }
    usersObj[username] = currentPageData;
    localStorage.setItem("savedUserPages", JSON.stringify(usersObj));
    updateSavedUsersDropdown();
    alert("User page saved!");
  }
});

$loadBtn.on("click", function () {
  const selected = $savedUsersDropdown.val();
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

$generateBtn.on("click", function () {
  generateUserPage();
});

$(document).ready(function () {
  updateSavedUsersDropdown();
});
