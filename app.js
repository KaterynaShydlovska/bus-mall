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
  // this.min = 0;
  // this.max = 19;
  // this.uniquePicsArray = [];
  allProducts.push(this);
}

function makeRandom() {
//   var randomNumber = Math.floor(Math.random() * (this.max - this.min) + this.min);
//   this.uniquePicsArray.push(randomNumber);
// };
  return Math.floor(Math.random() * allProducts.length);
}  

var uniquePicsArray = [];

function renderProducts() {

  uniquePicsArray[0] = makeRandom();
  uniquePicsArray[1] = makeRandom();
  uniquePicsArray[2] = makeRandom();

  // while (uniquePicsArray[0] === uniquePicsArray[1]) {
  // // console.error('Duplicate found, Re-rolling!');
    
  //   uniquePicsArray[1] = makeRandom();
  // }



  //add views here
  allProducts[uniquePicsArray[0]].views++;
  //get a random index
  //display a product whose index is the random number
  console.log('EXISTS?', allProducts[uniquePicsArray[0]]);

  leftImageEl.src = allProducts[uniquePicsArray[0]].path;
  leftImageEl.name = allProducts[uniquePicsArray[0]].name;
  leftImageEl.title = allProducts[uniquePicsArray[0]].name;
  //add views here
  allProducts[uniquePicsArray[1]].views++;
  centerImageEl.src = allProducts[uniquePicsArray[1]].path;
  centerImageEl.name = allProducts[uniquePicsArray[1]].name;
  centerImageEl.title = allProducts[uniquePicsArray[1]].name;

  allProducts[uniquePicsArray[2]].views++;
  rightImageEl.src = allProducts[uniquePicsArray[2]].path;
  rightImageEl.name = allProducts[uniquePicsArray[2]].name;
  rightImageEl.title = allProducts[uniquePicsArray[2]].name;

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


function handleClick() {
  var chosenImage = event.target.title;
  console.log('chosenImage: ', chosenImage);
  for (var i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name === chosenImage) {
      allProducts[i].votes++;
    }
  }

  renderProducts();
}

containerEl.addEventListener('click', handleClick);

renderProducts();
