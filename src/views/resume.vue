<template>
  <div>
    <van-nav-bar
      title="填写简历"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-form @submit="onSubmit" label-align="center" input-align="center" colon>
      <!-- 学号 -->
      <van-field
        v-model="UserInfo.studentid"
        name=""
        label="学号"
        placeholder="例如：2022463030xxx"
      />
      <!-- 姓名 -->
      <van-field
        v-model="UserInfo.username"
        name=""
        label="姓名"
        placeholder="请输入你的姓名"
      />
      <!-- 性别 -->
      <van-field name="UserInfo.sex" label="性别">
        <template #input>
          <van-radio-group v-model="UserInfo.sex" direction="horizontal">
            <van-radio name="男">男</van-radio>
            <van-radio name="女">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- 年级 -->
      <van-field
        v-model="UserInfo.grade"
        name=""
        label="年级"
        placeholder="如：2022"
      />
      <!-- 班级 -->
      <van-field
        v-model="UserInfo.class"
        name=""
        label="班级"
        placeholder="如：7班"
      />
      <!-- 专业 -->
      <van-field
        v-model="UserInfo.profession"
        name=""
        label="专业"
        placeholder="请输入你的专业"
      />
      <!-- 手机号码 -->
      <van-field
        v-model="UserInfo.phone"
        name=""
        label="手机号码"
        placeholder="请输入你的手机号码"
      />
      <!-- 微信号 -->
      <van-field
        v-model="UserInfo.wxid"
        name=""
        label="微信号"
        placeholder="请输入你的微信号"
      />
      <!-- 意向岗位 -->
      <van-field
          readonly
          clickable
          name="picker"
          :value="chosedDirection"
          label="意向岗位"
          placeholder="请选择你的意向岗位"
          @click="showPicker = true"
      />
      <!-- 岗位选择器 -->
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <!-- 个人介绍 -->
      <van-field
        v-model="UserInfo.infomation1"
        rows="2"
        autosize
        label="个人介绍"
        type="textarea"
        placeholder="自我认知、字数不限"
      />
      <!-- 加入ab实验室的理由 -->
      <van-field
        v-model="UserInfo.infomation2"
        rows="2"
        autosize
        maxlength="100"
        show-word-limit
        label="加入ab实验室的理由"
        type="textarea"
        placeholder="加入ab实验室的理由"
      />
      <!-- 个人经历 -->
      <van-field
        v-model="UserInfo.infomation3"
        rows="2"
        autosize
        maxlength="50"
        show-word-limit
        label="个人经历"
        type="textarea"
        placeholder="项目经历、职业规划等"
      />
      <!-- 文件上传 -->
      <van-field name="fileList" label="照片上传">
        <template #input>
          <van-uploader v-model="fileList" />
        </template>
      </van-field>
      <!-- 上传附件 -->
      <div class="file" style="margin:10px 0">
          <van-uploader >
            <van-button icon="plus" type="primary">上传附件</van-button>
          </van-uploader>
      </div>
      <!-- 提交按钮 -->
      <div style="margin: 10px 0;display: flex;">
        <van-button round block type="info" native-type="button" style="margin: 2px 10px;">存为草稿</van-button>
        <van-button round block type="info" native-type="submit" @click="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { Toast } from 'vant'
import axios from 'axios'
export default {
  name: 'SubmitResult',
  methods: {
    // 表单提交时触发检验
    onSubmit () {},
    // 确定意向岗位选择
    onConfirm (value) {
      this.chosedDirection = value
      this.showPicker = false
    },
    // 提交表单且验证通过后触发
    async submit () {
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      await axios({
        url: 'http://123.207.73.185:8080/postUserMessage',
        method: 'POST',
        data: this.UserInfo
      }).then(() => {
        this.$message.success('注册成功！')
        this.$router.push('/result')
        Toast.success('提交成功！')
      }).catch(() => {
        this.$message.error('注册失败！')
      })
    }
  },
  data () {
    return {
      UserInfo: {
        username: '',
        studentid: '',
        sex: '',
        grade: '',
        profession: '',
        class: '',
        phone: '',
        wxid: '',
        direction: '',
        ok: 1,
        information1: '',
        information2: '',
        information3: '',
        award: '',
        wxopenid: '1234567890'
      },
      // 岗位选择框内容
      chosedDirection: '',
      // 岗位下拉框内容
      columns: ['前端开发', '后端开发', 'UI设计', '产品经理'],
      // 显示下拉框
      showPicker: false,
      // 上传文件保存位置
      fileList: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }]
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #ccc;
}
.file {
  display: flex;
  justify-content: center;
}
</style>
