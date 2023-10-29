<template>
    <el-tabs v-model="activeName" @tab-click="handleClick" style="font-size: 25px; font-weight: bold;">
        <el-tab-pane label="用户列表" name="first">用户列表</el-tab-pane>
        <el-tab-pane label="消息推送" name="second">消息推送</el-tab-pane>
        <el-tab-pane label="用户端配置" name="third">用户端配置</el-tab-pane>
    </el-tabs>
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