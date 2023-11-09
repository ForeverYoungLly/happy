<template>
    <div class="container">
        <h1 style="text-align: center; color: aliceblue;">AchoBeta招新系统管理员登录页面</h1>
        <div class="login_box">
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
                        if(ret.data.code==1)
                        {
                        this.$message.success('登录成功')
                        const token = ret.data.data.jwtCode
                        localStorage.setItem('token',token)
                            setTimeout(() => {
                                this.$router.push('/index')
                            }, 1500);
                        }
                        //账号密码验证失败
                        else
                         this.$message.error('账号或密码错误');
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
    background-color: #2b4b6b;
    height: 100%;
    width: 100%;
}

.login_box {
    width: 550px;
    height: 400px;
    background-color: #e2e2e2;
    border-radius: 5px;
    left: 50%;
    top: 40%;
    position: absolute;
    transform: translate(-50%, -50%);

    .avater_box {
        background-color: #2b4b6b;
        width: 25%;
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
            background-color: #eee;
        }

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
</style>