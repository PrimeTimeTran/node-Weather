const weatherForm = document.querySelector("form");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", async e => {
  e.preventDefault();
  const search = document.querySelector("input");
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  const response = await fetch(
    `/weather?address=${search.value}`
  );
  search.value = ''
  const data = await response.json();
  if (data) {
    messageOne.textContent = data.location;
    messageTwo.textContent = data.forecast;
  }
});

document.querySelector("input").focus();
