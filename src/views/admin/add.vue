<template>
  <div>
    <el-dialog v-el-drag-dialog :visible.sync="addAdminDialogVisible" title="添加管理员" :fullscreen="false" @dragDialog="handleDrag">
      <el-row :gutter="24">
        <el-form ref="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="adminObj.username" placeholder="管理员用户名" />
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="adminObj.nickname" placeholder="管理员昵称" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="adminObj.password" placeholder="管理员密码" />
          </el-form-item>
          <el-form-item label="审核">
            <el-switch v-model="adminObj.status" active-text="启用" inactive-text="禁用" />
          </el-form-item>
          <el-form-item label="设为超管">
            <el-switch v-model="adminObj.isAdministrator" active-text="是" inactive-text="否" />
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="addAdmin">添加</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
export default {
  directives: { elDragDialog },
  // eslint-disable-next-line vue/require-prop-types
  props: ['addAdminDialogVisible'],
  data() {
    return {
      adminObj: {
        username: '',
        password: '',
        status: true,
        nickname: '',
        isAdministrator: false
      }
      // eslint-disable-next-line vue/no-dupe-keys
    }
  },
  watch: {
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    addAdmin() {
      if (this.adminObj.status === true) {
        this.adminObj.status = 1
      } else {
        this.adminObj.status = 0
      }

      if (this.adminObj.isAdministrator === true) {
        this.adminObj.isAdministrator = 1
      } else {
        this.adminObj.isAdministrator = 0
      }
      this.$request.post('/admin/add/', this.adminObj).then((res) => {
        res = res.data
        console.log(res)
        console.log(res.msg)
        console.log(res.data)
        if (res.status === 1) {
          this.$notify({
            title: '成功',
            message: res.message,
            type: 'success'
          })
        }
      })
    },
    handleDrag() {
      this.$refs.select.blur()
    }
  }
}
</script>

<style lang="scss">
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0 auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
  }
</style>
