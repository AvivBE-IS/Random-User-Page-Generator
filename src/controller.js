import { fetchUsers } from "./model.js";
import Renderer from "./view.js";

const renderer = new Renderer();

fetchUsers().then((data) => {
  const users = data.results;

  const mainUser = {
    firstName: users[0].name.first,
    lastName: users[0].name.last,
  };

  const friends = users.slice(1).map((user) => ({
    firstName: user.name.first,
    lastName: user.name.last,
  }));

  renderer.renderMainUser(mainUser);
  renderer.renderFriends(friends);
});
