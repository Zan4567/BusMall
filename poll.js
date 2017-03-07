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
var results = document.getElementById('results');
var show_r = document.getElementById('show_r');
var reset = document.getElementById('reset');
var rlist = document.getElementById('resultslist');
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
  if(this.score === 0) return 0;
  var prc = (this.score / this.appeared) * 100;
  return Math.round(prc);
}

/**
 * [Tracker description]
 * @type {Object}
 */
var Tracker = {
  round: 0,
  maxRounds: 25, //15?
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
    if(this.round >= this.maxRounds)return;
    for (var i = 0; i < choices.length; i++) {
      this.images[i].tally(winner === i);
      console.log(this.images[i]);
    }
    this.round++;
    if(this.round >= this.maxRounds)
    {
      //finish the survey
      show_r.hidden = false;
      reset.hidden = false;
      return;
    }
    console.log('round ' + this.round);
    this.getNewImages();
  },

  displayResults: function() {
    rlist.innerHTML = '';
    for (var i in this.images) {
      var list_item = document.createElement('li');
      var theimg = this.images[i];
      list_item.textContent = theimg.file + ' score: ' + theimg.score + '/' + theimg.appeared + ' ' + theimg.getPercent() + '%';
      rlist.appendChild(list_item);
      console.log(list_item);
    }

    results.hidden = false;
  },

  reset: function() {
    results.hidden = true;
    show_r.hidden = true;
    reset.hidden = true;
    for (var i = 0; i < this.images.length; i++) {
      this.images[i].score = this.images[i].appeared = 0;
    }
    this.round = 0;
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
// for (var i = 0; i < 25; i++) {
//   Tracker.picClick(0);
// }

// If I don't wrap Tracker.displayResults in an anonymous fn, it interprets 'this' as meaning the button instead of the Tracker and doesn't work right.
// wat.
show_r.addEventListener('click', function() {Tracker.displayResults()});
reset.addEventListener('click', function() {Tracker.reset()});
for (var i = 0; i < choices.length; i++) {
  //attach event listener to each picture.
  choices[i].addEventListener('click', function() {Tracker.picClick(i);} );
}
