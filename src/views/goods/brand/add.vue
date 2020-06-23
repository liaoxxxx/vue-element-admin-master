<template>
  <el-dialog :visible.sync="addBrandDialogVisible" title="添加商品品牌" :fullscreen="false">
    <el-row :gutter="24">
      <el-form ref="form" label-width="80px">
        <el-form-item label="商品名">
          <el-input v-model="goodsBrandObj.name" placeholder="商品名" />
        </el-form-item>
        <el-form-item label="简述">
          <el-input v-model="goodsBrandObj.summary" placeholder="简述" />
        </el-form-item>
        <el-form-item label="缩略图">
          <el-input v-model="goodsBrandObj.thumb" placeholder="缩略图" />
        </el-form-item>
        <el-form-item label="审核">
          <el-switch v-model="goodsBrandObj.status" active-text="启用" inactive-text="禁用" />
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submitBrand">添加</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </el-dialog>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
export default {
  name: 'AddGoodsBrand',
  directives: { elDragDialog },
  // eslint-disable-next-line vue/require-prop-types
  props: { addBrandDialogVisible: { type: Boolean, default: false }},
  data() {
    return {
      goodsBrandObj: {
        name: '',
        summary: '',
        thumb: '',
        status: 1
      }
    }
  },
  computed: {
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    }
  },
  watch: {
  },
  created() {
    console.log(typeof this.addBrandDialogVisible)
  },
  mounted() {
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    submitBrand() {
      const thumb = []
      const images = []
      if (this.uploadThumb.length >= 1 || this.uploadFileList.length >= 1) {
        for (let i = 0; i < this.uploadThumb.length; i++) {
          thumb[i] = this.uploadThumb[i].response.data.path
        }
        // eslint-disable-next-line no-unused-vars,no-unreachable
        for (let i = 0; i < this.uploadFileList.length; i++) {
          images[i] = this.uploadFileList[i].response.data.path
        }
      } else {
        this.$notify({
          title: '成功',
          message: '请上传商品的缩略图',
          type: 'error'
        })
        return false
      }
      this.goodsObj.images = images
      this.goodsObj.thumb = thumb
      console.table(this.goodsObj)
      this.$request.post('/admin_goods/add_goods/', this.goodsObj).then((res) => {
        res = res.data
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
    handleRemove(file, fileList) {
      console.log(fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    uploadChange(file, fileList) {
      console.log(fileList)
      this.uploadFileList = fileList
      console.log(this.uploadFileList)
    },
    uploadThumbFile(file, fileList) {
      console.log(fileList)
      this.uploadThumb = fileList
    },
    handleTabClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

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
    .tinymce-container {
      position: relative;
      line-height: normal;
    }
    .tinymce-container>>>.mce-fullscreen {
      z-index: 10000;
    }
    .tinymce-textarea {
      visibility: hidden;
      z-index: -1;
    }
    .editor-custom-btn-container {
      position: absolute;
      right: 4px;
      top: 4px;
      /*z-index: 2005;*/
    }
    .fullscreen .editor-custom-btn-container {
      z-index: 10000;
      position: fixed;
    }
    .editor-upload-btn {
      display: inline-block;
    }
  }
</style>
