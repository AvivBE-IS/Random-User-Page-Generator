import { fetchUsers, fetchKanyeQuote } from "./model.js";
import Renderer from "./view.js";

const renderer = new Renderer();

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

  renderer.renderMainUser(mainUser);
  renderer.renderFriends(friends);

  // Fetch and render Kanye quote
  fetchKanyeQuote().then((data) => {
    renderer.renderQuote(data.quote);
  });
});
