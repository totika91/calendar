(function(){
	$(document).ready(function(){

		var h1 = $('<h1></h1>'),
			backToToday = $("<div class='toToday'>Today</div>"),
			currentMonth = moment().format('MMMM'),
			shortMonth = moment().format('MMMM Y');
			currentYear = 2016,
			currentDay = moment().format('D').toString(),			
			sep = '-',	
			currentDate = moment().format('MMMM')+' '+moment().format('Y');
			
			$('.backTo').append(h1.text(currentDate));
	
//initializes current month

			function init(month,year){
						for (var i = 1; i <= moment(year).month(month).daysInMonth(); i++) {
							var div = $('<div class="singleDay"></div>');
							$('.content').append(div.text(i));
							if(i == currentDay){
								$('.singleDay:nth-child(' + i + ')').addClass('current');
							}
						}
					}
				
			init(currentMonth);

//adds margin depending on the day of week in month

		function firstDayOfMonth(arg1,arg2,arg3){		

			var startOfMonthDay = moment(arg1+arg2+arg3).startOf('month').format('llll').substr(0,3);
			
			switch(startOfMonthDay){
				case 'Tue':
					$('.singleDay:first-child').css({
						'margin-left':'134px',
					});
				break;
				case 'Wed':
					$('.singleDay:first-child').css({
						'margin-left':'264px',
					});
				break;
				case 'Thu':
					$('.singleDay:first-child').css({
						'margin-left':'394px',
					});
				break;
				case 'Fri':
					$('.singleDay:first-child').css({
						'margin-left':'524px',
					});
				break;
				case 'Sat':
					$('.singleDay:first-child').css({
						'margin-left':'654px',
					});
				break;
				case 'Sun':
					$('.singleDay:first-child').css({
						'margin-left':'784px',
					});
				break;
			}
			console.log(arg1,arg2,arg3);
		}
		firstDayOfMonth();	

//creates div on mouse click

		function overlaySelect(){
		$('.singleDay').click(function(){
				var day = $(this),
					dayWidth = day.width(),
					dayHeight = day.height(),
					dayOffsetTop = day.offset().top,
					dayOffsetLeft = day.offset().left;
				if($('.contentWrap').children().length!=4){
						overlayDiv = $("<div class='selected'></div>");
						overlayDiv.css({
							'top': dayOffsetTop+'px',
							'left': dayOffsetLeft+'px',
						});		
						$('.contentWrap').append(overlayDiv);
				}else{
					$('.selected').css({
						'top': dayOffsetTop+'px',
						'left': dayOffsetLeft+'px',
					});	
				}
			});
		}
		overlaySelect();

//clears div selected 

		$('.aRight, .aLeft').click(function(){
			var selectedExists = $('.selected');
			if($('.contentWrap').children().length == 4){
			$($('.contentWrap').children(':last-child')).remove();
		}
	});



		currentMonth = parseInt(moment().format('M'))-1;
		currentYear = parseInt(moment().format('Y'));

		/*function leapYear(){
			if (h1.text()=='February'+' '+currentYear) {
					if(currentYear%4 == 0)
					$('.content').append($('<div class="singleDay"></div>').text('29'));
				}
		}*/

//click on the right arrow

		$('.aRight').click(function(){
				currentMonth+=1;
				var nextMonth = moment().month(currentMonth).format('MMMM');
				if (nextMonth == 'January') {
					currentYear+=1;
					currentMonth=0;
				}
				h1.text(nextMonth+' '+currentYear);
				$('.singleDay').remove();
				console.log(currentMonth);
			for(var i = 1; i <= moment(+currentYear+'-'+String(currentMonth+1)).daysInMonth(); i++){
				var div = $('<div class="singleDay"></div>');
				$('.content').append(div.text(i));


				if(h1.text() == currentDate){
					if(i == currentDay){
						$('.singleDay:nth-child(' + i + ')').addClass('current');
					}
				}
			}
				//leapYear();
				var newCurrentYear = String(currentYear),
					newCurrentMonth = String(currentMonth+1);
				
		firstDayOfMonth(newCurrentYear,sep,newCurrentMonth);
		overlaySelect();		
		toToday(currentYear);
		
		});

//click on the left arrow

		$('.aLeft').click(function(){
			currentMonth-=1;
			var nextMonth = moment().month(currentMonth).format('MMMM');
			if (nextMonth == 'December') {
				currentYear-=1;
				currentMonth=11;
			}
			h1.text(nextMonth+' '+currentYear);
			$('.singleDay').remove();		

			for(var i = 1; i <= moment(+currentYear+'-'+String(currentMonth+1)).daysInMonth(); i++){

				var div = $('<div class="singleDay"></div>');
				$('.content').append(div.text(i));
				
				if(h1.text() == currentDate){
					if(i == currentDay){
						$('.singleDay:nth-child(' + i + ')').addClass('current');
					}
				}
			}
			//leapYear(currentYear);
				var newCurrentYear = String(currentYear),
					newCurrentMonth = String(currentMonth+1);
		firstDayOfMonth(newCurrentYear,sep,newCurrentMonth);
		overlaySelect();
		toToday();
		});
//button which returns you to the current date
		function toToday(){
			$('.toToday').click(function(){
				$('.selected').remove();
				currentMonth = parseInt(moment().format('M'))-1;
				currentYear = parseInt(moment().format('Y'));
				h1.text(moment().format('MMMM')+' '+currentYear);
				$('.singleDay').remove();
				init(currentMonth);
				overlaySelect();
			});
		}
//submit
		$("#submit").submit(function(e){		
			$('.singleDay').remove();
			var inputText = $('input').val();
			var thisSearch = moment().month(inputText).format('M');
			var sep = '-';

//Searching for number in inputed string
			var n = [];
			if(/\d/.test(inputText)){
				for(var i = 0; i < inputText.length; i++){
					if(/\d/.test(inputText[i])){
						n.push(inputText[i]);
					}
				}				
			var stringYear = n.join('');
			h1.text(moment(inputText).format('MMMM Y'));

			init(inputText,stringYear);
			firstDayOfMonth(stringYear,sep,thisSearch);
			overlaySelect();
			toToday();
			$('input').val('');
			return false;

			}else{
				
				//Need to add some kind of 
				//message to tell user to enter the year of typed month

			init(currentMonth);
			currentYear = moment().year();
			currentMonth = moment().format('MMMM');
			firstDayOfMonth(currentYear,sep,currentMonth);
			h1.text(moment().format('MMMM Y'));
			overlaySelect();
			toToday();
			$('input').val('');
			return false;
			}
		});
	});
})();