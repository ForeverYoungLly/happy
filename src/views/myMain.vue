<template>
    <div>
        <el-container>
            <el-aside>
                <the-aside />
            </el-aside>
            <el-container>
                <el-header>
                    <the-header />
                </el-header>
                <el-main>
                    <the-main />
                    <!-- 路由出口 -->
                    <!-- 路由匹配到的组件将渲染在这里 -->
                    <!-- <router-view></router-view> -->
                </el-main>
                <el-footer>
                    <the-footer />
                </el-footer>
            </el-container>
            <el-aside id="rightaside">
                <the-rightaside />
            </el-aside>
        </el-container>
    </div>
</template>

<script>
import theAside from '../components/theAside.vue';
import theMain from '../components/theMain.vue';
import theHeader from '../components/theHeader.vue';
import theFooter from '../components/theFooter.vue';
import theRightaside from '../components/theRightaside.vue'
export default {
    data() {
        return {}
    },
    components: {
        theAside,
        theMain,
        theHeader,
        theFooter,
        theRightaside
    }
}


</script>

<style>
.el-header,
.el-footer {
    height: 80px !important;
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    width: 1110px !important;
}

.el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    height: 820px;
    width: 210px !important;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    width: 1110px !important;
}

body>.el-container {
    width: 1530px;
    margin-bottom: 40px;
    height: 820px;
    position: relative;
}

/* .el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 40px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
} */
#rightaside{
    right: 0% !important;
    position: absolute !important;
    line-height: 120px !important;
}
</style>