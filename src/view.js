export default class Renderer {
  renderMainUser(user) {
    // Update the main user's name in the .user-info h2
    $(".user-info h2").text(`${user.firstName} ${user.lastName}`);
    // Optionally clear h3 or set more info if needed
    $(".user-info h3").text(""); // Or set to something meaningful
  }

  renderFriends(friends) {
    // Update the friends list inside .friends-list ul
    const container = $(".friends-list ul");
    container.empty();
    friends.forEach((friend) => {
      container.append(`<li>${friend.firstName} ${friend.lastName}</li>`);
    });
  }
}
