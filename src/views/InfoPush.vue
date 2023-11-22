<template>
  <div class="container">
    <el-card class="box-card" body-style="{ padding: '20px' }" style="width: 90%;margin:20px auto">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>消息推送</span>
      </div>
      <div class="form">
        <!-- 表单区域 -->
        <el-form ref="infoform" :model="infoform" :rules="pushFormRules" label-width="400px">
          <!-- 目标用户区域 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户">
                <el-select v-model="infoform.infopushList" :multiple="true" clearable :filterable="true"
                  placeholder="请选择目标用户" @change="getId(infoform.infopushList)">
                  <el-option v-for="(item, index) in options" :key="index" :label="item.username" :value="item.wxopenid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 标题 -->
          <el-row>
            <el-col :span="8">
              <el-form-item label="标题">
                <el-select v-model.trim="infoform.infoPushTitle" placeholder="请输入标题" maxlength="10" prop="title"
                  style="width: 400px;" class="title">
                  <el-option :label="titleContent[0]" value="日程安排提醒"></el-option>
                  <el-option :label="titleContent[1]" value="面试结果通知"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 内容 -->
          <el-row>
            <el-col :span="10">
              <el-form-item label="内容">
                <el-input prop="content" type="textarea" placeholder="请输入内容" v-model.trim="infoform.content"
                  show-word-limit resize="none"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 显示选项 -->
          <el-row>
            <el-form-item label="选项">
              <el-radio v-model="radio" label="1" @change="show = !show">接受/拒绝/反馈</el-radio>
              <el-radio v-model="radio" label="2" @change="show = !show">跳转到指定连接</el-radio>
              <div v-show="!show">
                <el-select v-model="acceptStatus" placeholder="同意后状态" class="currentStatus">
                  <el-option v-for="(item, index) in statusList" :label="item.status" :key="index"
                    :value="item.value"></el-option>
                </el-select>
                <el-select v-model="rejectStatus" placeholder="拒绝后状态" class="nextStatus">
                  <el-option v-for="(item, index) in statusList" :label="item.status" :key="index"
                    :value="item.value"></el-option>
                </el-select>
              </div>
              <div v-show="show">
                <el-input v-model="link" class="link" placeholder="请输入链接"></el-input>
              </div>
            </el-form-item>
          </el-row>
          <!-- 发送按钮 -->
          <el-form-item>
            <el-col :span="10">
              <el-button type="primary" @click="sendInfoPush">发送</el-button>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      // 通过不通过和内容
      titleContent: [
        "日程安排提醒",
        "面试结果通知"
      ],
      //表单绑定的数据对象
      infoform: {
        // 消息推送用户列表wxopenid数组
        infopushList: [],
        //推送标题
        infoPushTitle: '',
        //推送内容
        content: '',
        //目标用户的openid
        wxopenid: '',
        // 标题选择
        select: '',
      },
      //表单检验规则对象 prop 标识需要检验的表单元素
      pushFormRules: {
        // trigger: 触发， blur：失去焦点
        title:
          [
            { required: true, message: '标题不能为空', trigger: 'blur' },
            { min: 1, max: 10, message: '标题要求1-10个字符', trigger: 'blur' }
          ],
        content:
          [
            { required: true, message: '内容不能为空', trigger: 'blur' },
          ]
      },
      // 下拉框显示内容列表
      options: [],
      //目标用户的所有数据
      targetData: [
        {
          username: 1,
          wxopenid: ''
        }
      ],
      // 所有用户列表
      userList: [],
      // 状态列表
      statusList: [
        {
          status: ' ',
          value: ' '
        },
        {
          status: '待初试',
          value: '待初试'
        },
        {
          status: '初试不通过',
          value: '初试不通过'
        },
        {
          status: '初试通过',
          value: '初试通过'
        },
        {
          status: '待复试',
          value: '待复试'
        },
        {
          status: '复试不通过',
          value: '复试不通过'
        },
        {
          status: '复试通过',
          value: '复试通过'
        },
        {
          status: '待终试',
          value: '待终试'
        },
        {
          status: '终试通过',
          value: '终试通过'
        },
        {
          status: '待处理',
          value: '待处理'
        },
        {
          status: '挂起',
          value: '挂起'
        },
      ],
      acceptStatus: "",
      rejectStatus: "",
      link: "",
      radio: "1",
      show: false,
    }
  },

  methods: {
    //发送推送信息
    async sendInfoPush() {
      if (this.targetData) {
        await axios({
          url: 'http://42.194.194.197/sendMessageToUser',
          method: 'POST',
          params: {
            wxOpenId: this.targetData.wxopenid,
            name: this.targetData.username,
            msg: this.infoform.content,
            title: this.infoform.infoPushTitle,
            //点击推送信息后跳转的页面
            HTTP: 'https://www.baidu.com'
          }
        }).then(() => {
          this.$message.success('推送成功！')
        }).catch(() => {
          this.$message.error('推送失败')
        })
      }

      // 清空表单内容
      Object.assign(this.$data.infoform, this.$options.data().infoform)
    },
    // 获取用户列表
    async getUserList() {
      const headers = {
        'jwt-code': localStorage.getItem('token')
      }
      //有token
      if (headers['jwt-code']) {
        await axios({
          url: 'http://123.207.73.185:8080/admin/userDirection',
          params: {
            direction: '全部'
          },
          headers
        }).then(res => {
          //获取用户列表
          const userList = res.data.data
          //更新下拉框
          this.options = userList;
          // 获取用户列表
          this.userList = userList;
        }).catch((e) => {
          //token有误
          if (!e.response.data.code) {
            this.$message.error('请先登录！')
            this.$router.push('/login')
          }
          // 获取不到用户列表
          else
            this.$message.error("用户列表数据加载失败！")
        })
        //默认显示第一个，打开下拉框后在最上方显示
        this.infoform.wxopenid = this.options[0].username
      }
      //无token
      else {
        this.$message.error('请先登录！')
        this.$router.push('/login')
      }
    },

    //获取目标用户的所有数据，并存入targetData中,
    getId(targetdata) {
      // this.targetData = this.options.find(obj => {
      // return obj.wxopenid === targetwxopenid
      // })
      var getData = [];
      for (let i = 0; i < targetdata.length; i++) {
        const Obj = new Object();
        Obj.wxopenid = targetdata[i];
        const arr = this.userList.find(element => element.wxopenid === targetdata[i]);
        Obj.username = arr.username
        getData[i] = Obj;
      }
      this.targetData = getData;
    },
    changeOption() {
      console.log(1);
    },
    // 获取路由传参后的姓名和openid
    getdata() {
      this.infoform.infopushList = this.$route.query.openidlist;
      this.targetData = this.$route.query.infopushlist;
    }
  },

  created() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.$message.error('请先登录！')
      this.$router.push('/login')
    }
    else {
      //获取用户列表用于下拉框
      this.getUserList()
    }
    this.getdata();
  },
  updated() {
    // console.log(this.infoform.infoPushTitle);
    if (this.infoform.infoPushTitle === '日程安排提醒') {
      this.infoform.content = "如果有时间上的冲突，请联系相应组别的联系人（点击链接即可）。线上面试的同学，腾讯会议号请留意群通知"
    }
    else if (this.infoform.infoPushTitle === '面试结果通知') {
      this.infoform.content = "关于考核期的信息，请联系相关负责人。\n微信号:lyr007learning"
    }
  },
}
</script>


<style >
.el-select {
  width: 400px;
}

a:hover {
  color: #61afef !important;
}

textarea {
  width: 400px !important;
  height: 100px !important;
}

.currentStatus,
.nextStatus {
  width: 25vh;
  margin-right: 5vh;
  transition: all 0.5s ease-out;
}

.link {
  width: 60vh;
  transition: all 0.5s ease-out;
}
</style>