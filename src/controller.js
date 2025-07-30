import { fetchUsers } from "./model.js";

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

  console.log("Main user:", mainUser);
  console.log("Friends:", friends);

  // You can now pass this cleaned data to your View/Renderer
});
