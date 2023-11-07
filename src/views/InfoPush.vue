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
              <el-select v-model="infoform.wxopenid" clearable placeholder="请选择目标用户" @change="getId(infoform.wxopenid)" >
                <el-option v-for="item in options" :key="item.wxopenid" :label="item.username" :value="item.wxopenid" >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 标题 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="标题">
              <el-input prop="title" v-model.trim="infoform.infoPushTitle" maxlength="10"  placeholder="请输入标题" style="width: 400px;" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 内容 -->
        <el-row>
          <el-col :span="10">
            <el-form-item label="内容">
              <el-input prop="content" type="textarea"  placeholder="请输入内容" v-model.trim="infoform.content" show-word-limit  resize="none"  ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 显示选项 -->
        <el-row>
            <el-form-item label="选项">
              <el-radio-group v-model="radio">
                <el-col :span="10">
                <el-radio :label="1">接受</el-radio>
                </el-col>
                <el-col :span="10">
                <el-radio :label="2">拒绝</el-radio>
                </el-col>
                <el-col :span="10">
                <el-radio :label="3">异常反馈</el-radio>
                </el-col>
                <el-col :span="10">
                  <el-radio :label="4"><a href="https://element.eleme.cn/#/" style="color: #333;"
                    target="_blank">Element</a></el-radio>
                </el-col>

              </el-radio-group>
            </el-form-item>
        </el-row>
        <!-- 发送按钮 -->
        <el-form-item>
          <el-button type="primary" @click="sendInfoPush">发送</el-button>
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
      //表单绑定的数据对象
      infoform: {
        //推送标题
        infoPushTitle: '',
        //推送内容
        content: '',
        //目标用户的openid
        wxopenid:''
      },
      //表单检验规则对象 prop 标识需要检验的表单元素
      pushFormRules:{
        // trigger: 触发， blur：失去焦点
        title:
        [
          { required:true, message:'标题不能为空' , trigger: 'blur'},
          { min:1,max:10,message:'标题要求1-10个字符', trigger: 'blur'}
        ],
        content:
        [
        { required:true, message:'内容不能为空' , trigger: 'blur'},
        ]
      },
      // 下拉框显示内容列表
      options: [],
      //目标用户的所有数据
      targetData:[
        {
          username:1
        }
      ],
      //单选默认选中内容
      radio:1
    }
  },
  methods: {
    async sendInfoPush(){
      if(this.targetData)
      {
        await axios({
          url:'http://42.194.194.197:80/templateMessage',
          method:'POST',
          params:{
            wxOpenId:this.targetData.wxopenid,
            name:this.targetData.username,
            msg:this.infoform.content,
            nowStatus:this.targetData.status,
            HTTP:'https://www.baidu.com'
          }
          }).then( () =>{
            this.$message.success('推送成功！')
          }).catch( () =>{
            this.$message.error('推送失败')
          })
      }
      // 清空表单内容
      Object.assign(this.$data.infoform, this.$options.data().infoform)
    },
    async getUserList(){
      await axios({
      url:'http://123.207.73.185:8080/userDirection',
      params:{
          direction:'全部'
      }
      }).then( res =>{
          const userList = res.data.data
          this.options = userList
      }).catch( () =>{
          this.$message.error("用户列表数据获取失败！")
      })
    this.infoform.wxopenid = this.options[0].username
    },
    //获取目标用户的所有数据，并存入targetData中
    getId(targetwxopenid){
      this.targetData = this.options.find( obj =>{
        return obj.wxopenid === targetwxopenid
      })
    }
  },
  created(){
    this.getUserList()
  },
  mounted(){
    //默认选中第一个
  }
}
</script>


<style >
.el-select {
  width: 400px;
}
a:hover{
  color: #61afef !important;
}
textarea {
  width:400px !important;
  height: 100px !important; 
}
</style>