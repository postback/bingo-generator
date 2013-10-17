//document.ready at the bottom of this file starts it all up
var app = {
	min : 1,
	max : 75,
	columns : 5,
	rows : 5,
	free : true,
	numbers : [],
	init : function(){
		$('#generate').click(function(e){
			app.generate();
		});

		$('#print').click(function(e){
			app.print();
		});
	},
	generate : function(){

		app.numbers = [];
		for(var n = app.min; n < app.max; n++){
			app.numbers.push(n);
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
		}
	},
	renderCard : function(){
		var card = $('<table class="card"></table>');
		var clone = app.numbers.slice(0);

		$('<tr class="header"><td>B</td><td>I</td><td>N</td><td>G</td><td>O</td></tr>').appendTo(card);

		for(var i = 0; i < app.columns; i++){
			var row = $('<tr></tr>');
			row.appendTo(card);

			for(var j = 0; j < app.columns; j++){
				var cell = $('<td></td>');

				var item = Math.floor(Math.random() * clone.length);
				if(clone[item] == undefined){
					console.log('ERROR: ' + item + ' - ' + clone.length);	
				}

				if(i == 2 && j == 2){
					cell.html('&nbsp;')
				}else{
					cell.text(clone[item]);
					app.removeItem(clone,clone[item]);
				}

				cell.appendTo(row);
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