$(document).ready(function () {
	WhereToGo();
});

document.getElementById("defaultOpen").click();

// Accommodation Options
let accommodation = document.getElementById('accommodation').options;
let accOptions = [{
		text: 'Hotels',
		value: 'Hotels'
	},
	{
		text: 'Rooms & Apartments',
		value: 'Rooms & Apartments'
	},

];
accOptions.forEach(accom =>
	accommodation.add(
		new Option(accom.text, accom.value)
	)
);


// Calendar Funtions
$(document).ready(function () {
	local = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; //Days
	var dateToday = new Date(); //Getting Today Date
	var followingDay = new Date(dateToday.getTime() + 86400000); //Adding One day to Today date
	$('.checkInDay').html(local[dateToday.getDay()]); //displaying Today name below first calender when page loads
	$('.checkOutDay').html(local[followingDay.getDay()]); //displaying Tomorrow name below second calender when page loads
	totalNights(dateToday, followingDay); //getiing diffrence b/w two days when page loads (initially 1 night)

	// datepicker for second calender & date should start from tomorrow
	$('#datepick2').datepicker({
		dateFormat: 'mm/dd/yy',
		minDate: 1
	})

	// first calender date picker function (when first calender selects date next calender should display the next day)
	var dates = $("#datepick, #datepick2").datepicker({
		minDate: 0,
		onSelect: function (selectedDate) {
			var option = this.id == "datepick" ? "minDate" : "maxDate",
				instance = $(this).data("datepicker"), //getting the first calender selected date
				date = $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings); //converting that date to (dd/mm/yyyy) format using parse function
			var followingDay = new Date(date.getTime() + 86400000); //adding one day to that date (to display in second calender)
			$('.checkInDay').html(local[date.getDay()]); //displaying first calendar selected date day name below first calender when you select the first date
			dates.not(this).datepicker("option", option, followingDay); //displaying second calender selected date (first calendar date + 1Day)
			var jsDate = $("#datepick2").datepicker('getDate'); //Getting the second calendar date
			$('.checkOutDay').html(local[jsDate.getDay()]); //displaying second calendar selected date day name below second calender when you select the first date
			var end = dates.not(this).datepicker('getDate'); //storing the second calendar date in variable to get the diffrence b/w two days
			totalNights(date, end); //functions to get total days 
		}
	});

	// didplaying second calendar selected day name when we select date in second calendar
	$(document).on('change', '#datepick2', function () {
		var jsDate = $(this).datepicker('getDate'); //getting the date from second calendar
		$('.checkOutDay').html(local[jsDate.getDay()]); //getting the day name from that date
	});

	// first calendar icon click to open the calendar
	$(document).on('click', '.datePickLabel', function () {
		$('#datepick').focus();
	});

	// second calendar icon click to open the calendar
	$(document).on('click', '.datepick2Lbel', function () {
		$('#datepick2').focus();
	});

	// displaying total day when 2nd calender selected
	$('#datepick2').change(function () {
		var start = $('#datepick').datepicker('getDate');
		var end = $('#datepick2').datepicker('getDate');
		totalNights(start, end);
	});

	$("#datepick").datepicker().datepicker("setDate", new Date()); //storing today date in first calendar
	$("#datepick2").datepicker().datepicker("setDate", new Date()); //storing today date in second calendar ( Above it will take tomorrow date)
});

// specific Dated | Disable Calendar Function
$('.specificDates').change(function () {
	if (this.checked) {
		$("#datepicker input , #datepicker1 input").prop("disabled", true);
		$(".checkInDay , .checkout_div").hide();
		$(".dayLable1").addClass("disable");
		$(".dayLable1").removeClass("datePickLabel");
		$(".dayLable2").addClass("disable");
		$(".dayLable2").removeClass("datepick2Lbel");
	} else {
		$("#datepicker input , #datepicker1 input").prop("disabled", false);
		$(".checkInDay , .checkout_div").show();
		$(".dayLable1").addClass("datePickLabel");
		$(".dayLable1").removeClass("disable");
		$(".dayLable2").addClass("datepick2Lbel");
		$(".dayLable2").removeClass("disable");
	}
});

// Guest Options Functions slide open and close
$(".guestLinksBtn ").click(function () {
	$(".guestForm").slideToggle("slow", function () {});
});

//guest functions start 
$(document).ready(function () {
	var answerCount = 1;
	roomcount(answerCount); // Displaying Room Count function
	adultsList(); // Adult list Displaying Function
	childrenList(); // Children list Displaying Function
	var tot_adult = $(".adult_count").val();
	var tot_child = $(".child_count").val();
	totalGuest(tot_adult, tot_child); // Total Guest Getting Function

	// Done Btn Click Funtion
	$(".doneBtn").click(function () {
		var answerCount = $('.addGuestTable tbody tr.frstRow').length;
		roomcount(answerCount);
		calSum();
		$(".guestForm").slideToggle("slow", function () {});
	});

	// Cancel Btn Click Funtion
	$(".cancelBtn").click(function () {
		totalGuest(tot_adult, tot_child); // Total Guest Getting Function
		roomcount(answerCount);
		$(".guestForm").slideToggle("slow", function () {});
	});

	// Add Row Button Functions
	$(".AddRoomBtn").click(function () {
		var limit = 4;
		var answerCount = $('.addGuestTable tbody tr.frstRow').length;
		var rowCount = $('.addGuestTable tbody tr.g_row').length;
		if (answerCount <= limit) {
			var nextCount = answerCount + 1;
			roomcount(nextCount);
			var newRow = "<tr class='g_row frstRow' id='row" + nextCount + "'><td class='roomTitle'>Room " + nextCount + ":</td> <td><select class='form-control noOfAdults' id='adultSelect" + nextCount + "'></select></td><td><select class='form-control no_ofChild' id='childSelect'></select></td><td></td></tr>";
			var removeBtn = "<button type='button' class='del_roomBtn'><i class='fa fa-window-close' aria-hidden='true'></i> Remove</button>";
			$(".addGuestTable tbody tr").eq(rowCount - 1).after(newRow);
			$(".del_roomBtn").remove();
			$("#row" + nextCount + " td:last").append(removeBtn);
			adultsList();
			childrenList();
			$(".noOfAdults:last").addClass("adult_count");
			$(".noOfAdults:last").removeClass("noOfAdults");
			$(".no_ofChild:last").addClass("child_count");
			$(".no_ofChild:last").removeClass("no_ofChild");
			calSum();
			if (answerCount == limit) {
				$(this).hide();
			}
		}
	});

	// Delete Row Btn Code
	$(document).on('click', '.del_roomBtn', function () {
		var answerCount = $('.addGuestTable tbody tr.frstRow').length;
		var tdID = $(this).parent().parent()[0].id;
		var prevCount = answerCount - 1;
		roomcount(prevCount);
		$(this).parent().parent().remove();
		$("#second" + tdID + "").remove();
		var removeBtn = "<button type='button' class='del_roomBtn'><i class='fa fa-window-close' aria-hidden='true'></i> Remove</button>";
		$("#row" + prevCount + " td:last").append(removeBtn);
		if (prevCount == 1) {
			$(".del_roomBtn").remove();
		}
		$('.AddRoomBtn').show();
		calSum();
	});

	// Getting the valur from both selectbox
	$(document).on('change', '.adult_count , .child_count', function () {
		calSum();
	});

	// children age form when child selectbox selected more than 0
	$(document).on('change', '.child_count', function () {
		var val = $(this).val();
		var frstrow_ID = $(this).parent().parent()[0].id;
		$("#second" + frstrow_ID + "").remove();
		if (val >= 1) {
			var second_newRow = "<tr class='g_row secondRow' id='second" + frstrow_ID + "'><td colspan='4'><label>Age of children (0-17 yrs)</label><div class='childCountDiv'></div></td></tr>";
			$("#" + frstrow_ID).after(second_newRow);
			totalInput(frstrow_ID, val);
		} else if (val == 0) {
			$("#second" + frstrow_ID + "").remove();
		}
	});

});

// Backend Start here
$(document).on('keyup', '.free_textSearch', function () {
	$('.search_result').show();
	FreeTextSearch();
});

$(document).on('click', function () {
	if ($(".search_result").is(":visible")) {
		$('.search_result').hide();
	}
});

$(document).on('click', '.free_textSearch', function (event) {
	event.stopPropagation();
});

$(document).on('click', '.areaList li.result_item a', function () {
	var valText = $(this).text();
	$('.free_textSearch').val(valText);
});