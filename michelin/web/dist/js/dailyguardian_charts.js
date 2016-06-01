function init_dg_weeklyissuetrend(data) {
	            var dates = [];  
                var negativeIssue = [];
                var crisisIssue = [];
				var baseURL = "michelinrest/dailyguardian/weeklyissuetrend/";
				

				$.ajax({
					type:"GET",
					url:baseURL + data.start + "/" + data.end,
					async:false,
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
				title: [
					{
						text: '',
						subtext: 'Unit: Comment(Post)'
					},
					{
						text: '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n                ',
						borderColor:'#933',
						borderWidth: 1,
						left:'83%',
						top: '10%'
					}
				],
				tooltip : {
					trigger: 'axis',
					axisPointer : {            // ������ָʾ���������ᴥ����Ч
						type : 'shadow'        // Ĭ��Ϊֱ�ߣ���ѡΪ��'line' | 'shadow'
					}
				},
				legend: {
					data:['Negative Issue','Crisis Issue'],
					top:'5%'
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
			            dataView: {show: true, readOnly: false},
			            restore: {show: true},
			            saveAsImage: {show: true}
			        }
		        },
				xAxis : [
					{
						type : 'category',
						data : dates
					}
				],
				yAxis : [
					{
						type : 'value'
					}
				],
				series : [
					{
						name:'Negative Issue',
						type:'bar',
						data: negativeIssue,
						itemstyle:{
							normal:{
								color:'#999'
							}
						},
						lable:{
							normal:{
								show: true
							}
						}
					   
					},
					{
						name:'Crisis Issue',
						type:'bar',
						data:crisisIssue
					},
				]
			};
            // Ϊecharts������������ 
			myChart.setOption(option); 
}