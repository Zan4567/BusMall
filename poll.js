'use strict'
var imgs = ['bag.jpg',
            'banana.jpg',
            'bathroom.jpg',
            'boots.jpg',
            'breakfast.jpg',
            'bubblegum.jpg',
            'chair.jpg',
            'cthulhu.jpg',
            'dog-duck.jpg',
            'dragon.jpg',
            'pen.jpg',
            'pet-sweep.jpg',
            'scissors.jpg',
            'shark.jpg',
            'sweep.png',
            'tauntaun.jpg',
            'unicorn.jpg',
            'usb.gif',
            'water-can.jpg',
            'wine-glass.jpg'];

var choices = [];
choices.push(document.getElementById('picture0'));
choices.push(document.getElementById('picture1'));
choices.push(document.getElementById('picture2'));

/**
 * [Image description]
 * @param {[type]} file [description]
 */
function Image(file) {
  this.score = 0; //times selected
  this.appeared = 0; //times appeared on the screen
  this.file = file; //image path
}

Image.prototype.getPath = function() {
  return 'img/' + this.file;
}

Image.prototype.tally = function(chosen) {
  this.appeared++;
  if(chosen){this.score++;}
}

Image.prototype.getPercent = function() {
  return(this.score / this.appeared);
}

/**
 * [Tracker description]
 * @type {Object}
 */
var Tracker = {
  round: 0,
  maxRounds: 15,
  images: [],

  addImage: function(image) {
    this.images.push(image);
  },

  //swaps two Images in the
  swapImages: function(im1, im2) {
    if(im1 === im2) {return;}
    if(im1 >= this.images.length || im2 >= this.images.length){return;}

    var temp = this.images[im1];
    this.images[im1] = this.images[im2];
    this.images[im2] = temp;
  },

  //shuffles random images into the first three image slots
  shuffle: function() {
    if(this.images.length < 3) {
      return;
    }

    for (var i = 0; i < 3; i++) {
      this.swapImages(i, Math.floor(this.getRandom(0, this.images.length - 1)));
    }
  },

  getRandom: function(min, max) {
    return (Math.random() * (max - min + 1)) + min;
  },

  getNewImages: function() {
    this.shuffle();
    for (var i = 0; i < choices.length; i++) {
      // console.log(choices[i]);
      // console.log(this.images[i]);
      choices[i].src = this.images[i].getPath();
    }
  },

  picClick: function(winner) {
    for (var i = 0; i < choices.length; i++) {
      this.images[i].tally(winner === i);
      console.log(this.images[i]);
    }
    this.round++;
    console.log('round ' + this.round);
    this.getNewImages();
  }
}

/**
 * [setup description]
 * @return {[type]} [description]
 */
var setup = function() {
  for(var n in imgs) {
    var nImg = new Image(imgs[n]);
    Tracker.addImage(nImg);
    console.log('added image: ' + nImg + ' ' + nImg.file);
  }
}

//initial setup
setup();
Tracker.getNewImages();
