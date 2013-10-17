//document.ready at the bottom of this file starts it all up
var app = {
	columns : 5,
	rows : 5,
	free : true,
	series : [],
	init : function(){
		$('#generate').click(function(e){
			app.generate();
		});

		$('#print').click(function(e){
			app.print();
		});

		$('#play').click(function(e){
			app.play();
		});
	},
	generate : function(){

		var seriesStart = 1;
		var seriesStop = 15;
		app.series = [];
		for(var s = 0; s < 5; s++){
			var serie = [];
			for(var n = seriesStart; n <= seriesStop; n++){
				serie.push(n);
			}
			app.series.push(serie);
			seriesStart += 15;
			seriesStop += 15;
		}

		//Reset container
		$('#container').html('');

		var cards = $('#numberofcards').val();
		if(isNaN(cards)){
			cards = 10;
			$('#numberofcards').val(cards);
		}

		for(var i = 1; i <= cards; i++){
			app.renderCard();
			if(i % 4 == 0){
				//$('<div class="page-break"></div>').appendTo($('#container'));
			}
		}
	},
	renderCard : function(){
		var card = $('<table class="card"></table>');

		//Header
		$('<tr class="header"><td><div>B</div></td><td><div>I</div></td><td><div>N</div></td><td><div>G</div></td><td><div>O</div></td></tr>').appendTo(card);

		//Rows
		var rows = [];
		for(var r = 0; r < app.rows; r++){
			var row = $('<tr></tr>');
			row.appendTo(card);
			rows.push(row);
		}

		for(var i = 0; i < app.columns; i++){
			var clone = app.series[i].slice(0);

			for(var j = 0; j < app.rows; j++){
				var cell = $('<td></td>');
				var cellcontainer = $('<div></div>').appendTo(cell);

				var item = Math.floor(Math.random() * clone.length);

				if(i == 2 && j == 2){
					cellcontainer.html('&nbsp;')
				}else{
					cellcontainer.text(clone[item]);
					app.removeItem(clone,clone[item]);
				}

				cell.appendTo(rows[j]);
			}
		}
		card.appendTo($('#container'));
	},
	print : function(){
		window.print();
	},
	play : function(){
		$('#container.play').click(function(e){
			app.waitForItIndex = 0;
			app.waitForIt();
		});

		$('#container').text('');
		$('#settingsform').hide();

		app.gameNumbers = [];
		for(var i = 1; i <= 75; i++){
			app.gameNumbers.push(i);
		}

		app.gameNumbers = app.shuffle(app.gameNumbers);

		console.log(app.gameNumbers);

		app.waitForItIndex = 0;
		app.waitForIt();
	},
	showNumber : function(){
		app.waitForItIndex = 0;
		var item = app.gameNumbers[0];
		
		$('#container').text(item);

		app.gameNumbers.splice(0,1);

		console.log(app.gameNumbers);
		console.log(app.gameNumbers.length);

		if(app.gameNumbers.length == 0){
			$('#settingsform').show();
			$('#container.play').off('click');
		}
	},
	waitForIt : function(){
		var item = Math.floor(Math.random() * 75);
		if(item < 1 || item > 75){
			item = 1;//Easy
		}
		
		$('#container').text(item);
		clearTimeout(app.timeout);

		if(app.waitForItIndex == 10){
			app.showNumber();
		}else{
			app.waitForItIndex++;
			app.timeout = setTimeout(function(){app.waitForIt();},100);
		}
	},
	shuffle : function(array){ //v1.0 http://stackoverflow.com/a/6274381/32849
    for(var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
    return array;
	},
	removeItem : function(array, item){
		for(var i in array){
			if(array[i]==item){
				array.splice(i,1);
				break;
			}
		}
	}
}

$(document).ready(function(){
	app.init();
});