import { API } from "./api.js";
import { getLocal } from "./helpers.js";
import {
  mainEle,
  renderEmptyInfo,
  renderInfo,
  renderLoader,
  renderTimeLine,
  renderUserInfo,
  renderUser,
} from "./ui.js";
const api = new API();
document.addEventListener("DOMContentLoaded", () => {
  const user = getLocal("user");
  renderUserInfo(user);
  const isDarkTheme = getLocal("theme");
  if (!isDarkTheme) {
    document.body.classList.add("light");
    mainEle.themeCheck.checked = false;
  }
});
mainEle.logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location = "/auth.html";
});
const controlURL = async (e) => {
  const params = new URLSearchParams(location.search);
  const page = params.get("page");
  const query = params.get("q");
  const user = getLocal("user");
  if (!user) {
    location = "/auth.html";
  }
  switch (page) {
    case "status":
      renderEmptyInfo();
      const info = await api.fetchData(`/tweet.php?id=${query}`);
      renderInfo(info, user);
      break;
    case "search":
      renderEmptyInfo(`Results for ${query}`);
      api
        .fetchData(`search.php?query=${query}&search_type=top`)
        .then((data) =>
          renderTimeLine("user_info", data.timeLine, mainEle.main)
        );
      break;
    case "user":
      renderEmptyInfo(query);
      api.getUser(query).then((user_data) => {
        renderUser(user_data);
        const outlet = document.querySelector(".page-bottom");
        api.fetchData(`/timeline.php?screenname=${query}`).then((data) => {
          renderTimeLine("author", data.timeline, outlet);
        });
      });
    default:
      renderLoader(mainEle.tweetsArea);
      const data = await api.fetchData(
        `/timeline.php?screenname=${user.profile}`
      );
      renderTimeLine("author", data.timeline, mainEle.tweetsArea);
  }
};
["hashchange", "load"].forEach((event) => {
  window.addEventListener(event, controlURL);
});
mainEle.main.addEventListener("click", (e) => {
  if (e.target.classList.contains("bi-arrow-left")) {
    history.back();
  }
});
mainEle.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = e.target[0].value;
  window.location = `?page=search&q=${searchTerm}`;
});
mainEle.themeCheck.addEventListener("change", (e) => {
  const isDarkMode = e.target.checked;
  if (!isDarkMode) {
    document.body.classList.add("light");
    localStorage.setItem("theme", "false");
  } else {
    document.body.classList.remove("light");
    localStorage.setItem("theme", "true");
  }
});