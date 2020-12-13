const btnGet = document.querySelector("#btnGet");
const btnPost = document.querySelector("#btnPost");

btnGet.addEventListener("click", async () => {
  const resp = await axios.get("/api/podatak");

  console.log(resp.data);
});

btnPost.addEventListener("click", async () => {
  const resp = await axios.post("/api/posalji", {
    podatak: "Ovo je moj post request",
    broj: 10,
  });

  console.log(resp);
});
