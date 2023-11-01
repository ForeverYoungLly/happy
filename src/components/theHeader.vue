<template>
    <div class="container">
        <div class="TabHeader">
            <div class="routeName">AchoBeta 招新系统管理端</div>
            <div class="adminName_exit"><i class="el-icon-user-solid"></i>超级管理员 | 退出</div>
        </div>
        <!-- 面包屑导航栏 -->
        <el-breadcrumb separator="/" id="el-breadcrumb" >
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:'/UserList'}">用户列表</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:'/InfoPush'}">消息推送</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path:''}">用户端配置</el-breadcrumb-item>
        </el-breadcrumb>  
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'first'
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>
<style scoped>
.container{
    display: flex;
    flex-direction: column;
    /* background-color: pink; */
}
/* 头部导航栏，管理员名称，退出登录 */
.TabHeader{
    display: flex;
    justify-content: space-between;
    height: 60px;
    color: #fff;
    background-color: #545c64;
    line-height: 60px;
    font-size: 24px;
    font-weight: bold;
    margin-left: 2px;
}
/* 路由名称 */
.TabHeader  .routeName{
    padding-left: 20px;
}
/* 管理员名称 */
.TabHeader  .adminName_exit{
    padding-right: 20px;
}
/* 面包屑导航 */
#el-breadcrumb {
    margin-bottom: 20px;
    height: 40px;
    line-height: 40px;
    padding-left:20px;
    font-size: 16px;
}


</style>