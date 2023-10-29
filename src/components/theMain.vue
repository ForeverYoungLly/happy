<template>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="username" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="studentid" label="学号" width="150">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="60">
        </el-table-column>
        <el-table-column prop="grade" label="年级" width="60">
        </el-table-column>
        <el-table-column prop="profession" label="专业" width="165">
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="120">
        </el-table-column>
        <el-table-column prop="wxid" label="微信号" width="120">
        </el-table-column>
        <el-table-column prop="direction" label="方向" width="80">
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
                <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
                <el-button @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit" type="text" size="small">查看/编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    methods: {
        handleClick(row) {
            console.log(row);
        },
        handleEdit(index, row) {
        this.windowVisible = true;
      }
    },

    data() {
        return {
            tableData: [{
                studentid: '2022414130218',
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
            }, {
                studentid: '2022463030704',
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
            },{
                studentid: '2022414130218',
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
            }, {
                studentid: '2022463030704',
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
            },{
                studentid: '2022414130218',
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
            }, {
                studentid: '2022463030704',
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
            },{
                studentid: '2022414130218',
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
            }, {
                studentid: '2022463030704',
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
            },{
                studentid: '2022414130218',
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
            }, {
                studentid: '2022463030704',
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
            }
            ]
        }
    }
}
</script>