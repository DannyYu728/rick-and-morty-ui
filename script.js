const url = 'https://rickandmortyapi.com/api/'
let nextButton = document.querySelector('.nextButton')
let prevButton = document.querySelector('.prevButton')
let tabButton = document.querySelectorAll('.tabButton')
let defaultHead = document.querySelector('.default')
let pageDisplay = document.querySelector('h3')
let pageNum = 1

//Header Tab
defaultHead.style.display = "block";
tabButton.forEach(tabButton => tabButton.addEventListener("click", function () {
  let tabHead = document.querySelectorAll(".tabHead")
  tabHead.forEach((tabHead) => {
    console.log(tabHead)
    tabHead.style.display = "none";
  })
  document.getElementById(tabButton.innerText).style.display = "block";
}))

//Character Box Function
function imgList(arr) {
  let characters = document.querySelector(".characterBox")
  characters.innerText = ""
  arr.forEach((char) => {
    let img = document.createElement("img")
    img.src = char.image
    img.classList.add("ima")
    characters.appendChild(img)
  });
}

//Next Button
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
      imgList(response.results)
    })
})

//Previous Button
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
      imgList(response.results)
    })
})
