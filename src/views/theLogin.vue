<template>
    <div class="container">
        <div class="shine shine2"></div>
        <div class="star"></div>
        <div class="star pink"></div>
        <div class="star blue"></div>
        <h1 class="title">AchoBeta招新系统<br>管理员登录页面</h1>
        <div class="login_box" @keydown.enter="login">
            <!-- 头像区 -->
            <div class="avater_box">
                <img src="@/assets/images/logo.png">
            </div>

            <!-- 填写信息区 -->
            <el-form ref="loginform" :model="loginform" :rules="loginformrules" label-width="0px" class="loginform"
                id="loginform">
                <!-- 填写用户名 -->
                <el-form-item prop="managername">
                    <el-input prefix-icon="el-icon-s-custom" v-model="loginform.managername" id="mangername"></el-input>
                </el-form-item>
                <!-- 填写密码框 -->
                <el-form-item prop="password">
                    <el-input show-password prefix-icon="el-icon-lock" v-model="loginform.password"
                        id="password"></el-input>
                </el-form-item>
                <el-form-item class="btn">
                    <el-button type="info" @click="resetloginform">重置</el-button>
                    <el-button type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="information">
            <p class="word">满地都是六便士，他却抬头看见了月亮。<br><br>——献给每一位<br>不忘初心的技术人</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            loginform: {
                managername: '',
                password: ''
            },
            loginformrules: {
                managername: [
                    {
                        required: true, message: '请输入用户名', trigger: 'blur'
                    }],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 25, message: '长度在 6 到 25 个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 重置登录信息
        resetloginform() {
            this.$refs.loginform.resetFields();
        },
        async login() {
            //校验表单
            this.$refs.loginform.validate(ispass => {
                if (!ispass) return;
                else {
                    axios({
                        url: 'http://123.207.73.185:8080/loginManager',
                        method: 'POST',
                        data: {
                            managername: this.loginform.managername,
                            password: this.loginform.password
                        },
                    }).then((ret) => {
                        //账号密码验证通过
                        if (ret.data.code == 1) {
                            const loading = this.$loading({
                                lock: true,
                                text: 'Loading',
                                spinner: 'el-icon-loading',
                                background: 'rgba(0, 0, 0, 0.7)'
                            });
                            setTimeout(() => {
                                loading.close();
                            }, 1500);
                            this.$message.success('登录成功')
                            const token = ret.data.data.jwtCode
                            localStorage.setItem('token', token)
                            setTimeout(() => {
                                this.$router.push('/index')
                            }, 1500);
                        }
                        //账号密码验证失败
                        else {
                            this.$message.error('账号或密码错误');
                        }
                    }).catch((err) => {
                        console.log(err.data);
                    })
                }
            })
        }
    },
}
</script>

<style lang="less" scoped>
.container {
    background: url(https://th.bing.com/th/id/R.3f9dd334c3bc42f881082048c721f648?rik=poA6MpEjV%2b6BSw&riu=http%3a%2f%2fpic.renwugushi.com%2fimage%2f20200227%2f20200227212349_79796.jpg&ehk=nvezOQnDkFeq%2fx0vg2cFTBkyJX%2ftbGzYLBjP5WgPiUY%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1);
    height: 100%;
    width: 100%;
}

.login_box {
    width: 30vw;
    height: 45vh;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 25px;
    left: 50%;
    top: 60%;
    position: absolute;
    transform: translate(-20%, -80%);

    .avater_box {
        width: 23%;
        height: 20%;
        border: 1px solid #eee;
        border-radius: 50%;
        box-shadow: 0 0 10px #ddd;
        left: 50%;
        position: absolute;
        transform: translate(-50%);

        img {
            top: 10%;
            width: 100%;
            height: 100%;
        }

    }
}

.information{
    width: 250px;
    height: 180px;
    // background-color: rgba(255, 255, 255, 0.5);
    // border-radius: 5px;
    left: 40%;
    top: 40%;
    transform: translate(40%, 80%);
    .word{
        font-family: "楷体";
        text-align: right;
        font-size: 25px;
        color: rgb(248, 241, 210);
        text-shadow: 0 0 20px rgb(245, 222, 105), 0 0 20px rgb(244, 226, 123), 0 0 30px rgb(245, 225, 125), 0 0 20px rgb(236, 222, 148);
    }
}
.btn {
    display: flex;
    justify-content: flex-end;
}

.loginform {
    bottom: 10%;
    position: absolute;
    padding: 0 30px;
    width: 100%;
    box-sizing: border-box;
}

.star {
    display: block;
    width: 8px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
    top: 100px;
    left: 500px;
    position: relative;
    transform-origin: 100% 0;
    animation: star-ani 4s linear infinite;
    -webkit-animation: star-ani 3s linear infinite;
    box-shadow: 0 0 5px 5px rgba(255, 255, 255, 0.3);
    opacity: 0;
    z-index: 2;
}

.star:after {
    content: "";
    display: block;
    top: 0px;
    left: 4px;
    border: 0px solid #fff;
    border-width: 0px 90px 2px 90px;
    border-color: transparent transparent transparent rgba(255, 255, 255, 0.3);
    transform: rotate(-45deg) translate3d(1px, 3px, 0);
    box-shadow: 0 0 1px 0 rgba(255, 255, 255, 0.1);
    transform-origin: 0% 100%;
}

.pink {
    top: 100px;
    left: 800px;
    background: #fff;
    animation-delay: 3s;
    -webkit-animation-delay: 3s;
    -moz-animation-delay: 3s;
}

.pink:after {
    border-color: transparent transparent transparent #fefefe;
    animation-delay: 3s;
    -webkit-animation-delay: 3s;
    -moz-animation-delay: 3s;
}

.blue {
    top: 120px;
    left: 1200px;
    background: fff;
    animation-delay: 7s;
    -webkit-animation-delay: 7s;
    -moz-animation-delay: 7s;
}

.blue:after {
    border-color: transparent transparent transparent fff;
    -webkit-animation-delay: 7s;
    -moz-animation-delay: 7s;
    animation-delay: 7s;
}

@keyframes star-ani {
    0% {
        opacity: 0;
        transform: scale(0) translate3d(0, 0, 0);
    }

    20% {
        opacity: 0.8;
        transform: scale(0.2) translate3d(-100px, 100px, 0);
    }

    40% {
        opacity: 0.8;
        transform: scale(0.4) translate3d(-200px, 200px, 0);
    }

    60% {
        opacity: 0.8;
        transform: scale(0.6) translate3d(-300px, 300px, 0);
    }

    80% {
        opacity: 1;
        transform: scale(1) translate3d(-350px, 350px, 0);
    }

    100% {
        opacity: 1;
        transform: scale(1.2) translate3d(-400px, 380px, 0);
    }
}

.shine {
    background-image: url("https://sucai.suoluomei.cn/sucai_zs/images/20201211172037-211357_VOTl_3549294.png");
    background-repeat: no-repeat;
    background-position: center;
    width: 155px;
    height: 155px;
    position: absolute;
    animation: opacity-change 1s ease-in-out infinite;
    -webkit-animation: opacity-change 1s ease-in-out infinite;
    -moz-animation: opacity-change 1s ease-in-out infinite;
    -o-animation: opacity-change 1s ease-in-out infinite;
}

.shine2 {
    animation: opacity-change 1.75s ease-in-out infinite;
    -webkit-animation: opacity-change 1.75s ease-in-out infinite;
    -moz-animation: opacity-change 1.75s ease-in-out infinite;
    -o-animation: opacity-change 1.75s ease-in-out infinite;
}

@keyframes opacity-change {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@-webkit-keyframes opacity-change {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@-moz-keyframes opacity-change {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@-o-keyframes opacity-change {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
// 标题样式
.title {
    text-align: center;
    color: rgb(248, 241, 210);
    text-shadow: 0 0 30px rgb(245, 222, 105), 0 0 20px rgb(244, 226, 123), 0 0 30px rgb(245, 225, 125), 0 0 20px rgb(236, 222, 148);
}

// 重置按钮
.el-button--info {
    background-image: linear-gradient(to right, rgb(12, 22, 135)10%, rgb(62, 36, 86)70%);
    border-color: rgb(249, 249, 247);
    color: #fefefe;
}
.el-button--info:focus,
.el-button--info:hover {
    color: rgb(217,217,255);
}

// 登录按钮
.el-button--primary{
    border-color: antiquewhite;
    background-image: linear-gradient(to right, rgb(0,97,194) 20%,rgb(0,43,87) 60%,rgb(66, 2, 93) 100%) ;
}
.el-button--primary:focus,
.el-button--primary:hover{
    color: #ccffff;
}
</style>