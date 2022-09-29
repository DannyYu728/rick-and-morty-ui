const url = 'https://rickandmortyapi.com/api/'
let characters = document.querySelector(".characterBox")
let modal = document.querySelector(".modal")
let prevButton = document.querySelector('.prevButton')
let nextButton = document.querySelector('.nextButton')
let tabButton = document.querySelectorAll('.tabButton')
let defaultHead = document.querySelector('.default')
let pageDisplay = document.querySelector('h3')
let pageNum = 0

//Header Tab
defaultHead.style.display = "block";
tabButton.forEach(tabButton => tabButton.addEventListener("click", function () {
  let tabHead = document.querySelectorAll(".tabHead")
  tabHead.forEach((tabHead) => {
    tabHead.style.display = "none";
  })
  document.getElementById(tabButton.innerText).style.display = "block";
}))
//Character Box Function
function imgList(arr) {
  characters.innerText = ""
  arr.forEach((char) => {
    let htmlTemplate = `
    <div class ="charCard" id="${char.id}">
    <img class ="ima" src ="${char.image}">
    </div>
    `
    characters.insertAdjacentHTML("beforeend", htmlTemplate)
  });
  let charCards = document.querySelectorAll(".charCard")
  charCards.forEach(charCards => charCards.addEventListener("click", function () {
    modal.classList.add("show")
    modal.innerText = ""
    let charId = arr[charCards.id - 1]
    console.log(arr)
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
  imgList(response.data.results)
  // console.log(response.data.results)
}
//Previous Button
prevButton.addEventListener('click', () => {
  if (pageNum > 1) {
    pageNum = pageNum - 1
  } else {
    pageNum = 42
  }
  pageDisplay.innerText = pageNum
  fetchCharacters()
})
//Next Button
nextButton.addEventListener('click', () => {
  if (pageNum < 42) {
    pageNum = pageNum + 1
  } else {
    pageNum = 1
  }
  pageDisplay.innerText = pageNum
  fetchCharacters()
})






