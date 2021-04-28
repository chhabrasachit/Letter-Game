let selectedLetter

function createDivs () {
  const colors = ['pink', 'cyan', 'silver', 'white', 'green']
  for (const color of colors) {
    createGameDiv(color)
    if (Math.random() > 0.3) {
      createAdDiv()
    }
  }
}

function createGameDiv (color) {
  const gamediv = document.createElement('div')
  gamediv.className = 'gamediv'
  gamediv.style.backgroundColor = color
  gamediv.style.minHeight = '120px'
  document.body.appendChild(gamediv)
}

function createAdDiv () {
  const addiv = document.createElement('div')
  addiv.className = 'addiv'
  addiv.style.backgroundImage = 'url(https://getadblock.com/images/dark_banner.png?v=1564022898)'
  addiv.style.backgroundSize = 'contain'
  addiv.style.minHeight = '120px'
  document.body.appendChild(addiv)
}

function createImages () {
  for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
    const letter = String.fromCharCode(i)

    const img = document.createElement('img')
    img.id = letter
    img.src = 'images/letters/' + letter + '.png'
    img.height = 100
    img.onclick = function () {
      selectedLetter.className = ''
      selectedLetter = this
      this.className = 'selected'
      moveRight(this)
    }

    document.getElementsByClassName('gamediv')[0].appendChild(img)
  }
}

function moveRight (letterImage) {
  if (letterImage.nextSibling != null) {
    // it has a next neighbor
    letterImage.parentNode.insertBefore(letterImage.nextSibling, letterImage)
    return
  }

  const gameDivArray = document.getElementsByClassName('gamediv')
  const parentIndex = Array.prototype.indexOf.call(gameDivArray, letterImage.parentNode)

  // this is the last image in this gamediv
  // check if there is another gamediv after it's parent for it go go to
  if (parentIndex >= gameDivArray.length - 1) {
    // this is the last image in the last gamediv
    // let's make it the first image in the first gamediv
    gameDivArray[0].insertAdjacentElement('afterbegin', letterImage)
    return
  }

  // move this image to be the first image
  // in the next gamediv
  gameDivArray[parentIndex + 1].insertAdjacentElement('afterbegin', letterImage)
}

function moveLeft (letterImage) {
  if (letterImage.previousSibling != null) {
    // it has a previous neighbor
    console.log(letterImage.parentNode)
    letterImage.parentNode.insertBefore(letterImage, letterImage.previousSibling)
    return
  }

  const gameDivArray = document.getElementsByClassName('gamediv')
  const parentIndex = Array.prototype.indexOf.call(gameDivArray, letterImage.parentNode)

  // this is the last image in this gamediv
  // check if there is another gamediv after it's parent for it go go to
  if (parentIndex <= 0) {
    // this is the first image in the first gamediv
    // let's make it the last image in the last gamediv
    gameDivArray[0].insertAdjacentElement('beforeend', letterImage)
    return
  }

  // move this image to be the last image
  // in the previous gamediv
  gameDivArray[parentIndex - 1].insertAdjacentElement('beforeend', letterImage)
}

function moveDown (letterImage) {
  const gameDivArray = document.getElementsByClassName('gamediv')
  const parentIndex = Array.prototype.indexOf.call(gameDivArray, letterImage.parentNode)
  const childIndex = Array.prototype.indexOf.call(letterImage.parentNode.children, letterImage)

  if (gameDivArray[parentIndex + 1] != null) {
    gameDivArray[parentIndex + 1].insertBefore(
      letterImage,
      gameDivArray[parentIndex + 1].childNodes[childIndex]
    )
  } else {
    gameDivArray[0].insertBefore(
      letterImage,
      gameDivArray[0].childNodes[childIndex])
  }
}

function moveUp (letterImage) {
  const gameDivArray = document.getElementsByClassName('gamediv')
  const parentIndex = Array.prototype.indexOf.call(gameDivArray, letterImage.parentNode)
  const childIndex = Array.prototype.indexOf.call(letterImage.parentNode.children, letterImage)
  const lastDivIndex = gameDivArray.length - 1

  if (gameDivArray[parentIndex] === gameDivArray[0]) {
    gameDivArray[lastDivIndex].insertBefore(
      letterImage,
      gameDivArray[lastDivIndex].childNodes[childIndex]
    )
  } else {
    gameDivArray[parentIndex - 1].insertBefore(
      letterImage,
      gameDivArray[parentIndex - 1].childNodes[childIndex]
    )
  }
}

function initializePage () {
  createDivs()
  createImages()

  document.getElementById('h').className = 'selected'
  selectedLetter = document.getElementById('h')
}

function moveByKeyUp (evt) {
  const key = evt.which

  // a letter was typed
  if ((key >= 'A'.charCodeAt(0)) && (key <= 'Z'.charCodeAt(0))) {
    const lowerCaseLetter = String.fromCharCode(key + 32)
    moveRight(document.getElementById(lowerCaseLetter))

    selectedLetter.className = ''
    selectedLetter = document.getElementById(lowerCaseLetter)
    document.getElementById(lowerCaseLetter).className = 'selected'
  } else if (key === 39) {
    moveRight(selectedLetter)
  } else if (key === 37) {
    moveLeft(selectedLetter)
  } else if (key === 40) {
    moveDown(selectedLetter)
  } else if (key === 38) {
    moveUp(selectedLetter)
  }
}

onload = initializePage
onkeyup = moveByKeyUp
