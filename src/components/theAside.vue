<template>
    <el-row class="tac">
        <el-col :span="12">
            <!-- ab招牌 -->
            <div id="ab_title" >
                <p style="font-size: 1.8rem;  color: rgb(242, 240, 240); font-weight: bold; ">AchoBeta</p>
                <p style="font-size: 1.8rem;  color: rgb(242, 240, 240); font-weight: bold; ">招 新 系 统</p>
            </div>
            <!-- 导航列表 -->
            <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                background-color="#545c64" text-color="#fefefe" active-text-color="#409EFF" router >
                <!-- 首页 -->
                <el-menu-item index="/index">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <!-- 用户列表 -->
                <el-menu-item index="/">
                    <template slot="title">
                    <i class="el-icon-user"></i>
                    <span slot="title">列表</span>
                    </template>
                </el-menu-item>
                <el-submenu index="/UserList">
                    <template slot="title">
                        <i class="el-icon-user-solid"></i>
                        <span>用户列表</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">技术方向</template>
                        <el-menu-item style="padding-right: 0 !important;">前端开发</el-menu-item>
                        <el-menu-item >后端开发</el-menu-item>
                        <el-menu-item >UI设计</el-menu-item>
                        <el-menu-item >产品经理</el-menu-item>
                        <el-menu-item >网络安全</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <!-- 消息推送 -->
                <el-submenu index="/UserList">
                    <template slot="title">
                        <i class="el-icon-user-solid"></i>
                        <span>分组列表</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">技术方向</template>
                        <el-menu-item style="padding-right: 0 !important;">前端开发</el-menu-item>
                        <el-menu-item >后端开发</el-menu-item>
                        <el-menu-item >UI设计</el-menu-item>
                        <el-menu-item >产品经理</el-menu-item>
                        <el-menu-item >网络安全</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <!-- 用户端管理 -->
                <el-menu-item index="/infopush">
                    <i class="el-icon-message"></i>
                    <span slot="title">消息推送</span>
                </el-menu-item>
                <el-menu-item index="/infopush">
                    <i class="el-icon-setting"></i>
                    <span slot="title">用户端配置</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
export default {
    methods: {
        // 开启下拉栏
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        // 关闭下拉栏
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    },
    computed: {
        //没有子菜单
        noChildren() {
            return this.menuData.filter(item => !item.children)
        },
        //有子菜单
        haschildren() {
            return this.menuData.filter(item => item.children)
        }
    },
    data() {
        return {
          

        };
    }
}
</script>
<style>
li {
    text-align: left !important;
    padding-left: 10px;
}
#ab_title {
    padding: 10px;
}
.el-menu {
    border-right-style: none;
}
.el-col-12 {
    width: 100% !important;
}
.el-submenu .el-menu-item {
    height: 50px;
    line-height: 50px;
    min-width: 140px;
}
</style>
  
