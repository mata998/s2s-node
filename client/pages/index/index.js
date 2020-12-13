/////////////// Show posts logic //////////////////

let posts;

getData();

async function getData() {
  const resp = await axios.get("/api/posts");

  posts = resp.data.posts;

  console.log(posts);

  renderPosts(posts);

  addEventListeneres();
}

////// POSALJI POST//////

const btnSend = document.querySelector("#send-post-btn");

btnSend.addEventListener("click", async () => {
  console.log("kliknuto");

  const inputAuthor = document.querySelector(".input-author");
  const inputText = document.querySelector(".input-text");

  const author = inputAuthor.value;
  const text = inputText.value;

  if (author == "" || text == "") {
    alert("Popunite post kako treba!");
    return;
  }

  const resp = await axios.post("/api/posts", {
    author: author,
    text: text,
  });

  console.log(resp.data);

  location.reload();
});

///////////// klik na neki post /////////////////

function addEventListeneres() {
  // querySelectorAll vraca NodeCollection
  // to se pretvara u obican niz [...]
  const allPosts = [...document.querySelectorAll(".post")];

  allPosts.forEach((post) => {
    post.addEventListener("click", () => {
      const postId = post.getAttribute("post-id");
      console.log(postId);

      location.href = `/pages/single-post/single-post.html?postId=${postId}`;
    });
  });
}

//
//
//
//
//
//
//
// Render functions

function renderPosts(posts) {
  const postsContainer = document.querySelector(".posts");
  let div;

  posts.forEach((post) => {
    div = createPostDiv(post);
    postsContainer.appendChild(div);
  });
}

function createPostDiv(post) {
  const { _id, author, text, createdAt, commentsNumber } = post;

  const div = document.createElement("div");
  div.className = "post";
  div.setAttribute("post-id", _id);

  div.innerHTML = `
    <div class="post-header">
      <div class="author"> ${author} </div>
      <div class="post-time">${createdAt}</div>
    </div>
    <div class="text">
      ${text}
    </div>
    <div class="post-footer">
      <p>${commentsNumber} komentara</p>
    </div>
  `;

  return div;
}

// Show input field

const boxShowInput = document.querySelector(".input-btn-box");
const boxInput = document.querySelector(".input-block");

const btnShowInput = document.getElementById("show-input-btn");

btnShowInput.addEventListener("click", () => {
  boxShowInput.style.display = "none";
  boxInput.style.display = "block";
});
