function dataRangePicker() {
	 //Date range picker
 
  
  //  $('.reservationtime').daterangepicker();
    $('#reservationtime').daterangepicker();
    $('#daterange-btn').daterangepicker(
        {
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
        function (start, end) {
          $('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        }
    );
}

function loadIWOM(){
$("#container").load("pages/iWOM.html #iwom", null, function() {
// echart K1BuzzNSRTopic
  
  var axisData = [
"1-May","2-May","3-May","4-May","5-May","6-May",
"-May","8-May","9-May","10-May","11-May","12-May",
"13-May","14-May","15-May","16-May","17-May","18-May",
"19-May","20-May","21-May","22-May","23-May","24-May",
"25-May","26-May","27-May","28-May","29-May","30-May",
"31-May"
];

var myChart2;
var myChart3;
option = {
    title: {
        text: 'Daily Buzz Trend - May 2016',
        subtext: 'Unit: Comment(Post)'
	},
    tooltip : {
        trigger: 'axis',
        showDelay: 0            // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
    },
    legend: {
        data:['米其林','固特异','马牌','普利司通','米其林型号1','米其林型号2'],
      	y:'8%'
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataZoom : {show: true},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    dataZoom : {
        y: 250,
        show : true,
        realtime: true,
        start : 00,
        end : 100
    },
    grid: {
        x: '5%',
        y: '15%',
        x2: '5%',
        y2: '5%'
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : true,
            axisLabel:{show:false},
            axisTick: {onGap:false},
            splitLine: {show:false},
            data : axisData
        }
    ],
    yAxis : [
        {
            type : 'value',
            scale:true,
            boundaryGap: [0.05, 0.05],
            splitArea : {show : true}
        }
    ],
    series : [
        {
            name:'米其林',
            type:'line',
          	symbol:'circle',
            itemStyle:{
                normal:{
                    color:'rgb(23,64,109)'
                }
            },
            data:[181,175,178,165,154,156,153,163,152,170,157,179,167,155,153,172,163,174,159,163,162,167,178,174,170,163,165,171,154,171,153]
        },
        {
            name:'固特异',
            type:'line',
          	symbol:'circle',
            itemStyle:{
                normal:{
                    color:'rgb(15,111,198)'
                }
            },
            data:[205,212,205,225,227,243,241,207,200,221,208,202,238,249,250,208,249,237,249,217,213,209,233,231,227,232,241,248,202,226,202]
        },
        {
            name:'马牌',
            type:'line',
          	symbol:'circle',
            itemStyle:{
                normal:{
                    color:'rgb(0,157,217)'
                }
            },
            data:[281,322,396,331,329,357,312,405,454,451,441,407,450,431,397,405,402,388,557,507,492,432,282,276,459,502,460,483,335,432,448]
        },
        {
            name:'普利司通',
            type:'line',
          	symbol:'circle',
            itemStyle:{
                normal:{
                    color:'rgb(11,208,217)'
                }
            },
            data:[244,250,250,245,245,249,253,249,251,247,256,251,249,254,246,254,242,243,248,248,257,245,270,263,265,274,255,255,263,251,251]
        },
        {
            name:'米其林型号1',
            type:'line',
          	symbol:'circle',
            itemStyle:{
                normal:{
                    color:'rgb(16,207,155)'
                }
            },
            data:[205,224,222,226,234,223,219,233,242,235,237,237,245,231,238,247,240,239,241,261,250,268,268,273,259,263,259,261,262,278,282]
        },
        {
            name:'米其林型号2',
            type:'line',
          	symbol:'circle',
            itemStyle:{
                normal:{
                    color:'rgb(24,202,98)'
                }
            },
            data:[183,198,192,173,178,172,154,153,196,174,175,153,195,180,198,191,195,154,162,166,157,159,192,189,185,171,198,193,158,159,171]
        }
    ]
};

option2 = {
    tooltip : {
        trigger: 'axis',
        showDelay: 0             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
    },
  	title: {
        text: 'Daily Net Sentiment Ratio - May 2016',
        subtext: 'Net Sentiment Ratio \n(Range from -1 to 1)'
	},
    legend: {
        y : -30,
        data:['米其林','固特异','马牌','普利司通','米其林型号1','米其林型号2']
    },
    toolbox: {
        y : -30,
        show : true,
        feature : {
            mark : {show: true},
            dataZoom : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    grid: {
        x: '5%',
        y: '10%',
        x2: '5%',
        y2: '5%'
    },
    xAxis : [
        {
            type : 'category',
            position:'bottom',
            boundaryGap : true,
            axisTick: {onGap:false},
            splitLine: {show:false},
            data : axisData,
        }
    ],
    yAxis : [
        {
            type : 'value',
            scale:true,
            boundaryGap: [0.05, 0.05],
            splitArea : {show : true},
          	min: 0,
          	max: 1,
          	splitnumber:'0.2'
        }
    ],
    series: [
        {
            name:'米其林',
            type:'line',
          	symbol:'circle',
            data:[0.81,0.92,0.88,0.81,0.86,0.84,0.9,0.91,0.89,0.88,0.88,0.91,0.88,0.82,0.88,0.95,0.91,0.91,0.84,0.86,0.85,0.88,0.94,0.88,0.88,0.9,0.94,0.91,0.91,0.92,0.85],
            itemStyle:{
                normal:{
                    color:'rgb(23,64,109)'
                }
            }
        },
        {
            name:'固特异',
            type:'line',
          	symbol:'circle',
            data:[0.87,0.95,0.94,0.85,0.86,0.86,0.89,0.92,0.85,0.9,0.83,0.9,0.89,0.87,0.94,0.82,0.84,0.94,0.86,0.9,0.95,0.83,0.8,0.8,0.85,0.81,0.83,0.88,0.95,0.86,0.9],
            itemStyle:{
                normal:{
                    color:'rgb(15,111,198)'
                }
            }
        },
        {
            name:'马牌',
            type:'line',
          	symbol:'circle',
            data:[0.63,0.55,0.56,0.54,0.52,0.63,0.53,0.59,0.6,0.64,0.52,0.54,0.52,0.59,0.65,0.59,0.59,0.63,0.58,0.32,0.6,0.55,0.66,0.55,0.64,0.64,0.57,0.53,0.65,0.62,0.24],
            itemStyle:{
                normal:{
                    color:'rgb(0,157,217)'
                }
            }
        },
        {
            name:'普利司通',
            type:'line',
          	symbol:'circle',
            data:[0.18,0.04,-0.06,0.23,0.13,-0.09,-0.04,0.09,0.21,0.1,0.28,0.22,0.13,0.11,0.1,0.19,0.08,0.26,0.32,0.22,0.3,0.06,0.28,0.11,0.18,0.13,-0.03,0.37,0.18,0.02,0.56],
            itemStyle:{
                normal:{
                    color:'rgb(11,208,217)'
                }
            }
        },
        {
            name:'米其林型号1',
            type:'line',
          	symbol:'circle',
            data:[0.71,0.72,0.73,0.67,0.69,0.65,0.72,0.77,0.71,0.7,0.71,0.62,0.74,0.69,0.64,0.72,0.78,0.75,0.65,0.69,0.71,0.64,0.75,0.64,0.8,0.74,0.77,0.62,0.69,0.58,0.66],
            itemStyle:{
                normal:{
                    color:'rgb(16,207,155)'
                }
            }
        },
        {
            name:'米其林型号2',
            type:'line',
          	symbol:'circle',
            data:[0.73,0.71,0.72,0.68,0.72,0.7,0.68,0.65,0.7,0.68,0.74,0.74,0.69,0.71,0.68,0.69,0.68,0.72,0.7,0.7,0.74,0.69,0.69,0.73,0.69,0.76,0.71,0.73,0.69,0.73,0.68],
            itemStyle:{
                normal:{
                    color:'rgb(24,202,98)'
                }
            }
        }
    ]
};
myChart2 = echarts.init(document.getElementById('echart_K1BuzzNSRTopic1'),'macarons');
myChart2.setOption(option2);

option3 = {
    tooltip : {
        trigger: 'axis',
        showDelay: 0             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
    },
  	title:{
    	text:'i-Reco - May 2016',
    	subtext: 'Percentage \n(Range from 0% to 100%)',   
    },
    legend: {
        y : -30,
        data:['米其林','固特异','马牌','普利司通','米其林型号1','米其林型号2']
    },
    toolbox: {
        y : -30,
        show : true,
        feature : {
            mark : {show: true},
            dataZoom : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    grid: {
        x: '5%',
        y: '10%',
        x2: '5%',
        y2: '15%'
    },
    xAxis : [
        {
            type : 'category',
            position:'bottom',
            boundaryGap : true,
            axisTick: {onGap:false},
            splitLine: {show:false},
            data : axisData,
        }
    ],
    yAxis : [
        {
            type : 'value',
            scale:true,
            boundaryGap: [0.05, 0.05],
            splitArea : {show : true},
          	min: 0,
          	max: 1,
            axisLabel: {
                formatter: function (v) {
                    return Math.round(v*100) + '%'
                }
            },			
          	splitnumber: 0.2
        }
    ],
    series: [
        {
            name:'米其林',
            type:'line',
          	symbol:'circle',
            data:[0.58,0.5,0.56,0.66,0.54,0.62,0.67,0.68,0.6,0.51,0.52,0.53,0.68,0.5,0.5,0.55,0.51,0.64,0.69,0.57,0.6,0.53,0.62,0.53,0.55,0.54,0.53,0.52,0.63,0.52,0.54],
            itemStyle:{
                normal:{
                    color:'rgb(23,64,109)'
                }
            }
        },
        {
            name:'固特异',
            type:'line',
          	symbol:'circle',
            data:[0.57,0.57,0.56,0.63,0.58,0.6,0.55,0.61,0.6,0.6,0.6,0.61,0.57,0.63,0.61,0.63,0.59,0.61,0.59,0.62,0.62,0.58,0.62,0.63,0.6,0.64,0.58,0.64,0.56,0.63,0.59],
            itemStyle:{
                normal:{
                    color:'rgb(15,111,198)'
                }
            }
        },
        {
            name:'马牌',
            type:'line',
          	symbol:'circle',
            data:[0.45,0.41,0.4,0.47,0.5,0.48,0.41,0.53,0.47,0.51,0.43,0.47,0.55,0.48,0.54,0.53,0.49,0.44,0.44,0.44,0.55,0.45,0.52,0.49,0.42,0.55,0.46,0.43,0.42,0.5,0.47],
            itemStyle:{
                normal:{
                    color:'rgb(0,157,217)'
                }
            }
        },
        {
            name:'普利司通',
            type:'line',
          	symbol:'circle',
            data:[0.47,0.41,0.4,0.41,0.4,0.41,0.44,0.44,0.41,0.47,0.46,0.41,0.44,0.46,0.43,0.45,0.44,0.4,0.4,0.47,0.41,0.47,0.4,0.47,0.46,0.44,0.42,0.47,0.44,0.45,0.43],
            itemStyle:{
                normal:{
                    color:'rgb(11,208,217)'
                }
            }
        },
        {
            name:'米其林型号1',
            type:'line',
          	symbol:'circle',
            data:[0.55,0.53,0.51,0.51,0.5,0.51,0.52,0.51,0.51,0.5,0.51,0.54,0.51,0.53,0.53,0.55,0.52,0.5,0.51,0.51,0.53,0.52,0.55,0.55,0.53,0.54,0.55,0.51,0.53,0.51,0.51],
            itemStyle:{
                normal:{
                    color:'rgb(16,207,155)'
                }
            }
        },
        {
            name:'米其林型号2',
            type:'line',
          	symbol:'circle',
            data:[0.68,0.65,0.64,0.66,0.65,0.63,0.65,0.63,0.67,0.66,0.69,0.69,0.65,0.62,0.68,0.68,0.69,0.68,0.66,0.68,0.65,0.65,0.63,0.66,0.66,0.63,0.65,0.66,0.66,0.68,0.63],
            itemStyle:{
                normal:{
                    color:'rgb(24,202,98)'
                }
            }
        }
    ]
};
myChart3 = echarts.init(document.getElementById('echart_K1BuzzNSRTopic2'),'macarons');
myChart3.setOption(option3);

//WARNING : where is myChart? not definied, did you miss anything?
//myChart.connect([myChart2, myChart3]);
//myChart2.connect([myChart, myChart3]);
//myChart3.connect([myChart, myChart2]);


setTimeout(function (){
    window.onresize = function () {
//      myChart.resize();
        myChart2.resize();
        myChart3.resize();
    }
},200);


 //饼图不能对系列改颜色，只能直接改主题。可以变成蓝色主题，需要引入一下，blue 是内置的主题
//var myCharts = echarts.init(document.getElementById('main'), 'blue')
//具体可查看 http://echarts.baidu.com/echarts2/doc/doc.html 页面搜索"主题"

var myChartChannel  = echarts.init(document.getElementById('echart_channel'),'macarons');
var optionChannel = {
    title : {
            text: 'Channel Distribution - May 2016'
	},
    tooltip: {
        trigger: 'item',	
        formatter: "{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: '75%',
        y:'center',
        data:['BBS','Weibo','WeChat','Complant Site','News','Video Sites']
    },
    series: [
        {
            type:'pie',
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
            data:[
                {value:3, name:'BBS'},
                {value:1, name:'Weibo'},
                {value:2, name:'WeChat'},
                {value:5, name:'Complant Site'},
                {value:4, name:'News'},
                {value:1, name:'Video Sites'}
            ]
        }
    ]
};                   

myChartChannel.setOption(optionChannel);


var myChartTopic  = echarts.init(document.getElementById('echart_topic'),'macarons');
var optionTopic = {
    title: {
        text:'Michelin Topic Share - May 2016',
        x: 'left',
        subtext:'Unit: Comment(Post)',
        
	},
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:['帖子数'],
      	y: '10%'
    },
    xAxis : [
        {
            type : 'value'
        }
    ],
    yAxis : [
        {
            type : 'category',
            axisTick : {show: false},
            data : ['其他','轮胎质量','操控性','静音能力','舒适性']
        }
    ],
    series : [
        {
            type:'bar',
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
            data:[200, 170, 240, 244, 200],
          	itemstyle:{
            normal: {
                   color: 'rgb(15,111,198)'
                }
            }
        }
    ]
};

myChartTopic.setOption(optionTopic);
        // 路径配置
        require.config({
            paths:{ 
                'echarts' : 'http://echarts.baidu.com/build/dist',
            }
        });
        
        
        // 使用
        require(
            [
                'echarts',
                'echarts/chart/wordCloud' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart4 = ec.init(document.getElementById('wordcloud_p'),'macarons'); 
                option4 = {
    title: {
        text: 'May 2016',
      	x: 'center'
    },
    tooltip: {
        show: true
    },
    toolbox: {
        feature: {
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    series: [{
        name: 'Google Trends',
        type: 'wordCloud',
        size: ['80%', '80%'],
        textRotation : 0,
        textPadding: 0,
        autoSize: {
            enable: true,
            minSize: 14
        },
        data: [
            {
                name: "胎噪小",
                value: 10000,
                itemStyle: {
                    normal: {
                        color: 'black'
                    }
                }
            },
            {
                name: "稳定性好",
                value: 6181,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "胎噪提升",
                value: 4386,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "不鼓包",
                value: 4055,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "舒适性好",
                value: 2467,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "不起皮",
                value: 2244,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "舒适性不错",
                value: 1898,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "不会起皮",
                value: 1484,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "没有胎噪",
                value: 1112,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "不会有胎噪",
                value: 965,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "胎噪轻",
                value: 847,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "稳定性不错",
                value: 582,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "很好",
                value: 555,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "很值",
                value: 550,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "耐磨",
                value: 462,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "刹车距离短",
                value: 366,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "很耐磨",
                value: 360,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "耐磨性不错",
                value: 282,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "耐磨性很好",
                value: 273,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "没有胎噪",
                value: 265,
                itemStyle: createRandomItemStyle()
            }
        ]
    }]
};

                // 为echarts对象加载数据 
                	myChart4.setOption(option4); 
                
            }
        );
	
		
		// 使用
        require(
            [
                'echarts',
                'echarts/chart/wordCloud' // 使用柱状图就加载bar模块，按需加载
            ],
            function (ec) {
                // 基于准备好的dom，初始化echarts图表
                var myChart5 = ec.init(document.getElementById('wordcloud_n'),'macarons'); 
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
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    series: [{
        name: 'Google Trends',
        type: 'wordCloud',
        size: ['80%', '80%'],
        textRotation : 0,
        textPadding: 0,
        autoSize: {
            enable: true,
            minSize: 14
        },
        data: [
            {
                name: "胎噪大",
                value: 10000,
                itemStyle: {
                    normal: {
                        color: 'black'
                    }
                }
            },
            {
                name: "稳定性差",
                value: 6181,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "胎噪很大",
                value: 4386,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "鼓包",
                value: 4055,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "舒适性差",
                value: 2467,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "起皮",
                value: 2244,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "太软",
                value: 1898,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "胎壁薄",
                value: 1484,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "刹车距离长",
                value: 1112,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "胎噪明显",
                value: 965,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "不耐磨",
                value: 847,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "耐磨性差",
                value: 582,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "会起皮",
                value: 555,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "不值",
                value: 550,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "不会再买",
                value: 462,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "后悔",
                value: 366,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "胎壁太薄",
                value: 360,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "耐磨性不好",
                value: 282,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "稳定性不好",
                value: 273,
                itemStyle: createRandomItemStyle()
            },
            {
                name: "胎噪声音大",
                value: 265,
                itemStyle: createRandomItemStyle()
            }
        ]
    }]
};
                    
                // 为echarts对象加载数据 
                myChart5.setOption(option5); 
            }
        );
});
};

function loadDailyGuardian(){
$("#container").load("pages/DailyGuardian.html #dailyguardian", null, function() {
	var data = {"start":"2016-05-12", "end":"2016-05-18"};
	init_dg_weeklyissuetrend(data);
//$('.datepicker1').datepicker({
//  startDate: '-3d'
//});
//
//$('.datepicker2').datepicker({
//  startDate: '-3d'
//});

      
      
      	// ͼP2
		  var myChart2 = echarts.init(document.getElementById('echart_issueplatform'),'macarons');
			var	option2 = {
					title : [
						{
							text: '',
							x:'center'
						},
						{
							subtext: 'Data Period: May 14 to May 20, 2016',
							bottom:'3%'
						}
					],
          
					tooltip: {
						trigger: 'item',
						formatter: "{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						left: '70%',
						top:'40%',
						data:['5 - Negative','4 - Moderately Negative','3 - Very Nagative','2 - Potential Crisis','1 - Crisis']
					},
          
        toolbox: {
        show: true,
        feature: {
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
        }
        },
          
          
					series: [
						{
							type:'pie',
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
							data:[
								{value:3, name:'5 - Negative'},
								{value:1, name:'4 - Moderately Negative'},
								{value:2, name:'3 - Very Nagative'},
								{value:5, name:'2 - Potential Crisis'},
								{value:4, name:'1 - Crisis'}
							]
						}
					]
				};		
				myChart2.setOption(option2); 
      
      // ͼP3
		   var myChart3 = echarts.init(document.getElementById('echart_issueplatform2'),'macarons');
			var option3 = {
				title : [
					{
						text: '',
						x:'center'
					},
					{
						subtext: 'Data Period: May 14 to May 20, 2016',
						bottom:'3%'
					}
				],
				tooltip: {
					trigger: 'item',
					formatter: "{b}: {c} ({d}%)"
				},
        
        toolbox: {
        show: true,
        feature: {
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
        }
        },
        
				legend: {
					orient: 'vertical',
					left: '70%',
					top:'40%',
					data:['BBS','Weibo','WeChat','Complant Site','News','Video Sites']
				},
				series: [
					{
						type:'pie',
						radius: ['35%', '45%'],
						center: ['40%', '50%'],
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
						data:[
							{value:3, name:'BBS'},
							{value:1, name:'Weibo'},
							{value:2, name:'WeChat'},
							{value:5, name:'Complant Site'},
							{value:4, name:'News'},
							{value:1, name:'Video Sites'}
						]
					}
				]
			};
			myChart3.setOption(option3); 
      
      
      // ͼP4
		   var myChart4 = echarts.init(document.getElementById('echart_issuecategories'),'macarons');
		    var option4 = {
				title : [
					{
						text: '',
						x:'center'
					},
					{
						subtext: 'Data Period: May 14 to May 20, 2016',
						bottom:'3%'
					}
				],
				tooltip: {
					trigger: 'item',
					formatter: "{b}: {c} ({d}%)"
				},
        toolbox: {
        show: true,
        feature: {
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
        }
        },
        
				legend: {
					orient: 'horizontal',
					left: '40%',
					top:'80%',
					data:['Product','Restaurant']
				},
				series: [
					{
						type:'pie',
						radius: ['0', '45%'],
						center: ['50%', '50%'],
						avoidLabelOverlap: true,
						label: {
							normal: {
								show: true,
								position:'inner'
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
								show: false
							}
						},
						data:[
							{value:9, name:'Product'},
							{value:1, name:'Restaurant'}
						]
					}
				]
			};
     	myChart4.setOption(option4); 
      
      
			var myChart5 = echarts.init(document.getElementById('echart_issuebreakdown'),'macarons');
			option5 = {
				title : [
					{
						text: 'Product Issue Breakdown',
						x:'center'
					}
				],
				tooltip: {
					trigger: 'item',
					formatter: "{b}: {c} ({d}%)"
				},
				legend: {
					orient: 'vertical',
					left: '80%',
					top:'middle',
					data:['Tire Cracking','Tire Burst','Product Quality','Tire Peeling','Pinch Shock','Durability','Tire Wear']
				},
        toolbox: {
        show: true,
        feature: {
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
        }
        },
				series: [
					{
						type:'pie',
						radius: ['0', '45%'],
						center: ['35%', '50%'],
						avoidLabelOverlap: true,
						label: {
							normal: {
								show: true,
								position:'middle'
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
						data:[
							{value:5, name:'Tire Cracking'},
							{value:3, name:'Tire Burst'},
							{value:2, name:'Product Quality'},
							{value:1, name:'Tire Peeling'},
							{value:1, name:'Pinch Shock'},
							{value:1, name:'Durability'},
							{value:0, name:'Tire Wear'}
						]
					}
				]

			};
			myChart5.setOption(option5); 

});
};

function loadDailyGuardian_tyreplus() {
$("#container").load("pages/DailyGuardian_TyrePlus.html #dailyguardian_tyreplus", null, function() {
	var data = {"start":"2016-05-12", "end":"2016-05-18"};
	init_dg_weeklyissuetrend(data);
});
}

function loadIWOM_tyreplus() {
$("#container").load("pages/IWOM_TyrePlus.html #iwom_tyreplus", null, function() {
// echart K1BuzzNSRTopic
  
  var axisData = [
"1-May","2-May","3-May","4-May","5-May","6-May",
"-May","8-May","9-May","10-May","11-May","12-May",
"13-May","14-May","15-May","16-May","17-May","18-May",
"19-May","20-May","21-May","22-May","23-May","24-May",
"25-May","26-May","27-May","28-May","29-May","30-May",
"31-May"
];

option = {
    title: {
        text: 'Daily Buzz Trend - May 2016',
        subtext: 'Unit: Comment(Post)'
	},
    tooltip : {
        trigger: 'axis',
        showDelay: 0            // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
    },
    legend: {
        data:['米其林','固特异','马牌','普利司通','米其林型号1','米其林型号2'],
      	y:'8%'
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataZoom : {show: true},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    dataZoom : {
        y: 250,
        show : true,
        realtime: true,
        start : 00,
        end : 100
    },
    grid: {
        x: '5%',
        y: '15%',
        x2: '5%',
        y2: '5%'
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : true,
            axisLabel:{show:false},
            axisTick: {onGap:false},
            splitLine: {show:false},
            data : axisData
        }
    ],
    yAxis : [
        {
            type : 'value',
            scale:true,
            boundaryGap: [0.05, 0.05],
            splitArea : {show : true}
        }
    ],
    series : [
        {
            name:'米其林',
            type:'line',
          	symbol:'circle',
            itemStyle:{
                normal:{
                    color:'rgb(23,64,109)'
                }
            },
            data:[181,175,178,165,154,156,153,163,152,170,157,179,167,155,153,172,163,174,159,163,162,167,178,174,170,163,165,171,154,171,153]
        },
        {
            name:'固特异',
            type:'line',
          	symbol:'circle',
            itemStyle:{
                normal:{
                    color:'rgb(15,111,198)'
                }
            },
            data:[205,212,205,225,227,243,241,207,200,221,208,202,238,249,250,208,249,237,249,217,213,209,233,231,227,232,241,248,202,226,202]
        },
        {
            name:'马牌',
            type:'line',
          	symbol:'circle',
            itemStyle:{
                normal:{
                    color:'rgb(0,157,217)'
                }
            },
            data:[281,322,396,331,329,357,312,405,454,451,441,407,450,431,397,405,402,388,557,507,492,432,282,276,459,502,460,483,335,432,448]
        },
        {
            name:'普利司通',
            type:'line',
          	symbol:'circle',
            itemStyle:{
                normal:{
                    color:'rgb(11,208,217)'
                }
            },
            data:[244,250,250,245,245,249,253,249,251,247,256,251,249,254,246,254,242,243,248,248,257,245,270,263,265,274,255,255,263,251,251]
        },
        {
            name:'米其林型号1',
            type:'line',
          	symbol:'circle',
            itemStyle:{
                normal:{
                    color:'rgb(16,207,155)'
                }
            },
            data:[205,224,222,226,234,223,219,233,242,235,237,237,245,231,238,247,240,239,241,261,250,268,268,273,259,263,259,261,262,278,282]
        },
        {
            name:'米其林型号2',
            type:'line',
          	symbol:'circle',
            itemStyle:{
                normal:{
                    color:'rgb(24,202,98)'
                }
            },
            data:[183,198,192,173,178,172,154,153,196,174,175,153,195,180,198,191,195,154,162,166,157,159,192,189,185,171,198,193,158,159,171]
        }
    ]
};

option2 = {
    tooltip : {
        trigger: 'axis',
        showDelay: 0             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
    },
  	title: {
        text: 'Daily Net Sentiment Ratio - May 2016',
        subtext: 'Net Sentiment Ratio \n(Range from -1 to 1)'
	},
    legend: {
        y : -30,
        data:['米其林','固特异','马牌','普利司通','米其林型号1','米其林型号2']
    },
    toolbox: {
        y : -30,
        show : true,
        feature : {
            mark : {show: true},
            dataZoom : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    grid: {
        x: '5%',
        y: '10%',
        x2: '5%',
        y2: '5%'
    },
    xAxis : [
        {
            type : 'category',
            position:'bottom',
            boundaryGap : true,
            axisTick: {onGap:false},
            splitLine: {show:false},
            data : axisData,
        }
    ],
    yAxis : [
        {
            type : 'value',
            scale:true,
            boundaryGap: [0.05, 0.05],
            splitArea : {show : true},
          	min: 0,
          	max: 1,
          	splitnumber:'0.2'
        }
    ],
    series: [
        {
            name:'米其林',
            type:'line',
          	symbol:'circle',
            data:[0.81,0.92,0.88,0.81,0.86,0.84,0.9,0.91,0.89,0.88,0.88,0.91,0.88,0.82,0.88,0.95,0.91,0.91,0.84,0.86,0.85,0.88,0.94,0.88,0.88,0.9,0.94,0.91,0.91,0.92,0.85],
            itemStyle:{
                normal:{
                    color:'rgb(23,64,109)'
                }
            }
        },
        {
            name:'固特异',
            type:'line',
          	symbol:'circle',
            data:[0.87,0.95,0.94,0.85,0.86,0.86,0.89,0.92,0.85,0.9,0.83,0.9,0.89,0.87,0.94,0.82,0.84,0.94,0.86,0.9,0.95,0.83,0.8,0.8,0.85,0.81,0.83,0.88,0.95,0.86,0.9],
            itemStyle:{
                normal:{
                    color:'rgb(15,111,198)'
                }
            }
        },
        {
            name:'马牌',
            type:'line',
          	symbol:'circle',
            data:[0.63,0.55,0.56,0.54,0.52,0.63,0.53,0.59,0.6,0.64,0.52,0.54,0.52,0.59,0.65,0.59,0.59,0.63,0.58,0.32,0.6,0.55,0.66,0.55,0.64,0.64,0.57,0.53,0.65,0.62,0.24],
            itemStyle:{
                normal:{
                    color:'rgb(0,157,217)'
                }
            }
        },
        {
            name:'普利司通',
            type:'line',
          	symbol:'circle',
            data:[0.18,0.04,-0.06,0.23,0.13,-0.09,-0.04,0.09,0.21,0.1,0.28,0.22,0.13,0.11,0.1,0.19,0.08,0.26,0.32,0.22,0.3,0.06,0.28,0.11,0.18,0.13,-0.03,0.37,0.18,0.02,0.56],
            itemStyle:{
                normal:{
                    color:'rgb(11,208,217)'
                }
            }
        },
        {
            name:'米其林型号1',
            type:'line',
          	symbol:'circle',
            data:[0.71,0.72,0.73,0.67,0.69,0.65,0.72,0.77,0.71,0.7,0.71,0.62,0.74,0.69,0.64,0.72,0.78,0.75,0.65,0.69,0.71,0.64,0.75,0.64,0.8,0.74,0.77,0.62,0.69,0.58,0.66],
            itemStyle:{
                normal:{
                    color:'rgb(16,207,155)'
                }
            }
        },
        {
            name:'米其林型号2',
            type:'line',
          	symbol:'circle',
            data:[0.73,0.71,0.72,0.68,0.72,0.7,0.68,0.65,0.7,0.68,0.74,0.74,0.69,0.71,0.68,0.69,0.68,0.72,0.7,0.7,0.74,0.69,0.69,0.73,0.69,0.76,0.71,0.73,0.69,0.73,0.68],
            itemStyle:{
                normal:{
                    color:'rgb(24,202,98)'
                }
            }
        }
    ]
};
myChart2 = echarts.init(document.getElementById('echart_K1BuzzNSRTopic1'),'macarons');
myChart2.setOption(option2);

option3 = {
    tooltip : {
        trigger: 'axis',
        showDelay: 0             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
    },
  	title:{
    	text:'i-Reco - May 2016',
    	subtext: 'Percentage \n(Range from 0% to 100%)',   
    },
    legend: {
        y : -30,
        data:['米其林','固特异','马牌','普利司通','米其林型号1','米其林型号2']
    },
    toolbox: {
        y : -30,
        show : true,
        feature : {
            mark : {show: true},
            dataZoom : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    grid: {
        x: '5%',
        y: '10%',
        x2: '5%',
        y2: '15%'
    },
    xAxis : [
        {
            type : 'category',
            position:'bottom',
            boundaryGap : true,
            axisTick: {onGap:false},
            splitLine: {show:false},
            data : axisData,
        }
    ],
    yAxis : [
        {
            type : 'value',
            scale:true,
            boundaryGap: [0.05, 0.05],
            splitArea : {show : true},
          	min: 0,
          	max: 1,
            axisLabel: {
                formatter: function (v) {
                    return Math.round(v*100) + '%'
                }
            },			
          	splitnumber: 0.2
        }
    ],
    series: [
        {
            name:'米其林',
            type:'line',
          	symbol:'circle',
            data:[0.58,0.5,0.56,0.66,0.54,0.62,0.67,0.68,0.6,0.51,0.52,0.53,0.68,0.5,0.5,0.55,0.51,0.64,0.69,0.57,0.6,0.53,0.62,0.53,0.55,0.54,0.53,0.52,0.63,0.52,0.54],
            itemStyle:{
                normal:{
                    color:'rgb(23,64,109)'
                }
            }
        },
        {
            name:'固特异',
            type:'line',
          	symbol:'circle',
            data:[0.57,0.57,0.56,0.63,0.58,0.6,0.55,0.61,0.6,0.6,0.6,0.61,0.57,0.63,0.61,0.63,0.59,0.61,0.59,0.62,0.62,0.58,0.62,0.63,0.6,0.64,0.58,0.64,0.56,0.63,0.59],
            itemStyle:{
                normal:{
                    color:'rgb(15,111,198)'
                }
            }
        },
        {
            name:'马牌',
            type:'line',
          	symbol:'circle',
            data:[0.45,0.41,0.4,0.47,0.5,0.48,0.41,0.53,0.47,0.51,0.43,0.47,0.55,0.48,0.54,0.53,0.49,0.44,0.44,0.44,0.55,0.45,0.52,0.49,0.42,0.55,0.46,0.43,0.42,0.5,0.47],
            itemStyle:{
                normal:{
                    color:'rgb(0,157,217)'
                }
            }
        },
        {
            name:'普利司通',
            type:'line',
          	symbol:'circle',
            data:[0.47,0.41,0.4,0.41,0.4,0.41,0.44,0.44,0.41,0.47,0.46,0.41,0.44,0.46,0.43,0.45,0.44,0.4,0.4,0.47,0.41,0.47,0.4,0.47,0.46,0.44,0.42,0.47,0.44,0.45,0.43],
            itemStyle:{
                normal:{
                    color:'rgb(11,208,217)'
                }
            }
        },
        {
            name:'米其林型号1',
            type:'line',
          	symbol:'circle',
            data:[0.55,0.53,0.51,0.51,0.5,0.51,0.52,0.51,0.51,0.5,0.51,0.54,0.51,0.53,0.53,0.55,0.52,0.5,0.51,0.51,0.53,0.52,0.55,0.55,0.53,0.54,0.55,0.51,0.53,0.51,0.51],
            itemStyle:{
                normal:{
                    color:'rgb(16,207,155)'
                }
            }
        },
        {
            name:'米其林型号2',
            type:'line',
          	symbol:'circle',
            data:[0.68,0.65,0.64,0.66,0.65,0.63,0.65,0.63,0.67,0.66,0.69,0.69,0.65,0.62,0.68,0.68,0.69,0.68,0.66,0.68,0.65,0.65,0.63,0.66,0.66,0.63,0.65,0.66,0.66,0.68,0.63],
            itemStyle:{
                normal:{
                    color:'rgb(24,202,98)'
                }
            }
        }
    ]
};
myChart3 = echarts.init(document.getElementById('echart_K1BuzzNSRTopic2'),'macarons');
myChart3.setOption(option3);

//WARNING : where is myChart? not definied, did you miss anything?
//myChart.connect([myChart2, myChart3]);
//myChart2.connect([myChart, myChart3]);
//myChart3.connect([myChart, myChart2]);

setTimeout(function (){
    window.onresize = function () {
        myChart.resize();
        myChart2.resize();
        myChart3.resize();
    }
},200);   
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