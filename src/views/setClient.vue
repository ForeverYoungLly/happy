<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>当前图片</span>
      </div>
      <el-upload
        v-loading="loading"
        action="http://123.207.73.185:8080/admin/uploadPicture"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :auto-upload="false"
        accept=".jpg, .png,.jpeg"
        :on-remove="handleRemove"
        :on-exceed = "exceed"
        :limit="1"
        :on-change="uploadPic"
        :file-list="fileList"
        >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-card>
    <div class="btn">
      <el-button class="btn" type="primary" @click="submit">修改</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
      return {
        fileList:[],
        fileFormData:'',
        // 预览图片的url地址
        dialogImageUrl: '',
        dialogVisible: false,
        headers:{
                'jwt-code': localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            },
        loading : false
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log(this.dialogImageUrl);
      },
      uploadPic(fileList){
          const formData = new FormData()
          formData.append('picture', fileList.raw)
          this.fileFormData = formData
      },
      exceed(){
        this.$message.warning('只能上传一张图片')
      },
      submit(){
        this.loading = true
        axios({
          url:'http://123.207.73.185:8080/admin/uploadPicture',
          method:'POST',
          headers:{
                'jwt-code': localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
          },
          data:this.fileFormData
        }).then(()=>{
          this.loading = false
          this.$message.success('修改成功！')
        })
      }
    },
  created(){
    const token = localStorage.getItem('token')
    if(!token)
    {
      this.$message.error('请先登录！')
      this.$router.push('/login')
    }
    this.loading = true
    axios({
      url:'http://123.207.73.185:8080/homePicture'
    }).then((res)=>{
      this.loading = false
      const obj = new Object
      obj.url = 'http://' + res.data.data
      this.fileList.push(obj)
    })
  }
}
</script>
<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
  .text {
    font-size: 14px;
    text-align: center;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix {
    text-align: center;
    font-weight: 700;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    max-width: 30vw;
    margin-top: 2vh;
    margin: 10px auto
  }

  .btn {
    margin: 10px auto;
  }
</style>