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
        <div style="width: 25vw; height: 30vh;" id="chartPie"></div>
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

export default {
  name: 'MyIndex',

  data() {
    return {
      // 存储用户列表信息，为后面数据可视调用数据做准备
      UserList: [],
      chartPie: '',
      typeName: [],
      typeNum: []

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
    drawPieChart() {
      this.chartPie = this.$echarts.init(document.getElementById("chartPie"));
      this.chartPie.setOption({
        //设置标题,副标题,以及标题位置居中
        title: {
          text: '专业分布情况',
          x: 'center'
        },
        //具体点击某一项触发的样式内容
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        //左上侧分类条形符
        legend: {
          orient: 'vertical',
          left: 'left',
          data: []
        },
        //饼状图类型以及数据源
        series: [
          {
            name: '统计数量',
            type: 'pie',
            //radius: '70%',
            //center: ['50%', '60%'],
            data: [],
            //设置饼状图扇形区域的样式
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
          }
        ]
      });
    },
    //动态获取饼状图的数据
    async initData() {


      const headers = {
        'jwt-code': localStorage.getItem('token')
      }
      if (headers) {
        await axios({
          url: 'http://123.207.73.185:8080/admin/showUserMessage',
          method: 'GET',
          headers,
        })
          .then(function (response) {
            var getData = [];
            //先进行赋值
            for (let i = 0; i < response.data.data.专业.length; i++) {
              var obj = new Object();
              obj.directionname = response.data.data.专业[1][i];
              obj.directionvalue = response.data.data.专业[0][i];
              getData[i] = obj;
              this.chartPie.setOption({
                legend: {
                  data: response.data.data.专业[1],
                },
                series: [{
                  data: getData,
                }]
              });
            }
            console.log(getData);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    drawCharts() {
      this.drawPieChart();
    },

    // async showCharts() {
    //   const headers = {
    //     'jwt-code': localStorage.getItem('token')
    //   }
    //   if (headers) {
    //     const response = await axios({
    //       url: 'http://123.207.73.185:8080/admin/showUserMessage',
    //       method: 'GET',
    //       // data: '',
    //       headers,
    //     })
    //       .then(function (response) {
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    //   }
    // }
  },
  mounted() {
    // this.showCharts();
    this.initData();
    this.drawCharts();
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
  flex: 1;
  /* margin: 8px; */
  bottom: 0px;
}

.bottom {
  margin-bottom: 0px;
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
  width: 380px;
}
</style>