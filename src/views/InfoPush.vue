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
      <el-form ref="infoform" :model="infoform" label-width="400px">
        <!-- 目标用户区域 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户">
              <el-select v-model="infoform.inputValue" clearable placeholder="请选择目标用户" >
                <el-option v-for="item in options" :key="item.id" :label="item.username" :value="item.username">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 标题 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="标题">
              <el-input v-model.trim="infoform.infoPushTitle" maxlength="10" placeholder="请输入标题" style="width: 400px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 内容 -->
        <el-row>
          <el-col :span="10">
            <el-form-item label="内容">
              <el-input type="textarea"  placeholder="请输入内容" v-model="infoform.content" show-word-limit  resize="none"  ></el-input>
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
      infoform: {
        //推送标题
        infoPushTitle: '',
        //推送内容
        content: '',
        //目标用户
        inputValue: ''
      },
      // 用户列表
      options: [
        {
          id:1,
          value: '',
          label: 'HTML'
        }, 
        {
          id:2,
          value: '选项2',
          label: 'CSS'
        }, 
        {
          id:3,
          value: '选项3',
          label: 'JavaScript'
        }
      ],
      radio:1
    }
  },
  methods: {
    sendInfoPush(){
      console.log(this.infoform.inputValue);
      // 清空表单内容
      // Object.assign(this.$data.infoform, this.$options.data().infoform)
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
        },
  },
  created(){
    this.getUserList()
  },
  mounted(){
    this.infoform.inputValue = this.options[0].username
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