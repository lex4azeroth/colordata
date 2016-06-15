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
		url: iwomFilterBaseURL + "discussiontopic",
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
		reloadAll();
	});
	
	$('#brand').change(function() {
		loadProducts();
		reloadAll();
	});

	$('#platform').change(function() {
		loadPlatforms();
		reloadAll();
	});
	
	$('#product').change(function() {
		reloadAll();
	});

	$('#topic').change(function() {
		reloadAll();
	});
	
	$('#sentiment').change(function() {
		reloadAll();
	});	
	
}

function reloadAll() {
		var dateRange = getCurrentDateRange();
		
//		init_ecom_tuhu(dateRange);
//		
//		init_ecom_tmall(dateRange);
//		
//		init_ecom_jd(dateRange);	
}

//function init_ecom_tuhu(dateRange) {
//	var subURL = ecomBaseURL + "tuhu/";
//	var tableData = [];
//	var filterData = getFilterData();
//	
//	$.ajax({
//		type: "GET",
//		url: subURL + dateRange.start + "/" + dateRange.end + "/" + filterData.lineId + "/" + filterData.score,
//		async: false,
//		dataType: "json",
//		success: function(returnValue) {
//			tableData = returnValue;
//		}
//	});
//
//	$('#tuhuTable').DataTable({
//		"bDestroy": true,
//		sDom: "<'col-xs-4'><'col-xs-4'><'top'<'col-xs-3'f><'#tuHuTool'>>" +
//			"t" +
//			"<'bottom'ip>",
//		aaSorting: [
//			[0, 'asc']
//		],
//		data: tableData,
//		columns: [{
//			data: 'store',
//			width: '200'
//		}, {
//			data: 'productLine',
//			width: '100'
//		}, {
//			data: 'productName', 
//			render: function(data, type, row) {
//			return '<a href=' + row.url  + ' target= "_blank">' + data + '</a>';
//			}
//		}, {
//			data: 'userName'
//		}, {
//			data: 'score', 
//			width: '50'
//		}, {
//			data: 'comment'
//		}, {
//			data: 'postTime', 
//			width: '70'
//			//render: function (data, type, row) {
//			//	var indexOfPoint = data.indexOf('.');
//			//	return data.substring(0, indexOfPoint);
//			//}
//		}], 
//		initComplete: function() {
//			$("#tuHuTool").append('<a>Download</a>');
//		}
//	});
//}
