$(document).ready(function(){
	var h1 = $('<h1></h1>'),
		currentMonth = moment().format('MMMM'),
		currentYear = moment().format('Y'),
		currentDay = moment().day();

	$('main').append(h1.text(currentMonth+' '+currentYear));


	for (var i = 1; i <= moment().daysInMonth(); i++) {
			var div = $('<div class="singleDay"></div>');
			$('.content').append(div.text(i));
			if(i == currentDay){
				$('.singleDay:nth-child(' + i + ')').addClass('current');
			}
	}

	currentMonth = parseInt(moment().format('M'))-1;

	$('.aRight').click(function(){
		currentMonth+=1;
		var nextMonth = moment().month(currentMonth).format('MMMM');
		h1.text(nextMonth+' '+currentYear);
	});

	$('.aLeft').click(function(){
		currentMonth-=1;
		var nextMonth = moment().month(currentMonth).format('MMMM');
		h1.text(nextMonth+' '+currentYear);
	});

});


