<template>
    <div class="block">
    <span class="demonstration">分页</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 10, 10, 10,10,10,10,10,10,10]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="280">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    data() {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      };
    }
  }
</script>