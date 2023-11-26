<template>
  <div class="container" v-loading="mainLoading">
    <!-- 头部大标题 -->
    <header>
      <h3 class="title">首页---数据可视化面板</h3>
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
            <p>4.前端选拔标准：三件套知识储备；Vue、React、Angular框架；微信小程序开发能力和经验</p>
          </div>
          <div class="text item">
            <p>5.后端选拔标准：掌握go，java，python等一门后端语言；Spring、Springboot、Gin、Django框架；微信小程序开发能力和经验</p>
          </div>
          <div class="text item">
            <p>6.产品经理选拔标准：有商业思维和创新精神；善于抓住问题的关键矛盾；场景代入和同理心强；文笔流畅，表达清晰</p>
          </div>
          <div class="text item">
            <p>7.UI设计选拔标准：有一定的平面设计基础；熟练使用ps等设计工具；熟练制作公众号推文和视频；有绘画基础</p>
          </div>
          <div class="text item">
            <p>8.网络安全选拔标准：了解常见的网络安全知识以及网络安全攻击方式，如：XSS、DDOS等，对于安全，渗透等方向感兴趣</p>
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
      mainLoading:true
    }
  },
  mounted() {
    // 专业人数分布图表
    var myChart1 = echarts.init(document.getElementById('chart3'));

    // 年级人数分布图表
    var myChart2 = echarts.init(document.getElementById('chart2'));

    // 方向人数分布图表
    var myChart3 = echarts.init(document.getElementById('chart4'));

    // 状态人数分布图表
    var myChart4 = echarts.init(document.getElementById('chart1'));

    // 给图表赋初值
    myChart1.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
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
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    });
    myChart2.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    });
    myChart3.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
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
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    });
    myChart4.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
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
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    });

    // echarts图表自适应
    window.onresize = () => {
      myChart1.resize();
      myChart2.resize();
      myChart3.resize();
      myChart4.resize();
    }

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
        const a = response.data.data.专业[0].length;
        if (a!== null && a!== undefined) {
          for (let i = 0; i < a; i++) {
            var obj = new Object();
            obj.name = response.data.data.专业[1][i];
            obj.value = response.data.data.专业[0][i];
            getData[i] = obj;
          }
        }
        myChart1.setOption({
          title: {
            text: '各专业人数分布'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            top: '8%',
            left: 'left'
          },
          series: [
            {
              name: '专业人数',
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['60%', '50%'],
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
          title: {
            text: '各年级人数分布'
          },
          xAxis: {
            data: gradename,
            type: 'category'
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
        var getData2 = [];
        const b = response.data.data.方向[0].length;
        if (b!== null && b!== undefined) {
          for (let i = 0; i < b; i++) {
            const obj = new Object();
            obj.name = response.data.data.方向[1][i];
            obj.value = response.data.data.方向[0][i];
            getData2[i] = obj;
          }
        }

        myChart3.setOption({
          title: {
            text: '各方向人数分布'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            top: '8%',
            left: 'left'
          },
          series: [
            {
              name: '方向人数',
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['60%', '50%'],
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
              data: getData2
            }
          ],
        });

        // 对状态人数图表进行配置
        var getData3 = [];
        const c = response.data.data.状态[0].length;
        if (c!== null && c!== undefined) {
          for (let i = 0; i < c; i++) {
            const obj = new Object();
            obj.name = response.data.data.状态[1][i];
            obj.value = response.data.data.状态[0][i];
            getData3[i] = obj;
          }
        }

        myChart4.setOption({
          title: {
            text: '各状态人数分布'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            top: '8%',
            left: 'left'
          },
          series: [
            {
              name: '方向人数',
              type: 'pie',
              radius: ['40%', '70%'],
              center: ['60%', '50%'],
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
              data: getData3
            }
          ],
        });
        this.mainLoading = false
      }, err => {
        this.UserList = null;
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
  },
  methods: {
  },
}
</script>

<style  scoped>
* {
  box-sizing: border-box;
}

.container {
  height: 100%;
}

header {
  height: 6.5vh;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  line-height: 6.5vh;
}

.mainbox {
  width: 100%;
  height: 90%;
  margin: 0 auto;
  display: flex;
  box-shadow: 1px 2px 4px #eee;
}


.tips {
  max-height: 80vh;
  height: 100%;
  flex: 3;
  margin-right: 20px;
  max-width: 20vw;
  overflow: auto;
}

.column {
  flex: 7;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
}

.chart {
  width: 26vw;
  height: 35vh;
  margin-left: 5%;
}

#chart2 {
  height: 35vh;
  /* width: 20vw; */
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
  width: 100%;
  color: rgb(0, 43, 87);
  background-color: aliceblue;
  overflow: auto !important;
}

.title {
  /* color: rgb(175, 215, 237); */
  color: #111;
  text-align: center;
  /* text-shadow: 0 0 30px rgb(136, 206, 250), 0 0 20px rgb(136, 206, 250), 0 0 30px rgb(136, 206, 250), 0 0 20px rgb(136, 206, 250); */
}
</style>