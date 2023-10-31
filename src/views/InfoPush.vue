<!-- 消息推送大表框 -->
<template>
  <div class="container">
    <el-card class="box-card" body-style="{ padding: '20px' }" style="width: 90%;margin:20px auto">
      <div slot="header" class="clearfix">
        <span>消息推送</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div class="form">
      <!-- 用户名 -->
      <el-form ref="infoform" :model="infoform" label-width="200px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="目标用户">
              <el-select v-model="value" multiple filterable allow-create default-first-option placeholder="请选择目标用户">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 标题 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="标题">
              <el-input v-model="infoform.infopushTitle" clearable=true placeholder="请输入标题"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 内容 -->
        <el-row>
          <el-col :span="10">
            <el-form-item label="内容">
              <el-input type="textarea" autosize placeholder="请输入内容" v-model="infoform.content"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 显示选项 -->
        <el-row>
          <el-col :span="10">
            <el-form-item label="选项">
              <el-radio-group v-model="radio">
                <el-radio :label="3">接受</el-radio>
                <el-radio :label="6">拒绝</el-radio>
                <el-radio :label="9">异常反馈</el-radio>
                <el-radio :label="12"><a href="https://element.eleme.cn/#/" style="color: #333;"
                    target="_blank">点击跳转链接到element ui</a></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 发送按钮 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发送</el-button>
        </el-form-item>
      </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoform: {
        infopushTitle: '',
        content: '',
        options: [{
          value: 'HTML',
          label: 'HTML'
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScript',
          label: 'JavaScript'
        }],
        value: []
      },
      radio: 3
    }
  },
  methods: {
  }
}
</script>


<style scoped>
.container .box-card{
  background-color: #E9EEF3;
  width: 80% !important; 
  padding: 18px;
}