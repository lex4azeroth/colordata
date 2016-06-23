var iwomBaseURL = "michelinrest/iwom/";

function getIWOMFilterData() {
	var filterData = {
		"department": 1,
		"channel": $('#channel').children('option:selected').val(),
		"topic": $('#topic').children('option:selected').val(),
		"sentiment": $('#sentiment').children('option:selected').val(),
		"product": $('#product').children('option:selected').val(),
		"platform": $('#platform').children('option:selected').val()

	}

	return filterData;
}

function getIWOMTyrePlusFilterData() {
	var filterData = {
		"department": 2,
		"issueGrade": $('#IWOMTyreplusIssueGrade').children('option:selected').val(),
		"channel": $('#IWOMTyreplusChannel').children('option:selected').val(),
		"category": $('#IWOMTyreplusCategory').children('option:selected').val()
	}

	return filterData;
}

function init_product_trends(dateRange) {
	var subURL = iwomBaseURL + "buzztrend";
	var bindedData = [];
	var filterData = getIWOMFilterData();

	$.ajax({
		type: "GET",
		url: subURL + "/" + filterData.department + "/1/" + dateRange.start + "/" + dateRange.end,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			bindedData.date = returnValue.date;
			bindedData.products = returnValue.product;
			bindedData.pairs = returnValue.brandCountPair;
		}
	});
	var axisData = bindedData.date;

	option11 = {
		title: {
			text: 'Daily Buzz Trend - ' + dateRange.start + ' - ' + dateRange.end,
			subtext: 'Unit: Review'
		},
		tooltip: {
			trigger: 'axis',
			showDelay: 0 // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
		},
		legend: {
			data: bindedData.products,
			y: '8%'
		},
		toolbox: {
			show: true,
			feature: {
				mark: {
					show: true
				},
				dataZoom: {
					show: true
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		dataZoom: {
			y: 250,
			show: true,
			realtime: true,
			start: 00,
			end: 100
		},
		grid: {
			x: '5%',
			y: '15%',
			x2: '5%',
			y2: '5%'
		},
		xAxis: [{
			type: 'category',
			boundaryGap: true,
			axisLabel: {
				show: false
			},
			axisTick: {
				onGap: false
			},
			splitLine: {
				show: false
			},
			data: axisData
		}],
		yAxis: [{
			type: 'value',
			scale: true,
			boundaryGap: [0.05, 0.05],
			splitArea: {
				show: true
			}
		}],
		series: function() {
			var serie = [];
			for (var obj in bindedData.pairs) {
				var item = {
					name: obj,
					type: 'line',
					symbol: 'circle',
					itemStyle: createRandomItemStyle(),
					data: bindedData.pairs[obj]
				};
				serie.push(item);
			}
			return serie;
		}()
	};

	subURL = iwomBaseURL + "nsrtrend";
	bindedData = [];
	filterData = getIWOMFilterData();

	$.ajax({
		type: "GET",
		url: subURL + "/" + filterData.department + "/1/" + dateRange.start + "/" + dateRange.end,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			bindedData.date = returnValue.date;
			bindedData.products = returnValue.product;
			bindedData.pairs = returnValue.brandRaitoPair;
		}
	});

	option12 = {
		tooltip: {
			trigger: 'axis',
			showDelay: 0 // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
		},
		title: {
			text: 'Daily Net Sentiment Ratio - ' + dateRange.start + ' - ' + dateRange.end,
			subtext: 'Net Sentiment Ratio \n(Range from -1 to 1)',
		},
		legend: {
			y: -30,
			data: bindedData.products
		},
		toolbox: {
			y: -30,
			show: true,
			feature: {
				mark: {
					show: true
				},
				dataZoom: {
					show: true
				},
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
		grid: {
			x: '5%',
			y: '10%',
			x2: '5%',
			y2: '5%'
		},
		xAxis: [{
			type: 'category',
			position: 'bottom',
			boundaryGap: true,
			axisTick: {
				onGap: false
			},
			splitLine: {
				show: false
			},
			data: axisData,
		}],
		yAxis: [{
			type: 'value',
			scale: true,
			boundaryGap: [0.05, 0.05],
			splitArea: {
				show: true
			},
			min: 0,
			max: 1,
			splitnumber: '0.2'
		}],
		series: function() {
			var serie = [];
			for (var obj in bindedData.pairs) {
				var item = {
					name: obj,
					type: 'line',
					symbol: 'circle',
					itemStyle: createRandomItemStyle(),
					data: bindedData.pairs[obj]
				};
				serie.push(item);
			}
			return serie;
		}()
	};

	myChart11 = echarts.init(document.getElementById('echart_main4'), 'macarons');
	myChart11.setOption(option11);

	myChart12 = echarts.init(document.getElementById('echart_main5'), 'macarons');
	myChart12.setOption(option12);
	//	myChart.connect([myChart2]);
	//	myChart2.connect([myChart]);
	//
	setTimeout(function() {
		window.onresize = function() {
			myChart4.resize();
			myChart5.resize();
		}
	}, 200)
}

function init_brand_trends(dateRange) {
	var subURL = iwomBaseURL + "buzztrend";
	var bindedData = [];
	var filterData = getIWOMFilterData();

	$.ajax({
		type: "GET",
		url: subURL + "/" + filterData.department + "/2/" + dateRange.start + "/" + dateRange.end,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			bindedData.date = returnValue.date;
			bindedData.brands = returnValue.brand;
			bindedData.pairs = returnValue.brandCountPair;
		}
	});
	var axisData = bindedData.date;

	var myChart;
	var myChart2;
	var myChart3;
	option = {
		title: {
			text: 'Daily Buzz Trend - ' + dateRange.start + ' - ' + dateRange.end,
			subtext: 'Unit: Comment(Post)'
		},
		tooltip: {
			trigger: 'axis',
			showDelay: 0 // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
		},
		legend: {
			data: bindedData.brands,
			y: '8%'
		},
		toolbox: {
			show: true,
			feature: {
				mark: {
					show: true
				},
				dataZoom: {
					show: true
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		dataZoom: {
			y: 250,
			show: true,
			realtime: true,
			start: 00,
			end: 100
		},
		grid: {
			x: '5%',
			y: '15%',
			x2: '5%',
			y2: '5%'
		},
		xAxis: [{
			type: 'category',
			boundaryGap: true,
			axisLabel: {
				show: false
			},
			axisTick: {
				onGap: false
			},
			splitLine: {
				show: false
			},
			data: axisData
		}],
		yAxis: [{
			type: 'value',
			scale: true,
			boundaryGap: [0.05, 0.05],
			splitArea: {
				show: true
			}
		}],
		series: function() {
			//				console.log(datas);
			var serie = [];
			for (var obj in bindedData.pairs) {
				var item = {
					name: obj,
					type: 'line',
					symbol: 'circle',
					itemStyle: createRandomItemStyle(),
					data: bindedData.pairs[obj]
				};
				serie.push(item);
			}
			return serie;
		}()
	};

	subURL = iwomBaseURL + "nsrtrend";
	bindedData = [];
	filterData = getIWOMFilterData();

	$.ajax({
		type: "GET",
		url: subURL + "/" + filterData.department + "/2/" + dateRange.start + "/" + dateRange.end,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			bindedData.date = returnValue.date;
			bindedData.brands = returnValue.brand;
			bindedData.pairs = returnValue.brandRaitoPair;
		}
	});

	option2 = {
		tooltip: {
			trigger: 'axis',
			showDelay: 0 // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
		},
		title: {
			text: 'Daily Net Sentiment Ratio - ' + dateRange.start + ' - ' + dateRange.end,
			subtext: 'Net Sentiment Ratio \n(Range from -1 to 1)'
		},
		legend: {
			y: -30,
			data: bindedData.brands
		},
		toolbox: {
			y: -30,
			show: true,
			feature: {
				mark: {
					show: true
				},
				dataZoom: {
					show: true
				},
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
		grid: {
			x: '5%',
			y: '10%',
			x2: '5%',
			y2: '5%'
		},
		xAxis: [{
			type: 'category',
			position: 'bottom',
			boundaryGap: true,
			axisTick: {
				onGap: false
			},
			splitLine: {
				show: false
			},
			data: axisData,
		}],
		yAxis: [{
			type: 'value',
			scale: true,
			boundaryGap: [0.05, 0.05],
			splitArea: {
				show: true
			},
			min: 0,
			max: 1,
			splitnumber: '0.2'
		}],
		series: function() {
				//				console.log(datas);
				var serie = [];
				for (var obj in bindedData.pairs) {
					var item = {
						name: obj,
						type: 'line',
						symbol: 'circle',
						itemStyle: createRandomItemStyle(),
						data: bindedData.pairs[obj]
					};
					serie.push(item);
				}
				return serie;
			}()
			//		series: [{
			//			name: '米其林',
			//			type: 'line',
			//			symbol: 'circle',
			//			data: [0.81, 0.92, 0.88, 0.81, 0.86, 0.84, 0.9, 0.91, 0.89, 0.88, 0.88, 0.91, 0.88, 0.82, 0.88, 0.95, 0.91, 0.91, 0.84, 0.86, 0.85, 0.88, 0.94, 0.88, 0.88, 0.9, 0.94, 0.91, 0.91, 0.92, 0.85],
			//			itemStyle: {
			//				normal: {
			//					color: 'rgb(23,64,109)'
			//				}
			//			}
			//		}, {
			//			name: '固特异',
			//			type: 'line',
			//			symbol: 'circle',
			//			data: [0.87, 0.95, 0.94, 0.85, 0.86, 0.86, 0.89, 0.92, 0.85, 0.9, 0.83, 0.9, 0.89, 0.87, 0.94, 0.82, 0.84, 0.94, 0.86, 0.9, 0.95, 0.83, 0.8, 0.8, 0.85, 0.81, 0.83, 0.88, 0.95, 0.86, 0.9],
			//			itemStyle: {
			//				normal: {
			//					color: 'rgb(15,111,198)'
			//				}
			//			}
			//		}, {
			//			name: '马牌',
			//			type: 'line',
			//			symbol: 'circle',
			//			data: [0.63, 0.55, 0.56, 0.54, 0.52, 0.63, 0.53, 0.59, 0.6, 0.64, 0.52, 0.54, 0.52, 0.59, 0.65, 0.59, 0.59, 0.63, 0.58, 0.32, 0.6, 0.55, 0.66, 0.55, 0.64, 0.64, 0.57, 0.53, 0.65, 0.62, 0.24],
			//			itemStyle: {
			//				normal: {
			//					color: 'rgb(0,157,217)'
			//				}
			//			}
			//		}, {
			//			name: '普利司通',
			//			type: 'line',
			//			symbol: 'circle',
			//			data: [0.18, 0.04, -0.06, 0.23, 0.13, -0.09, -0.04, 0.09, 0.21, 0.1, 0.28, 0.22, 0.13, 0.11, 0.1, 0.19, 0.08, 0.26, 0.32, 0.22, 0.3, 0.06, 0.28, 0.11, 0.18, 0.13, -0.03, 0.37, 0.18, 0.02, 0.56],
			//			itemStyle: {
			//				normal: {
			//					color: 'rgb(11,208,217)'
			//				}
			//			}
			//		}, {
			//			name: '米其林型号1',
			//			type: 'line',
			//			symbol: 'circle',
			//			data: [0.71, 0.72, 0.73, 0.67, 0.69, 0.65, 0.72, 0.77, 0.71, 0.7, 0.71, 0.62, 0.74, 0.69, 0.64, 0.72, 0.78, 0.75, 0.65, 0.69, 0.71, 0.64, 0.75, 0.64, 0.8, 0.74, 0.77, 0.62, 0.69, 0.58, 0.66],
			//			itemStyle: {
			//				normal: {
			//					color: 'rgb(16,207,155)'
			//				}
			//			}
			//		}, {
			//			name: '米其林型号2',
			//			type: 'line',
			//			symbol: 'circle',
			//			data: [0.73, 0.71, 0.72, 0.68, 0.72, 0.7, 0.68, 0.65, 0.7, 0.68, 0.74, 0.74, 0.69, 0.71, 0.68, 0.69, 0.68, 0.72, 0.7, 0.7, 0.74, 0.69, 0.69, 0.73, 0.69, 0.76, 0.71, 0.73, 0.69, 0.73, 0.68],
			//			itemStyle: {
			//				normal: {
			//					color: 'rgb(24,202,98)'
			//				}
			//			}
			//		}]
	};

	myChart = echarts.init(document.getElementById('echart_main1'), 'macarons');
	myChart.setOption(option);

	myChart2 = echarts.init(document.getElementById('echart_main2'), 'macarons');
	myChart2.setOption(option2);

	subURL = iwomBaseURL + "recordtrend";
	bindedData = [];
	filterData = getIWOMFilterData();

	$.ajax({
		type: "GET",
		url: subURL + "/" + dateRange.start + "/" + dateRange.end,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			bindedData.date = returnValue.date;
			bindedData.brands = returnValue.brand;
			bindedData.pairs = returnValue.brandRaitoPair;
		}
	});

	option3 = {
		tooltip: {
			trigger: 'axis',
			showDelay: 0 // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
		},
		title: {
			text: 'i-Reco - ' + dateRange.start + ' - ' + dateRange.end,
			subtext: 'Percentage \n(Range from 0% to 100%)',
		},
		legend: {
			y: -30,
			data: bindedData.brands
		},
		toolbox: {
			y: -30,
			show: true,
			feature: {
				mark: {
					show: true
				},
				dataZoom: {
					show: true
				},
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
		grid: {
			x: '5%',
			y: '10%',
			x2: '5%',
			y2: '15%'
		},
		xAxis: [{
			type: 'category',
			position: 'bottom',
			boundaryGap: true,
			axisTick: {
				onGap: false
			},
			splitLine: {
				show: false
			},
			data: axisData,
		}],
		yAxis: [{
			type: 'value',
			scale: true,
			boundaryGap: [0.05, 0.05],
			splitArea: {
				show: true
			},
			min: 0,
			max: 1,
			axisLabel: {
				formatter: function(v) {
					return Math.round(v * 100) + '%'
				}
			},
			splitnumber: 0.2
		}],
		series: function() {
				//				console.log(datas);
				var serie = [];
				for (var obj in bindedData.pairs) {
					var item = {
						name: obj,
						type: 'line',
						symbol: 'circle',
						itemStyle: createRandomItemStyle(),
						data: bindedData.pairs[obj]
					};
					serie.push(item);
				}
				return serie;
			}()
			//		series: [{
			//			name: '米其林',
			//			type: 'line',
			//			symbol: 'circle',
			//			data: [0.58, 0.5, 0.56, 0.66, 0.54, 0.62, 0.67, 0.68, 0.6, 0.51, 0.52, 0.53, 0.68, 0.5, 0.5, 0.55, 0.51, 0.64, 0.69, 0.57, 0.6, 0.53, 0.62, 0.53, 0.55, 0.54, 0.53, 0.52, 0.63, 0.52, 0.54],
			//			itemStyle: {
			//				normal: {
			//					color: 'rgb(23,64,109)'
			//				}
			//			}
			//		}, {
			//			name: '固特异',
			//			type: 'line',
			//			symbol: 'circle',
			//			data: [0.57, 0.57, 0.56, 0.63, 0.58, 0.6, 0.55, 0.61, 0.6, 0.6, 0.6, 0.61, 0.57, 0.63, 0.61, 0.63, 0.59, 0.61, 0.59, 0.62, 0.62, 0.58, 0.62, 0.63, 0.6, 0.64, 0.58, 0.64, 0.56, 0.63, 0.59],
			//			itemStyle: {
			//				normal: {
			//					color: 'rgb(15,111,198)'
			//				}
			//			}
			//		}, {
			//			name: '马牌',
			//			type: 'line',
			//			symbol: 'circle',
			//			data: [0.45, 0.41, 0.4, 0.47, 0.5, 0.48, 0.41, 0.53, 0.47, 0.51, 0.43, 0.47, 0.55, 0.48, 0.54, 0.53, 0.49, 0.44, 0.44, 0.44, 0.55, 0.45, 0.52, 0.49, 0.42, 0.55, 0.46, 0.43, 0.42, 0.5, 0.47],
			//			itemStyle: {
			//				normal: {
			//					color: 'rgb(0,157,217)'
			//				}
			//			}
			//		}, {
			//			name: '普利司通',
			//			type: 'line',
			//			symbol: 'circle',
			//			data: [0.47, 0.41, 0.4, 0.41, 0.4, 0.41, 0.44, 0.44, 0.41, 0.47, 0.46, 0.41, 0.44, 0.46, 0.43, 0.45, 0.44, 0.4, 0.4, 0.47, 0.41, 0.47, 0.4, 0.47, 0.46, 0.44, 0.42, 0.47, 0.44, 0.45, 0.43],
			//			itemStyle: {
			//				normal: {
			//					color: 'rgb(11,208,217)'
			//				}
			//			}
			//		}, {
			//			name: '米其林型号1',
			//			type: 'line',
			//			symbol: 'circle',
			//			data: [0.55, 0.53, 0.51, 0.51, 0.5, 0.51, 0.52, 0.51, 0.51, 0.5, 0.51, 0.54, 0.51, 0.53, 0.53, 0.55, 0.52, 0.5, 0.51, 0.51, 0.53, 0.52, 0.55, 0.55, 0.53, 0.54, 0.55, 0.51, 0.53, 0.51, 0.51],
			//			itemStyle: {
			//				normal: {
			//					color: 'rgb(16,207,155)'
			//				}
			//			}
			//		}, {
			//			name: '米其林型号2',
			//			type: 'line',
			//			symbol: 'circle',
			//			data: [0.68, 0.65, 0.64, 0.66, 0.65, 0.63, 0.65, 0.63, 0.67, 0.66, 0.69, 0.69, 0.65, 0.62, 0.68, 0.68, 0.69, 0.68, 0.66, 0.68, 0.65, 0.65, 0.63, 0.66, 0.66, 0.63, 0.65, 0.66, 0.66, 0.68, 0.63],
			//			itemStyle: {
			//				normal: {
			//					color: 'rgb(24,202,98)'
			//				}
			//			}
			//		}]
	};
	myChart3 = echarts.init(document.getElementById('echart_main3'), 'macarons');
	myChart3.setOption(option3);

	//	//WARNING : where is myChart? not definied, did you miss anything?
	//	myChart.connect([myChart2, myChart3]);
	//	myChart2.connect([myChart, myChart3]);
	//	myChart3.connect([myChart, myChart2]);
	//
	setTimeout(function() {
		window.onresize = function() {
			myChart.resize();
			myChart2.resize();
			myChart3.resize();
		}
	}, 200);
}

function init_word_cloud_n(dateRange) {
	var subURL = iwomBaseURL + "negativeworldcloud";
	var pairs = [];
	var filterData = getIWOMFilterData();

	$.ajax({
		type: "GET",
		url: subURL + "/" + filterData.department + "/" + filterData.channel +
			"/" + filterData.product + "/" + filterData.platform +
			"/" + filterData.topic + "/" + filterData.sentiment +
			"/" + dateRange.start + "/" + dateRange.end,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			pairs = returnValue;
		}
	});
	// 使用
	require(
		[
			'echarts',
			'echarts/chart/wordCloud' // 使用柱状图就加载bar模块，按需加载
		],
		function(ec) {
			// 基于准备好的dom，初始化echarts图表
			var myChart5 = ec.init(document.getElementById('wordcloud_n'), 'macarons');
			option5 = {
				title: {
					text: 'May 2016',
					x: 'center'
				},
				tooltip: {
					show: true
				},
				toolbox: {
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
					name: 'Google Trends',
					type: 'wordCloud',
					size: ['80%', '80%'],
					textRotation: 0,
					textPadding: 0,
					autoSize: {
						enable: true,
						minSize: 14
					},
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					},
										data: pairs
//					
//					          {
//              name: "Macys",
//              value: 6181,
//              itemStyle: createRandomItemStyle()
//          },
//					data: function() {
//						var data_serie = [];
//						for (var obj in pairs) {
//							var item = {
//								name: obj.name,
//								value: obj.value,
//								itemStyle: createRandomItemStyle()
//							};
//							data_serie.push(item);
//						}
//						return data_serie;
//					}()
				}]
			};

			// 为echarts对象加载数据 
			myChart5.setOption(option5);
		}
	);
}

function init_word_cloud_p(dateRange) {
	var subURL = iwomBaseURL + "positiveworldcloud";
	var pairs = [];
	var filterData = getIWOMFilterData();

	$.ajax({
		type: "GET",
		url: subURL + "/" + filterData.department + "/" + filterData.channel +
			"/" + filterData.product + "/" + filterData.platform +
			"/" + filterData.topic + "/" + filterData.sentiment +
			"/" + dateRange.start + "/" + dateRange.end,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			pairs = returnValue;
		}
	});

		// 路径配置
//		require.config({
//			paths: {
//				'echarts': 'http://echarts.baidu.com/build/dist',
//			}
//		});
	
		// 使用
		require(
			[
				'echarts',
				'echarts/chart/wordCloud' // 使用柱状图就加载bar模块，按需加载
			],
			function(ec) {
				// 基于准备好的dom，初始化echarts图表
				var myChart4 = ec.init(document.getElementById('wordcloud_p'), 'macarons');
				option4 = {
					title: {
						text: 'May 2016 -' + dateRange.start + ' - ' + dateRange.end,
						x: 'center'
					},
					tooltip: {
						show: true
					},
					toolbox: {
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
						name: 'Google Trends',
						type: 'wordCloud',
						size: ['80%', '80%'],
						textRotation: 0,
						textPadding: 0,
						autoSize: {
							enable: true,
							minSize: 14
						},
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
	
				// 为echarts对象加载数据 
				myChart4.setOption(option4);
	
			}
		);
}

function init_topic(dateRange) {
	var subURL = iwomBaseURL + "topic";
	var pairs = [];
	var filterData = getIWOMFilterData();

	$.ajax({
		type: "GET",
		url: subURL + "/" + filterData.department + "/" + filterData.channel +
			"/" + filterData.product + "/" + filterData.platform +
			"/" + filterData.topic + "/" + filterData.sentiment +
			"/" + dateRange.start + "/" + dateRange.end,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			pairs = returnValue;
		}
	});

	var myChartTopic = echarts.init(document.getElementById('echart_topic'), 'macarons');
	var optionTopic = {
		title: {
			text: 'Michelin Topic Share - ' + dateRange.start + ' - ' + dateRange.end,
			x: 'left',
			subtext: 'Unit: Comment(Post)',

		},
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		legend: {
			data: ['帖子数'],
			y: '10%'
		},
		xAxis: [{
			type: 'value'
		}],
		yAxis: [{
			type: 'category',
			axisTick: {
				show: false
			},
			//			data: ['其他', '轮胎质量', '操控性', '静音能力', '舒适性']
			data: pairs.names
		}],
		series: [{
			type: 'bar',
			label: {
				normal: {
					show: true,
					position: 'inside'
				}
			},
			//			data: [200, 170, 240, 244, 200],
			data: pairs.counts,
			itemstyle: {
				normal: {
					color: 'rgb(15,111,198)'
				}
			}
		}]
	};

	myChartTopic.setOption(optionTopic);
}

function init_channel(dateRange) {
	var subURL = iwomBaseURL + "channel";
	var pairs = [];
	var filterData = getIWOMFilterData();

	$.ajax({
		type: "GET",
		url: subURL + "/" + filterData.department + "/" + filterData.channel +
			"/" + filterData.product + "/" + filterData.platform +
			"/" + filterData.topic + "/" + filterData.sentiment +
			"/" + dateRange.start + "/" + dateRange.end,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			pairs = returnValue;
		}
	});

	var myChartChannel = echarts.init(document.getElementById('echart_channel'), 'macarons');
	var optionChannel = {
		title: {
			text: 'Channel Distribution - ' + dateRange.start + '-' + dateRange.end
		},
		tooltip: {
			trigger: 'item',
			formatter: "{b}: {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			x: '75%',
			y: 'center',
			data: ['BBS', 'Weibo', 'WeChat', 'Complant Site', 'News', 'Video Sites']
		},
		series: [{
			type: 'pie',
			radius: ['50%', '65%'],
			center: ['35%', '50%'],
			avoidLabelOverlap: false,
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

	myChartChannel.setOption(optionChannel);
}

function init_online_topic_records(dateRange) {
	var subURL = iwomBaseURL + "onlinetopicrecords";
	var tableData = [];
	var filterData = getIWOMFilterData();

	$.ajax({
		type: "GET",
		url: subURL + "/" + filterData.department + "/" + filterData.channel +
			"/" + filterData.product + "/" + filterData.platform +
			"/" + filterData.topic + "/" + filterData.sentiment +
			"/" + dateRange.start + "/" + dateRange.end,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			tableData = returnValue;
		}
	});

	$('#iwompostedrecords').DataTable({
		"paging": true,
		"bDestroy": true,
		//sDom: "<'col-xs-4'><'col-xs-4'><'top'<'col-xs-3'f><'#jdTool'>>" +
		//	"t" +
		//	"<'bottom'ip>",
		aaSorting: [
			[0, 'asc']
		],
		data: tableData,
		columns: [{
			data: 'channel',
			width: '50'
		}, {
			data: 'platform',
			width: '50'
		}, {
			data: 'product',
			width: '50'
		}, {
			data: 'title',
			width: '50',
			render: function(data, type, row) {
				return '<a href=' + row.url + ' target= "_blank">' + data + '</a>';
			}
		}, {
			data: 'content'
		}, {
			data: 'postDate',
			width: '70',
			render: function(data, type, row) {
				return data.substring(0, 10);
			}
		}],
		initComplete: function() {
			//	$("#jdTool").append('<a>Download</a>');
		}
	});
}

function init_trend_tyreplus(dateRange) {
	var subURL = iwomBaseURL + "buzztrend";
	var bindedData = [];
	var filterData = getIWOMFilterData();

	$.ajax({
		type: "GET",
		url: subURL + "/" + filterData.department + "/1/" + dateRange.start + "/" + dateRange.end,
		async: false,
		dataType: "json",
		success: function(returnValue) {
			bindedData.date = returnValue.date;
			bindedData.products = returnValue.product;
			bindedData.pairs = returnValue.brandCountPair;
		}
	});
	var axisData = bindedData.date;
	var axisData = [
		"1-May", "2-May", "3-May", "4-May", "5-May", "6-May",
		"-May", "8-May", "9-May", "10-May", "11-May", "12-May",
		"13-May", "14-May", "15-May", "16-May", "17-May", "18-May",
		"19-May", "20-May", "21-May", "22-May", "23-May", "24-May",
		"25-May", "26-May", "27-May", "28-May", "29-May", "30-May",
		"31-May"
	];

	option = {
		title: {
			text: 'Daily Buzz Trend - May 2016',
			subtext: 'Unit: Review'
		},
		tooltip: {
			trigger: 'axis',
			showDelay: 0 // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
		},
		legend: {
			data: ['米其林', '固特异', '马牌', '普利司通', '锦湖', '韩泰'],
			y: '8%'
		},
		toolbox: {
			show: true,
			feature: {
				mark: {
					show: true
				},
				dataZoom: {
					show: true
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		dataZoom: {
			y: 250,
			show: true,
			realtime: true,
			start: 00,
			end: 100
		},
		grid: {
			x: '5%',
			y: '15%',
			x2: '5%',
			y2: '5%'
		},
		xAxis: [{
			type: 'category',
			boundaryGap: true,
			axisLabel: {
				show: false
			},
			axisTick: {
				onGap: false
			},
			splitLine: {
				show: false
			},
			data: axisData
		}],
		yAxis: [{
			type: 'value',
			scale: true,
			boundaryGap: [0.05, 0.05],
			splitArea: {
				show: true
			}
		}],
		series: [{
				name: '米其林',
				type: 'line',
				symbol: 'circle',
				itemStyle: {
					normal: {
						color: 'rgb(23,64,109)'
					}
				},
				data: [181, 175, 178, 165, 154, 156, 153, 163, 152, 170, 157, 179, 167, 155, 153, 172, 163, 174, 159, 163, 162, 167, 178, 174, 170, 163, 165, 171, 154, 171, 153]
			}, {
				name: '固特异',
				type: 'line',
				symbol: 'circle',
				itemStyle: {
					normal: {
						color: 'rgb(15,111,198)'
					}
				},
				data: [205, 212, 205, 225, 227, 243, 241, 207, 200, 221, 208, 202, 238, 249, 250, 208, 249, 237, 249, 217, 213, 209, 233, 231, 227, 232, 241, 248, 202, 226, 202]
			}, {
				name: '马牌',
				type: 'line',
				symbol: 'circle',
				itemStyle: {
					normal: {
						color: 'rgb(0,157,217)'
					}
				},
				data: [281, 322, 396, 331, 329, 357, 312, 405, 454, 451, 441, 407, 450, 431, 397, 405, 402, 388, 557, 507, 492, 432, 282, 276, 459, 502, 460, 483, 335, 432, 448]
			}, {
				name: '普利司通',
				type: 'line',
				symbol: 'circle',
				itemStyle: {
					normal: {
						color: 'rgb(11,208,217)'
					}
				},
				data: [244, 250, 250, 245, 245, 249, 253, 249, 251, 247, 256, 251, 249, 254, 246, 254, 242, 243, 248, 248, 257, 245, 270, 263, 265, 274, 255, 255, 263, 251, 251]
			}, {
				name: '韩泰',
				type: 'line',
				symbol: 'circle',
				itemStyle: {
					normal: {
						color: 'rgb(16,207,155)'
					}
				},
				data: [205, 224, 222, 226, 234, 223, 219, 233, 242, 235, 237, 237, 245, 231, 238, 247, 240, 239, 241, 261, 250, 268, 268, 273, 259, 263, 259, 261, 262, 278, 282]
			}, {
				name: '锦湖',
				type: 'line',
				symbol: 'circle',
				itemStyle: {
					normal: {
						color: 'rgb(24,202,98)'
					}
				},
				data: [183, 198, 192, 173, 178, 172, 154, 153, 196, 174, 175, 153, 195, 180, 198, 191, 195, 154, 162, 166, 157, 159, 192, 189, 185, 171, 198, 193, 158, 159, 171]
			},

		]
	};

	option2 = {
		tooltip: {
			trigger: 'axis',
			showDelay: 0 // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
		},
		title: {
			text: 'Daily Net Sentiment Ratio - May 2016',
			subtext: 'Net Sentiment Ratio \n(Range from -1 to 1)',
		},
		legend: {
			y: -30,
			data: ['米其林', '固特异', '马牌', '普利司通', '韩泰', '锦湖']
		},
		toolbox: {
			y: -30,
			show: true,
			feature: {
				mark: {
					show: true
				},
				dataZoom: {
					show: true
				},
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
		grid: {
			x: '5%',
			y: '10%',
			x2: '5%',
			y2: '5%'
		},
		xAxis: [{
			type: 'category',
			position: 'bottom',
			boundaryGap: true,
			axisTick: {
				onGap: false
			},
			splitLine: {
				show: false
			},
			data: axisData,
		}],
		yAxis: [{
			type: 'value',
			scale: true,
			boundaryGap: [0.05, 0.05],
			splitArea: {
				show: true
			},
			min: 0,
			max: 1,
			splitnumber: '0.2'
		}],
		series: [{
			name: '米其林',
			type: 'line',
			symbol: 'circle',
			data: [0.81, 0.92, 0.88, 0.81, 0.86, 0.84, 0.9, 0.91, 0.89, 0.88, 0.88, 0.91, 0.88, 0.82, 0.88, 0.95, 0.91, 0.91, 0.84, 0.86, 0.85, 0.88, 0.94, 0.88, 0.88, 0.9, 0.94, 0.91, 0.91, 0.92, 0.85],
			itemStyle: {
				normal: {
					color: 'rgb(23,64,109)'
				}
			}
		}, {
			name: '固特异',
			type: 'line',
			symbol: 'circle',
			data: [0.87, 0.95, 0.94, 0.85, 0.86, 0.86, 0.89, 0.92, 0.85, 0.9, 0.83, 0.9, 0.89, 0.87, 0.94, 0.82, 0.84, 0.94, 0.86, 0.9, 0.95, 0.83, 0.8, 0.8, 0.85, 0.81, 0.83, 0.88, 0.95, 0.86, 0.9],
			itemStyle: {
				normal: {
					color: 'rgb(15,111,198)'
				}
			}
		}, {
			name: '马牌',
			type: 'line',
			symbol: 'circle',
			data: [0.63, 0.55, 0.56, 0.54, 0.52, 0.63, 0.53, 0.59, 0.6, 0.64, 0.52, 0.54, 0.52, 0.59, 0.65, 0.59, 0.59, 0.63, 0.58, 0.32, 0.6, 0.55, 0.66, 0.55, 0.64, 0.64, 0.57, 0.53, 0.65, 0.62, 0.24],
			itemStyle: {
				normal: {
					color: 'rgb(0,157,217)'
				}
			}
		}, {
			name: '普利司通',
			type: 'line',
			symbol: 'circle',
			data: [0.18, 0.04, -0.06, 0.23, 0.13, -0.09, -0.04, 0.09, 0.21, 0.1, 0.28, 0.22, 0.13, 0.11, 0.1, 0.19, 0.08, 0.26, 0.32, 0.22, 0.3, 0.06, 0.28, 0.11, 0.18, 0.13, -0.03, 0.37, 0.18, 0.02, 0.56],
			itemStyle: {
				normal: {
					color: 'rgb(11,208,217)'
				}
			}
		}, {
			name: '韩泰',
			type: 'line',
			symbol: 'circle',
			data: [0.71, 0.72, 0.73, 0.67, 0.69, 0.65, 0.72, 0.77, 0.71, 0.7, 0.71, 0.62, 0.74, 0.69, 0.64, 0.72, 0.78, 0.75, 0.65, 0.69, 0.71, 0.64, 0.75, 0.64, 0.8, 0.74, 0.77, 0.62, 0.69, 0.58, 0.66],
			itemStyle: {
				normal: {
					color: 'rgb(16,207,155)'
				}
			}
		}, {
			name: '锦湖',
			type: 'line',
			symbol: 'circle',
			data: [0.73, 0.71, 0.72, 0.68, 0.72, 0.7, 0.68, 0.65, 0.7, 0.68, 0.74, 0.74, 0.69, 0.71, 0.68, 0.69, 0.68, 0.72, 0.7, 0.7, 0.74, 0.69, 0.69, 0.73, 0.69, 0.76, 0.71, 0.73, 0.69, 0.73, 0.68],
			itemStyle: {
				normal: {
					color: 'rgb(24,202,98)'
				}
			}
		}]
	};
	myChart = echarts.init(document.getElementById('echart_K1BuzzNSRTopic1'));
	myChart.setOption(option);

	myChart2 = echarts.init(document.getElementById('echart_K1BuzzNSRTopic2'));
	myChart2.setOption(option2);

	myChart.connect([myChart2]);
	myChart2.connect([myChart]);

	setTimeout(function() {
		window.onresize = function() {
			myChart.resize();
			myChart2.resize();
		}
	}, 200)

	//	});
}