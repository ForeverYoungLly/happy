<template>
    <el-main>
        <div class="container">
            <!-- 头部搜索框和发送按钮 -->
            <div class="header">
                <!-- 查询框 -->
                <el-input placeholder="请输入待查询用户的姓名" v-model="keywords" class="search-input" clearable>
                    <el-button slot="append" icon="el-icon-search" @click="searchResource"></el-button>
                </el-input>
                <div>
                    <!-- 批量修改状态 -->
                    <el-button type="primary" @click="openDialog">批量修改状态</el-button>
                    <!-- 批量发送--消息推送 -->
                    <el-button type="primary" @click="handleSelectionChange">批量发送</el-button>
                </div>
            </div>
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
                <el-table-column prop="status" label="状态" column-key="status"
                    :filters="[{ text: '草稿', value: '草稿' }, { text: '待筛选', value: '待筛选' }, { text: '筛选不通过', value: '筛选不通过' },
                    { text: '待初试', value: '待初试' }, { text: '待安排初试', value: '待安排初试' }, { text: '初试不通过', value: '初试不通过' }, { text: '初试通过', value: '初试通过' },
                    { text: '待复试', value: '待复试' }, { text: '待安排复试', value: '待安排复试' }, { text: '复试通过', value: '复试通过' },
                    { text: '待终试', value: '待终试' }, { text: '终试不通过', value: '终试不通过' }, { text: '终试通过', value: '终试通过' }, { text: '待处理', value: '待处理' }, { text: '挂起', value: '挂起' }]"
                    :filter-method="filterTag2" filter-placement="bottom-end">
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
                <el-tabs type="border-card" v-loading="loading">
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
                                        <el-select v-model="editForm.direction" placeholder="请选择方向">
                                            <el-option v-for="item in directionoptions" :key="item.value"
                                                :label="item.label" :value="item.value">
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
                                            <el-option v-for="item in statusoptions" :key="item.value" :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
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
                                    <el-input type="textarea" placeholder="请输入个人经历及项目经验" :rows="5"
                                        v-model="editForm.reasons" resize='none' class="textarea"></el-input>
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
                        <el-row type="flex" justify="center">
                            <el-button type="primary" @click="editDialogVisible = false">关闭</el-button>
                            <el-button type="primary" @click="saveEdit">保存</el-button>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="用户管理记录">
                        <div class="fileBox">
                            <div class="text">附件下载</div>
                            <div class="fileList">
                                <div class="fileItem" v-for="(item, index) in fileList" :key="index"
                                    @click="download(index)">
                                    <i class="el-icon-document" style="float: left;">{{ item.name }}</i>
                                </div>
                            </div>
                        </div>
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

                        <el-row type="flex" justify="center">
                            <el-button type="primary" @click="editDialogVisible = false">关闭</el-button>
                            <el-button type="primary" @click="saveEdit">保存</el-button>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="用户信息推送记录">
                        <div class="historyInfo">
                            <div class="history_title" style="text-align: center;">历史信息</div>
                            <div class="info">
                                <div class="header">
                                    <div class="type">状态</div>
                                    <div class="message">内容</div>
                                    <div class="time">时间</div>
                                </div>
                                <div class="infoItem" v-for="(item,index) in historyInfo" :key="index" :style="{backgroundColor: colorList[0]}">
                                    <div class="type">{{ item.type }}</div>
                                    <div class="message">{{ item.message }}</div>
                                    <div class="time">{{ item.time }}</div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-dialog>
            <!-- 批量修改状态的气泡框 -->
            <el-dialog :visible.sync="statusDialogVisible" width="30%" :close-on-click-modal="false">
                <el-select v-model="statusChange" placeholder="请选择修改后的状态">
                    <el-option v-for="item in statusoptions" :key="item.value" 
                    :label="item.label" :value="item.value">
                    </el-option>
               </el-select>
               <el-button @click="statusDialogVisible = false">取 消</el-button>
               <el-button type="primary" @click="savestatusEdit">确定修改</el-button>
            </el-dialog>
        </div>
    </el-main>
</template>

<script>
import axios from 'axios';
export default {
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
                value: '复试不通过',
                label: '复试不通过'
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
            }, {
                value: '终试不通过',
                label: '终试不通过'
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
            // 搜索的关键字
            keywords: '',
            // 照片自适应容器的方式
            fit: "fit",
            // 大图预览图片的url地址
            srcList: ['http://123.207.73.185:8090/userFile/picture/2022463030728/2022463030728照片.jpg'],
            // 用户照片url地址
            src: 'http://123.207.73.185:8090/userFile/picture/2022463030728/2022463030728照片.jpg',
            // 附件列表
            fileList: [
            ],
            //存放用户列表的数组
            UserList: [],
            // 搜索时暂存列表的数组
            templist: [],
            // 修改状态后的列表数组
            statusList: [],
            //当前页数
            currentPage: 1,
            //每页最多显示多少条数据
            pageSize: 5,
            //编辑对话框的显示隐藏
            editDialogVisible: false,
            // 批量修改状态对话框显示与隐藏
            statusDialogVisible: false,
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
            // 修改后的状态
            statusChange: '',
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
                status: [
                    { required: true, message: '请输入状态', trigger: 'blur' },
                ],
                direction: [
                    { required: true, message: '请输入方向', trigger: 'blur' },
                ],
                sex: [
                    { required: true, message: '请输入性别', trigger: 'blur' },
                ],
                class: [
                    { required: true, message: '请输入班级', trigger: 'blur' },
                ],
                profession: [
                    { required: true, message: '请输入专业', trigger: 'blur' },
                ],
                wxid: [
                    { required: true, message: '请输入微信号', trigger: 'blur' },
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
            // 用户消息历史记录
            historyform: {
                first: '',
                firstresult: '',
                second: '',
                secondresult: '',
                manageRemark: ''
            },
            // 历史操作信息
            historyInfo: [
                {
                    message: '暂无数据'
                }
            ],
            // 加载
            loading: false,
            // 颜色数组
            colorList:[
                '#FFFFCC',
                '#99CCCC',
                '#CCFFFF',
                '#6699CC',
                '#FFCC99',
                '#CCFFCC',
                '#CCCCCC',
                '#CC99CC'
            ]
        }
    },
    methods: {
        // 搜索用户方法
        searchResource() {
            this.currentPage = 1; //将当前页设置为1，确保每次都是从第一页开始搜
            let filterKeywords = this.keywords.trim();
            let templist = this.UserList;
            let filerReasource = templist.filter(item => { //过滤全部数据
                if (item.username.includes(filterKeywords)) {
                    return item
                }
            })
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
                    this.UserList = userList;
                    this.templist = userList;
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
            // 开启加载
            this.loading = true
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
            // 获取用户信息记录
            this.getHistory(this.editForm.studentid)
            this.editDialogVisible = true
        },
        //保存编辑
        saveEdit() {
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
                    this.$refs.editFormRef.validate(valid => {
                        if (valid === false) {
                            this.$message.error('修改信息不合法');
                        }
                        else {
                            axios({
                                url: 'http://123.207.73.185:8080/admin/updateUserMessage',
                                method: 'POST',
                                data: this.editForm,
                                headers,
                            }).then(res => {
                                console.log(res);
                                this.getUserList()
                                if (res.data.code === 1) {
                                    this.$message.success('修改成功！')
                                    this.editDialogVisible = false;
                                }
                                else {
                                    this.$message.success('修改失败')
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
        // 复选表格获取对象并进行推送
        handleSelectionChange() {
            var mutipleList = this.$refs.multipleTable.selection;
            console.log(mutipleList);
            var infopushlist = [];
            var openidlist = [];
            var namelist = [];
            for (let i = 0; i < mutipleList.length; i++) {
                var obj = new Object();
                obj.username = mutipleList[i].username;
                obj.wxopenid = mutipleList[i].wxopenid;
                obj.status = mutipleList[i].status;
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
        // 下载附件
        download(index) {
            console.log(index);
            location.href = this.fileList[index].url
        },
        // 获取用户历史信息
        getHistory(id) {
            axios({
                url: "http://123.207.73.185:8080/admin/showUserHistory",
                params: {
                    studentid: id
                },
                headers: {
                    'jwt-code': localStorage.getItem('token')
                }
            }).then(res => {
                if (res.data.code) {
                    const data = res.data.data
                    let newUserHistoryInfo = data.map((item)=>{
                        // 时间
                        const timeBack = item.CreatedAt
                        const T = timeBack.indexOf('T')
                        const year = timeBack.slice(0, T)
                        const hour = timeBack.slice(T + 1, T + 6)
                        let time = year + '-' + hour
                        time = time.replace('-','/')
                        time = time.replace('-','/')
                        time = time.replace('-','/')
                        let type = ''
                        // 类型
                        if(item.Code === 0)
                        {
                            type = '用户接受信息'
                        }
                        else if(item.Code === 1)
                        {
                            type = '用户反馈异常信息'

                        }
                        else if(item.Code === 2)
                        {
                            type = '发送信息'

                        }
                        else
                        {
                            type = '用户不通过信息'
                        }
                        const obj = {
                            code:item.Code,
                            type,
                            message:item.Message,
                            time:time
                        }
                        return obj
                    })
                    // console.log(newUserHistoryInfo)
                    // newUserHistoryInfo =  newUserHistoryInfo.filter((item)=>{
                    //     return item.code === 1 || item.code === 2
                    // })
                    // 数据为空
                    if (newUserHistoryInfo.length === 0) {
                        this.historyInfo =
                            [
                                {
                                    message: '暂无数据'
                                }
                            ]
                        this.loading = false

                    }
                    // 不为空
                    else {
                        this.historyInfo = newUserHistoryInfo
                        this.loading = false
                    }
                }
                // 请求失败
                else {
                    this.historyInfo =
                        [
                            {
                                message: '暂无数据'
                            }
                        ]
                    this.loading = false
                }
            })
        },
        // 批量修改状态
        // async changeStatus() {
        //     const headers = {
        //         'jwt-code': localStorage.getItem('token')
        //     }
        //     var mutipleList = this.$refs.multipleTable.selection;
        //     var statuslist = [];
        //     for (let i = 0; i < mutipleList.length; i++) {
        //         const obj = new Object();
        //         obj.status = mutipleList[i].status;
        //         obj.wxopenid = mutipleList[i].wxopenid;
        //         obj.studentid = mutipleList[i].studentid;
        //         statuslist[i] = obj;
        //     }
        //     if (headers) {
        //         await axios({
        //             url: 'http://123.207.73.185:8080/postUserMessage',
        //             params: {
        //                 list: statuslist,
        //                 headers
        //             },
        //         }).then(res => {
        //             console(res)
        //         }).catch((e) => {
        //             // this.$message.error('请先登录！')
        //             // this.$router.push('/login')
        //             console.log(e);
        //         })
        //     }
        // }
        // 批量保存状态
        savestatusEdit() {
            const a = this.changeList.length;
            const headers = {
                'jwt-code': localStorage.getItem('token')
            }
            let statuslist = [];
            for (let i = 0; i < a; i++) {
                statuslist[i] = this.changeList[i];
                statuslist[i].status = this.statusChange;
                this.statusList[i] = statuslist[i];
                console.log(this.statusList[i]);
                if (headers) {
                axios({
                    url: 'http://123.207.73.185:8080/admin/updateUserMessage',
                    method: 'POST',
                    data: this.statusList[i],
                    headers
                }).then(response => {
                    this.getUserList();
                        if (response.data.code === 1) {
                            this.$message.success('修改成功！')
                            this.statusDialogVisible = false;
                        }
                        else {
                            this.$message.success('修改失败')
                            this.statusDialogVisible = false;
                        }
                }).catch((error) => {
                    console.log(error);
                })
            }
        }
},
        // 打开状态气泡框
        openDialog() {
            let mutiplelist = this.$refs.multipleTable.selection;
            this.changeList = mutiplelist;
            this.statusDialogVisible = true;
        }
    },
    watch: {
        // 搜索框内容
        keywords() {
            this.searchResource();
            if (this.keywords == '') {
                this.UserList = this.templist;
            }
        }
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
    }
}
</script>

<style scoped>
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

.header {
    display: flex;
    justify-content: space-between;
    padding-left: 5px;
}

.search-input {
    min-width: 20vw;
    width: 30vw;
}

.fileBox {
    display: flex;
    align-items: center;
    min-height: 10vh;
}

.text {
    width: 80px;
    text-align: center;
}

.fileList {
    border: 1px solid #DCDFE6;
    min-height: 10vh;
    min-width: 50%;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 10px;
}

.fileList:hover {
    border-color: gray;
}

.fileItem {
    padding: 10px;
    min-height: 30px;
    border-bottom: 0.5px solid #efefef;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.fileItem:hover {
    color: lightskyblue;
}

.historyInfo {
    display: flex;
    flex-direction: column;
}

.history_title {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #efefef;
    padding: 10px 0;
}

.info {
    display: flex;
    flex-direction: column;
}

.infoItem {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #efefef;
    align-items: center;
    padding: 25px 0px;
    color: black;

}

.infoItem:hover {
    color: red;
}

.type {
    flex: 2;
    text-align: center;
}

.message {
    flex: 8;
    max-width: 40vw;
    text-align: center;
}

.time {
    flex: 3;
    text-align: center;

}

.header {
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0;
}
</style>
