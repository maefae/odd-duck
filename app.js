'use strict';

let imgContainer = document.getElementById('imgContainer');
let resultButton = document.getElementById('resultButton');
let imgOne = document.getElementById('imgOne');
let imgTwo = document.getElementById('imgTwo');
let imgThree = document.getElementById('imgThree');

let clicks = 0;
let maxClicksAllowed = 25;

function Product(name, path) {
  this.name = name;
  this.path = path;
  this.clicks = 0;
  this.views = 0;
  Product.allProductsArray.push(this);
}

Product.allProductsArray = [];

console.log(Product.allProductsArray);

function getRandomNumber() {
  return Math.floor(Math.random() * Product.allProductsArray.length);
}

function generateRandomPicture() {
  // here, we are calling getRandomNumber to get a random number
  let imgOneIndex = getRandomNumber();
  let imgTwoIndex = getRandomNumber();
  let imgThreeIndex = getRandomNumber();

  while (imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex) {
    imgOneIndex = getRandomNumber();
    imgTwoIndex = getRandomNumber();
    imgThreeIndex = getRandomNumber();
  }
  imgOne.src = Product.allProductsArray[imgOneIndex].path;
  imgOne.alt = Product.allProductsArray[imgOneIndex].name;
  imgOne.name = Product.allProductsArray[imgOneIndex].name;
  Product.allProductsArray[imgOneIndex].views++;

  imgTwo.src = Product.allProductsArray[imgTwoIndex].path;
  imgTwo.alt = Product.allProductsArray[imgTwoIndex].name;
  imgTwo.name = Product.allProductsArray[imgTwoIndex].name;
  Product.allProductsArray[imgTwoIndex].views++;

  imgThree.src = Product.allProductsArray[imgThreeIndex].path;
  imgThree.alt = Product.allProductsArray[imgThreeIndex].name;
  imgThree.name = Product.allProductsArray[imgThreeIndex].name;
  Product.allProductsArray[imgThreeIndex].views++;
}

//These are the Event Handlers
function handleClick(event) {
  if (event.target === imgContainer) {
    alert('Please click on an image');
  }
  clicks++;
  let clickImg = event.target.alt;
  for (let i = 0; i < Product.allProductsArray.length; i++) {
    if (clickImg === Product.allProductsArray[i].name) {
      Product.allProductsArray[i].clicks++;
      break;
    }
  }
  if (clicks === maxClicksAllowed) {
    alert('You have reached the maximum number of selections. Please select "View Results below."');
    imgContainer.removeEventListener('click', handleClick);
    // The user knows the button is active when you give the button an event lister and styles
    resultButton.addEventListener('click', displayResults);
    resultButton.className = 'clicks-allowed';
    imgContainer.className = 'no-voting';
  } else {
    generateRandomPicture();
  }
}

function displayResults() {
  let ul = document.getElementById('resultsList');
  for (let i = 0; i < Product.allProductsArray.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${Product.allProductsArray[i].name} had ${Product.allProductsArray[i].views} views and was clicked ${Product.allProductsArray[i].clicks} times.`;
    ul.appendChild(li);
  }
}

new Product('bag', './img/bag.jpg');
new Product('banana', './img/banana.jpg');
new Product('bathroom', './img/bathroom.jpg');
new Product('boots', './img/boots.jpg');
new Product('breakfast', './img/breakfast.jpg');
new Product('bubblegum', './img/bubblegum.jpg');
new Product('chair', './img/chair.jpg');
new Product('cthulhu', './img/cthulhu.jpg');
new Product('dog-duck', './img/dog-duck.jpg');
new Product('dragon', './img/dragon.jpg');
new Product('pen', './img/pen.jpg');
new Product('pet-sweep', './img/pet-sweep.jpg');
new Product('scissors', './img/scissors.jpg');
new Product('shark', './img/shark.jpg');
new Product('sweep', './img/sweep.png');
new Product('tauntaun', './img/tauntaun.jpg');
new Product('unicorn', './img/unicorn.jpg');
new Product('water-can', './img/water-can.jpg');
new Product('wine-glass', './img/wine-glass.jpg');

generateRandomPicture();

imgContainer.addEventListener('click', handleClick);