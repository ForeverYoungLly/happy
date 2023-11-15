<template>
  <div class="container">
    <!-- 头部大标题 -->
    <header>
      <h1>超级管理员首页</h1>
    </header>
    <!-- 页面主体部分 -->
    <section class="mainbox">
      <!-- 数据可视化部分 -->
      <div class="column">
        <div class="chart" id="chart1"></div>
        <div class="chart" id="chart2"></div>
        <div class="chart" id="chart3"></div>
        <div class="chart" id="chart4"></div>
      </div>

      <!-- 管理员小tips部分 -->
      <div class="tips">
        <el-card class="box-card">
          <div slot="header" class="clearfix"><span>对管理员的温馨提示：</span></div>
          <div class="text item">
            <p>1.请注意初试、复试、终试时间，及时推送消息</p>
          </div>
          <div class="text item">
            <p>2.团队性质为共同开发，请注意各个方向已通过考核的人数</p>
          </div>
          <div class="text item">
            <p>3.公平公正，择优录取，选拔具有团队精神、探索精神、解决问题能力的人才</p>
          </div>
          <div class="text item">
            <p>4.熟悉各个方向的选拔标准，对投递者进行公正充分的筛查。</p>
          </div>
        </el-card>
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios';
import * as echarts from "echarts";

export default {
  name: 'MyIndex',

  data() {
    return {
      // 存储用户列表信息，为后面数据可视调用数据做准备
      UserList: [],
    }
  },
  mounted() {
    // 专业人数分布图表
    var myChart1 = echarts.init(document.getElementById('chart3'));

    // 年级人数分布图表
    var myChart2 = echarts.init(document.getElementById('chart2'));
    myChart2.setOption({
      title: {
        text: '各年级人数分布'
      },
      tooltip: {},
      xAxis: {
        data: []
      },
      yAxis: {},
      series: [{
        type: 'bar',
        data: []
      }]
    });

    // 方向人数分布图表
    var myChart3 = echarts.init(document.getElementById('chart4'));
    myChart3.setOption({
      title: {
        text: '各方向人数分布'
      },
      tooltip: {},
      xAxis: {
        data: []
      },
      yAxis: {},
      series: [{
        type: 'line',
        data: []
      }]
    });

    const headers = { 'jwt-code': localStorage.getItem('token') }
    if (headers) {
      axios({
        url: 'http://123.207.73.185:8080/admin/showUserMessage',
        method: 'GET',
        headers,
      }).then(response => {
        //对专业人数图表进行配置
        var getData = [];
        //先进行赋值
        for (let i = 0; i < response.data.data.专业[0].length; i++) {
          var obj = new Object();
          obj.name = response.data.data.专业[1][i];
          obj.value = response.data.data.专业[0][i];
          getData[i] = obj;
        }
        myChart1.setOption({
          title: {
        text: '各专业人数分布'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '8%',
            left: 'center'
          },
          series: [
            {
              name: '专业人数',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 20,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: getData
            }
          ],
        });

        // 对年级人数图表进行配置
        this.data2 = response.data.data.年级[1];
        let gradename = this.data2.map(item => {
          return item
        })
        myChart2.setOption({
          xAxis: {
            data: gradename
          },
          yAxis: [
            {
              type: 'value',
              minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              type: 'bar',
              data: response.data.data.年级[0]
            }
          ]
        });

        // 对方向人数图表进行配置
        this.data3 = response.data.data.方向[1];
        let directionname = this.data3.map(item => {
          return item
        })
        myChart3.setOption({
          xAxis: {
            data: directionname
          },
          yAxis: [
            {
              type: 'value',
              minInterval: 1, //设置成1保证坐标轴分割刻度显示成整数。
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              type: 'line',
              data: response.data.data.方向[0]
            }
          ]
        });

      }, err => {
        console.log('错误信息：', err.message)
      })
    }
  },
  created() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.$message.error('请先登录！')
      this.$router.push('/login')
    }
    else {
    }
  },
  methods: {
  },
}
</script>

<style  scoped>
.container {
  background-color: #E9EEF3;
  height: 100%;
  padding: 18px;
}

header {
  height: 7vh;
  background-color: #E9EEF3;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.mainbox {
  padding: 10px;
  background-color: #E9EEF3;
  width: 100%;
  height: 90%;
  margin: 0 auto;
  display: flex;
}

.column {
  bottom: 0px;
  display: flex;
  flex-flow: wrap;
}

.chart {
  width: 31vw;
  height: 35vh;
  margin: 0.5%;
  padding: 1%;
}

#chart1 {
  width: 40vw;
  height: 35vh;
}

#chart2 {
  width: 18vw;
  height: 35vh;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 20vw;
  margin: 2%;
}
</style>