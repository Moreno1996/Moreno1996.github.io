//preliminary functions
var Timer = function(DOM_element, DOM_scramble){
	this.start_t = null;
	this.interval = null;
	this.DOM = DOM_element;
	this.DOM_scramble = DOM_scramble;
	this.toggle = function(){
		this.interval==null? this.start() : this.end();
	}
	this.start = function(){
		this.start_t = new Date();
		var myself = this;
		var inline_update = function(){ myself.update(); }
		this.interval = setInterval( inline_update, 10);
	}
	this.end = function(){
		clearInterval(this.interval);
		this.interval = null;
	}
	 this.update = function(){
			var elapsed = ((new Date()-this.start_t)/1000).toString();
      if(elapsed.split('.')[1].length == 2){
        elapsed += '0';
      }
      if(elapsed.split('.')[1].length == 1){
        elapsed += '00';
      }
      if(elapsed.split('.')[1].length == 0){
        elapsed += '000';
      }
			this.DOM.innerHTML = elapsed;
	}
}
function rannum(max){
  var ran = Math.floor(Math.random() * max + 1);
  if(ran < 10){
    ran = '0' + ran.toString();
  }
  return ran.toString();
}
function pllname(x, y){
  var num = parseInt(y) - 1;
  return x[num];
}
Array.prototype.sum = Array.prototype.sum || function(){
  return this.reduce(function(sum, a) { return sum + Number(a) }, 0);
}
Array.prototype.average = Array.prototype.average || function(){
  return this.sum() / (this.length || 1);
}

//defaults/cookie get
$.cookie.json = true;
var transform = ($.cookie('tr') == undefined) ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : $.cookie('tr');
var times = ($.cookie('ti') == undefined) ? [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []] : $.cookie('ti');
console.log(transform, times);

//main DOM stuff
$('input[type=text]').each(function(){
  $(this).attr('size', $(this).val().length);
});
var pllsrc = ['https://www.speedsolving.com/wiki/images/0/08/A1.gif', 
              'https://www.speedsolving.com/wiki/images/b/b2/A.gif', 
              'https://www.speedsolving.com/wiki/images/7/7b/E.gif', 
              'https://www.speedsolving.com/wiki/images/2/2c/Z.gif', 
              'https://www.speedsolving.com/wiki/images/f/f7/H.gif', 
              'https://www.speedsolving.com/wiki/images/6/6b/U1.gif', 
              'https://www.speedsolving.com/wiki/images/4/47/U.gif', 
              'https://www.speedsolving.com/wiki/images/f/fb/J1.gif', 
              'https://www.speedsolving.com/wiki/images/1/17/J.gif', 
              'https://www.speedsolving.com/wiki/images/4/49/T.gif', 
              'https://www.speedsolving.com/wiki/images/8/85/R1.gif', 
              'https://www.speedsolving.com/wiki/images/3/38/R.gif', 
              'https://www.speedsolving.com/wiki/images/f/fd/F.gif', 
              'https://www.speedsolving.com/wiki/images/2/2f/G3.gif', 
              'https://www.speedsolving.com/wiki/images/4/4d/G2.gif', 
              'https://www.speedsolving.com/wiki/images/a/a6/G1.gif', 
              'https://www.speedsolving.com/wiki/images/7/75/G.gif', 
              'https://www.speedsolving.com/wiki/images/9/90/V.gif', 
              'https://www.speedsolving.com/wiki/images/5/59/N1.gif', 
              'https://www.speedsolving.com/wiki/images/f/fa/N.gif', 
              'https://www.speedsolving.com/wiki/images/b/b9/Y.gif'];
var plls = ['Aa', 'Ab', 'E', 'Z', 'H', 'Ua', 'Ub', 'Ja', 'Jb', 'T', 'Ra', 'Rb', 'F', 'Ga', 'Gb', 'Gc', 'Gd', 'V', 'Na', 'Nb', 'Y'];
var maximum = 21;
var timer_obj = new Timer(document.getElementById('time'));
var pllnum = rannum(maximum);
$('img').attr('src', pllsrc[pllnum - 1]);
$('h2').text(pllname(plls, pllnum));
$(document).keydown(function(e){
  if(e.keyCode == 32){
    $('#time').css({
      'color': 'Green'
    });
    if(record == false){
			timer_obj.end();
    }
  }
});
$('#time').mousedown(function(){
  $('#time').css({
    'color': 'Green'
  });
  if(record == false){
    timer_obj.end();
  }
});
var record = true, last;
$(document).keyup(function(e){
  if(e.keyCode == 32){
    if(record == false){
      record = true;
      $('button').removeAttr('disabled');
      last = pllnum - 1;
      times[pllnum - 1].push(parseFloat($('#time').text()));
	  save();
	  newPLL();
    } else {
      timer_obj.start();
      record = false;
      $('button').blur().attr('disabled', 'true');
    }
    $('#time').css({
      'color': 'Black'
    });
  }
});
$('#time').mouseup(function(){
  if(record == false){
    record = true;
    $('button').removeAttr('disabled');
    last = pllnum - 1;
    times[pllnum - 1].push(parseFloat($('#time').text()));
	save();
	newPLL();
  } else {
    timer_obj.start();
    record = false;
    $('button').blur().attr('disabled', 'true');
  }
  $('#time').css({
    'color': 'Black'
  });
});
$('#newpll').click(newPLL());

function newPLL(){
  pllnum = rannum(maximum);
  $('#pllimg').fadeOut(200, function(){
    $('img').attr('src', pllsrc[pllnum - 1]);
    $('h2').text(pllname(plls, pllnum));
    $('img').css('transform','rotate(' + transform[pllnum - 1] + 'deg)');
    $('#pllimg').fadeIn(200);
  });
save();
}
$('#2look').click(function(){
  $(this).toggleClass('btn-success');
  maximum = ($(this).hasClass('btn-success')) ? 7 : 21;
});
$('img').click(function(){
  $('img').animate({
    borderSpacing: transform[pllnum - 1] + 90
  }, {
    step: function(now,fx) {
      $(this).css('transform','rotate(' + now + 'deg)');
    },
    duration:'50'
  },'linear');
  transform[pllnum - 1] += 90;
});
$('#instructions').click(function(){
  $('#mod .modal-body').html('Press the spacebar or click/tap the display to start/stop timer.<br>Click the image to rotate.');
  $('#institle').text('Instructions');
});
$('#credits').click(function(){
  $('#mod .modal-body').html('Ben Pang (molarmanful) = main developer<hr>Speedsolving.com Wiki = PLL images<hr>badmephisto = PLL trainer idea<hr>Blaze Boy = timer.js<hr>Codepen = page host');
  $('#institle').text('Credits');
});
$('#timebtn').click(function(){
  $('#mod .modal-body').html('<table id="timetable" class="table table-hover"><thead><tr><th  onclick="sortTable(0)" >PLL</th><th  onclick="sortTable(1)">Average</th><th  onclick="sortTable(2)">Mean</th><th onclick="sortTable(3)">Best</th></tr></thead></table>');
  $.each(plls, function(i, v){
    var dup = times[i].slice(0);
    if(dup.length > 2){
       dup.splice(dup.indexOf(Math.max.apply(Math, dup)), 1).splice(dup.indexOf(Math.min.apply(Math, dup)), 1);
    }
    var mean = (times[i].length < 1) ? 'DNF' : Math.floor(times[i].average() * 1000) / 1000;
    var avg = (times[i].length < 3) ? 'DNF' : Math.floor(dup.average() * 1000) / 1000;
    var pb = (times[i].length > 0) ? Math.min.apply(Math, times[i]) : 'DNF';
    $('#timetable').append('<tbody><tr><td><span class="badge">' + times[i].length + '</span>  ' + v + '</td><td>' + avg + '</td><td>' + mean + '</td><td>' + pb + '</td></tr></tbody>');
  });
  $('#institle').text('Times');
});
$('#resetall').click(function(){
  times = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
  save();
  
});
$('#resetlast').click(function(){
  times[last].pop();
  save();
});

//cookie store
window.onbeforeunload = function(){
  $.cookie('tr', transform);
  $.cookie('ti', times);
};
function save(){
	localStorage.setItem("times", JSON.stringify(times));
 console.log(JSON.stringify(times));
	
}

$( document ).ready(function() {
	test = JSON.parse(localStorage.getItem("times"));
	if(test!=null){
times = test;
console.log(times);
}
});





	