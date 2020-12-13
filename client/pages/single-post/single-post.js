/////////// Show post logic //////////

const postId = new URLSearchParams(window.location.search).get("postId");
console.log(postId);

let post;

getData();

async function getData() {
  const resp = await axios.get(`/api/posts/${postId}`);

  post = resp.data.post;

  console.log(post);

  renderPost(post);
  renderComments(post);
}

////////// Slanje komentara /////////////

const btnSendComment = document.querySelector("#comment-btn");

btnSendComment.addEventListener("click", async () => {
  console.log("dugme je kliknuto");

  const inputAuthor = document.querySelector(".leave-comment-box input");
  const inputText = document.querySelector(".leave-comment-box textarea");

  const author = inputAuthor.value;
  const text = inputText.value;

  if (author == "" || text == "") {
    alert("Popunite komentar!");
    return;
  }

  const resp = await axios.post("/api/comment", {
    postId: postId,
    author: author,
    text: text,
  });

  console.log(resp.data);

  location.reload();
});

// Render functions

function renderPost(post) {
  const { _id, author, text, createdAt } = post;

  const html = `
      <div class="post-id"> #${_id}</div>
      <div class="post-header">
          <div class="author"> ${author} </div>
          <div class="post-time">${createdAt}</div>
      </div>
      <div class="text">
          ${text}
      </div>
      `;

  const postDiv = document.querySelector(".post");

  postDiv.innerHTML = html;
}

function renderComments(post) {
  const comments = post.comments;
  const commentsContainer = document.querySelector(".comments");
  let div;

  comments.forEach((comment) => {
    div = createCommentDiv(comment);
    commentsContainer.appendChild(div);
  });
}

function createCommentDiv(comment) {
  const { author, text, createdAt } = comment;
  const div = document.createElement("div");
  div.className = "comment";

  div.innerHTML = `
    <div class="comment-header">
        <div class="comment-author"> ${author} </div>
        <div class="post-time">${createdAt}</div>
    </div>
    <div class="comment-text">
       ${text}
    </div>
    `;

  return div;
}

///////// Open comment section ////////////

const btnOpenCommentSection = document.querySelector("#comment-section-btn");
btnOpenCommentSection.addEventListener("click", () => {
  const commentSection = document.querySelector(".footer");
  commentSection.classList.remove("hidden");
});

const btnDontComment = document.querySelector("#dont-comment-btn");
btnDontComment.addEventListener("click", () => {
  const commentSection = document.querySelector(".footer");
  commentSection.classList.add("hidden");
});
