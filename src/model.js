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
