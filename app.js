'use strict';

let imgContainer = document.getElementById('imgContainer');
// let resultButton = document.getElementById('resultButton');
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

//console.log(Product.allProductsArray);

function genRandomNumber() {
  return Math.floor(Math.random() * Product.allProductsArray.length);
}

let imgIndexArray = [];

function generateRandomPicture() {
  // call the getRandomNumber
  // I need to create a loop here to generate unique pictures.
  while (imgIndexArray.length < 6) {
    let random = genRandomNumber();
    if (!imgIndexArray.includes(random)) {
      imgIndexArray.push(random);
    }
  }

  let imgOneIndex = imgIndexArray.shift();
  let imgTwoIndex = imgIndexArray.shift();
  let imgThreeIndex = imgIndexArray.shift();

  while (imgOneIndex === imgTwoIndex || imgOneIndex === imgThreeIndex || imgTwoIndex === imgThreeIndex) {
    imgOneIndex = genRandomNumber();
    imgTwoIndex = genRandomNumber();
    imgThreeIndex = genRandomNumber();
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

//Here are the event handlers
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
    alert('Thank you for your input. See results below.');
    imgContainer.removeEventListener('click', handleClick);
    // resultButton.addEventListener('click', displayResults);
    // resultButton.className = 'clicks-allowed';
    imgContainer.className = 'no-voting';
    displayChart();
  } else {
    generateRandomPicture();
  }
}

// function displayResults() {
//   let ul = document.getElementById('resultsList');
//   for (let i = 0; i < Product.allProductsArray.length; i++) {
//     let li = document.createElement('li');
//     li.textContent = `${Product.allProductsArray[i].name} had ${Product.allProductsArray[i].views} views and was clicked ${Product.allProductsArray[i].clicks} times.`;
//     ul.appendChild(li);
//   }
// }

// chart.js

function displayChart() {
  let productNames = [];
  let productClicks = [];
  let productViews = [];

  for (let i = 0; i < Product.allProductsArray.length; i++) {
    productNames.push(Product.allProductsArray[i].name);
    productClicks.push(Product.allProductsArray[i].clicks);
    productViews.push(Product.allProductsArray[i].views);
  }

  //this is the chart section
  const chartGraphics = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Number of Votes',
        data: productClicks,
        backgroundColor: [
          'green',
        ],
        borderColor: [
          'purple'
        ],
        borderWidth: 3
      },
      {
        label: 'Number of Views',
        data: productViews,
        backgroundColor: [
          'purple'
        ],
        borderColor: [
          'green'
        ],
        borderWidth: 3
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  let canvasChart = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(canvasChart, chartGraphics);
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