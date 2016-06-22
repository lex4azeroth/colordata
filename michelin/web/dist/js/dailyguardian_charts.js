var baseURL = "michelinrest/dailyguardian/";
var reportTable;


function MDGbindFilters() {
	
	var IssueGrades = [];
	$.ajax({
		type: "GET",
		url: baseURL + "FilterIssueGrade",
		async: false,
		dataType: "json",
		success: function(returnValue) {
			IssueGrades = returnValue;
		}
	});

	$.each(IssueGrades, function(index, optiondata) {
		$("#MDGIssueGrade").append('<option value=' + optiondata.issueGradeID + '>' + optiondata.issueGrade + '</option>')
	});

	

	
	$('#MDGIssueGrade').change(function() {
	MDGreloadAll();
	});

	var Channels = [];
	$.ajax({
		type: "GET",
		url: baseURL + "Channel",
		async: false,
		dataType: "json",
		success: function(returnValue) {
			Channels = returnValue;
		}
	});

	$.each(Channels, function(index, optiondata) {
		$("#MDGChannel").append('<option value=' + optiondata.channelID + '>' + optiondata.channel + '</option>')
	});

	
	$('#MDGChannel').change(function() {
	MDGreloadAll();
	});



	



	
	var IssueCategories = [];
	$.ajax({
		type: "GET",
		url: baseURL + "IssueCategory",
		async: false,
		dataType: "json",
		success: function(returnValue) {
			IssueCategories = returnValue;
		}
	});

	$.each(IssueCategories, function(index, optiondata) {
		$("#MDGIssueCategory").append('<option value=' + optiondata.issueCategoryID + '>' + optiondata.issueCategory + '</option>')
	});

	

	

	
	$('#MDGIssueCategory').change(function() {
	MDGreloadAll();
	});
	
	
	
	var ProductIssues = [];
	$.ajax({
		type: "GET",
		url: baseURL + "ProductIssueBreakdown",
		async: false,
		dataType: "json",
		success: function(returnValue) {
			ProductIssues = returnValue;
		}
	});

	$.each(ProductIssues, function(index, optiondata) {
		$("#MDGProductIssue").append('<option value=' + optiondata.productIssueBreakdownID + '>' + optiondata.productIssueBreakdown + '</option>')
	});

	

	

	
	$('#MDGProductIssue').change(function() {
	MDGreloadAll();
	});
	
	
	
	var RelatedProducts = [];
	$.ajax({
		type: "GET",
		url: baseURL + "RelatedProduct",
		async: false,
		dataType: "json",
		success: function(returnValue) {
			RelatedProducts = returnValue;
		}
	});

	$.each(RelatedProducts, function(index, optiondata) {
		$("#MDGProductInvolved").append('<option value=' + optiondata.relatedProductID + '>' + optiondata.relatedProduct + '</option>')
	});

	
	
	$('#MDGProductInvolved').change(function() {
	MDGreloadAll();
	});
	
	
	
}


function initReporTable(tableData) {
	reportTable = $('#reporttable').DataTable({
//		columnDefs: [{
//			orderable: false,
//			targets: 0
//		}, {
//			searchable: false,
//			targets: 0
//		}],
//		sDom: '<"top"iflp<"clear">>rt<"bottom"ilp<"clear">>'
		"bDestroy": true,
//		sDom: '<"top"f<"clear">>rt<"bottom"ip<"clear">>',
//		sDom: "<'col-xs-4'><'col-xs-4'><'top'<'col-xs-3'f><'#mytool'>>" +
//                    "t" +
//                    "<'bottom'ip>",
		aaSorting: [
			[0, 'asc']
		],
		data: tableData,
		columns: [
			{
				data: 'rank'
			}, {
				data: 'issueCategory', 
//				width: '50'
			}, {
				data: 'issue'
			}, {
				data: 'productInvovled'
			}, {
				data: 'grade'
			}, {
				data: 'pvReplies'
			}, {
				data: 'postDate', 
//				width: '100'
			}, {
				data: 'site'
			}, {
				data: 'forun'
			}, {
				data: 'authorName'
			}, {
				data: 'title', 
				render: function (data, type, row) {
					return '<a href=' + row.forumUrl  + '>' + data + '</a>';
				}
			}
		], 
		initComplete: function() {
//			$("#mytool").append('<a>Download</a>');
		}
	});
}

function MDGgetFilterData() {
	var filterData = {
		"IssueGrade": $('#MDGIssueGrade').children('option:selected').val(), 
		"Channel": $('#MDGChannel').children('option:selected').val(),
		"IssueCategory": $('#MDGIssueCategory').children('option:selected').val(), 
		"ProductIssueBreakdown": $('#MDGProductIssue').children('option:selected').val(),
		"RelatedProduct": $('#MDGProductInvolved').children('option:selected').val()
	}
	
	return filterData;
}


function MDGreloadAll() {
		var dateRange = getCurrentDateRange();		
		init_dg_report(dateRange);
		init_dg_issuebreakdown(dateRange);
		init_dg_issuecategory(dateRange);
		init_dg_issuegrade(dateRange);
		init_dg_issueplatform(dateRange);
		init_dg_weeklyissuetrend(dateRange);		
}


function init_dg_report(data) {
	var subURL = baseURL + "report/";
	var tableData = [];
	var filterData = MDGgetFilterData();
	$.ajax({
		type: "GET",
		url: subURL + data.start + "/" + data.end + "/" + filterData.IssueGrade + "/" + filterData.Channel+ "/" + filterData.IssueCategory + "/" + filterData.ProductIssueBreakdown +"/"+filterData.RelatedProduct,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			tableData = returnValue;
		}
	});
	
	initReporTable(tableData);
}

function init_dg_issuebreakdown(data) {
	var subURL = baseURL + "issuebreakdown/";
	var issueBreakdowns = [];
	var cnts = [];
	var pairs = [];
	var filterData = MDGgetFilterData();
	//var filterData = MDGgetFilterData();
	
	$.ajax({
		type: "GET",
		url: subURL + data.start + "/" + data.end + "/" + filterData.IssueGrade + "/" + filterData.Channel+ "/" + filterData.IssueCategory + "/" + filterData.ProductIssueBreakdown +"/"+filterData.RelatedProduct,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			issueBreakdowns = returnValue.breakdown;
			cnts = returnValue.cnt;
			pairs = returnValue.pair;
		}
	});

	var myChart5 = echarts.init(document.getElementById('echart_issuebreakdown'), 'macarons');
	option5 = {
		
		tooltip: {
			trigger: 'item',
			formatter: "{b}: {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			left: '80%',
			top: 'middle',
			data: issueBreakdowns
		},
		toolbox: {
			show: true,
			feature: {
				dataView: {
					show: true,
					readOnly: false
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		series: [{
			type: 'pie',
			radius: ['0', '45%'],
			center: ['35%', '50%'],
			avoidLabelOverlap: true,
			label: {
				normal: {
					show: true,
					position: 'middle'
				},
				emphasis: {
					show: false,
					textStyle: {
						fontSize: '30',
						fontWeight: 'bold'
					}
				}
			},
			labelLine: {
				normal: {
					show: true
				}
			},
			data: pairs
		}]
	};
	myChart5.setOption(option5);
}

function init_dg_issuecategory(data) {
	var subURL = baseURL + "issuecategory/";
	var issueGrades = [];
	var cnts = [];
	var pairs = [];
	var filterData = MDGgetFilterData();
	$.ajax({
		type: "GET",
		url: subURL + data.start + "/" + data.end + "/" + filterData.IssueGrade + "/" + filterData.Channel+ "/" + filterData.IssueCategory + "/" + filterData.ProductIssueBreakdown +"/"+filterData.RelatedProduct,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			issueCategorys = returnValue.category;
			cnts = returnValue.cnt;
			pairs = returnValue.pair;
		}
	});
	// ͼP4
	var myChart4 = echarts.init(document.getElementById('echart_issuecategories'), 'macarons');
	var option4 = {
		
		tooltip: {
			trigger: 'item',
			formatter: "{b}: {c} ({d}%)"
		},
		toolbox: {
			show: true,
			feature: {
				dataView: {
					show: true,
					readOnly: false
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},

		legend: {
			orient: 'vertical',
			left: '70%',
			top: '40%',
			//orient: 'horizontal',
			//left: '40%',
			//top: '80%',
			data: issueCategorys
		},
		series: [{
			type: 'pie',
			radius: ['0', '45%'],
			center: ['50%', '50%'],
			avoidLabelOverlap: true,
			label: {
				normal: {
					show: true
					//position: 'inner'
				},
				emphasis: {
					show: true,
					textStyle: {
						fontSize: '30',
						fontWeight: 'bold'
					}
				}
			},
			labelLine: {
				normal: {
					show: true
				}
			},
			data: pairs
		}]
	};
	myChart4.setOption(option4);
}

function init_dg_issuegrade(data) {
	var subURL = baseURL + "issuegrade/";
	var issueGrades = [];
	var cnts = [];
	var pairs = [];
	var filterData = MDGgetFilterData();
	$.ajax({
		type: "GET",
		url: subURL + data.start + "/" + data.end + "/" + filterData.IssueGrade + "/" + filterData.Channel+ "/" + filterData.IssueCategory + "/" + filterData.ProductIssueBreakdown +"/"+filterData.RelatedProduct,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			issueGrades = returnValue.issueGrade;
			cnts = returnValue.cnt;
			pairs = returnValue.pair;
		}
	});

	// ͼP2
	var myChart2 = echarts.init(document.getElementById('echart_issueplatform'), 'macarons');
	var option2 = {
		

		tooltip: {
			trigger: 'item',
			formatter: "{b}: {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			left: '70%',
			top: '40%',
			data: issueGrades
				//			data: ['5 - Negative', '4 - Moderately Negative', '3 - Very Nagative', '2 - Potential Crisis', '1 - Crisis']
		},

		toolbox: {
			show: true,
			feature: {
				dataView: {
					show: true,
					readOnly: false
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},

		series: [{
			type: 'pie',
			radius: ['0', '45%'],
			center: ['30%', '50%'],
			avoidLabelOverlap: true,
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			},
			data: pairs
		}]
	};
	myChart2.setOption(option2);
}

function init_dg_issueplatform(data) {
	var subURL = baseURL + "issueplatform/";
	var platforms = [];
	var cnts = [];
	var pairs = [];
	var filterData = MDGgetFilterData();
	$.ajax({
		type: "GET",
		url: subURL + data.start + "/" + data.end + "/" + filterData.IssueGrade + "/" + filterData.Channel+ "/" + filterData.IssueCategory + "/" + filterData.ProductIssueBreakdown +"/"+filterData.RelatedProduct,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			platforms = returnValue.platform;
			cnts = returnValue.cnt;
			pairs = returnValue.pair;
		}
	});

	var myChart3 = echarts.init(document.getElementById('echart_issueplatform2'), 'macarons');
	var option3 = {
		
		tooltip: {
			trigger: 'item',
			formatter: "{b}: {c} ({d}%)"
		},

		toolbox: {
			show: true,
			feature: {
				dataView: {
					show: true,
					readOnly: false
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},

		legend: {
			orient: 'vertical',
			left: '70%',
			top: '40%',
			data: platforms
		},
		series: [{
			type: 'pie',
			radius: ['35%', '45%'],
			center: ['40%', '50%'],
			avoidLabelOverlap: true,
			label: {
				normal: {
					show: true,
				},
				emphasis: {
					show: true,
					textStyle: {
						fontSize: '30',
						fontWeight: 'bold'
					}
				}
			},
			labelLine: {
				normal: {
					show: true
				}
			},
			data: pairs
		}]
	};
	myChart3.setOption(option3);
}

function init_dg_weeklyissuetrend(data) {
	var dates = [];
	var negativeIssue = [];
	var crisisIssue = [];
	var subURL = baseURL + "weeklyissuetrend/";
	var filterData = MDGgetFilterData();
	
	$.ajax({
		type: "GET",
		url: subURL + data.start + "/" + data.end + "/" + filterData.IssueGrade + "/" + filterData.Channel+ "/" + filterData.IssueCategory + "/" + filterData.ProductIssueBreakdown +"/"+filterData.RelatedProduct,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			dates = returnValue.dates;
			negativeIssue = returnValue.negativeIssue;
			crisisIssue = returnValue.crisisIssue;
		}
	});

	var myChart = echarts.init(document.getElementById('echart_weeklyissuetrend'), 'macarons');
	$.ajaxSettings.async = false;
	var option = {
		title: [{
			text: '',
			subtext: 'Unit: Comment(Post)'
		}],
		tooltip: {
			trigger: 'axis',
			axisPointer: { // ������ָʾ���������ᴥ����Ч
				type: 'shadow' // Ĭ��Ϊֱ�ߣ���ѡΪ��'line' | 'shadow'
			}
		},
		legend: {
			data: ['Negative Issue', 'Crisis Issue'],
			top: '5%'
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		toolbox: {
			show: true,
			feature: {
				dataView: {
					show: true,
					readOnly: false
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		xAxis: [{
			type: 'category',
			data: dates
		}],
		yAxis: [{
			type: 'value',
			show:false
		}],
		series: [{
			name: 'Negative Issue',
			type: 'bar',
			data: negativeIssue,
			avoidLabelOverlap : true,
			itemstyle: {
				normal: {
					color: '#999'
				}
			},
			lable: {
				normal: {
					show: true
				}
			}

		}, {
			name: 'Crisis Issue',
			type: 'bar',
			data: crisisIssue
		}, ]
	};

	myChart.setOption(option);
}