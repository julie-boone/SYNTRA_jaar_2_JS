let headersList = {
  Accept: "*/*",
  "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  "X-API-Key": "mthxEJ3ZlK7T7d+JtlJs7g==RBod17v8d1tY4p77",
};

function getRandomJoke() {
  getJoke()
    .then((res) => res.json())
    .then(response);
}

function getJoke() {
  return fetch(`https://api.api-ninjas.com/v1/dadjokes?`, {
    method: "GET",
    headers: headersList,
  });
}

function response(res) {
  const jokeStation = document.getElementById("joke_station");
  const joke = res[0].joke;
  jokeStation.innerText = joke;
}
