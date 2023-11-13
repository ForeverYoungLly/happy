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
        <div style="width: 20vw; height: 25vh; background-color: aquamarine;" id="newCharts"></div>
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
    async showCharts() {
      const headers = {
        'jwt-code': localStorage.getItem('token')
      }
      if (headers) {
        await axios({
          url: 'http://123.207.73.185:8080/admin/showUserMessage',
          method: 'GET',
          // data: '',
          headers,
        })
          .then(function (response) {
            console.log(response.data.data.专业);
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('newCharts'));//也可以通过$refs.newCharts的方式去获取到dom实例。
      // 监听图表容器大小并改变图表大小
      window.addEventListener('resize', function () {
        myChart.resize();
      });
      // 绘制图表
      myChart.setOption({
        title: {
          text: '圆环图的例子',
          left: 'center',
          top: 'center'
        },
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 335,
                name: 'A'
              },
              {
                value: 234,
                name: 'B'
              },
              {
                value: 1548,
                name: 'C'
              }
            ],
            radius: ['40%', '70%']
          }
        ]
      })
    }
  },
  mounted() {
    this.showCharts();

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