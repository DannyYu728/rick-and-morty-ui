const url = 'https://rickandmortyapi.com/api/'
let characters = document.querySelector(".characterBox")
let modal = document.querySelector(".modal")
let prevButton = document.querySelector('.prevButton')
let nextButton = document.querySelector('.nextButton')
let tabButton = document.querySelectorAll('.tabButton')
let defaultHead = document.querySelector('.default')
let pageDisplay = document.querySelector('h3')
let pageNum = 0
let pageCount = 0
//Header Tab
// defaultHead.style.display = "block";
defaultHead.classList.add("show")
tabButton.forEach((tabButton, index) => tabButton.addEventListener("click", function () {
  let tabHead = document.querySelectorAll(".tabHead")
  tabHead.forEach((tabHead) => {
    tabHead.classList.remove("show");
    // tabHead.style.display = "none";
  })
  // document.getElementById(tabButton.innerText).style.display = "block";
  document.getElementById(tabButton.innerText).classList.add("show");
  if (tabButton.innerText == "Characters") {
    
  } else if (tabButton.innerText == "Locations") {
    
  } else {
    
  }
}))

let createIMG = (arr) => {
  arr.forEach((char) => {
    let htmlTemplate = `
    <div class ="charCard" id="${char.id}">
    <img class ="ima" src ="${char.image}">
    </div>`
    characters.insertAdjacentHTML("beforeend", htmlTemplate)
  });
}

//Character Box Function
function imgList(arr) {
  characters.innerText = ""
  createIMG(arr)
  // arr.forEach((char) => {
  //   let htmlTemplate = `
  //   <div class ="charCard" id="${char.id}">
  //   <img class ="ima" src ="${char.image}">
  //   </div>`
  //   characters.insertAdjacentHTML("beforeend", htmlTemplate)
  // });
  //Modal
  let charCards = document.querySelectorAll(".charCard")
  charCards.forEach((charCards, index) => charCards.addEventListener("click", function (e) {
    modal.classList.add("show")
    modal.innerText = ""
    let charId = arr[index]
    let htmlTemplate = `
    <div class ="charModal">
    <img class ="imgModal" src ="${charId.image}">
    <button class="exit">X</button>
    <p>ID: ${charId.id}</p>
    <p>Name: ${charId.name}</p>
    <p>Status: ${charId.status}</p>
    <p>Species: ${charId.species}</p>
    <p>Origin: ${charId.origin.name}</p>
    <p>Location: ${charId.location.name}</p>
    </div>`
    modal.insertAdjacentHTML("beforeend", htmlTemplate)
    let exit = document.querySelector('.exit')
    exit.addEventListener('click', () => {
      modal.textContent = ""
      modal.classList.remove("show")
    })
  }))
}
//GET Character pages
async function fetchCharacters() {
  let response = await axios(url + `character?page=${pageNum}`)
  pageCount = response.data.info.pages
  imgList(response.data.results)
}
let pageDown = () => {
  if (pageNum == 0) {
    pageNum = 42
  } else if (pageNum > 1) {
    pageNum = pageNum - 1
  } else {
    pageNum = pageCount
  }
  pageDisplay.innerText = pageNum
}
let pageUp = () => {
  if (pageNum < pageCount) {
    pageNum = pageNum + 1
  } else {
    pageNum = 1
  }
  pageDisplay.innerText = pageNum
}
//Previous Button
prevButton.addEventListener('click', () => {
  pageDown()
  fetchCharacters()
})
//Next Button
nextButton.addEventListener('click', () => {
  pageUp()
  fetchCharacters()
})






