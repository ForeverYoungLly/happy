<template>
    <el-main>
        <div class="container">
            <!-- 头部搜索框和发送按钮 -->
            <el-card class="header">
                <el-row :gutter="20">
                    <el-col :span="7">
                        <el-input placeholder="请输入待查询用户的姓名" v-model="keywords">
                            <el-button slot="append" icon="el-icon-search" @click="searchResource"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="resetForm">重置表单</el-button>
                    </el-col>
                    <el-col :span="4" :offset="6">
                        <el-button type="primary" @click="handleSelectionChange">批量发送</el-button>
                    </el-col>
                </el-row>
            </el-card>
            <!-- 用户列表 -->
            <el-table :data="UserList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                style="width: 100% ; margin: 5px; box-shadow: 1px 2px 4px #ccc;transition: all 0.3 ease-in!important;"
                stripe @sort-change="handle" ref="multipleTable">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="username" label="姓名">
                </el-table-column>
                <el-table-column prop="studentid" label="学号" sortable>
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                </el-table-column>
                <el-table-column prop="grade" label="年级" sortable>
                </el-table-column>
                <el-table-column prop="profession" label="专业">
                </el-table-column>
                <el-table-column prop="phone" label="电话">
                </el-table-column>
                <el-table-column prop="wxid" label="微信号">
                </el-table-column>
                <el-table-column prop="direction" label="方向" column-key="direction"
                    :filters="[{ text: '前端开发', value: '前端开发' }, { text: '后端开发', value: '后端开发' }, { text: 'UI设计', value: 'UI设计' }, { text: '产品经理', value: '产品经理' }, { text: '网络安全', value: '网络安全' }]"
                    :filter-method="filterTag" filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.direction === '家' ? 'primary' : 'success'" disable-transitions>{{
                            scope.row.direction }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" column-key="status" :filters="[{ text: '草稿', value: '草稿' }, { text: '待筛选', value: '待筛选' }, { text: '筛选不通过', value: '筛选不通过' },
                { text: '待安排初试', value: '待安排初试' }, { text: '初试不通过', value: '初试不通过' }, { text: '初试通过', value: '初试通过' }, { text: '初试不通过', value: '初试不通过' },
                { text: '待复试', value: '待复试' }, { text: '待安排复试', value: '待安排复试' }, { text: '复试通过', value: '复试通过' }
                    , { text: '待终试', value: '待终试' }, { text: '终试不通过', value: '终试不通过' }, { text: '终试通过', value: '终试通过' }
                    , { text: '待处理', value: '待处理' }, { text: '挂起', value: '挂起' }]" :filter-method="filterTag2"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status === '待处理' ? 'primary' : 'success'" disable-transitions>{{
                            scope.row.status }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="showEditDialog(scope)" icon="el-icon-edit" type="primary"
                            size="small">查看/编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <div class="block">
                <span class="demonstration"></span>
                <el-pagination align="center" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage" :page-sizes="[1, 5, 10, 20]" :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="UserList.length">
                </el-pagination>
            </div>
            <!-- 用户信息编辑的气泡框 -->
            <!-- :close-on-click-modal="false" 取消点击空白处关闭 -->
            <el-dialog :visible.sync="editDialogVisible" width="60%" :close-on-click-modal="false">
                <el-tabs type="border-card">
                    <el-tab-pane label="用户信息">
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
                                        <el-image :src="src" style="width: 10vw; height: 22vh; " :fit="fit"
                                            :preview-src-list="srcList">
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
                                        <el-input v-model="editForm.sex"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
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
                                        <el-input v-model="editForm.phone" show-word-limit></el-input>
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
                                <!-- 微信id -->
                                <el-col :span="11">
                                    <el-form-item label="微信号" prop="wxid">
                                        <el-input v-model="editForm.wxid"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <!-- 个人简介 -->
                            <el-form-item label="个人简介" prop="introduction">
                                <el-col>
                                    <el-input type="textarea" placeholder="请输入个人简介" :rows="5"
                                        v-model="editForm.introduction" resize='none' class="textarea"></el-input>
                                </el-col>
                            </el-form-item>
                            <!-- 加入ab的理由 -->
                            <el-form-item label="加入ab的理由" prop="reason">
                                <el-col>
                                    <el-input type="textarea" placeholder="请输入个人经历及项目经验" :rows="5" v-model="editForm.reason"
                                        resize='none' class="textarea"></el-input>
                                </el-col>
                            </el-form-item>
                            <!-- 个人经历 -->
                            <el-form-item label="个人经历及项目经验" prop="experience">
                                <el-col>
                                    <el-input type="textarea" placeholder="请输入理由" :rows="5" v-model="editForm.experience"
                                        resize='none' class="textarea"></el-input>
                                </el-col>
                            </el-form-item>
                            <!-- 获奖情况 -->
                            <el-form-item label="获奖情况" prop="award">
                                <el-col>
                                    <el-input type="textarea" placeholder="请输入获奖情况" :rows="3" v-model="editForm.award"
                                        resize="none" class="textarea"></el-input>
                                </el-col>
                            </el-form-item>
                            <!-- 备注 -->
                            <el-form-item label="备注" prop="remark">
                                <el-col>
                                    <el-input type="textarea" placeholder="请输入备注" :rows="3" v-model="editForm.remark"
                                        resize="none" class="textarea"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" @click="editDialogVisible = false">关闭</el-button>
                        <el-button type="primary" @click="saveEdit">保存</el-button>
                    </el-tab-pane>
                    <el-tab-pane label="用户管理记录">
                        <el-row :gutter="20" style="margin-bottom: 20px; font-size: 16px;">
                            用户信息和附件
                        </el-row>
                        <el-row>
                            <el-upload class="upload-demo" ref="upload" action="#" :file-list="fileList"
                                :auto-upload="false">
                                <!-- <div slot="tip" class="el-upload__tip">用户简历上的附件</div> -->
                            </el-upload>
                        </el-row>
                        <el-form ref="historyformref" :model="historyform" label-width="80px">
                            <el-form-item label="初试安排">
                                <el-input v-model="historyform.first" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item label="初试结论">
                                <el-input v-model="historyform.firstresult" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item label="复试安排">
                                <el-input v-model="historyform.second" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item label="复试结论">
                                <el-input v-model="historyform.secondresult" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item label="管理备注">
                                <el-input v-model="historyform.manageRemark" type="textarea"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </el-dialog>
        </div>
    </el-main>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            // 搜索的关键字
            keywords: '',
            // 复选框勾中列表大数组所有内容
            // mutipleList: [],
            // 照片自适应容器的方式
            fit: "fit",
            // 大图预览图片的url地址
            srcList: ['http://123.207.73.185:8090/userFile/picture/2022463030728/2022463030728照片.jpg'],
            // 用户照片url地址
            src: 'http://123.207.73.185:8090/userFile/picture/2022463030728/2022463030728照片.jpg',
            fileList: [
                {
                    name: 'food.jpeg',
                    url: 'http://123.207.73.185:8090/userFile/2022463030728/说明书.txt'
                },
                {
                    name: 'food.jpeg',
                    url: 'http://123.207.73.185:8090/userFile/2022463030728/说明书.txt'
                },
                {
                    name: 'food.jpeg',
                    url: 'http://123.207.73.185:8090/userFile/2022463030728/说明书.txt'
                },
                {
                    name: 'food2.jpeg',
                    url: 'http://123.207.73.185:8090/userFile/2022463030728/说明书.txt'
                }
            ],
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
                introduction: '个人简介',
                reasons: '',
                experience: '',
                wxid: 'r1197',
                remark: '非常优秀',
                award: '蓝桥杯国赛一等奖',
                reason: ''
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
            },
            // 用户消息历史记录
            historyform: {
                first: '',
                firstresult: '',
                second: '',
                secondresult: '',
                manageRemark: ''
            }
        }
    },
    methods: {
        // 重置搜索后的表单
        resetForm() {
            const headers = {
                'jwt-code': localStorage.getItem('token')
            }
            //有token
            if (headers) {
                axios({
                    url: 'http://123.207.73.185:8080/admin/userDirection',
                    params: {
                        direction: '全部'
                    },
                    headers
                }).then(res => {
                    const userList = res.data.data
                    this.UserList = userList
                    console.log(userList);
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
        searchResource() {
            this.currentPage = 1; //将当前页设置为1，确保每次都是从第一页开始搜
            let filterKeywords = this.keywords.trim();
            let filerReasource = this.UserList.filter(item => { //过滤全部数据
                if (item.username.includes(filterKeywords)) {
                    return item
                }
            })
            //将符合条件的内容赋给filterDataShow
            this.UserList = filerReasource;
        },
        //请求用户列表
        async getUserList() {
            const headers = {
                'jwt-code': localStorage.getItem('token')
            }
            //有token
            if (headers) {
                await axios({
                    url: 'http://123.207.73.185:8080/admin/userDirection',
                    params: {
                        direction: '全部'
                    },
                    headers
                }).then(res => {
                    const userList = res.data.data
                    this.UserList = userList
                    // console.log(userList);
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
            console.log(id);
            // 在用户列表中找到具有对应id的用户的数据
            const editUserData = this.UserList.find(obj => { return obj.wxopenid === id })
            console.log(editUserData.username);
            const str = JSON.stringify(editUserData)
            //数据回显到表单
            this.editForm = JSON.parse(str)
            //设置当前操作用户的wxopenid
            this.targetWxopenId = id
            this.editDialogVisible = true
        },
        //保存编辑
        async saveEdit() {

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
                    await axios({
                        url: 'http://123.207.73.185:8080/admin/updateUserMessage',
                        method: 'POST',
                        data: this.editForm,
                        headers,
                    }).then(res => {
                        console.log(res)
                        this.getUserList()
                        this.$message.success('修改成功！')
                        this.editDialogVisible = false
                    }).catch((e) => {
                        //返回401
                        if (!e.response.data.code) {
                            this.$message.error('请先登录！')
                            this.$router.push('/login')
                        }
                        this.$message.error("修改失败！")
                    })
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
        // 筛选重置
        clearFilter() {
            this.$refs.filterTable.clearFilter();
        },
        // 方向处返回重置方法
        filterTag(value, row) {
            return row.direction === value;
        },
        filterTag2(value, row) {
            return row.status === value;
        },
        // 复选表格获取对象
        handleSelectionChange() {
            var mutipleList = this.$refs.multipleTable.selection;
            var infopushList = [];
            for (let i = 0; i < mutipleList.length; i++) {
                var obj = new Object();
                obj.username = mutipleList[i].username;
                obj.wxopenid = mutipleList[i].wxopenid;
                infopushList[i] = obj;
            }
            this.$router.push({
                path: '/infopush',
			    query:{
				infopushList
			}
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
            this.getUserList()
        }
    }
}
</script>

<style scoped>
.header {
    height: 8vh;
}

.upload-demo {
    border: 1px dotted black;
    padding-bottom: 20px;
    margin-bottom: 20px;
}

.el-upload__tip {
    font-size: 16px;
    font-weight: 700;
}

.el-form-item {
    max-width: 50%;
}

.el-card {
    width: 100%;
    box-shadow: 1px 2px 4px #b4b1b1;
}
</style>