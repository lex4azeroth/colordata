var iwomFilterBaseURL = "michelinrest/iwomfilter/";

function getChannelFilterData() {
	var filterData = {
		"channelID": $('#channel').children('option:selected').val()
	}

	return filterData;
}

function getBrandFilterData() {
	var filterData = {
		"brandID": $('#brand').children('option:selected').val()
	}

	return filterData;
}

function loadProducts() {
	$("#product").empty();
	$("#product").html("");

	var products = [];
	var brandId = getBrandFilterData().brandID;
	if (brandId == 1 || brandId == 0) {
		$("#product").attr("disabled", false);
		$.ajax({
			type: "GET",
			url: iwomFilterBaseURL + "micheinproduct/" + brandId,
			async: false,
			dataType: "json",
			success: function(returnValue) {
				products = returnValue;
			}
		});

		$.each(products, function(index, optiondata) {
			$("#product").append('<option value=' + optiondata.id + '>' + optiondata.name + '</option>')
		});
	} else {
		$("#product").attr("disabled", true);
	}
}

function loadPlatforms() {
	$("#platform").empty();
	$("#platform").html("");

	var platforms = [];
	var channelId = getChannelFilterData().channelID;
	if (channelId == 1 || channelId == 0) {
		$("#platform").attr("disabled", false);
		$.ajax({
			type: "GET",
			url: iwomFilterBaseURL + "bbsplatform/" + channelId,
			async: false,
			dataType: "json",
			success: function(returnValue) {
				platforms = returnValue;
			}
		});

		$.each(platforms, function(index, optiondata) {
			$("#platform").append('<option value=' + optiondata.id + '>' + optiondata.name + '</option>')
		});
	} else {
		$("#platform").attr("disabled", true);
	}
}

function bindIWOMFilters() {
	var channels = [];
	$.ajax({
		type: "GET",
		url: iwomFilterBaseURL + "channel",
		async: false,
		dataType: "json",
		success: function(returnValue) {
			channels = returnValue;
		}
	});

	$.each(channels, function(index, optiondata) {
		$("#channel").append('<option value=' + optiondata.id + '>' + optiondata.channelName + '</option>')
	});

	loadPlatforms();

	var tireBrands = [];
	$.ajax({
		type: "GET",
		url: iwomFilterBaseURL + "tirebrand",
		async: false,
		dataType: "json",
		success: function(returnValue) {
			tireBrands = returnValue;
		}
	});

	$.each(tireBrands, function(index, optiondata) {
		$("#brand").append('<option value=' + optiondata.id + '>' + optiondata.name + '</option>')
	});

	loadProducts();

	var topics = [];
	$.ajax({
		type: "GET",
		url: iwomFilterBaseURL + "discussiontopic/" + $('#container').find('div').attr('id'),
		async: false,
		dataType: "json",
		success: function(returnValue) {
			topics = returnValue;
		}
	});

	$.each(topics, function(index, optiondata) {
		$("#topic").append('<option value=' + optiondata.id + '>' + optiondata.name + '</option>')
	});

	var sentiment = [];
	$.ajax({
		type: "GET",
		url: iwomFilterBaseURL + "discussionsentiment",
		async: false,
		dataType: "json",
		success: function(returnValue) {
			sentiment = returnValue;
		}
	});

	$.each(sentiment, function(index, optiondata) {
		$("#sentiment").append('<option value=' + optiondata.id + '>' + optiondata.name + '</option>')
	});

	$('#channel').change(function() {
		loadPlatforms();
		reloadIWOMAllBuzzs();
	});

	$('#brand').change(function() {
		loadProducts();
		reloadIWOMAllBuzzs();
	});

	$('#platform').change(function() {
		reloadIWOMAllBuzzs();
	});

	$('#product').change(function() {
		reloadIWOMAllBuzzs();
	});

	$('#topic').change(function() {
		reloadIWOMAllBuzzs();
	});

	$('#sentiment').change(function() {
		reloadIWOMAllBuzzs();
	});
}

function reloadIWOMAllBuzzs() {
	loadBuzzsAndOthers();
}

function reloadIWOMTyreplus() {
	
}

function bindIWOMTyrePlusFilters() {
	var IssueGrades = [];
	var iwomTyrePlusFiltersBaseURL = "michelinrest/dailyguardian/";
	$.ajax({
		type: "GET",
		url: iwomTyrePlusFiltersBaseURL + "FilterIssueGrade",
		async: false,
		dataType: "json",
		success: function(returnValue) {
			IssueGrades = returnValue;
		}
	});

	$.each(IssueGrades, function(index, optiondata) {
		$("#IWOMTyreplusIssueGrade").append('<option value=' + optiondata.issueGradeID + '>' + optiondata.issueGrade + '</option>')
	});

	$('#IWOMTyreplusIssueGrade').change(function() {
		reloadIWOMTyreplus();
	});
	
	
	var channels = [];
	$.ajax({
		type: "GET",
		url: iwomTyrePlusFiltersBaseURL + "Channel",
		async: false,
		dataType: "json",
		success: function(returnValue) {
			channels = returnValue;
		}
	});

	$.each(channels, function(index, optiondata) {
		$("#IWOMTyreplusChannel").append('<option value=' + optiondata.chanelID + '>' + optiondata.channel + '</option>')
	});
	
	$('#IWOMTyreplusChannel').change(function() {
		reloadIWOMTyreplus();
	});
	
	var IssueCategories = [];
	$.ajax({
		type: "GET",
		url: iwomTyrePlusFiltersBaseURL + "IssueCategory",
		async: false,
		dataType: "json",
		success: function(returnValue) {
			IssueCategories = returnValue;
		}
	});

	$.each(IssueCategories, function(index, optiondata) {
		$("#IWOMTyreplusCategory").append('<option value=' + optiondata.issueCategoryID + '>' + optiondata.issueCategory + '</option>')
	});
	
	$('#IWOMTyreplusCategory').change(function() {
		reloadIWOMTyreplus();
	});

//	loadPlatforms();
}