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
    Product.viewsData.push(allProducts[i].views);

  }
};

containerEl.addEventListener('click', handleClick);
displayPics();

function makeChart() {
  getChartData();
  var ctx = document.getElementById('myChart').getContext('2d');
  // var color = chartColor();
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Product.namesData,
      datasets: [{
        label: '# of Votes',
        data: Product.votesData,
        backgroundColor: chartColorOne(),
        borderColor: chartColorOne(),
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: Product.viewsData,
        backgroundColor: chartColorTwo(),
        borderColor: chartColorTwo(),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes:[{ ticks: { fontSize: 20, fontFamily: "'Roboto', sans-serif", fontColor: '#666', fontStyle: '500' } }],
        yAxes: [{
          ticks: {
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

function chartColorOne() {
  var colorA = [];
  for (var i = 0; i < Product.namesData.length; i++){
    // 'rgba(300, 100, 132, 0.2)'
    var string = 'rgba(255, 99, 132, 0.5)';
    colorA.push(string);
    
  }
  
  return colorA;

}

function chartColorTwo() {
  var colorB = [];
  for (var i = 0; i < Product.namesData.length; i++) {
    // 'rgba(300, 100, 132, 0.2)'
    var string = 'rgba(255,255,0, 0.8)';
    colorB.push(string);

  }
  
  return colorB;

}



// function randomColor() {
//   return Math.floor(Math.random() * Math.floor(255));
// }
