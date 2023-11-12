<template>
  <div>
    <van-nav-bar
      title="填写简历"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-form @submit="onSubmit" label-align="center" input-align="center" colon ref="resumeForm"  error-message-align="center"  validateOnRuleChange="false" >
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
        name="username"
        label="姓名"
        placeholder="请输入你的姓名"
        :rules="usernameRules"
        autocomplete="off"
      />
      <!-- 性别 -->
      <van-field name="UserInfo.sex" label="性别" :rules="[{required: true,
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
        autocomplete="off"
      />
      <!-- 班级 -->
      <van-field
        v-model.trim="UserInfo.class"
        name=""
        label="班级"
        placeholder="如：7班"
        :rules="classRules"
        autocomplete="off"
      />
      <!-- 专业 -->
      <van-field
        v-model.trim="UserInfo.profession"
        name=""
        label="专业"
        placeholder="请输入你的专业"
        :rules="professionRules"
        autocomplete="off"

      />
      <!-- 手机号码 -->
      <van-field
        v-model.trim="UserInfo.phone"
        name=""
        label="手机号码"
        placeholder="请输入你的手机号码"
        :rules="telRules"
        error-message-align="center"
        autocomplete="off"
      />
      <!-- 微信号 -->
      <van-field
        v-model.trim="UserInfo.wxid"
        name=""
        label="微信号"
        placeholder="请输入你的微信号"
        :rules="[{required: false,
          message: '微信号不能为空',
          trigger: 'onBlur'}]"
        autocomplete="off"

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
          :rules="[{required: false,
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
        v-model="UserInfo.introduction"
        rows="2"
        autosize
        label="个人介绍"
        type="textarea"
        placeholder="自我认知、字数不限"
        :rules="[{required: false,
          message: '个人介绍不能为空',
          trigger: 'onBlur'}]"
        autocomplete="off"

      />
      <!-- 加入ab实验室的理由 -->
      <van-field
        v-model="UserInfo.reasons"
        rows="2"
        autosize
        maxlength="100"
        show-word-limit
        label="加入ab实验室的理由"
        type="textarea"
        placeholder="加入ab实验室的理由"
        :rules="[{required: false,
          message: '理由不能为空',
          trigger: 'onBlur'}]"
        autocomplete="off"

      />
      <!-- 个人经历 -->
      <van-field
        v-model="UserInfo.experience"
        rows="2"
        autosize
        maxlength="50"
        show-word-limit
        label="个人经历"
        type="textarea"
        placeholder="项目经历、职业规划等"
        :rules="[{required: false,
          message: '个人经历不能为空',
          trigger: 'onBlur'}]"
        autocomplete="off"

      />
      <!-- 照片上传 -->
      <van-field name="photosList" label="照片上传" >
        <template #input>
          <van-uploader v-model="photosList" :max-count="1"  :after-read="afterPhotoRead" :max-size="500 * 1024 *1024" :before-delete="delPhoto"/>
        </template>
      </van-field>
      <!-- 上传附件 -->
      <van-field name="fileList" label="附件上传">
        <template #input>
          <!-- accept 支持上传的文件类型为全部，max-size最大上传内存 500m  -->
          <van-uploader v-model="fileList" :after-read="afterFileRead" accept="" :max-size="500 * 1024 *1024" :before-delete="delFile">
            <van-button icon="plus" type="primary">上传文件</van-button>
          </van-uploader>

        </template>
      </van-field>
      <!-- 提交按钮 -->
      <div style="margin: 10px 0;display: flex;">
        <van-button round block type="info" native-type="button" style="margin: 2px 10px;" @click="draft">存为草稿</van-button>
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
      wxOpenid: '',
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
        introduction: '',
        reasons: '',
        experience: '',
        award: '',
        status: '待录取',
        wxopenid: ''
      },
      // 岗位选择框内容
      chosedDirection: '',
      // 岗位下拉框内容
      columns: ['前端开发', '后端开发', 'UI设计', '产品经理'],
      // 显示下拉框
      showPicker: false,
      // // 校验手机号码
      // telRules: [
      //   {
      //     required: true,
      //     message: '手机号码不能为空',
      //     trigger: 'onBlur'
      //   },
      //   {
      //     validator: value => {
      //       return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      //         .test(value)
      //     },
      //     message: '请输入正确格式的手机号码',
      //     trigger: 'onBlur'
      //   }
      // ],
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
      // // 检验姓名
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
      // // 检验年级
      // gradeRules: [
      //   {
      //     required: true,
      //     message: '年级不能为空',
      //     trigger: 'onBlur'
      //   },
      //   {
      //     validator: value => {
      //       return /^20(1[0-9]|2[0-9]|30)$/
      //         .test(value)
      //     },
      //     message: '请输入正确的年级',
      //     trigger: 'onBlur'
      //   }
      // ],
      // // 检验班级
      // classRules: [
      //   {
      //     required: true,
      //     message: '班级不能为空',
      //     trigger: 'onBlur'
      //   },
      //   {
      //     validator: value => {
      //       return /^[1-9]班$/
      //         .test(value)
      //     },
      //     message: '请输入正确的班级',
      //     trigger: 'onBlur'
      //   }
      // ],
      // // 校验专业
      // professionRules: [
      //   {
      //     required: true,
      //     message: '专业不能为空',
      //     trigger: 'onBlur'
      //   },
      //   {
      //     validator: value => {
      //       return /^[\u4E00-\u9FFF]+$/
      //         .test(value)
      //     },
      //     message: '请输入正确的专业',
      //     trigger: 'onBlur'
      //   }
      // ],
      // // 校验结果
      testCondition: false,
      // 图片
      photosList: [],
      // 附件
      fileList: [],
      FileformData: {},
      PhotoformData: {}
    }
  },
  methods: {
    // 表单提交时触发检验
    onSubmit () {},
    // 确定意向岗位选择
    onConfirm (value) {
      this.chosedDirection = value
      this.UserInfo.direction = value
      this.showPicker = false
    },
    // 提交表单且验证通过后触发
    async submit () {
      await this.$refs.resumeForm.validate()
      this.testCondition = true
      if (this.testCondition) {
        this.UserInfo.direction = this.chosedDirection
        // 上传附件
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 10000
        })
        axios({
          url: 'http://123.207.73.185:8080/uploadUserFileMessage',
          method: 'POST',
          params: {
            studentid: this.UserInfo.studentid
          },
          data: this.FileformData,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(() => {
        // 图片上传成功
          axios({
            url: 'http://123.207.73.185:8080/uploadUserFileMessage',
            method: 'POST',
            params: {
              studentid: this.UserInfo.studentid
            },
            data: this.PhotoformData,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(() => {
            // 简历上传成功
            axios({
              url: 'http://123.207.73.185:8080/postUserMessage',
              method: 'POST',
              data: this.UserInfo
            }).then(() => {
              Toast.clear()
              this.$router.push('/result')
            }).catch(() => {
              Toast.fail('简历提交失败！')
            })
          }).catch(() => {
            // 上传失败
            Toast.fail('图片上传失败')
          })
        }).catch(() => {
        // 上传失败
          Toast.fail('附件上传失败')
        })
      }
    },
    // 另存为草稿
    draft () {
      // 检验学号
      this.$refs.resumeForm.validate('username').then(() => {}).catch(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      })
      this.$refs.resumeForm.validate('studentid').then(() => {
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 10000
        })
        // 可以提交简历了
        this.UserInfo.ok = 0
        console.log(this.UserInfo)
        axios({
          url: 'http://123.207.73.185:8080/postUserMessage',
          method: 'POST',
          data: this.UserInfo
        }).then(() => {
          console.log('简历上传成功！')
          if (this.photosList.length) {
            // 图片上传成功
            console.log('上传图片')
            axios({
              url: 'http://123.207.73.185:8080/uploadUserFileMessage',
              method: 'POST',
              params: {
                studentid: this.UserInfo.studentid
              },
              data: this.PhotoformData,
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
            ).then(() => {
              console.log('图片上传成功！')
              if (this.fileList.length) {
                console.log('附件上传')
                axios({
                  url: 'http://123.207.73.185:8080/uploadUserFileMessage',
                  method: 'POST',
                  params: {
                    studentid: this.UserInfo.studentid
                  },
                  data: this.FileformData,
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }).then(() => {
                  console.log('附件上传成功')
                  Toast.success('保存成功')
                })
              } else { Toast.success('保存成功！') }
            })
          } else { Toast.success('保存成功！') }
        }).catch(() => {
          Toast.fail('简历提交失败！')
        })
      }).catch((error) => {
        console.log(error)
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
      )
    },
    // 上传附件
    afterFileRead (file) {
      console.log(file)
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('file', file.file)
      this.FileformData = formData
      file.status = 'done'
    },
    afterPhotoRead (file) {
      console.log(file)
      file.status = 'uploading'
      file.message = '上传中...'
      const formData = new FormData()
      formData.append('picture', file.file)
      this.PhotoformData = formData
      file.status = 'done'
    },
    // 附件文件删除
    delFile (e, detail) {
      // 用户存过草稿
      if (this.UserInfo.ok === 0) {
        e.file.status = 'uploading'
        // 发送删除文件请求
        axios({
          url: 'http://123.207.73.185:8080/deleteUserFileMessage',
          method: 'DELETE',
          params: {
            studentid: this.UserInfo.studentid,
            file: e.file.name
          }
        }).then(() => {
        // 删除本地绑定的存放文件的属性
          this.fileList.splice(detail.index, 1)
          e.file.status = 'done'
        }).catch(() => {
        // 收到删除失败的信息
          Toast.fail('图片删除失败!')
        })
      } else {
        e.file.status = 'uploading'
        this.fileList.splice(detail.index, 1)
        e.file.status = 'done'
      }
    },
    delPhoto (e, detail) {
      // 存了草稿
      if (this.UserInfo.ok === 0) {
        e.file.status = 'uploading'
        // 发送删除文件请求
        axios({
          url: 'http://123.207.73.185:8080/deleteUserFileMessage',
          method: 'DELETE',
          params: {
            studentid: this.UserInfo.studentid,
            file: e.file.name
          }
        }).then(() => {
        // 删除本地绑定的存放文件的属性
          this.fileList.splice(detail.index, 1)
          e.file.status = 'done'
        }).catch(() => {
        // 收到删除失败的信息
          Toast.fail('图片删除失败!')
        })
      } else {
        e.file.status = 'uploading'
        this.photosList.splice(detail.index, 1)
        e.file.status = 'done'
      }
    }
  },
  created () {
    const query = document.location.search
    // 带着code进来的
    if (query[1] === 'c') {
      const code = query.slice(6)
      // 去获取wxopenid
      axios({
        url: 'http://42.194.194.197/openid',
        params: {
          code
        }
      }).then(res => {
        // 拿到了wxopenid
        this.wxOpenid = res.data.data
        this.UserInfo.wxopenid = res.data.data
        // 查询该openid是否注册过
        axios({
          url: 'http://123.207.73.185:8080/isUserExist',
          params: {
            wxopenid: this.wxOpenid
          }
        }).then(res => {
          // 已经提交过
          if (res.data.code) {
            const userData = res.data.data
            // 成功提交,ok = 1 ，前往查看进度,带上status
            if (userData.ok) {
              console.log('新用户')
              this.$router.push({
                path: '/result',
                query: {
                  status: userData.status
                }
              })
            } else { // 存过草稿，ok = 0 ,数据回显，继续填写
              this.UserInfo = userData
              this.chosedDirection = this.UserInfo.direction
              axios({
                url: 'http://123.207.73.185:8080/showUserFileMessage',
                params: {
                  studentid: this.UserInfo.studentid
                }
              }).then((res) => {
                console.log(res)
                const item = {
                  url: res.data.data[0].url,
                  // 要用到file.status
                  file: new File([], res.data.data[0].name, {}) // 就是这个new File([], item.attachmentName, {}),有他就可以回显文件名称了
                }
                this.photosList.push(item)
                for (let i = 1; i < res.data.data.length; i++) {
                  const item1 = {
                    url: res.data.data[i].url,
                    file: new File([], res.data.data[i].name, {}) // 就是这个new File([], item.attachmentName, {}),有他就可以回显文件名称了
                  }
                  this.fileList.push(item1)
                }
              })
            }
          }
        })
      }).catch(() => {
        Toast.error('查询openid失败！')
      })
    } else { // 不带code,已经有了wxopenid,从涵哥那边过来的
      console.log(this.$route.query)
      // 将路径带来参数的回显
      this.UserInfo = this.$route.query
      this.chosedDirection = this.UserInfo.direction
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
