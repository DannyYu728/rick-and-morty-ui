const url = 'https://rickandmortyapi.com/api/'

// fetch(url)
//   .then(response => {
//     return response.json();
//   })
//   .then(response => {
//     console.log(response);
//   })
//   .catch(error => {
//     console.log("something went wrong...", error);
//   });

let nextButton = document.querySelector('.nextButton')
let pageDisplay = document.querySelector('h3')
let pageNum = 0

function imgList(arr) {
  // console.log(arr);
  let characters = document.querySelector(".character")
  characters.innerHTML = ""
  arr.forEach((char) => {
    let img = document.createElement("img")
    img.src = char.image
    characters.appendChild(img)
  });
}
nextButton.addEventListener('click', () => {
  pageDisplay.innerText = pageNum + 1
  if (pageNum == 41) {
    pageNum = 0
  } else {
    pageNum = pageNum + 1
  }

  fetch(url + `character?page=${pageNum}`)
    .then(response => {
      return response.json();
    })
    .then(response => {
      console.log(response)
      imgList(response.results)
    })
})
