var dailyHotTopicBaseURL = "michelinrest/dailyhottopic/";
function init_daily_hot_topic_bbs(data) {
	var subURL = dailyHotTopicBaseURL + "bbs/";
	var tableData = [];

	$.ajax({
		type: "GET",
		url: subURL + data.start + "/" + data.end,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			tableData = returnValue;
		}
	});

	$('#bbstopic').DataTable({
		"bDestroy": true,
		sDom: 't' + "<'bottom'ip>",
		aaSorting: [
			[0, 'asc']
		],
		data: tableData,
		columns: [{
			data: 'author',
			width: '50'
		}, {
			data: 'platform'
		}, {
			data: 'postDate',
			width: '100',
			render: function(data, type, row) {
				return data.substring(0, 10);
			}
		}, {
			data: 'content',
			render: function(data, type, row) {
			return '<a href=' + row.url  + ' target= "_blank">' + data + '</a>';
			}
		}, {
			data: 'readNum'
		}, {
			data: 'replyNum'
		}, {
			data: 'forumName'
		}]
	});	
}

function init_daily_hot_topic_zhidao(data) {
	var subURL = dailyHotTopicBaseURL + "zhidao/";
	var tableData = [];

	$.ajax({
		type: "GET",
		url: subURL + data.start + "/" + data.end,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			tableData = returnValue;
		}
	});

	$('#zhidaotopic').DataTable({
		"bDestroy": true,
		sDom: 't' + "<'bottom'ip>",
		aaSorting: [
			[0, 'asc']
		],
		data: tableData,
		columns: [{
			data: 'author',
			width: '50'
		}, {
			data: 'question',
			render: function(data, type, row) {
			return '<a href=' + row.url  + ' target= "_blank">' + data + '</a>';
			}
		}, {
			data: 'postDate',
			width: '100',
			render: function(data, type, row) {
				return data.substring(0, 10);
			}
		}, {
			data: 'content'
		}, {
			data: 'likeNum'
		}, {
			data: 'dislikeNum'
		}]
	});	
}

function init_daily_hot_topic_zhihu(data) {
	var subURL = dailyHotTopicBaseURL + "zhihu/";
	var tableData = [];

	$.ajax({
		type: "GET",
		url: subURL + data.start + "/" + data.end,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			tableData = returnValue;
		}
	});

	$('#zhihutopic').DataTable({
		"bDestroy": true,
		sDom: 't' + "<'bottom'ip>",
		aaSorting: [
			[0, 'asc']
		],
		data: tableData,
		columns: [{
			data: 'author',
			width: '50'
		}, {
			data: 'question',
			render: function(data, type, row) {
			return '<a href=' + row.url  + ' target= "_blank">' + data + '</a>';
			}
		}, {
			data: 'postDate',
			width: '100',
			render: function(data, type, row) {
				return data.substring(0, 10);
			}
		}, {
			data: 'content'
		}, {
			data: 'likeNum'
		}, {
			data: 'replyNum'
		}]
	});	
}

function init_daily_hot_topic_weibo(data) {
	var subURL = dailyHotTopicBaseURL + "weibo/";
	var tableData = [];

	$.ajax({
		type: "GET",
		url: subURL + data.start + "/" + data.end,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			tableData = returnValue;
		}
	});

	$('#weibotopic').DataTable({
		"bDestroy": true,
		sDom: 't' + "<'bottom'ip>",
		aaSorting: [
			[0, 'asc']
		],
		data: tableData,
		columns: [{
			data: 'author',
			width: '50'
		}, {
			data: 'vip',
			width: '100'
		}, {
			data: 'postDate',
			width: '100',
			render: function(data, type, row) {
				return data.substring(0, 10);
			}
		}, {
			data: 'content',
			render: function(data, type, row) {
			return '<a href=' + row.url  + ' target= "_blank">' + data + '</a>';
			}
		}, {
			data: 'forwardNum'
		}, {
			data: 'replyNum'
		}, {
			data: 'likeNum'
		}]
	});
}

function init_dialy_hot_topic_wechat(data) {
	var subURL = dailyHotTopicBaseURL + "wechat/";
	var tableData = [];

	$.ajax({
		type: "GET",
		url: subURL + data.start + "/" + data.end,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			tableData = returnValue;
		}
	});

	$('#wechattopic').DataTable({
		"bDestroy": true,
		sDom: 't' + "<'bottom'ip>",
		aaSorting: [
			[0, 'asc']
		],
		data: tableData,
		columns: [{
			data: 'author',
			width: '50'
		}, {
			data: 'postDate',
			width: '100',
			render: function(data, type, row) {
				return data.substring(0, 10);
			}
		}, {
			data: 'content',
			render: function(data, type, row) {
			return '<a href=' + row.url  + ' target= "_blank">' + data + '</a>';
			}
		}, {
			data: 'readNum'
		}, {
			data: 'likeNum'
		}]
	});
}