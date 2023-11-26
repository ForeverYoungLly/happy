<template>
  <div class="container" >
    <el-card class="box-card" body-style="{ padding: '10px' }" style="width: 40%;margin:5px">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>消息推送</span>
      </div>
        <!-- 表单区域 -->
      <div class="form">
          <el-form ref="infoform" :model="infoform" :rules="pushFormRules">
            <!-- 目标用户区域 -->
            <el-row>
              <el-col :span="12">
                <el-form-item label="用户">
                  <el-select v-model="infoform.infopushList" :multiple="true" clearable :filterable="true"
                    placeholder="请选择目标用户" @change="getId(infoform.infopushList)">
                    <el-option v-for="(item, index) in options" :key="index" :label="item.username"
                      :value="item.wxopenid">
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
              <el-col :span="17">
                <el-form-item label="内容">
                  <el-input prop="content" type="textarea" :rows="5" placeholder="请输入内容" v-model.trim="infoform.content"
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
                <el-button type="primary" @click="saveTemplate">存为模板</el-button>
                <el-button type="primary" @click="sendInfoPush">发送</el-button>
              </el-col>
            </el-form-item>
          </el-form>
      </div>
    </el-card>
    <el-card class="box-card" body-style="{ padding: '10px' }" style="width: 50%;margin:5px">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <div style="display: flex;">
          <span>模板列表：</span>
          <el-col :span="12" :offset="8">
            <el-input v-model="searchId" placeholder="请输入id">
              <el-button slot="append" icon="el-icon-search" @click="searchID"></el-button>
            </el-input>
          </el-col>
        </div>
      </div>
      <!-- 主体部分 -->
      <el-table
      :data="templateData"
      style="width: 100%" stripe>
      <el-table-column
        prop="ID"
        label="id"
        width="40">
      </el-table-column>
      <el-table-column prop="message" label="模板消息" width="280"></el-table-column>
      <el-table-column prop="code" label="模板编号" width="80"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button type="primary"
            size="small" @click="openTemplate(scope)">查看</el-button>
            <el-button type="primary"
            size="small" @click="moveAway(scope)">删除</el-button>
            <el-button @click="showMessage(scope)" type="primary"
            size="small">导入</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
<!-- 模板部分气泡框 -->
    <el-dialog
      title="提示"
      :visible.sync="templatedialogVisible"
      width="30%">
      <el-form ref="templateform"  label-width="80px">
        <el-form-item label="ID">
          <el-input v-model="templateform.id"></el-input>
        </el-form-item>
        <el-form-item label="模板信息">
          <el-input v-model="templateform.message" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="templatedialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      // 通过未通过和内容
      titleContent: [
        "日程安排提醒",
        "面试结果通知"
      ],
      // 模板部分气泡框
      templatedialogVisible:false,
      tempList: [],
      // 存为模板的code
      code: 0,
      // 搜索框的id
      searchId: '',
      // 模板列表表单的数据
      templateData: [
      {
            ID: 1,
            message: '你真棒',
            code: 1,
      }
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
      // 模板表单
      templateform: {
        id: 1,
        message: ""
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
          wxopenid: '',
          status: ''
        }
      ],
      // 所有用户列表
      userList: [],
      // 状态列表
      statusList: [
        {
          status: '不修改',
          value: '不修改'
        },
        {
          status: '筛选通过',
          value: '筛选通过'
        },
        {
          status: '筛选未通过',
          value: '筛选未通过'
        },
        {
          status: '待安排初试',
          value: '待安排初试'
        },
        {
          status: '待初试',
          value: '待初试'
        },
        {
          status: '初试未通过',
          value: '初试未通过'
        },
        {
          status: '初试通过',
          value: '初试通过'
        },
        {
          status: '待安排复试',
          value: '待安排复试'
        },
        {
          status: '待复试',
          value: '待复试'
        },
        {
          status: '复试未通过',
          value: '复试未通过'
        },
        {
          status: '复试通过',
          value: '复试通过'
        },
        {
          status: '待安排终试',
          value: '待安排终试'
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
          status: '终试未通过',
          value: '终试未通过'
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
    // 打开模板气泡框
    openTemplate(scope){
      this.templatedialogVisible = true;
      console.log(scope);
      const id = scope.row.ID;
      this.templateform.id = id;
      this.templateform.message = scope.row.message;
    },
    // 搜索id
    searchID() {
      let filterKeywords = this.searchId.trim();
      this.tempList = this.templateData;
      console.log(this.tempList);
      let templist = this.templateData;
      let filerReasource = templist.filter(item => { 
        console.log(item);//过滤全部数据
          if (item.ID === parseInt(filterKeywords)) {
              return item
          }
      })
      this.templateData = filerReasource;
    },
    // 导入模板
    showMessage(val) {
      console.log(val);
      this.infoform.content = val.row.message;
      if(val.row.code === 0)
      this.infoform.infoPushTitle = '日程安排提醒'
       else
    this.infoform.infoPushTitle = '面试结果通知'
    },
    // 删除模板
    async moveAway(val){
      const id = val.row.ID;
      console.log(id);
      const headers = {
          'jwt-code': localStorage.getItem('token')
      }
      //有token
      if (headers) {
          await axios({
              url: 'http://123.207.73.185:8080/admin/deleteMessageTemplate',
              method: 'DELETE',
              params: {
              id:id
            },
              headers
          }).then(res => {
              this.getTemplatedata();
              console.log(res);
          }).catch((e) => {
              //返回401
              console.log(e);
          })
      }
      else {
          this.$message.error('请先登录！')
          this.$router.push('/login')
      }
    },
    // 保存模板
    async saveTemplate() {
      const headers = {
          'jwt-code': localStorage.getItem('token')
      }
      if (this.infoform.infoPushTitle === '日程安排提醒') {
      this.code = 0;
    }
      if (this.infoform.infoPushTitle === '面试结果通知') {
      this.code = 1;
    }
      //有token
      if (headers) {
          await axios({
              url: 'http://123.207.73.185:8080/admin/saveMessageTemplate',
              method: 'POST',
              data: {
              message: this.infoform.content,
              code: this.code
            },
              headers
          }).then(res => {
            this.getTemplatedata();
            console.log(res);
          }).catch((e) => {
              //返回401
              console.log(e);
          })
      }
      else {
          this.$message.error('请先登录！')
          this.$router.push('/login')
      }
    },
    //发送推送信息
    async sendInfoPush() {
      if (this.targetData) {
        let cnt = 0;
        console.log(this.targetData);

        for (let i = 0; i < this.targetData.length; i++) {
          const feedback = 'http://123.207.73.185:100/#/feedback'

          let id = Date.now()
          id *= 1000 + i
          let query = 'https://element.eleme.cn/#/zh-CN/component/form'
          if(this.radio === "1"){
            query = feedback + `?id=${id}&wxopenid=${this.targetData[i].wxopenid}&accept=${this.acceptStatus}&reject=${this.rejectStatus}`
          const encodedUrl = encodeURI(query)
            query = encodedUrl
          }
          else if(this.radio === "2"){
            query = this.link;
          }
          await axios({
            url: 'http://42.194.194.197/admin/sendMessageToUser',
            method: 'POST',
            params: {
              wxOpenId: this.targetData[i].wxopenid,
              name: this.targetData[i].username,
              msg: this.infoform.content,
              nowStatus: this.targetData[i].status,
              //点击推送信息后跳转的页面
              HTTP: query,
              code:this.code
            },
            headers:{
                'jwt-code': localStorage.getItem('token')
            }
          }).then(() => {
            cnt++;
          }).catch(() => {
          })
        }
        if (cnt === this.targetData.length) {
          this.$message.success('发送成功！')
          this.acceptStatus = '',
            this.rejectStatus = ''
        }
        else this.$message.error('发送失败！')
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
      var getData = [];
      for (let i = 0; i < targetdata.length; i++) {
        const Obj = new Object();
        Obj.wxopenid = targetdata[i];
        const arr = this.userList.find(element => element.wxopenid === targetdata[i]);
        Obj.username = arr.username
        Obj.status = arr.status
        getData[i] = Obj;
      }
      this.targetData = getData;
    },
    // 获取路由传参后的姓名和openid
    getdata() {
      this.infoform.infopushList = this.$route.query.openidlist;
      this.targetData = this.$route.query.infopushlist;
    },
    // 获取模板列表
    async getTemplatedata() {
      const headers = {
          'jwt-code': localStorage.getItem('token')
      }
      //有token
      if (headers) {
          await axios({
              url: 'http://123.207.73.185:8080/admin/showAllMessageTemplate',
              method: 'GET',
              headers
          }).then(res => {
            this.templateData = res.data.data;
          }).catch((e) => {
              //返回401
              console.log(e);
          })
      }
      else {
          this.$message.error('请先登录！')
          this.$router.push('/login')
      }
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
      this.getUserList();
    }
    this.getdata();
    this.getTemplatedata();

  },

  watch: {
        // 搜索框内容
        searchId() {
            this.searchID();
            if (this.searchId === '') {
              this.templateData = this.tempList;
            }
        }
    },

}
</script>


<style scoped>

.container{
  display: flex;
  justify-content : space-around;
}

.bord {
  width: 43vw;
  background-color: #3456;
}

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