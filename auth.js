import { API } from "./api.js";
import { setLocal } from "./helpers.js";
import { authEle } from "./ui.js";
const api = new API();
const regex =
  "(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$";
const renderWarn = (nameWarn, passWarn) => {
  if (nameWarn) {
    authEle.nameArea.innerHTML = `<p class="warning">${passWarn}</p>`;
  } else {
    authEle.nameArea.innerHTML = "";
  }
  if (passWarn) {
    authEle.passArea.innerHTML = `<p class="warning">${passWarn}</p>`;
  } else {
    authEle.passArea.innerHTML = "";
  }
};
authEle.loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let nameWarn = null;
  let passWarn = null;

  const name = authEle.nameInp.value;
  const pass = authEle.passInp.value;

  if (!name) {
    nameWarn = "Name Area Is Neccesary.";
  } else if (name.length <= 3) {
    nameWarn = "Name Can Not Be Shorter Than 3 Characters.";
  } else {
    nameWarn = null;
  }

  if (!pass) {
    passWarn = "Fill the Password Area.";
  } else if (pass.lenth < 8) {
    passWarn = "Password Can Not Be Shorter Than 8 Characters.";
  } else if (!pass.match(regex)) {
    passWarn = "Password Is Not Strong.";
  } else {
    passWarn = null;
  }
  renderWarn(nameWarn, passWarn);
  if (!nameWarn && !passWarn) {
    const userData = await api.getUser(name);
    setLocal("user", userData);
    window.location = "/";
  }
});