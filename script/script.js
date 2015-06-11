var CardsModel = function(items) {
  this.items = ko.observableArray(items);
  this.itemToAdd = ko.observable(randomName());
  this.addItem = function() {

    if( cardValid(this.itemToAdd()) ){
      this.items.push( this.itemToAdd() );
      this.itemToAdd(randomName());
      this.items.sort();
    }
  }.bind(this);

  this.remove = function () {
    if(this.items().length){
      var atRand = rand(0,items.length-1);
      this.items.remove( items[atRand] );
    }
  };
  this.scaleUp = function(element) {
    if (element.nodeType === 1) {
      $(element).addClass('add').on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEn', function(){
        $(element).removeClass('add');
      });
    }
  };
  this.scaleDown = function(element) {
    if (element.nodeType === 1) {
      $(element).addClass('remove').on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEn', function(){
        $(element).remove();
      });
    }
  };
};

ko.applyBindings(new CardsModel([]));

function cardValid(str) {
  var arr = str.trim().split(' '),
      c = 0;
  if( arr.length === 2 ){
    for(var i = 0; i < arr.length; i++){
      var word = arr[i];
      if( word.length >= 4 && word.length <= 30 ) {
        ++c
      }
    }
    return c===2;
    }else{
    return false;
  }
}

function rand(min, max) {
  return (Math.random() * (max - min + 1) + min)^0
}

function Capitalization() {
  var result = '';
  for(var i=0; i<arguments.length; i++) {
    result += (i > 0 ? ' ' : '') + arguments[i].charAt(0).toUpperCase() + arguments[i].slice(1);
  }
  return result
}

function randomName() {
  var first = '', second = '',
      chars = 'abcdefghijklmnopqrstuvwxyz';
  for (var l1 = rand(4,30); l1 > 0; --l1) { first += chars[rand(0,chars.length - 1)] }
  for (var l2 = rand(4,30); l2 > 0; --l2) { second += chars[rand(0,chars.length - 1)] }
  return Capitalization(first, second);
}

function required(id) {
  var x = document.getElementById(id);
  for (var i = 0; i < x.length; i++) {
    if(x.elements[i].value == '' || x.elements[i].value == null) {
      $(x.elements[i]).addClass('error');
    }else{  $(x.elements[i]).removeClass('error'); }
  }
}

//without bubbling
 $('form#form').on('submit', false)
   .find('button').click(function(){
     var form = $(this).parent('form').get(0).id;
     required(form);
   });

/* ...with bubbling
$('form#form')
  .on('submit',function(event){
    event.preventDefault();
    console.log( "clicked: " + event.target.nodeName );
  })
  .on('click', function(){
    if(event.target.nodeName === 'BUTTON'){
      required(this.id);
    }
  });*/