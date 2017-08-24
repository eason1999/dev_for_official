<template>
  <div class="dev-index-wrapper">
    <h2>首页</h2>
    <div class="data-total-wrapper">
      <p>昨日概览</p>
      <totaldata :items="totalData" :nums="nums"></totaldata>
    </div>
    <div class="echarts-wrapper">
      <div id="charts" class="chart-cnt"></div>
    </div>
  </div>
</template>

<script type="ecmascript-6">
import totaldata from '../../../components/totaldata/totaldata.vue';
import echarts from 'echarts';
export default {
  data () {
    return {
      totalData: [
        {icon: 'el-icon-star-on',num: 0,text: '昨日展现'},
        {icon: 'el-icon-message',num: 0,text: '昨日点击'},
        {icon: 'el-icon-share',num: 0,text: '昨日收益'}
      ],
      nums: 8,
      loadings: false
    };
  },
  computed: {
    
  },
  mounted () {
    this.$nextTick(() => {
      this.loadAll();
      this.echartsdata();
    });
  },
  components: { totaldata },
  methods: {
    loadAll () {
      this.loadings = true;
      this.$http.get('/v1/dev/stats/adSlotOfYesterday').then((res) => {
        this.loadings = false;
        let data = res.body;
        if (data.ret!=1) {
          return this.$alert(data, '提示：', {
            confirmButtonText: '确定'
          });
        }
        let result = data.result;
        this.totalData[0].num = result.numOfAdImpressionsB4Filter;
        this.totalData[1].num = result.numOfAdClicksB4Filter;
        this.totalData[2].num = result.chargeFinalData;
      }, () => {this.loadings = false;});
    },
    echartsdata () {
      this.loadings = true;
      this.$http.get('/v1/dev/stats/chargeOf7Day').then((res) => {
        this.loadings = false;
        let data = res.body;
        if (data.ret!=1) {
          return this.$alert(data, '提示：', {
            confirmButtonText: '确定'
          });
        }
        let result = data.result;
        this.drawChart(result);
      }, () => {this.loadings = false;});
    },
    drawChart (result) {
      let myChart = echarts.init(document.getElementById('charts'));
      let option = {
          title: {
            text: '7日收益图表',
            textAlign: 'left',
            textStyle: {
              color: '#333',
              fontWeight: 'normal',
              fontFamily: '微软雅黑',
              fontSize: 14
            },
            top: 5,
            left: 5
          },
          tooltip : {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            top: 'bottom',
            data: ['收益']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap : false,
              data: result.axisX,
              axisLine: {
                lineStyle: {
                  color: '#ccc'
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              splitLine: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#ccc'
                }
              }
            },
            {
              type: 'value',
              splitLine: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: '#ccc'
                }
              }
            }
          ],
          series : [
            {
              name:'收益',
              type:'line',
              yAxisIndex: 0,
              smooth: true,
              smoothMonotone: 'x',
              lineStyle:{
                normal:{
                  width:2,
                  color:'#66C3F9'
                }
              },
              itemStyle : {
                normal : {
                  color:'#66C3F9'
                }
              },
              areaStyle:{
                normal:{
                  color:'#E0F3FE'
                }
              },
              data:result.consumption
            }
          ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .dev-index-wrapper
    .data-total-wrapper
      margin-bottom: 15px  
      padding: 10px
      border: 1px solid #eee
      background: #fff
      p   
        margin-bottom: 10px 
        color: #333
        font-weight: 'normal'
        font-family: '微软雅黑'
        font-size: 14px
    .echarts-wrapper
      width: 100% 
      border: 1px solid #eee
      background: #fff 
      margin-bottom: 20px
      .chart-cnt
        width: 100%
        height: 400px  
</style>
