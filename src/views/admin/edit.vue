<template>
  <div class="edit-admin-container">
    <h2>编辑管理员</h2>
    <div id="goods-info-group">
      <el-row :gutter="20">
        <el-col :span="6">
          <label>管理员头像:</label><el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="avatars" :src="avatars" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-col>
      </el-row>
      <br>
      <el-row :gutter="20">
        <el-col :span="6">
          <label for="username">管理员名:</label><el-input id="username" v-model="username" placeholder="请输入商品名称" />
        </el-col>
      </el-row>
      <br>
      <el-row :gutter="20">
        <el-col :span="6">
          <label for="nickname">昵称:</label><el-input id="nickname" v-model="nickname" placeholder="请输入商品名称" />
        </el-col>
      </el-row>
      <br>
    </div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-button type="primary" @click="submit">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AddGoods',
  data() {
    return {
      id: 0,
      username: '',
      nickname: '',
      avatars: '',
      status: 1
    }
  },
  watch: {
  },
  created() {
    // console.log(this.$request.defaults.headers)
    const id = this.$route.query.id
    // console.log(id)
    if (id === undefined || id === 0) {
      this.$notify({
        title: '出错了',
        message: '分类id错误',
        type: 'error'
      })
      this.$router.push({ path: '/admin/list', query: { }})
    }
    if (id > 0) {
      this.$request.get('/admin/findone/' + id).then((res) => {
        res = res.data
        const data = res.data.data
        console.log(res)
        if (res.status === 1) {
          this.username = data.username
          this.id = data.id
          this.avatars = data.avatars
          this.nickname = data.nickname
          this.status = data.status
        }
      })
    }
  },
  mounted() {
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    submit() {
      const admin = {
        id: this.id,
        username: this.username,
        nickname: this.nickname,
        avatars: this.avatars,
        status: this.status
      }
      console.table(admin)
      this.$request.post('/admin/edit/', admin).then((res) => {
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
          this.$router.back()
        }
      })
    },
    handleRemove(file, fileList) {
      console.log(fileList)
    },
    handleAvatarSuccess(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    beforeAvatarUpload() {
      console.log(9999)
    },
    uploadChange(file, fileList) {
      console.log(fileList)
      this.uploadFileList = fileList
      console.log(this.uploadFileList)
    },
    uploadThumbFile(file, fileList) {
      console.log(fileList)
      this.uploadThumb = fileList
      console.log(this.uploadThumb)
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
  .edit-admin-container{
    padding-left: 20px;
  }
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
