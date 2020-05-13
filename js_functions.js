function openCity(evt, cityName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(cityName).style.display = "block";
	evt.currentTarget.className += " active";
}

//function for total days count
function totalNights(checkIn, checkOut) {
	var days = (checkOut - checkIn) / 1000 / 60 / 60 / 24;
	$(".totalDays").html("(" + days + " Nights)");
}

// Where to go Options
function WhereToGo() {
	let whereTogo = document.getElementById('whereTogo').options;
	let options = [{
			text: 'the Tromsø region',
			value: 'the Tromsø region'
		},
		{
			text: 'Tromsø',
			value: 'Tromsø'

		},
		{
			text: 'Senja Island',
			value: 'Senja Island'
		},
		{
			text: 'Lyngen',
			value: 'Lyngen'
		},
		{
			text: 'Coastal Areas',
			value: 'Coastal Areas'
		},
		{
			text: 'Inland',
			value: 'Inland'
		},

	];

	options.forEach(option =>
		whereTogo.add(
			new Option(option.text, option.value)
		)
	);
}

// Free Text Search Toggle Function
function changeSelect() {
	var boxType = $('.frstDiv').attr("data-id");
	if (boxType == 'selectBox') {
		$('.frstDiv').attr('data-id', 'textBox');
		$('.frstDiv').html("<input type='text' class='form-control free_textSearch' placeholder='Area, Landmark or Property'/> ");
		$('.freeTextSearchBtn').text('Hide Free Text Search');
	} else {
		$('.frstDiv').html("<select name='places' id='whereTogo' class='form-control'> </select>");
		$('.frstDiv').attr('data-id', 'selectBox');
		$('.freeTextSearchBtn').text('Click here for free text search');
		WhereToGo();
	}
}

// function for inputbox of children age
function totalInput(frstrow_ID, count) {
	if (count > 0) {
		for (var i = 1; i <= count; i++) {
			var inputbox = "<div class='inlineBox'><label>" + i + ":</label><input type='text' class='form-control childAgeTextBox' /></div>"
			$("#second" + frstrow_ID + " .childCountDiv").append(inputbox);
		}
	}
}


// Funtion for room count
function roomcount(answerCount) {
	if (answerCount == 1) {
		$(".roomCount").html(answerCount + " Room");
	} else {
		$(".roomCount").html(answerCount + " Rooms");
	}
}

// Funtion for adult count
function adultsList() {
	var count = 40;
	for (var i = 1; i <= count; i++) {
		if (i == 1) {
			$('.noOfAdults:last').append(`<option value="${i}"> 
                                       ${i + " Adult"} 
                                  </option>`)
		} else if (i == 2) {
			$('.noOfAdults:last').append(`<option value="${i}" selected> 
			${i + " Adults"} 
	   </option>`)
		} else {
			$('.noOfAdults:last').append(`<option value="${i}"> 
                                       ${i + " Adults"} 
                                  </option>`)
		}
	}
}

// Funtion for children count
function childrenList() {
	var limit = 5;
	for (var i = 0; i <= limit; i++) {
		if (i == 1) {
			$('.no_ofChild:last').append(`<option value="${i}"> 
                                       ${i + " child"} 
                                  </option>`);
		} else {
			$('.no_ofChild:last').append(`<option value="${i}"> 
                                       ${i + " Children"} 
								  </option>`);
		}
	}
}

// Funtion for total count when page loads
function totalGuest(adults, child) {
	var adult_num = parseFloat(adults);
	var child_num = parseFloat(child);
	var total = adult_num + child_num;
	$(".totalCount").html("(" + total + " Persons)");
}

// Funtion for total count when both select box clicked
function calSum() {
	var adult = 0;
	var child = 0;
	$('.adult_count').each(function () {
		var val = $(this).val();
		if (val != '' && val != 0) {
			adult += parseFloat(val);
		}
	});
	$('.child_count').each(function () {
		var val = $(this).val();
		if (val != '' && val != 0) {
			child += parseFloat(val);
		}
	});
	var total = adult + child;
	$(".totalCount").html("(" + total + " Persons)");
}

// Function Free Text Search
function FreeTextSearch() {
	// Get value of input
	var inputValue = $(".free_textSearch").val().toUpperCase();
	if (inputValue == "") {
		$('.search_result').hide();
	}
	var ulName = $(".areaList");
	var liname = ulName.find('li.result_item');

	// Loop through collection-item lis
	for (var i = 0; i < liname.length; i++) {
		var a = liname[i].getElementsByTagName('a')[0];
		// If matched
		if (a.innerHTML.toUpperCase().indexOf(inputValue) > -1) {
			liname[i].style.display = '';
		} else {
			liname[i].style.display = 'none';
		}
	}

	var Total_result = $(".result_item:visible").length;
	if (Total_result > 0) {
		$('.search_result h3').html("Regions / Area");
		$('.search_result h3').removeClass("noresultBtn");
		$('.search_result').removeClass("no_resultDiv");
	} else {
		$('.search_result h3').html("0 Matches");
		$('.search_result h3').addClass("noresultBtn");
		$('.search_result').addClass("no_resultDiv");
	}
}