<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>图片上传</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="send">上传</el-button>
      </div>
      <el-upload
        action="http://123.207.73.185:8080/admin/uploadPicture"
        list-type="picture-card"
        :headers="headers"
        :on-preview="handlePictureCardPreview"
        :auto-upload="false"
        accept=".jpg, .png,.jpeg"
        :on-remove="handleRemove"
        >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
      return {
        // 预览图片的url地址
        dialogImageUrl: '',
        dialogVisible: false,
        headers:{
                'jwt-code': localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
            }
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        console.log(file);
        this.dialogImageUrl = file.url;
        const formData = new FormData()
        formData.append('picture', file.raw)
        axios({
          url:'http://123.207.73.185:8080/admin/uploadPicture',
          method:'POST',
          headers:{
                'jwt-code': localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data'
          },
          data:formData
        }).then(res=>{
          console.log(res);
        })
        // this.dialogVisible = true;
        // console.log(this.dialogImageUrl);
      },
      send(){
      }
    },
  created(){
    const token = localStorage.getItem('token')
    if(!token)
    {
      this.$message.error('请先登录！')
      this.$router.push('/login')
    }
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
    margin-top: 2vh;
    width: 40vw;
  }
  .el-upload__tip{
    color: lightgrey;
    text-align: center;
  }
  .avatar-uploader {
    display: flex;
    justify-content: center;
  }
  .el-upload .el-upload--text{
    border-style: dotted !important;
    border-width: 1px !important;
    border-color: #409EFF !important;
  }
</style>