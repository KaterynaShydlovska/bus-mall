'use strict';
var leftImageEl = document.getElementById('left');
var centerImageEl = document.getElementById('center');
var rightImageEl = document.getElementById('right');
var containerEl = document.getElementById('image_container');

var allProducts = [];

function Product(name) {
  this.name = name;
  this.path = `images/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}

//Image Containers
Product.pictureElementsArray = [
  leftImageEl,
  centerImageEl,
  rightImageEl
];

//Hold index for unique products
var uniqueProductIndex = [];

function makeRandom() {
  return Math.floor(Math.random() * allProducts.length);
}

//Controls random numbers based on unique pics array index
function uniquePicsArrayGenerator() {
  while (uniqueProductIndex.length < 6) {
    var random = makeRandom();
    while (!uniqueProductIndex.includes(random)) {
      uniqueProductIndex.push(random);
    }
  }
  console.log('Done : ', uniqueProductIndex);
}

function displayPics(){
  uniquePicsArrayGenerator();
  for (var i = 0; i < uniqueProductIndex.length; i++){


    var temporary = uniqueProductIndex.shift();
    // console.log('temp:' + temporary);
    // console.log('What is the problem?!!!!!' + allProducts[temporary]);

    Product.pictureElementsArray[i].src = allProducts[temporary].path;
    Product.pictureElementsArray[i].title = allProducts[temporary].name;
    allProducts[temporary].views += 1;
    // console.log('views ' + allProducts[temporary].views);
  }
}
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('sweep');
new Product('tauntaun');
new Product('unicorn');
new Product('usb');
new Product('water-can');
new Product('wine-glass');

Product.amountOfClicks = 0;
var numberOfrounds = 25;

function handleClick() {
  var chosenImage = event.target.title;

  console.log('chosenImage: ', chosenImage);
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name === chosenImage) {
      allProducts[i].votes++;
    }
  }
  Product.amountOfClicks++;
  displayPics();

  if (numberOfrounds === Product.amountOfClicks) {

    containerEl.remove();
    makeChart();
  }
}
Product.namesData = [];
Product.votesData = [];
Product.viewsData = [];

var getChartData = function () {
  for (var i = 0; i < allProducts.length; i++) {
    Product.namesData.push(allProducts[i].name);
    Product.votesData.push(allProducts[i].votes);
    // Product.viewsData.push(allProducts[i].views);

  }
};

containerEl.addEventListener('click', handleClick);
displayPics();

function makeChart() {
  getChartData();
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Product.namesData,
      datasets: [{
        label: '# of Votes',
        data: Product.votesData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            // fontSize: 12,
            // lineHeight: 1.2,
            // padding: 0,
            max: 8,
            min: 0,
            stepSize: 1,
            beginAtZero: true
          }
        }]
      }
    }
  });
}


