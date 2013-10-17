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
				$('<div class="page-break"></div>').appendTo($('#container'));
			}
		}
	},
	renderCard : function(){
		var card = $('<table class="card"></table>');

		//Header
		$('<tr class="header"><td>B</td><td>I</td><td>N</td><td>G</td><td>O</td></tr>').appendTo(card);

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

				var item = Math.floor(Math.random() * clone.length);

				if(i == 2 && j == 2){
					cell.html('&nbsp;')
				}else{
					cell.text(clone[item]);
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