function getCurrentDateRange() {
	var dateRange = $("#daterange-btn span").html();
	var indexOfSpiliter = dateRange.indexOf('-');
	var startDate = dateRange.substring(0, indexOfSpiliter - 1);
	var endDate = dateRange.substring(indexOfSpiliter + 2);
	var convertedStart = convertDate(startDate);
	var convertedEnd = convertDate(endDate);
	var data = {
		"start": convertedStart,
		"end": convertedEnd
	};

	return data;
}

function convertDate(stringTime) {
	var dateTime = new Date(stringTime);
	var year = dateTime.getFullYear();
	var month = dateTime.getMonth();
	month = month + 1;
	var day = dateTime.getDate();
	var newDateTime = year + "-" + month + "-" + day;
	return newDateTime;
}

function dataRangePicker() {
	//Date range picker

	$('#daterange-btn').daterangepicker({
			ranges: {
				'Today': [moment(), moment()],
				'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
				'Last 7 Days': [moment().subtract(6, 'days'), moment()],
				'Last 30 Days': [moment().subtract(29, 'days'), moment()],
				'This Month': [moment().startOf('month'), moment().endOf('month')],
				'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
			},
			startDate: moment().subtract(29, 'days'),
			endDate: moment()
		},
		function(start, end) {
			$('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
		}
	);

	$('#daterange-btn span').html(moment().subtract(5, "day").format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'))
	$("#daterange-btn").on('apply.daterangepicker', function() {
		console.log($("#daterange-btn span").html());
		var dateRange = $("#daterange-btn span").html();

		var currentPageId = $('#container').find('div').attr('id');

		if (currentPageId == "dailyguardian") {
			loadDailyGuardian();
		} else if (currentPageId == 'DailyHotTopic') {
			loadDailyHotTopicCharts();
		} else if (currentPageId == 'iwom') {
//			loadIWOM();
			loadAllBuzzs();
		} else if (currentPageId == 'dailyguardian_tyreplus') {			
			loadDailyGuardian_tyreplus();
		} else if (currentPageId == 'iwom_tyreplus') {
			loadIWOM_tyreplus();
		} else if (currentPageId == 'Ecommerce') {
			loadECommerceCharts();
		}
	});
}

function loadAllBuzzs() {
	var data = getCurrentDateRange();
	init_product_trends(data);
	init_brand_trends(data);
	// To fix empty 'Product' tab issue, both 'Product' and 'Brand Trend' should be marked with 'active' css when loading the page.
	// When js fully loaded, remove css value 'active' for the tab Product , if not, all tables will be diplayed in the same tab.
	$("#echart_K1BuzzNSRTopic2").removeClass("active");
}

function loadBuzzsAndOthers() {
	var data = getCurrentDateRange();
	init_word_cloud_n(data);
	init_word_cloud_p(data);
	init_topic(data);
	init_channel(data);
	init_online_topic_records(data);
}

function loadIWOM() {
	$("#container").load("pages/iWOM.html #iwom", null, function() {
		// echart K1BuzzNSRTopic
		dataRangePicker();

		$("#loadDG").removeClass("active");
		$("#loadIWOM").addClass("active");
		$("#loadDHTs").removeClass("active");
		$("#loadDG_T").removeClass("active");
		$("#loadIWOM_T").removeClass("active");
		$("#loadE_T").removeClass("active");
		
		bindIWOMFilters();
		
		loadAllBuzzs();
		loadBuzzsAndOthers();
	});
};

function loadDailyGuardianPage() {
	$("#container").load("pages/DailyGuardian.html #dailyguardian", null, function() {
		dataRangePicker();
		$("#loadDG").addClass("active");
		$("#loadIWOM").removeClass("active");
		$("#loadDHTs").removeClass("active");
		$("#loadDG_T").removeClass("active");
		$("#loadIWOM_T").removeClass("active");
		$("#loadE_T").removeClass("active");
		MDGbindFilters();
		loadDailyGuardian();
	});
}

function loadDailyGuardian() {
	var data = getCurrentDateRange();
	// weekly issue trend
	init_dg_weeklyissuetrend(data);

	// issue grade
	init_dg_issuegrade(data);

	// issue platform
	init_dg_issueplatform(data);

	// issue category
	init_dg_issuecategory(data);

	// issue break down
	init_dg_issuebreakdown(data);

	// report
	init_dg_report(data);
};

function loadDailyGuardian_tyreplusPage() {
		$("#container").load("pages/DailyGuardian_TyrePlus.html #dailyguardian_tyreplus", null, function() {
		dataRangePicker();
		$("#loadDG").removeClass("active");
		$("#loadIWOM").removeClass("active");
		$("#loadDHTs").removeClass("active");
		$("#loadDG_T").addClass("active");
		$("#loadIWOM_T").removeClass("active");
		$("#loadE_T").removeClass("active");
		
	 	DGbindFilters();
		loadDailyGuardian_tyreplus();
	
	});
}


function loadDailyGuardian_tyreplus(){
		var data = getCurrentDateRange();
		// weekly issue trend 
		init_dg_weeklyissuetrend_tyreplus(data);
		init_dg_issuecategory_tyreplus(data);
		
		//init_dg_issuebreakdown_tyreplus(data);
		//init_dg_issuecategory_tyreplus(data);
		init_dg_issuegrade_tyreplus(data);
		init_dg_issueplatform_tyreplus(data); 
		init_dg_report_tyreplus(data);
		
		// weekly issue trend 
		// init_dg_weeklyissuetrend_tyreplus(data);
}

function loadECommerceCharts() {
	var dateRange = getCurrentDateRange();

	init_ecom_tuhu(dateRange);

	init_ecom_tmall(dateRange);

	init_ecom_jd(dateRange);
}

function loadECommerce() {
	$("#container").load("pages/Ecommerce.html #Ecommerce", null, function() {
		dataRangePicker();

		$("#loadDG").removeClass("active");
		$("#loadIWOM").removeClass("active");
		$("#loadDHTs").removeClass("active");
		$("#loadDG_T").removeClass("active");
		$("#loadIWOM_T").removeClass("active");
		$("#loadE_T").addClass("active");

		bindFilters();
		loadECommerceCharts();
	});
}

function loadDailyHotTopicCharts() {
	var data = getCurrentDateRange();

	init_dialy_hot_topic_wechat(data);

	init_daily_hot_topic_weibo(data);

	init_daily_hot_topic_zhihu(data);

	init_daily_hot_topic_zhidao(data);

	init_daily_hot_topic_bbs(data);
}

function loadDailyHotTopic() {
	$("#container").load("pages/DailyHotTopic.html #DailyHotTopic", null, function() {
		dataRangePicker();

		$("#loadDG").removeClass("active");
		$("#loadIWOM").removeClass("active");
		$("#loadDHTs").addClass("active");
		$("#loadDG_T").removeClass("active");
		$("#loadIWOM_T").removeClass("active");
		$("#loadE_T").removeClass("active");

		loadDailyHotTopicCharts();

	});
}

function loadIWOM_tyreplus() {
	$("#container").load("pages/IWOM_TyrePlus.html #iwom_tyreplus", null, function() {
		// echart K1BuzzNSRTopic
		$("#loadDG").removeClass("active");
		$("#loadIWOM").removeClass("active");
		$("#loadDHTs").removeClass("active");
		$("#loadDG_T").removeClass("active");
		$("#loadIWOM_T").addClass("active");
		$("#loadE_T").removeClass("active");

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

	});
}

function createRandomItemStyle() {
	return {
		normal: {
			color: 'rgb(' + [
				Math.round(Math.random() * 160),
				Math.round(Math.random() * 160),
				Math.round(Math.random() * 160)
			].join(',') + ')'
		}
	};
};