export default class Renderer {
  renderMainUser(user) {
    // Update the main user's name
    $(".user-info h2").text(`${user.firstName} ${user.lastName}`);
    // Update city and state
    $(".user-info h3").text(`${user.city}, ${user.state}`);
    // Update the user's image
    $(".user-img").attr("src", user.picture);
  }

  renderFriends(friends) {
    const container = $(".friends-list ul");
    container.empty();
    friends.forEach((friend) => {
      container.append(`<li>${friend.firstName} ${friend.lastName}</li>`);
    });
  }

  renderQuote(quote) {
    $(".quote").text(`"${quote}"`);
  }
}
