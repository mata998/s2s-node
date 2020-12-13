const posts = [
  {
    _id: 1,
    author: "Pera",
    text: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis
          dolores, dicta adipisci molestias harum corrupti assumenda a. Quis
          unde fuga consequatur laborum ex eveniet voluptates necessitatibus
          aliquid, exercitationem dignissimos veritatis!`,
    createdAt: new Date(),
    commentsNumber: 2,
    comments: [
      {
        author: "Zika",
        text: "Prvi komentar",
        createdAt: new Date(),
      },
      {
        author: "Laza",
        text: "Komentar broj dva",
        createdAt: new Date(),
      },
    ],
  },
  {
    _id: 2,
    author: "Mare",
    text: `Ovo je mnogo dobar post`,
    createdAt: new Date(),
    commentsNumber: 1,
    comments: [
      {
        author: "Pera",
        text: "Jeste!",
        createdAt: new Date(),
      },
    ],
  },
];

function getAllPosts() {
  return posts;
}

function addNewPost(newPost) {
  //ubacuje objekat na pocetak niza
  posts.unshift(newPost);
}

module.exports = { getAllPosts, addNewPost };
