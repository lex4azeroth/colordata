var ecomBaseURL = "michelinrest/ecom/";

function bindFilters() {
	var scores = [];
	$.ajax({
		type: "GET",
		url: ecomBaseURL + "scores",
		async: false,
		dataType: "json",
		success: function(returnValue) {
			scores = returnValue;
		}
	});

	$.each(scores, function(index, optiondata) {
		$("#ecomScore").append('<option value=' + optiondata.score + '>' + optiondata.score + '</option>')
	});

	var productLines = [];
	$.ajax({
		type: "GET",
		url: ecomBaseURL + "productlines",
		async: false,
		dataType: "json",
		success: function(returnValue) {
			productLines = returnValue;
		}
	});

	$.each(productLines, function(index, optiondata) {
		$("#ecomLines").append('<option value=' + optiondata.id + '>' + optiondata.lines + '</option>')
	});

	$('#ecomScore').change(function() {
		reloadAll();
	});

	$('#ecomLines').change(function() {
		reloadAll();
	});
}

function reloadAll() {
		var dateRange = getCurrentDateRange();
		
		init_ecom_tuhu(dateRange);
		
		init_ecom_tmall(dateRange);
		
		init_ecom_jd(dateRange);	
}

function getFilterData() {
	var filterData = {
		"lineId": $('#ecomLines').children('option:selected').val(), 
		"score": $('#ecomScore').children('option:selected').val()
	}
	
	return filterData;
}

function init_ecom_tuhu(dateRange) {
	var subURL = ecomBaseURL + "tuhu/";
	var tableData = [];
	var filterData = getFilterData();
	
	$.ajax({
		type: "GET",
		url: subURL + dateRange.start + "/" + dateRange.end + "/" + filterData.lineId + "/" + filterData.score,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			tableData = returnValue;
		}
	});

	$('#tuhuTable').DataTable({
		"bDestroy": true,
		sDom: "<'col-xs-4'><'col-xs-4'><'top'<'col-xs-3'f><'#tuHuTool'>>" +
			"t" +
			"<'bottom'ip>",
		aaSorting: [
			[0, 'asc']
		],
		data: tableData,
		columns: [{
			data: 'store'
		}, {
			data: 'productLine'
		}, {
			data: 'productName'
		}, {
			data: 'productURL',
			render: function(data, type, row) {
				//					return '<a href=' + row.forumUrl  + '>' + data + '</a>';
				return 'URL';
			}
		}, {
			data: 'userName'
		}, {
			data: 'score'
		}, {
			data: 'comment'
		}, {
			data: 'postTime'
		}], 
		initComplete: function() {
			$("#tuHuTool").append('<a>Download</a>');
		}
	});
}

function init_ecom_tmall(dateRange) {
	var subURL = ecomBaseURL + "tmall/";
	var tableData = [];
	var filterData = getFilterData();
	
	$.ajax({
		type: "GET",
		url: subURL + dateRange.start + "/" + dateRange.end + "/" + filterData.lineId + "/" + filterData.score,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			tableData = returnValue;
		}
	});

	$('#tmallTable').DataTable({
		"bDestroy": true,
		sDom: "<'col-xs-4'><'col-xs-4'><'top'<'col-xs-3'f><'#tmallTool'>>" +
			"t" +
			"<'bottom'ip>",
		aaSorting: [
			[0, 'asc']
		],
		data: tableData,
		columns: [{
			data: 'store'
		}, {
			data: 'productLine'
		}, {
			data: 'productName'
		}, {
			data: 'productURL',
			render: function(data, type, row) {
				//					return '<a href=' + row.forumUrl  + '>' + data + '</a>';
				return 'URL';
			}
		}, {
			data: 'userName'
		}, {
			data: 'score'
		}, {
			data: 'comment'
		}, {
			data: 'postTime'
		}], 
		initComplete: function() {
			$("#tmallTool").append('<a>Download</a>');
		}
	});
}

function init_ecom_jd(dateRange) {
	var subURL = ecomBaseURL + "jd/";
	var tableData = [];
	var filterData = getFilterData();
	
	$.ajax({
		type: "GET",
		url: subURL + dateRange.start + "/" + dateRange.end + "/" + filterData.lineId + "/" + filterData.score,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			tableData = returnValue;
		}
	});

	$('#jdTable').DataTable({
		"bDestroy": true,
		sDom: "<'col-xs-4'><'col-xs-4'><'top'<'col-xs-3'f><'#jdTool'>>" +
			"t" +
			"<'bottom'ip>",
		aaSorting: [
			[0, 'asc']
		],
		data: tableData,
		columns: [{
			data: 'store'
		}, {
			data: 'productLine'
		}, {
			data: 'productName'
		}, {
			data: 'productURL',
			render: function(data, type, row) {
				//					return '<a href=' + row.forumUrl  + '>' + data + '</a>';
				return 'URL';
			}
		}, {
			data: 'userName'
		}, {
			data: 'score'
		}, {
			data: 'comment'
		}, {
			data: 'postTime'
		}], 
		initComplete: function() {
			$("#jdTool").append('<a>Download</a>');
		}
	});
}