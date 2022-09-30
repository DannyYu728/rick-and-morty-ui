const ramUrl = 'https://rickandmortyapi.com/api/'
const tempWP = 'https://coolthemestores.com/wp-content/uploads/2021/05/rick-and-morty-chrome-theme-wallpaper.jpg'
const tempWP2 = 'https://play-lh.googleusercontent.com/fVRg0B1Pgo0l93mSrqSnqZSNNcaqEyMGc-Y2qWqhwOE-IhYe1ogAnnFuieK9iZ8VVg'
let mainBox = document.querySelector(".mainBox")
let modal = document.querySelector(".modal")
let buttonChange = document.querySelectorAll('.buttonChange')
let prevButton = document.querySelector('.prevButton')
let nextButton = document.querySelector('.nextButton')
let tabButton = document.querySelectorAll('.tabButton')
let defaultHead = document.querySelector('.default')
let pageDisplay = document.querySelector('h3')
let pageNum = 0
let pageCount = 0
//Header Tab and header's Buttons
defaultHead.classList.add("show")
tabButton.forEach((tabButton) => tabButton.addEventListener("click", function () {
  mainBox.innerText = ""
  let tabHead = document.querySelectorAll(".tabHead")
  tabHead.forEach((tabHead) => {
    tabHead.classList.remove("show");
  })
  document.getElementById(tabButton.innerText).classList.add("show");
  buttonChange.forEach((button) => {
    if (tabButton.innerText == "Characters") {
      pageNum = 0
      button.classList.add("charButton");
      button.classList.remove("locButton", "epsButton")
    } else if (tabButton.innerText == "Locations") {
      pageNum = 0
      button.classList.add("locButton");
      button.classList.remove("charButton", "epsButton")
    } else {
      pageNum = 0
      button.classList.add("epsButton");
      button.classList.remove("locButton", "charButton")
    }
  })
}))
//Create Images
let createIMG = (arr) => {
  if (buttonChange[0].classList.contains("charButton")) {
    arr.forEach((imgCard) => {
      let htmlTemplate = `
      <div class ="charCard card" id="${imgCard.id}">
      <img class ="ima" src ="${imgCard.image}">
      </div>`
      mainBox.insertAdjacentHTML("beforeend", htmlTemplate)
    });
  } else if (buttonChange[0].classList.contains("locButton")) {
    arr.forEach((loc) => {
      let htmlTemplate = `
      <div class ="infoCard card" id="${loc.id}">
      <p class="pInfo">Location Name: ${loc.name}</p>
      </div>`
      mainBox.insertAdjacentHTML("beforeend", htmlTemplate)
    });
  } else {
    arr.forEach((eps) => {
      let htmlTemplate = `
      <div class ="infoCard card" id="${eps.id}">
      <p class="pInfo">Episode Name: ${eps.name}</p>
      </div>`
      mainBox.insertAdjacentHTML("beforeend", htmlTemplate)
    });
  }
  morty()
}
//Modal Box Function
function imgList(arr) {
  mainBox.innerText = ""
  createIMG(arr)
  //Modal card
  let cards = document.querySelectorAll(".card")
  cards.forEach((cards, index) => cards.addEventListener("click", function () {
    modal.classList.add("show")
    modal.innerText = ""
    let cardId = arr[index]
    if (buttonChange[0].classList.contains("charButton")) {
      let htmlTemplate = `
      <div class ="charModal">
      <img class ="imgModal" src ="${cardId.image}">
      <button class="exit">X</button>
      <p class="pChar">ID: ${cardId.id}</p>
      <p class="pChar">Name: ${cardId.name}</p>
      <p class="pChar">Status: ${cardId.status}</p>
      <p class="pChar">Species: ${cardId.species}</p>
      <p class="pChar">Origin: ${cardId.origin.name}</p>
      <p class="pChar">Location: ${cardId.location.name}</p>
      </div>`
      modal.insertAdjacentHTML("beforeend", htmlTemplate)
    } else if (buttonChange[0].classList.contains("locButton")) {
      let htmlTemplate = `
      <div class ="charModal">
      <img class ="imgModal" src ="${tempWP}">
      <button class="exit">X</button>
      <p class="pChar">ID: ${cardId.id}</p>
      <p class="pChar">Name: ${cardId.name}</p>
      <p class="pChar">Type: ${cardId.type}</p>
      <p class="pChar">Dimension: ${cardId.dimension}</p>
      <p class="pChar">Number of Residents: ${cardId.residents.length}</p>
      </div>`
      modal.insertAdjacentHTML("beforeend", htmlTemplate)
    } else {
      let htmlTemplate = `
      <div class ="charModal">
      <img class ="imgModal" src ="${tempWP2}">
      <button class="exit">X</button>
      <p class="pChar">ID: ${cardId.id}</p>
      <p class="pChar">Name: ${cardId.name}</p>
      <p class="pChar">Air Date: ${cardId.air_date}</p>
      <p class="pChar">Episode: ${cardId.episode}</p>
      <p class="pChar">Number of Characters: ${cardId.characters.length}</p>
      </div>`
      modal.insertAdjacentHTML("beforeend", htmlTemplate)
    }
    let exit = document.querySelector('.exit')
    exit.addEventListener('click', () => {
      modal.textContent = ""
      modal.classList.remove("show")
    })
  }))
}
async function fetchie() {
  if (buttonChange[0].classList.contains("charButton")) {
    let response = await axios(ramUrl + `character?page=${pageNum}`)
    console.log(response.data)
    pageCount = response.data.info.pages
    imgList(response.data.results)
  } else if (buttonChange[0].classList.contains("locButton")) {
    let response = await axios(ramUrl + `location/?page=${pageNum}`)
    pageCount = response.data.info.pages
    imgList(response.data.results)
  } else {
    let response = await axios(ramUrl + `episode/?page=${pageNum}`)
    pageCount = response.data.info.pages
    imgList(response.data.results)
  }

}
let pageDown = () => {
  if (pageNum > pageCount) {
    pageNum = 1
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

let morty = () => {
  let morty = document.createElement("div")
  let cat = document.createElement("div")
  morty.classList.add("morty")
  cat.classList.add("cat")
  mainBox.appendChild(morty)
  mainBox.appendChild(cat)

  let moving = () => {
    let topSpeed = `${Math.floor(Math.random() * window.innerHeight)}px`
    let leftSpeed = `${Math.floor(Math.random() * window.innerWidth)}px`
    morty.style.top = topSpeed;
    morty.style.left = leftSpeed;
  }
  setInterval(moving, 1000)
  let movingCat = () => {
    let topSpeed = `${Math.floor(Math.random() * 1000)}px`
    let leftSpeed = `${Math.floor(Math.random() * 1000)}px`
    cat.style.top = topSpeed;
    cat.style.left = leftSpeed;
  }
  setInterval(movingCat, 1000)
}
//Previous Button
prevButton.addEventListener('click', () => {
  pageDown()
  fetchie()
})
//Next Button
nextButton.addEventListener('click', () => {
  pageUp()
  fetchie()
})

morty()




