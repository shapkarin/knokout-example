(function(){

  var intervals = [];

  var rint = 0;
  $('#all-content').hide();

  $('#fake-preloader > div').one('mouseover', function(){
    var self = $(this);
    intervals.push(
      setInterval(function(){
        rint = Math.random()*1000000^0;
        self.attr('data-content',rint)
      }, 60)
    );
  });

  $('#viewport').delay(2600).fadeOut('slow', function() {
    $('#all-content').fadeIn('fast');
    for( var i in intervals) {
      clearTimeout( intervals[ i ] );
      if(i == intervals.length - 1){
        intervals.length = 0;
      }

    }
  });


})();