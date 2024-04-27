export const authEle = {
  loginForm: document.querySelector("#login"),
  nameInp: document.querySelector("#name"),
  passInp: document.querySelector("#pass"),
  nameArea: document.querySelector(".name-warning"),
  passArea: document.querySelector(".pass-warning"),
};
export const mainEle = {
  pics: document.querySelectorAll("#profile-pic"),
  userName: document.querySelector(".user-info #user-name"),
  userTag: document.querySelector("user-info #user-tag"),
  logoutBtn: document.querySelector("#logout-btn"),
  tweetsArea: document.querySelector(".tweetsArea"),
  main: document.querySelector("main"),
  searchForm: document.querySelector("aside form"),
  themeCheck: document.querySelector("#theme"),
};
export const renderUserInfo = (user) => {
  mainEle.pics.forEach((img) => (img.src = user.avatar));
  mainEle.userName.innerText = user.name;
  mainEle.userTaginnerText = "@" + user.profile;
};
const getMedia = (media) => {
  if (media.photo && media.photo.length > 0) {
    const imageUrl = media.photo[0].media_url_https;
    return `<img src="${imageUrl}"/>`;
  }
  if (media.video) {
    const filter = media.video[0].variants.filter(
      (item) => item.content_type === "video/mp4"
    );
    const sorted = filter.sort((a, b) => b.bitrate - a.bitrate);

    return `
        <video controls>
        <source src="${sorted[0].url}"/>
        </video>
        `;
  }
  return "";
};
export const renderTimeLine = (user, data, otulet) => {
  let timelineHTML = data
    .map(
      (tweet) => `
        <div class="tweet">
        ${tweet[user] ? `<img src=${tweet[user]?.avatar} id="user-img" />` : ""}
         <div class="body">
             <div class="user">
             ${
               tweet[user]
                 ? `<a href="?page=user&q=${
                     tweet[user]?.screen_name
                   }" class="info">
                 <img src=${tweet[user]?.avatar} id="mobile-img" />
                 <b>${tweet[user]?.name}</b>
                 <p>@${tweet[user]?.screen_name}</p>
                 <p>${moment(tweet.created_at).fromNow()}</p>
               </a>`
                 : '<p> <i class="bi bi-recycle"></i>Post Retweeted</p>'
             }      
               <i class="bi bi-three-dots"></i>
             </div>
             <a href="?page=status&q=${tweet.tweet_id}" class="content">
               <p class="text-content">${tweet.text}</p>
               ${getMedia(tweet.media)}
             </a>
             <div class="buttons">
               <button>
                 <i class="fa-regular fa-comment"></i> <span>${
                   tweet.replies
                 }</span>
               </button>
               <button>
               <i class="fa-solid fa-retweet"></i> <span>${
                 tweet.retweets
               }</span>
             </button>
             <button>
               <i class="fa-regular fa-heart"></i> <span>${
                 tweet.favorites
               }</span>
             </button>
             <button>
               <i class="fa-regular fa-bookmark"></i> <span>${
                 tweet.bookmarks
               }</span>
             </button>
           </div>
         </div>
       </div>
        `
    )
    .join("");
  otulet.innerHTML = timelineHTML;
};
export const renderLoader = (outlet) => {
  outlet.innerHTML = `
    <div class="d-flex justify-content-center mt-4">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    `;
};
export const renderInfo = (info, user) => {
  const html = `
    <div class="info-area">
    <div class="top">
      <i class="bi bi-arrow-left"></i>
      <h3>Tweet</h3>
    </div>
    <div class="tweet tweet-info">
     <img id="user-img" src="${info.author.image}"/>
     <div class="body">
       <div class="user">
        <a href="?page=user&q=${info.author.screen_name}">
          <img id="mobile-img" src="${info.author.image}"/>
          <b>${info.author.name}</b>
          <p>@${info.author.screen_name}</p>
        </a>
        <button>Subscribe</button>
      </div>
      <div class="content">
        <p>${info.text}</p>
        ${info.media && getMedia(info?.media)}
      </div>
      <div class="info">
      <p>${info.created_at}</p>

      <p>
       <span>${info.views}</span>
       <span>Viewed</span>
      </p>
     </div>
        <div class="buttons">
         <button>
           <i class="bi bi-chat"></i>
           <span>${info.replies}</span>
         </button>
         <button>
           <i class="bi bi-recycle"></i>
           <span>${info.retweets}</span>
         </button>
         <button>
           <i class="bi bi-heart"></i>
           <span>${info.likes}</span>
         </button>
         <button>
         <i class="bi bi-bookmark"></i>
         <span>${info.bookmarks}</span>
       </button>
   </div>
  </div>
 </div>
</div>
<form id="comment-form">
  <img src="${user.avatar}"/>
  <input placeholder="Send Your Responce" /> 
  <button>Responce</button>
</form>
`;
  mainEle.main.innerHTML = html;
};
export const renderEmptyInfo = (text = "Sent") => {
  mainEle.main.innerHTML = `
    <div class="top loading-top">
      <i class="bi bi-arrow-left"></i>
      <h3>${text}</h3>
    </div>
    <div class="d-flex justify-content-center my-4">
      <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
      </div>
    </div>
    `;
};
export const renderUser = (user) => {
  mainEle.main.innerHTML = `
    <div class="user-page">
        <div class="page-top">
          <div id="nav">
            <i id="back-btn" class="bi bi-arrow-left"></i>
            <div>
              <h3>${user.name}</h3>
              <p>
                <span>${user.statuses_count}</span>
                <span>Tweet</span>
              </p>
            </div>
          </div>
          <div class="banner">
            <img
              src="${user.header_image}"
            />
            <img
              src="${user.avatar}"
            />
          </div>
          <div class="buttons">
            <div><i class="bi bi-three-dots"></i></div>
            <div><i class="bi bi-envelope"></i></div>
            <button>Takip Et</button>
          </div>
          <div class="user_info">
            <h4>
              <span>${user.name}</span>
              <i class="bi bi-patch-check-fill"></i>
            </h4>
            <p class="p_name">@${user.profile}</p>
            <div>
              <a href="#">
                <span>${user.friends}</span>
                <span>Following</span>
              </a>
              <a href="#">
                <span>${user.sub_count}</span>
                <span>Followers</span>
                </a>
                </div>
              </div>
                  <div class="cat-wrapper">
                <label>
                  <input name="cat" type="radio" checked />
                  <span>Tweets</span>
                </label>
                <label>
                  <input name="cat" type="radio" />
                  <span>Responces</span>
                </label>
                <label>
                  <input name="cat" type="radio" />
                  <span>Media</span>
                </label>
                <label>
                  <input name="cat" type="radio" />
                  <span>Like</span>
                </label>
              </div>
            </div>
        <div class="page-bottom">
          <div class="d-flex justify-content-center mt-4">
            <div class="spinner-border" role="status"></div>
          </div>
        </div>
      </div>
    `;
};