<template>
  <div class="admin-container">
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">
        <el-button
          size="small"
          type="primary"
          @click="showAdminDialog"
        >
          添加管理员
        </el-button>
      </el-menu-item>
      <el-menu-item index="2">
        <el-input v-model="usernameSearch" placeholder="请输入用户名" />
      </el-menu-item>
      <el-menu-item index="2">
        <el-input v-model="usernameSearch" placeholder="请输入昵称" />
      </el-menu-item>
      <el-menu-item index="4">
        <el-button
          size="small"
          type="primary"
          @click="searchAdmin()"
        >
          筛选
        </el-button>
      </el-menu-item>
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
    <AddAdmin :add-admin-dialog-visible="addAdminDialogVisible" />
    <!-- <EditAdmin :add-admin-dialog-visible="editAdminDialogVisible" />-->
  </div>
</template>
<script>
import AddAdmin from './add.vue'
// import EditAdmin from './edit'
export default {
  name: 'AdminList',
  components: {
    'AddAdmin': AddAdmin
    /* 'EditAdmin': EditAdmin*/
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      addAdminDialogVisible: false,
      editAdminDialogVisible: false,
      activeIndex: true,
      usernameSearch: ''
      /*  adminObj: {
        username: '',
        password: '',
        status: true,
        nickname: '',
        isAdministrator: true
      }*/
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
    addAdmin() {
      console.log('aaa')
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
    },
    searchAdmin() {
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
