
function createMenuElements() {
  createExitButton();
  createTexts();
  createInputs();
}
function createExitButton() {
  let exitButton = document.createElement("button");
  exitButton.innerText = "+";
  exitButton.setAttribute("id", "exitButton");
  notificationMenu.appendChild(exitButton);

  exitButton.addEventListener("click", () => {
    tempoBody.style.cssText = "";
    notificationMenu.style.cssText = "bottom: 2px;";
    notificationButton.style.cssText = "";
    notificationMenu.innerHTML = "";
    notificationMenu.classList.remove("fading-in");
  });
}
function createInputs() {
  let inputs = [
    document.createElement("input"),
    0,
    document.createElement("input"),
    
  ];
  let inputDiv = document.createElement("div");
  inputDiv.setAttribute("id", "notif-inputDiv");
  for (let i = 0; i < 3; i++) {
    if (i % 2 == 0) {
      inputs[i].setAttribute("id", `notif-input${1 + i}`);
      inputs[i].setAttribute("type", "number");
      inputDiv.appendChild(inputs[i]);
    } else {
      let notifParagraph = document.createElement("p");
      notifParagraph.textContent = ":";
      inputDiv.appendChild(notifParagraph);
    }
  }
  notificationMenu.appendChild(inputDiv);
  console.log(inputDiv);
}
function createTexts() {
  let title = document.createElement("h3");
  title.textContent = "Teste";
  notificationMenu.appendChild(title);
}
