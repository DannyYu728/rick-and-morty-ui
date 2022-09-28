const url = 'https://rickandmortyapi.com/api/'

let nextButton = document.querySelector('.nextButton')
let prevButton = document.querySelector('.prevButton')
let pageDisplay = document.querySelector('h3')
let pageNum = 1

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
  if (pageNum < 42) {
    pageNum = pageNum + 1
  } else {
    pageNum = 1
  }
  pageDisplay.innerText = pageNum 
  fetch(url + `character?page=${pageNum}`)
    .then(response => {
      return response.json();
    })
    .then(response => {
      console.log(response)
      imgList(response.results)
    })
})

prevButton.addEventListener('click', () => {
  if (pageNum > 1) {
    pageNum = pageNum - 1
  } else {
    pageNum = 42
  }
  pageDisplay.innerText = pageNum
  fetch(url + `character?page=${pageNum}`)
    .then(response => {
      return response.json();
    })
    .then(response => {
      console.log(response)
      imgList(response.results)
    })
})
