<template>
  <div class="container">
    <el-card class="box-card" body-style="{ padding: '20px' }" style="width: 90%;margin:20px auto">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>消息推送</span>
        <el-button style="float: right; padding: 3px 0" type="button">操作按钮</el-button>
      </div>
      <div class="form">
        <!-- 表单区域 -->
        <el-form ref="infoform" :model="infoform" :rules="pushFormRules" label-width="400px">
          <!-- 目标用户区域 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户">
                <el-select v-model="infoform.wxopenid" clearable placeholder="请选择目标用户" @change="getId(infoform.wxopenid)">
                  <el-option v-for="item in options" :key="item.wxopenid" :label="item.username" :value="item.wxopenid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 标题 -->
          <el-row>
            <el-col :span="8">
              <el-form-item label="标题">
                <!-- <el-input prop="title" v-model.trim="infoform.infoPushTitle" maxlength="10" placeholder="请输入标题"
                  style="width: 400px;" class="input-with-select"></el-input> -->
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
              <el-radio v-model="radio" label="1">接受/拒绝/反馈</el-radio>
              <br>
              <el-link href="https://element.eleme.io" target="_blank">跳转指定链接</el-link>
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

      <!-- 用户反馈模板气泡框 -->
      <el-dialog title="提示" :visible.sync="dialogVisible1" width="30%" :before-close="handleClose">
        <span>这是一段信息1</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click.native="closeaccept">取 消</el-button>
          <el-button type="primary" @click.native="closeaccept">确 定</el-button>
        </span>
      </el-dialog>

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
        //推送标题
        infoPushTitle: '',
        //推送内容
        content: '',
        //目标用户的openid
        wxopenid: '',
        // 标题选择
        select: '',
        // 按钮选择
        radio: 3,
        // 气泡框的触发参数
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3: false,
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
          username: 1
        }
      ],
      radio: "1"
    }
  },

  methods: {
    //发送推送信息
    async sendInfoPush() {
      if (this.targetData) {
        await axios({
          url: 'http://42.194.194.197:80/templateMessage',
          method: 'POST',
          params: {
            wxOpenId: this.targetData.wxopenid,
            name: this.targetData.username,
            msg: this.infoform.content,
            nowStatus: this.targetData.status,
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
          this.options = userList
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

    //获取目标用户的所有数据，并存入targetData中
    getId(targetwxopenid) {
      this.targetData = this.options.find(obj => {
        return obj.wxopenid === targetwxopenid
      })
    },
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
  },
  updated() {
    console.log(this.infoform.infoPushTitle);
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
</style>