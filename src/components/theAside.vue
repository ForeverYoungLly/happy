<template>
    <el-row class="tac">
        <el-col :span="12">
            <p style="font-size: 33px; line-height: 50px; color: rgb(242, 240, 240); font-weight: bold;">AchoBeta</p>
            <p style="font-size: 33px; line-height: 0px; color: rgb(242, 240, 240); font-weight: bold;">招 新 系 统</p>
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                background-color="#545c64" text-color="#fefefe" active-text-color="#409EFF">
                <el-menu-item index="2">
                    <i class="el-icon-user"></i>
                    <span slot="title">用户列表</span>
                </el-menu-item>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-message"></i>
                        <span>消息推送</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">技术方向</template>
                        <el-menu-item index="1-1">前端开发</el-menu-item>
                        <el-menu-item index="1-2">后端开发</el-menu-item>
                        <el-menu-item index="1-3">UI设计</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template slot="title">管理方向</template>
                        <el-menu-item index="1-4">项目管理</el-menu-item>
                        <el-menu-item index="1-5">产品设计</el-menu-item>
                        <el-menu-item index="1-6">财务及其它</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">用户端配置</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>

<style>
.el-menu {
    border-right-style: none !important;
}
.el-col-12 {
    width: 100% !important;
}
</style>
  
<script>
export default {
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
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
            menuData: [
                //植绒哥的活
                // 无子菜单
                // {
                //     path : '/',
                //     label:'',
                //     icon: ,
                //     url:
                // },
                //有子菜单
                // {
                //     path : '/',
                //     label:'',
                //     icon: '',
                //     url:'',
                //     label: '消息推送',
                //     icon:'',
                //     children: [
                //     {
                //         path:'',
                //         name:'',
                //         label:'',
                //         icon:'',
                //         url:''
                //     }
                //     ]
                // }
            ]
        };
    }
}
</script>
