<template>
    <el-main>
        <div class="container">
            <!-- 用户列表 -->
            <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
                style="width: 98% ; margin: auto; box-shadow: 1px 2px 4px #ccc;" stripe @sort-change="handle">
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
                        <el-button @click="editDialogVisible = true" icon="el-icon-edit" type="primary"
                            size="small">查看/编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 用户信息编辑的气泡框 -->
            <el-dialog title="用户信息" :visible.sync="editDialogVisible" width="60%">
                <!-- 内容主体区 -->
                <el-form :model="editForm" :rules="editFormRules" ref="editFormRef">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="姓名" prop="username">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="学号" prop="studentid">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="性别" prop="sex">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="年级" prop="grade">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="专业" prop="profession">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="班级" prop="class">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="电话" prop="phone">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="方向" prop="direction">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="状态" prop="status">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="编号" prop="personalid">
                                <el-input></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="微信id" prop="wxid">
                        <el-col :span="8">
                            <el-input></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="获奖情况" prop="award">
                        <el-input type="textarea" placeholder="请输入获奖情况" :rows="3"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" placeholder="请输入备注" :rows="2"></el-input>
                    </el-form-item>
                    <el-form-item label="个人简介" prop="information">
                        <el-input type="textarea" placeholder="请输入个人简介" :rows="5"></el-input>
                    </el-form-item>
                </el-form>
                <!-- 内容底部区 -->
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="editDialogVisible = false">重 置</el-button>
                    <el-button type="primary" @click="editDialogVisible = false">保 存</el-button>
                </span>
            </el-dialog>
            <!-- 分页器 -->
            <div class="block">
                <span class="demonstration"></span>
                <el-pagination align="center" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage" :page-sizes="[1, 5, 10, 20]" :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
                </el-pagination>
            </div>
        </div>
    </el-main>
</template>

<style>
.el-form {
    overflow: auto !important;
}
</style>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                    studentid: '1',
                    username: '梁乐怡',
                    sex: '女',
                    grade: '22',
                    profession: '网络工程',
                    class: "2班",
                    phone: '18038289121',
                    wxid: 'llyll10130',
                    direction: '前端开发',
                    wxopenid: 'aaabbbbcccc',
                    status: '待录取',
                    personalid: '202303',
                    award: '广东省大学生程序设计竞赛一等奖',
                    remark: '我是只会打漂亮肺物，垃圾布局，不会框架，不会交互，知识储备垫底的肺物',
                    ok: '1',
                    information1: '111',
                    information2: '222',
                    information3: '333',
                    first: "string",
                    second: "string",
                    third: "string",
                    fourth: "string"
                },
                {
                    studentid: '2',
                    username: '代金宇',
                    sex: '男',
                    grade: '22',
                    profession: '计算机科学与技术',
                    class: '7班',
                    phone: '13131227873',
                    wxid: '131316f7g8ho',
                    direction: '后端开发',
                    wxopenid: 'dytfgioobewuifgu',
                    status: '待录取',
                    personalid: '202304',
                    award: '广东省大学生程序设计竞赛一等奖',
                    remark: 'dgut后端蛙者，acm国金获得者，精通c，c++，python，go，java，python，以及linux，uniux，windows，mac系统各种操作和编程，只有你想不到，没有我办不到。',
                    ok: '1',
                    information1: '111',
                    information2: '222',
                    information3: '333',
                    first: "string",
                    second: "string",
                    third: "string",
                    fourth: "string"
                },
                {
                    studentid: '3',
                    username: '张涵',
                    sex: '女',
                    grade: '22',
                    profession: '网络工程',
                    class: "2班",
                    phone: '18038289121',
                    wxid: 'llyll10130',
                    direction: '前端开发',
                    wxopenid: 'aaabbbbcccc',
                    status: '待录取',
                    personalid: '202303',
                    award: '广东省大学生程序设计竞赛一等奖',
                    remark: '我是只会打漂亮肺物，垃圾布局，不会框架，不会交互，知识储备垫底的肺物',
                    ok: '1',
                    information1: '111',
                    information2: '222',
                    information3: '333',
                    first: "string",
                    second: "string",
                    third: "string",
                    fourth: "string"
                },
                {
                    studentid: '4',
                    username: '阮植绒',
                    sex: '男',
                    grade: '22',
                    profession: '计算机科学与技术',
                    class: '7班',
                    phone: '13131227873',
                    wxid: '131316f7g8ho',
                    direction: '后端开发',
                    wxopenid: 'dytfgioobewuifgu',
                    status: '待录取',
                    personalid: '202304',
                    award: '广东省大学生程序设计竞赛一等奖',
                    remark: 'dgut后端蛙者，acm国金获得者，精通c，c++，python，go，java，python，以及linux，uniux，windows，mac系统各种操作和编程，只有你想不到，没有我办不到。',
                    ok: '1',
                    information1: '111',
                    information2: '222',
                    information3: '333',
                    first: "string",
                    second: "string",
                    third: "string",
                    fourth: "string"
                },
                {
                    studentid: '5',
                    username: '梁乐怡',
                    sex: '女',
                    grade: '22',
                    profession: '网络工程',
                    class: "2班",
                    phone: '18038289121',
                    wxid: 'llyll10130',
                    direction: '前端开发',
                    wxopenid: 'aaabbbbcccc',
                    status: '待录取',
                    personalid: '202303',
                    award: '广东省大学生程序设计竞赛一等奖',
                    remark: '我是只会打漂亮肺物，垃圾布局，不会框架，不会交互，知识储备垫底的肺物',
                    ok: '1',
                    information1: '111',
                    information2: '222',
                    information3: '333',
                    first: "string",
                    second: "string",
                    third: "string",
                    fourth: "string"
                },
                {
                    studentid: '6',
                    username: '代金宇',
                    sex: '女',
                    grade: '22',
                    profession: '网络工程',
                    class: "2班",
                    phone: '18038289121',
                    wxid: 'llyll10130',
                    direction: '前端开发',
                    wxopenid: 'aaabbbbcccc',
                    status: '待录取',
                    personalid: '202303',
                    award: '广东省大学生程序设计竞赛一等奖',
                    remark: '我是只会打漂亮肺物，垃圾布局，不会框架，不会交互，知识储备垫底的肺物',
                    ok: '1',
                    information1: '111',
                    information2: '222',
                    information3: '333',
                    first: "string",
                    second: "string",
                    third: "string",
                    fourth: "string"
                },
                {
                    studentid: '7',
                    username: '张涵',
                    sex: '女',
                    grade: '22',
                    profession: '网络工程',
                    class: "2班",
                    phone: '18038289121',
                    wxid: 'llyll10130',
                    direction: '前端开发',
                    wxopenid: 'aaabbbbcccc',
                    status: '待录取',
                    personalid: '202303',
                    award: '广东省大学生程序设计竞赛一等奖',
                    remark: '我是只会打漂亮肺物，垃圾布局，不会框架，不会交互，知识储备垫底的肺物',
                    ok: '1',
                    information1: '111',
                    information2: '222',
                    information3: '333',
                    first: "string",
                    second: "string",
                    third: "string",
                    fourth: "string"
                },
                {
                    studentid: '8',
                    username: '阮植绒',
                    sex: '女',
                    grade: '22',
                    profession: '网络工程',
                    class: "2班",
                    phone: '18038289121',
                    wxid: 'llyll10130',
                    direction: '前端开发',
                    wxopenid: 'aaabbbbcccc',
                    status: '待录取',
                    personalid: '202303',
                    award: '广东省大学生程序设计竞赛一等奖',
                    remark: '我是只会打漂亮肺物，垃圾布局，不会框架，不会交互，知识储备垫底的肺物',
                    ok: '1',
                    information1: '111',
                    information2: '222',
                    information3: '333',
                    first: "string",
                    second: "string",
                    third: "string",
                    fourth: "string"
                },
                {
                    studentid: '9',
                    username: '梁乐怡',
                    sex: '女',
                    grade: '22',
                    profession: '网络工程',
                    class: "2班",
                    phone: '18038289121',
                    wxid: 'llyll10130',
                    direction: '前端开发',
                    wxopenid: 'aaabbbbcccc',
                    status: '待录取',
                    personalid: '202303',
                    award: '广东省大学生程序设计竞赛一等奖',
                    remark: '我是只会打漂亮肺物，垃圾布局，不会框架，不会交互，知识储备垫底的肺物',
                    ok: '1',
                    information1: '111',
                    information2: '222',
                    information3: '333',
                    first: "string",
                    second: "string",
                    third: "string",
                    fourth: "string"
                },
                {
                    studentid: '10',
                    username: '代金宇',
                    sex: '女',
                    grade: '22',
                    profession: '网络工程',
                    class: "2班",
                    phone: '18038289121',
                    wxid: 'llyll10130',
                    direction: '前端开发',
                    wxopenid: 'aaabbbbcccc',
                    status: '待录取',
                    personalid: '202303',
                    award: '广东省大学生程序设计竞赛一等奖',
                    remark: '我是只会打漂亮肺物，垃圾布局，不会框架，不会交互，知识储备垫底的肺物',
                    ok: '1',
                    information1: '111',
                    information2: '222',
                    information3: '333',
                    first: "string",
                    second: "string",
                    third: "string",
                    fourth: "string"
                },
                {
                    studentid: '10',
                    username: '张涵',
                    sex: '女',
                    grade: '22',
                    profession: '网络工程',
                    class: "2班",
                    phone: '18038289121',
                    wxid: 'llyll10130',
                    direction: '前端开发',
                    wxopenid: 'aaabbbbcccc',
                    status: '待录取',
                    personalid: '202303',
                    award: '广东省大学生程序设计竞赛一等奖',
                    remark: '我是只会打漂亮肺物，垃圾布局，不会框架，不会交互，知识储备垫底的肺物',
                    ok: '1',
                    information1: '111',
                    information2: '222',
                    information3: '333',
                    first: "string",
                    second: "string",
                    third: "string",
                    fourth: "string"
                },
                {
                    studentid: '10',
                    username: '张涵',
                    sex: '女',
                    grade: '22',
                    profession: '网络工程',
                    class: "2班",
                    phone: '18038289121',
                    wxid: 'llyll10130',
                    direction: '前端开发',
                    wxopenid: 'aaabbbbcccc',
                    status: '待录取',
                    personalid: '202303',
                    award: '广东省大学生程序设计竞赛一等奖',
                    remark: '我是只会打漂亮肺物，垃圾布局，不会框架，不会交互，知识储备垫底的肺物',
                    ok: '1',
                    information1: '111',
                    information2: '222',
                    information3: '333',
                    first: "string",
                    second: "string",
                    third: "string",
                    fourth: "string"
                },
                {
                    studentid: '10',
                    username: '张涵',
                    sex: '女',
                    grade: '22',
                    profession: '网络工程',
                    class: "2班",
                    phone: '18038289121',
                    wxid: 'llyll10130',
                    direction: '前端开发',
                    wxopenid: 'aaabbbbcccc',
                    status: '待录取',
                    personalid: '202303',
                    award: '广东省大学生程序设计竞赛一等奖',
                    remark: '我是只会打漂亮肺物，垃圾布局，不会框架，不会交互，知识储备垫底的肺物',
                    ok: '1',
                    information1: '111',
                    information2: '222',
                    information3: '333',
                    first: "string",
                    second: "string",
                    third: "string",
                    fourth: "string"
                },
                {
                    studentid: '10',
                    username: '张涵',
                    sex: '女',
                    grade: '22',
                    profession: '网络工程',
                    class: "2班",
                    phone: '18038289121',
                    wxid: 'llyll10130',
                    direction: '前端开发',
                    wxopenid: 'aaabbbbcccc',
                    status: '待录取',
                    personalid: '202303',
                    award: '广东省大学生程序设计竞赛一等奖',
                    remark: '我是只会打漂亮肺物，垃圾布局，不会框架，不会交互，知识储备垫底的肺物',
                    ok: '1',
                    information1: '111',
                    information2: '222',
                    information3: '333',
                    first: "string",
                    second: "string",
                    third: "string",
                    fourth: "string"
                },
                {
                    studentid: '10',
                    username: '张涵',
                    sex: '女',
                    grade: '22',
                    profession: '网络工程',
                    class: "2班",
                    phone: '18038289121',
                    wxid: 'llyll10130',
                    direction: '前端开发',
                    wxopenid: 'aaabbbbcccc',
                    status: '待录取',
                    personalid: '202303',
                    award: '广东省大学生程序设计竞赛一等奖',
                    remark: '我是只会打漂亮肺物，垃圾布局，不会框架，不会交互，知识储备垫底的肺物',
                    ok: '1',
                    information1: '111',
                    information2: '222',
                    information3: '333',
                    first: "string",
                    second: "string",
                    third: "string",
                    fourth: "string"
                },
            ],
            currentPage: 1,
            pageSize: 5,
            editDialogVisible: false,
            //编辑用户的表单数据
        }
    },
    methods: {
        //  handleEdit() {
        // },
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

        }
    },
}
</script>

<style>
.el-main {
    background-color: #E9EEF3;
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