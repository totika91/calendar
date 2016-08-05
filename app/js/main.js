(function(){
	$(document).ready(function(){
		var h1 = $('<h1></h1>'),
			backToToday = $("<div class='toToday'>Today</div>"),
			currentMonth = moment().format('MMMM'),
			shortMonth = moment().format('MMMM Y');
			currentYear = 2016,
			currentDay = moment().day(),		
			currentDate = moment().format('MMMM')+' '+moment().format('Y');
			
			$('.backTo').append(h1.text(currentDate));
		
			function init(curr){
						for (var i = 1; i <= moment(curr).daysInMonth(); i++) {
							var div = $('<div class="singleDay"></div>');
							$('.content').append(div.text(i));
							if(i == currentDay){
								$('.singleDay:nth-child(' + i + ')').addClass('current');
							}
						}
					}
				
			init(shortMonth);
		function firstDayOfMonth(arg1,arg2,arg3){

			function add(arg1,arg2,arg3){
				return arg1+arg2+arg3;
			}

			var startOfMonthDay = moment(add(arg1,arg2,arg3)).startOf('month').format('llll').substr(0,3);
			
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
		}
		firstDayOfMonth();		
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
		$('.aRight, .aLeft').click(function(){
			var selectedExists = $('.selected');
			if($('.contentWrap').children().length == 4){
			$($('.contentWrap').children(':last-child')).remove();
		}
	});



		currentMonth = parseInt(moment().format('M'))-1;
		currentYear = parseInt(moment().format('Y'));
		function leapYear(){
			if (h1.text()=='February'+' '+currentYear) {
					if(currentYear%4 == 0)
					$('.content').append($('<div class="singleDay"></div>').text('29'));
				}
		}
		leapYear();

		$('.aRight').click(function(){
				currentMonth+=1;
				var nextMonth = moment().month(currentMonth).format('MMMM');
				if (nextMonth == 'January') {
					currentYear+=1;
					currentMonth=0;
				}
				h1.text(nextMonth+' '+currentYear);
				$('.singleDay').remove();

			
			for(var i = 1; i <= moment(String(currentMonth+1)).daysInMonth(); i++){
				var div = $('<div class="singleDay"></div>');
				$('.content').append(div.text(i));


				if(h1.text() == currentDate){
					if(i == currentDay){
						$('.singleDay:nth-child(' + i + ')').addClass('current');
					}
				}
			}
				leapYear();
				var newCurrentYear = String(currentYear),
					sep = '/',
					newCurrentMonth = String(currentMonth+1);
				
		firstDayOfMonth(newCurrentYear,sep,newCurrentMonth);
		overlaySelect();		
		toToday(currentYear);
		
		});


		$('.aLeft').click(function(){
			currentMonth-=1;
			var nextMonth = moment().month(currentMonth).format('MMMM');
			if (nextMonth == 'December') {
				currentYear-=1;
				currentMonth=11;
			}
			h1.text(nextMonth+' '+currentYear);
			$('.singleDay').remove();		

			for(var i = 1; i <= moment(String(currentMonth+1)).daysInMonth(); i++){

				var div = $('<div class="singleDay"></div>');
				$('.content').append(div.text(i));
				
				if(h1.text() == currentDate){
					if(i == currentDay){
						$('.singleDay:nth-child(' + i + ')').addClass('current');
					}
				}
			}
			leapYear(currentYear);
		var newCurrentYear = String(currentYear),
			sep = '/',
			newCurrentMonth = String(currentMonth+1);
			console.log(currentYear);
		firstDayOfMonth(newCurrentYear,sep,newCurrentMonth);
		overlaySelect();
		toToday();
		});
		function toToday(){
			$('.toToday').click(function(){
				$('.selected').remove();
				currentMonth = parseInt(moment().format('M'))-1;
				currentYear = parseInt(moment().format('Y'));
				h1.text(moment().format('MMMM')+' '+currentYear);
				$('.singleDay').remove();
				init();
				overlaySelect();
			});
		}
		$("#submit").submit(function(e){		
			$('.singleDay').remove();
			var inputText = $('input').val();
			
			e.preventDefault();
		});
	});
})();