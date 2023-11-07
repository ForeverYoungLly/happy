<template>
    <el-main>
        <div class="container">
            <!-- 用户列表 -->
            <el-table :data="UserList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                style="width: 98% ; margin: auto; box-shadow: 1px 2px 4px #ccc;transition: all 0.3 ease-in!important;" stripe @sort-change="handle">
                <el-table-column prop="username" label="姓名">
                </el-table-column>
                <el-table-column prop="studentid" label="学号" sortable>
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                </el-table-column>
                <el-table-column prop="grade" label="年级">
                </el-table-column>
                <el-table-column prop="profession" label="专业">
                </el-table-column>
                <el-table-column prop="phone" label="电话">
                </el-table-column>
                <el-table-column prop="wxid" label="微信号">
                </el-table-column>
                <el-table-column prop="direction" label="方向">
                </el-table-column>
                <el-table-column prop="status" label="状态">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="showEditDialog(scope)" icon="el-icon-edit" type="primary"
                            size="small">查看/编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 用户信息编辑的气泡框 -->
            <!-- :close-on-click-modal="false" 取消点击空白处关闭 -->
            <el-dialog title="用户信息" :visible.sync="editDialogVisible" width="60%" :rules="editFormRules" :close-on-click-modal="false">
                <!-- 内容主体区 -->
                <el-form :model="editForm" :rules="editFormRules" ref="editFormRef">
                        <!-- 姓名、学号 -->
                    <el-row :gutter="20">
                        <el-col :span="11">
                            <el-form-item label="姓名" prop="username" >
                                <el-input v-model="editForm.username"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="学号" prop="studentid">
                                <el-input v-model="editForm.studentid"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                        <!-- 性别、年级 -->
                    <el-row :gutter="20">
                        <el-col :span="11">
                            <el-form-item label="性别" prop="sex">
                                <el-input v-model="editForm.sex"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="年级" prop="grade">
                                <el-input v-model="editForm.grade"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                        <!-- 专业、班级 -->
                    <el-row :gutter="20">
                        <el-col :span="11">
                            <el-form-item label="专业" prop="profession">
                                <el-input v-model="editForm.profession"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="班级" prop="class">
                                <el-input v-model="editForm.class"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                        <!-- 电话、方向 -->
                    <el-row :gutter="20">
                        <el-col :span="11">
                            <el-form-item label="电话" prop="phone">
                                <el-input v-model="editForm.phone"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="方向" prop="direction">
                                <el-input v-model="editForm.direction"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                        <!-- 状态、编号-->
                    <el-row :gutter="20">
                        <el-col :span="11">
                            <el-form-item label="状态" prop="status">
                                <el-input v-model="editForm.status"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item label="编号" prop="personalid">
                                <el-input v-model="editForm.personalid"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                        <!-- 微信id -->
                    <el-form-item label="微信号" prop="wxid" >
                        <el-col :span="23">
                            <el-input v-model="editForm.wxid" ></el-input>
                        </el-col>
                    </el-form-item>
                        <!-- 个人简介 -->
                    <el-form-item label="个人简介" prop="information">
                        <el-input  type="textarea" placeholder="请输入个人简介"  :rows="5" v-model="editForm.information" resize='none' ></el-input>
                    </el-form-item>
                        <!-- 获奖情况 -->
                    <el-form-item label="获奖情况" prop="award">
                        <el-input type="textarea" placeholder="请输入获奖情况" :rows="3" v-model="editForm.award" resize="none"></el-input>
                    </el-form-item>
                        <!-- 备注 -->
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" placeholder="请输入备注" :rows="2" v-model="editForm.remark" resize="none"></el-input>
                    </el-form-item>
                </el-form>
                <!-- 内容底部区 -->
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="editDialogVisible = false">关闭</el-button>
                    <el-button type="primary" @click="saveEdit">保 存</el-button>
                </span>
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

<style>

</style>

<script>
import axios from 'axios';
const url ="http://123.207.73.185:8080/postUserMessage"

export default {
    data() {
        return {
            //存放用户列表的数组
            UserList:[
            {
            studentid:"2022463030703",
            username:"代金宇1",
            sex:"男",
            grade:"22",
            profession:"计算机类",
            class:"7班",
            phone:"13131227873",
            wxid:"666666666666hwuledfhwq",
            direction:"前端开发",
            wxopenid:"2654123",
            status:"待录取",
            personalid:"202303",
            ok:0,
            information1:"我很非常开心",
            information2:"我很快乐",
            information3:"我很高兴",
            award:"广东省大学生程序设计竞赛一等奖",
            remark:"我特别高兴",
            first:"你好",
            second:"我好",
            third:"大家好",
            fourth:"真好"
            }       
            ],
            //当前页数
            currentPage: 1,
            //每页最多显示多少条数据
            pageSize: 5,
            //编辑对话框的显示隐藏
            editDialogVisible: false,
           //编辑表单绑定的内容
            editForm:{
                username:'小明',
                studentid:'123',
                sex:'男',
                grade:'22',
                profession:'计算机类',
                class:'7班',
                phone:'12345678910',
                direction:'前端',
                status:'已通过',
                personalid:'369',
                information:'个人简介',
                wxid:'r1197',
                remark:'非常优秀',
                award:'蓝桥杯国赛一等奖'
            },
            //当前编辑表单的id
            editId:0,
            //编辑表单的检验规则
            editFormRules:{
                //姓名
                username:[
                    { required:true,message:'请输入姓名',trigger:'blur'},
                    { min:2}
                ],
                studentid:[
                    { required:true,message:'请输入学号',trigger:'blur'},
                    {min:13}
                ]
            },

        }
    },
    methods: {
        //  handleEdit() {
        // },
        //渲染用户列表
         async getUserList(){
           await axios({
            url:'http://123.207.73.185:8080/userDirection',
            params:{
                direction:'全部'
            }
            }).then( res =>{
                const userList = res.data.data
                this.UserList = userList
                console.log(userList);
            }).catch( () =>{
                this.$message.error("用户列表数据获取失败！")
            })
        },
        //控制排序情况
        handle(val) {
            if (!val.column) {
                this.sortOrder = val.order == 'ascending' ? 2 : 1
                this.sortField = val.prop == '11' ? 2 : 1
            }
        },
        //修改当前页数
        handleCurrentChange(val) {
            this.currentPage = val
        },
        //修改每页显示条数
        handleSizeChange(val) {
            this.pageSize = val
        },
        // 打开编辑表单
        showEditDialog(scope){
            //获取打开对象的wxopenid
            const id = scope.row.wxopenid
            // 在用户列表中找到具有对应id的用户的数据
            const editUserData = this.UserList.find( obj =>{ return obj.wxopenid === id })
            const str = JSON.stringify(editUserData)
            //数据回显到表单
            this.editForm = JSON.parse(str)
            //设置当前操作用户的wxopenid
            this.targetWxopenId = id
            this.editDialogVisible = true
        },
        //保存编辑
        async saveEdit(){
            
            const editStr = JSON.stringify(this.editForm)
            const editUserData = this.UserList.find( obj =>{ return obj.wxopenid === this.targetWxopenIdid })
            const UserlistStr = JSON.stringify(editUserData)
            //发生改动
            if(editStr !== UserlistStr)
            {
                //修改数据库数据
                await axios({
                    url,
                    method:'POST',
                    data:this.editForm
                    }).then( res =>{
                        console.log(res)
                        this.getUserList()
                        this.$message.success('修改成功！')
                        this.editDialogVisible = false
                    }).catch( () =>{
                        this.$message.error("修改失败！")
                    })
                //修改store仓库数据
                this.$store.commit('editUserList',this.UserList)
            }
            //没有改动
            else {
                this.$message.error('表单未进行任何修改！修改失败')
                this.editDialogVisible = false
            }
        },

    },
     created(){
        this.getUserList()
    }
}
</script>

<style>
.el-main {

    color: #333;
    text-align: center;
    height: 100% !important;
    display: flex;
    flex: 1;
    padding: 20px 20px 0px 20px;
    flex-direction: column !important;
    justify-content: space-between !important;
}
</style>