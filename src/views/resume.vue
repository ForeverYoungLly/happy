<template>
  <div>
    <van-nav-bar
      title="填写简历"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-form @submit="onSubmit" label-align="center" input-align="center" colon ref="resumeForm"  error-message-align="center" scroll-to-error validateOnRuleChange="false">
      <!-- scroll-to-error  校验不通过时滚动至错误的表单项 -->
      <!-- 学号 -->
      <van-field
        v-model.trim="UserInfo.studentid"
        name="studentid"
        label="学号"
        placeholder="例如：2022463030xxx"
        :rules="studentidRules"
        autocomplete="off"
      />
      <!-- 姓名 -->
      <van-field
        v-model.trim="UserInfo.username"
        name=""
        label="姓名"
        placeholder="请输入你的姓名"
        :rules="usernameRules"
      />
      <!-- 性别 -->
      <van-field name="UserInfo.sex" label="性别" :rules="[{required: true,
          message: '性别不能为空',
          trigger: 'onBlur'}]">
        <template #input>
          <van-radio-group v-model="UserInfo.sex" direction="horizontal">
            <van-radio name="男">男</van-radio>
            <van-radio name="女">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- 年级 -->
      <van-field
        v-model.trim="UserInfo.grade"
        name=""
        label="年级"
        placeholder="如：2022"
        :rules="gradeRules"
      />
      <!-- 班级 -->
      <van-field
        v-model.trim="UserInfo.class"
        name=""
        label="班级"
        placeholder="如：7班"
        :rules="classRules"
      />
      <!-- 专业 -->
      <van-field
        v-model.trim="UserInfo.profession"
        name=""
        label="专业"
        placeholder="请输入你的专业"
        :rules="professionRules"
      />
      <!-- 手机号码 -->
      <van-field
        v-model.trim="UserInfo.phone"
        name=""
        label="手机号码"
        placeholder="请输入你的手机号码"
        :rules="telRules"
        error-message-align="center"
      />
      <!-- 微信号 -->
      <van-field
        v-model.trim="UserInfo.wxid"
        name=""
        label="微信号"
        placeholder="请输入你的微信号"
        :rules="[{required: true,
          message: '微信号不能为空',
          trigger: 'onBlur'}]"
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
          :rules="[{required: true,
          message: '意向岗位不能为空',
          trigger: 'onBlur'}]"
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
        :rules="[{required: true,
          message: '个人介绍不能为空',
          trigger: 'onBlur'}]"
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
        :rules="[{required: true,
          message: '理由不能为空',
          trigger: 'onBlur'}]"
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
        :rules="[{required: true,
          message: '个人经历不能为空',
          trigger: 'onBlur'}]"
      />
      <!-- 照片上传 -->
      <van-field name="photosList" label="照片上传">
        <template #input>
          <van-uploader v-model="photosList" />
        </template>
      </van-field>
      <!-- 上传附件 -->
      <van-field name="fileList" label="附件上传">
        <template #input>
          <!-- accept 支持上传的文件类型为全部，max-size最大上传内存 500m  -->
          <van-uploader v-model="fileList" :after-read="afterRead" accept="" :max-size="500 * 1024 *1024" :before-delete="delFile">
            <van-button icon="plus" type="primary">上传文件</van-button>
          </van-uploader>

        </template>
      </van-field>
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
      // 校验手机号码
      telRules: [
        {
          required: true,
          message: '手机号码不能为空',
          trigger: 'onBlur'
        },
        {
          validator: value => {
            return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
              .test(value)
          },
          message: '请输入正确格式的手机号码',
          trigger: 'onBlur'
        }
      ],
      // 校验学号
      studentidRules: [
        {
          required: true,
          message: '学号不能为空',
          trigger: 'onBlur'
        },
        {
          validator: value => {
            return /^20\d{11}$/
              .test(value)
          },
          message: '请输入正确格式的学号',
          trigger: 'onBlur'
        }
      ],
      // 检验姓名
      usernameRules: [
        {
          required: true,
          message: '姓名不能为空',
          trigger: 'onBlur'
        },
        {
          validator: value => {
            return /^[\u4E00-\u9FFF]{2,4}$/
              .test(value)
          },
          message: '请输入正确的姓名',
          trigger: 'onBlur'
        }
      ],
      // 检验年级
      gradeRules: [
        {
          required: true,
          message: '年级不能为空',
          trigger: 'onBlur'
        },
        {
          validator: value => {
            return /^20(1[0-9]|2[0-9]|30)$/
              .test(value)
          },
          message: '请输入正确的年级',
          trigger: 'onBlur'
        }
      ],
      // 检验班级
      classRules: [
        {
          required: true,
          message: '班级不能为空',
          trigger: 'onBlur'
        },
        {
          validator: value => {
            return /^[1-9]班$/
              .test(value)
          },
          message: '请输入正确的班级',
          trigger: 'onBlur'
        }
      ],
      // 校验专业
      professionRules: [
        {
          required: true,
          message: '专业不能为空',
          trigger: 'onBlur'
        },
        {
          validator: value => {
            return /^[\u4E00-\u9FFF]+$/
              .test(value)
          },
          message: '请输入正确的专业',
          trigger: 'onBlur'
        }
      ],
      // 校验结果
      testCondition: false,
      // 图片位置
      photosList: [
        { url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }
      ],
      // 上传文件保存位置
      fileList:
       [
       ]
    }
  },
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
      await this.$refs.resumeForm.validate()
      Toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      this.testCondition = true
      if (this.testCondition) {
        axios({
          url: 'http://123.207.73.185:8080/postUserMessage',
          method: 'POST',
          data: this.UserInfo
        }).then(() => {
          this.$router.push('/result')
          Toast.success('提交成功！')
        }).catch(() => {
          Toast.error('表单校验失败！')
        })
      }

      // this.$refs.resumeForm.validate()
      // Promise.resolve().then(() => {
      //   Toast.loading({
      //     message: '加载中...',
      //     forbidClick: true
      //   })
      //   this.testCondition = true
      //   // if (this.testCondition) {
      //   //   axios({
      //   //     url: 'http://123.207.73.185:8080/postUserMessage',
      //   //     method: 'POST',
      //   //     data: this.UserInfo
      //   //   }).then(() => {
      //   //     // this.$message.success('注册成功！')
      //   //     this.$router.push('/result')
      //   //     Toast.success('提交成功！')
      //   //   }).catch(() => {
      //   //     this.$message?.error('注册失败！')
      //   //   })
      //   // }
      // }).catch((e) => {
      //   console.log(e)
      //   this.$toast.fail('提交失败,表单校验不合法！')
      // })
    },
    // 上传文件之前
    // beforeRead (file) {
    //   return true
    // },
    // 文件上传完成后的回调函数
    afterRead (file) {
      console.log(file)
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('file', file.file)
      axios({
        url: 'http://123.207.73.185:8080/uploadUserFileMessage',
        method: 'POST',
        params: {
          wxopenid: 'osNMd6yQN02kDAW7UiNsotP8J1YU'
        },
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        // 上传成功
        file.status = 'done'
      }).catch(() => {
        // 上传失败
        file.status = 'failed'
        this.$message.error('上传失败')
      })
    },
    // 文件删除
    delFile (e, detail) {
      console.log(e)
      console.log(detail)
      axios({
        url: 'http://123.207.73.185:8080/deleteUserFileMessage',
        method: 'DELETE',
        params: {
          wxopenid: 'osNMd6yQN02kDAW7UiNsotP8J1YU',
          file: e.file.name
        }
      }).then(res => {
        console.log(res)
        console.log(detail.index)
        this.fileList.splice(detail.index, 1)
        console.log(this.fileList)
      }).catch(() => {
        // this.$message.error('删除失败')
      })
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
