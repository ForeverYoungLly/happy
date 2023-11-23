<template>
  <el-main>
    <div class="container">
      <!-- 首页table -->
      <el-table :data="UserList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        style="width: 100% ; margin: 5px; box-shadow: 1px 2px 4px #ccc;transition: all 0.3 ease-in!important;" stripe
        @sort-change="handle" ref="problemTable">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="username" label="姓名">
        </el-table-column>
        <el-table-column prop="problem" label="异常消息">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" type="primary" size="small" @click="showEditDialog(scope)">查看/编辑</el-button>
            <el-button icon="el-icon-s-tools" type="primary" size="small">解决异常</el-button>
            <el-button icon="el-icon-s-promotion" type="primary" size="small" @click="infoPush">发送消息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 查看编辑气泡框 -->
      <el-dialog :visible.sync="editDialogVisible" width="60%" :close-on-click-modal="false">
        <!-- 内容主体区 -->
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef">
          <!-- 姓名、学号 -->
          <el-row :gutter="20" style="display: flex;">
            <el-col :span="6" style="bottom: 0px;">
              <el-form-item label="姓名" prop="username">
                <el-input v-model="editForm.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="bottom: 0px;">
              <el-form-item label="学号" prop="studentid">
                <el-input v-model="editForm.studentid" show-word-limit></el-input>
              </el-form-item>
            </el-col>
            <div class="demo-image__placeholder" style="position: absolute; right: 10%;">
              <div class="block">
                <el-image :src="src" style="width: 10vw; height: 22vh; " :fit="fit" :preview-src-list="srcList">
                  <div slot="placeholder" class="image-slot">
                    <i class="el-icon-loading"></i>加载中....
                  </div>
                </el-image>
              </div>
            </div>
          </el-row>
          <!-- 性别、年级 -->
          <el-row :gutter="12">
            <el-col :span="6">
              <el-form-item label="性别" prop="sex">
                <!-- <el-select v-model="editForm.sex" placeholder="请选择性别">
                                            <el-option v-for="item in sexoptions" :key="item.value" :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select> -->
                <el-radio v-model="editForm.sex" label="男">男</el-radio>
                <el-radio v-model="editForm.sex" label="女">女</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年级" prop="grade">
                <el-input v-model="editForm.grade"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 电话、方向 -->
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="电话" prop="phone">
                <el-input v-model="editForm.phone" show-word-limit></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="方向" prop="direction">
                <el-select v-model="editForm.direction" placeholder="请选择方向">
                  <el-option v-for="item in directionoptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 状态、编号-->
          <el-row :gutter="20">
            <!-- 微信id -->
            <el-col :span="11">
              <el-form-item label="微信号" prop="wxid">
                <el-input v-model="editForm.wxid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="状态" prop="status">
                <el-select v-model="editForm.status" placeholder="请选择状态">
                  <el-option v-for="item in statusoptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 异常信息 -->
          <el-form-item label="异常信息" prop="problem">
            <el-col>
              <el-input type="textarea" placeholder="请输入个人简介" :rows="5" v-model="editForm.problem" resize='none'
                class="textarea"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="editDialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="saveEdit(editFormRef)">保存</el-button>
      </el-dialog>
      <!-- 分页器 -->
      <div class="block">
        <span class="demonstration"></span>
        <el-pagination align="center" @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage" :page-sizes="[1, 5, 10, 20]" :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="UserList.length">
        </el-pagination>
      </div>
    </div>
  </el-main>
</template>

<script>
import axios from 'axios';
export default {
  name: 'FeedBack',
  data() {
    return {
      sexoptions: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      },],
      // 状态下拉框
      statusoptions: [{
        value: '草稿',
        label: '草稿'
      }, {
        value: '待筛选',
        label: '待筛选'
      }, {
        value: '筛选不通过',
        label: '筛选不通过'
      }, {
        value: '待安排初试',
        label: '待安排初试'
      }, {
        value: '待初试',
        label: '待初试'
      }, {
        value: '初试不通过',
        label: '初试不通过'
      }, {
        value: '初试通过',
        label: '初试通过'
      }, {
        value: '待复试',
        label: '待复试'
      }, {
        value: '待安排复试',
        label: '待安排复试'
      }, {
        value: '复试通过',
        label: '复试通过'
      }, {
        value: '待复试',
        label: '待复试'
      }, {
        value: '待终试',
        label: '待终试'
      }, {
        value: '待安排终试',
        label: '待安排终试'
      }, {
        value: '终试通过',
        label: '终试通过'
      }, {
        value: '待处理',
        label: '待处理'
      }, {
        value: '挂起',
        label: '挂起'
      },
      ],
      // 方向下拉框
      directionoptions: [{
        value: '前端开发',
        label: '前端开发'
      }, {
        value: '后端开发',
        label: '后端开发'
      }, {
        value: '网络安全',
        label: '网络安全'
      }, {
        value: 'UI设计',
        label: 'UI设计'
      }, {
        value: '产品经理',
        label: '产品经理'
      },],
      // 照片自适应容器的方式
      fit: "fit",
      // 大图预览图片的url地址
      srcList: ['http://123.207.73.185:8090/userFile/picture/2022463030728/2022463030728照片.jpg'],
      // 用户照片url地址
      src: 'http://123.207.73.185:8090/userFile/picture/2022463030728/2022463030728照片.jpg',
      //存放用户列表的数组
      UserList: [],
      //当前页数
      currentPage: 1,
      //每页最多显示多少条数据
      pageSize: 5,
      //编辑对话框的显示隐藏
      editDialogVisible: false,
      //编辑表单绑定的内容
      editForm: {
        username: '小明',
        studentid: '123',
        sex: '男',
        grade: '22',
        profession: '计算机类',
        class: '7班',
        phone: '12345678910',
        direction: '前端',
        status: '已通过',
        personalid: '369',
        problem: '',
        reasons: '',
        experience: '',
        wxid: 'r1197',
      },
      //当前编辑表单的id
      editId: 0,
      //编辑表单的检验规则
      editFormRules: {
        //姓名
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2 }
        ],
        studentid: [
          { required: true, message: '请输入学号', trigger: 'blur' },
        ],
        class: [
          { required: true, message: '请输入班级', trigger: 'blur' },
        ],
        profession: [
          { required: true, message: '请输入专业', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          {
            validator: function (rule, value, callback) {
              if (/^1[34578]\d{9}$/.test(value) == false) {
                callback(new Error("请输入正确的手机号"));
              } else {
                callback();
              }
            }, trigger: 'blur'
          },
        ],
        grade: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { pattern: /^(201[0-9]|202[0-9]|2030)$/, message: '范围在2010到2030', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      const headers = {
        'jwt-code': localStorage.getItem('token')
      }
      //有token
      if (headers) {
        await axios({
          url: 'http://123.207.73.185:8080/admin/userProblems',
          headers
        }).then(res => {
          const userList = res.data.data;
          this.UserList = userList;
        }).catch((e) => {
          //返回401
          if (!e.response.data.code) {
            this.$message.error('请先登录！')
            this.$router.push('/login')
          }
          else
            this.$message.error("用户列表数据获取失败！")
        })
      }
      else {
        this.$message.error('请先登录！')
        this.$router.push('/login')
      }
    },
    //控制排序情况
    handle(val) {
      if (!val.column) {
        this.sortOrder = val.order == 'ascending' ? 2 : 1
        this.sortField = val.prop == '11' ? 2 : 1
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    //修改每页显示条数
    handleSizeChange(val) {
      this.pageSize = val
    },
    // 打开编辑表单
    showEditDialog(scope) {
      //获取打开对象的wxopenid
      const id = scope.row.wxopenid
      // 在用户列表中找到具有对应wxopenid的用户的数据
      const editUserData = this.UserList.find(obj => { return obj.wxopenid === id })
      // 对象无法直接赋值
      const str = JSON.stringify(editUserData)
      //数据回显到表单
      this.editForm = JSON.parse(str)
      //设置当前操作用户的wxopenid
      this.targetWxopenId = id
      // 获取大头照
      this.getUserPic()
      this.editDialogVisible = true;
    },
    // 保存编辑
    saveEdit(editFormRef) {
      const editStr = JSON.stringify(this.editForm)
      const editUserData = this.UserList.find(obj => { return obj.wxopenid === this.targetWxopenIdid })
      const UserlistStr = JSON.stringify(editUserData)
      //发生改动
      if (editStr !== UserlistStr) {
        //修改数据库数据
        const headers = {
          'jwt-code': localStorage.getItem('token')
        }
        //有token
        if (headers) {
          this.$refs.editFormRef.validate((valid) => {
            if (valid) {
              axios({
                url: 'http://123.207.73.185:8080/admin/updateUserMessage',
                method: 'POST',
                data: this.editForm,
                headers,
              }).then(res => {
                this.getUserList()
                if (res.data.code === 1) {
                  this.$message.success('修改成功！')
                  this.editDialogVisible = false;
                } else {
                  this.$message.success('修改失败' + res.data.msg)
                  this.editDialogVisible = false;
                }
              }).catch((e) => {
                //返回401
                if (!e.response.data.code) {
                  this.$message.error('请先登录！')
                  this.$router.push('/login')
                }
                this.$message.error("修改失败！")
              })
            } 
            else {
              this.$message.error('修改信息不合法')
            }
          });
        }
        //无token
        else {
          this.$message.error('请先登录！')
          this.$router.push('/login')
        }
      }
      //没有改动
      else {
        this.$message.error('表单未进行任何修改！修改失败')
        this.editDialogVisible = false
      }
    },
    // 消息推送传参函数
    infoPush() {
      var mutipleList = this.$refs.problemTable.selection;
      var infopushlist = [];
      var openidlist = [];
      var namelist = [];
      for (let i = 0; i < mutipleList.length; i++) {
        var obj = new Object();
        obj.username = mutipleList[i].username;
        obj.wxopenid = mutipleList[i].wxopenid;
        infopushlist[i] = obj;
        openidlist[i] = mutipleList[i].wxopenid;
        namelist[i] = mutipleList[i].username;
      }
      if (infopushlist.length != 0) {
        this.$router.push({
          path: '/infopush',
          query: {
            infopushlist,
            openidlist,
            namelist
          }
        })
      }
      else {
        this.$message.error('请选择发送用户');
      }
    },
    // 获取大头照
    getUserPic() {
      console.log(this.editForm.studentid);
      axios({
        url: 'http://123.207.73.185:8080/showUserFileMessage',
        params: {
          studentid: this.editForm.studentid
        }
      }).then(res => {
        const fileList = res.data.data
        // 预览
        this.src = fileList[0].url
        // 大头照回显
        this.srcList.push(fileList[0].url)
        // 附件回显
        fileList.shift()
        // 避免出现删除过渡效果
        const files = fileList
        this.fileList = files
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
      // 获取用户列表
      this.getUserList()
    }
    console.log(this.$refs.editFormRef.validate);
  }
}
</script>

<style></style>