<template>
  <div>
      <!-- 照片上传 -->
    <van-field name="photosList" label="照片上传" >
      <template #input>
        <van-uploader v-model="photosList" :max-count="1"   :max-size="500 * 1024 *1024" :before-delete="delPhoto"/>
      </template>
    </van-field>
    <van-field name="fileList" label="附件上传">
        <template #input>
          <!-- accept 支持上传的文件类型为全部，max-size最大上传内存 500m  -->
          <van-uploader v-model="fileList" :after-read="afterFileRead" accept="" :max-size="500 * 1024 *1024" :before-delete="delFile">
          </van-uploader>

        </template>
      </van-field>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'MyName',
  data () {
    return {
      photosList: [],
      PhotoformData: {},
      fileList: []
    }
  },
  methods: {
    delPhoto () {

    }
  },
  created () {
    axios({
      url: 'http://123.207.73.185:8080/showUserFileMessage',
      params: {
        studentid: '2022463030728'
      }
    }).then((res) => {
      console.log(res)
      const item = {
        url: res.data.data[0].url,
        // 要用到file.status
        file: new File([], res.data.data[0].name, {}) // 就是这个new File([], item.attachmentName, {}),有他就可以回显文件名称了
      }
      this.photosList.push(item)
      for (let i = 1; i < res.data.data.length; i++) {
        const item1 = {
          url: res.data.data[i].url,
          file: new File([], res.data.data[i].name, {}) // 就是这个new File([], item.attachmentName, {}),有他就可以回显文件名称了
        }
        this.fileList.push(item1)
      }
    })
  }
}
</script>

<style>
.van-uploader__input {
  display: block;
}
</style>
