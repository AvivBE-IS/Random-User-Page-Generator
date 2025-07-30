export function fetchUsers() {
  return $.ajax({
    url: "https://randomuser.me/api/?results=7",
    dataType: "json",
  });
}
