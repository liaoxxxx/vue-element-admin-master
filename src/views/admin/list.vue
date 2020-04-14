<template>
  <div class="login-container">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        <el-button
          size="small"
          type="primary"
          @click="showAdminDialog"
        >
          添加管理员
        </el-button>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        sortable
        type="selection"
        prop="id"
        width="55"
      />
      <el-table-column
        sortable
        label="id"
        prop="id"
        width="55"
      />
      <el-table-column
        sortable
        label="用户名"
        prop="username"
        width="160"
      />
      <el-table-column
        sortable
        label="昵称"
        width="240"
        prop="nickname"
      />
      <el-table-column
        sortable
        label="描述"
        width="240"
        prop="summary"
      />
      <el-table-column
        sortable
        label="状态"
        width="120"
        prop="status"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="180"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click.native.prevent="delete(scope.$index, tableData)"
          >
            删除
          </el-button>
          <el-button type="text" size="small" @click="edit(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block-page-row">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div class="add-admin-dialog">
      <el-dialog v-el-drag-dialog :visible.sync="addAdminDialogVisible" :fullscreen="true" title="添加管理员">
        <el-input>
          ddd
        </el-input>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AdminList',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      addAdminDialogVisible: false
    }
  },
  watch: {
  },
  created() {
    console.log(this.$request.defaults.headers)
    this.$request.get('/admin/list').then((res) => {
      res = res.data
      console.log(res)
      if (res.status === 1) {
        this.tableData = res.data
        /*  for (let i = 0; i < this.tableData.length; i++) {
          const createdDate = new Date(this.tableData[i].createdAt)
          const updatedDate = new Date(this.tableData[i].updatedAt)
          this.tableData[i].createdAt = createdDate.getFullYear() + '-' + createdDate.getUTCMonth() + '-' + createdDate.getUTCDay() + ' ' + createdDate.getUTCHours() + ':' + createdDate.getUTCMinutes() + ':' + createdDate.getUTCSeconds()
          this.tableData[i].updatedAt = updatedDate.getFullYear() + '-' + updatedDate.getUTCMonth() + '-' + updatedDate.getUTCDay() + ' ' + updatedDate.getUTCHours() + ':' + updatedDate.getUTCMinutes() + ':' + updatedDate.getUTCSeconds()
        }*/
      }
    })
  },
  mounted() {
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    edit(id) {
      this.$router.push({ path: '/admin/edit', query: { id: id }})
    },
    showAdminDialog() {
      this.addAdminDialogVisible = true
    },
    delete(id) {
      console.log(id)
    },
    handleSelectionChange() {
      console.log('aaa')
    },
    currentPage4() {
      console.log('aaa')
    },
    handleSizeChange() {
      console.log('aaa')
    },
    handleCurrentChange() {
      console.log('aaa')
    }

  }
}
</script>
<style>
  .block-page-row{
    position: fixed;
    bottom: 0;
  }
</style>
