<template>
  <div class="login-container">
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">
        <el-button
          size="small"
          type="primary"
          @click="showBrandDialog"
        >
          添加商品品牌
        </el-button>
      </el-menu-item>
      <el-menu-item index="2">
        <el-input v-model="brandIdSearch" placeholder="请输入品牌id" />
      </el-menu-item>
      <el-menu-item index="2">
        <el-input v-model="brandNameSearch" placeholder="请输入品牌名称" />
      </el-menu-item>
      <el-menu-item index="4">
        <el-button
          size="small"
          type="primary"
          @click="searchBrand()"
        >
          筛选
        </el-button>
      </el-menu-item>
    </el-menu>
    <AddGoodsBrand :add-brand-dialog-visible="showAddDialog" />
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
        width="120"
      />
      <el-table-column
        sortable
        label="品牌名称"
        prop="name"
        width="200"
      />
      <el-table-column
        sortable
        label="描述"
        width=""
        prop="summary"
      />
      <el-table-column
        sortable
        label="创建日期"
        width="180"
        prop="createdTime"
      />
      <el-table-column
        sortable
        label="修改日期"
        width="180"
        prop="createdTime"
      />
      <el-table-column
        fixed="right"
        label="操作"
        width="240"
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
    <div class="block">
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
  </div>
</template>

<script>
import AddGoodsBrand from './add.vue'
export default {
  name: 'List',
  components: {
    'AddGoodsBrand': AddGoodsBrand
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      showAddDialog: false,
      brandIdSearch: '',
      brandNameSearch: ''
    }
  },
  watch: {
  },
  created() {
    console.log(typeof this.showAddDialog)
    // console.log(this.$request.defaults.headers)
    this.$request.get('/admin/brandList').then((res) => {
      res = res.data
      console.log(res)
      if (res.status === 1) {
        this.tableData = res.data
        for (let i = 0; i < this.tableData.length; i++) {
          const createdDate = new Date(this.tableData[i].createdAt)
          const updatedDate = new Date(this.tableData[i].updatedAt)
          this.tableData[i].createdAt = createdDate.getFullYear() + '-' + createdDate.getUTCMonth() + '-' + createdDate.getUTCDay() + ' ' + createdDate.getUTCHours() + ':' + createdDate.getUTCMinutes() + ':' + createdDate.getUTCSeconds()
          this.tableData[i].updatedAt = updatedDate.getFullYear() + '-' + updatedDate.getUTCMonth() + '-' + updatedDate.getUTCDay() + ' ' + updatedDate.getUTCHours() + ':' + updatedDate.getUTCMinutes() + ':' + updatedDate.getUTCSeconds()
        }
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
      this.$router.push({ path: '/goods/brand/edit', query: { id: id }})
    },
    showBrandDialog() {
      this.showAddDialog = 1
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

