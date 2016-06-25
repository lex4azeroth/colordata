var currentTab = "brand";
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
		
		// TO keep the selected value of date range picker, just refresh the charts based on each page by id.
		if (currentPageId == "dailyguardian") {
			loadDailyGuardian();
		} else if (currentPageId == 'DailyHotTopic') {
			loadDailyHotTopicCharts();
		} else if (currentPageId == 'iwom') {
			loadAllBuzzs();
			loadBuzzsAndOthers();
		} else if (currentPageId == 'dailyguardian_tyreplus') {			
			loadDailyGuardian_tyreplus();
		} else if (currentPageId == 'iwom_tyreplus') {
			loadAllBuzzsTyreplus();
			loadBuzzsAndOthers();
		} else if (currentPageId == 'Ecommerce') {
			loadECommerceCharts();
		}
	});
}

function refreshProduct() {
	var data = getCurrentDateRange();
	$("#echart_K1BuzzNSRTopic2").addClass("active");
	$("#echart_K1BuzzNSRTopic1").removeClass("active");
	init_product_trends(data);
	currentTab = "product"; // persists the current tab
}

function refreshBrand() {
	var data = getCurrentDateRange();
	$("#echart_K1BuzzNSRTopic1").addClass("active");
	$("#echart_K1BuzzNSRTopic2").removeClass("active");
	init_brand_trends(data);
	currentTab = "brand"; // persists the current tab
}

function loadAllBuzzs() {
	if (currentTab == "brand") { // switch between "Brand" and "Product" tabs
		refreshBrand();
	} else {
		refreshProduct();
	}
}

function loadAllBuzzsTyreplus() {
	var data = getCurrentDateRange();
	init_brand_trends(data);
}

function loadBuzzsAndOthers() {
	var data = getCurrentDateRange();
	init_word_cloud_n(data);
	init_word_cloud_p(data);
	init_topic(data);
	init_channel(data);
	if ($('#container').find('div').attr('id') == "iwom") {
		init_online_topic_records(data);
	} else {
		init_online_topic_records_tyreplus(data);
	}
	
}

function loadIWOM() {
	$("#container").load("pages/iWOM.html #iwom", null, function() {
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
		dataRangePicker();
		
		$("#loadDG").removeClass("active");
		$("#loadIWOM").removeClass("active");
		$("#loadDHTs").removeClass("active");
		$("#loadDG_T").removeClass("active");
		$("#loadIWOM_T").addClass("active");
		$("#loadE_T").removeClass("active");
		
		bindIWOMFilters();
		
		loadAllBuzzsTyreplus();
		loadBuzzsAndOthers();
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