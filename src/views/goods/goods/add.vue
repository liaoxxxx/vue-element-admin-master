<template>
  <div class="add-category-container">
    <el-form ref="form" :model="form" label-width="140px">
      <el-tabs v-model="activeIndex" @tab-click="handleTabClick">
        <el-tab-pane label="商品摘要" name="first" class="goods-price-group">
          <el-row :gutter="20">
            <el-col :span="8"><label for="Name">商品名称:</label>
              <el-input id="Name" v-model="name" placeholder="请输入商品名称" />
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="8">
              <label for="title">商品标题:</label><el-input id="title" v-model="title" placeholder="请输入商品名称" />
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="8">
              <label for="subTitle">商品副标题:</label><el-input id="subTitle" v-model="subTitle" placeholder="请输入商品备注" />
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="8">
              <label for="summary">商品备注:</label><el-input id="summary" v-model="summary" placeholder="请输入商品备注" />
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="8">
              <label for="cateId">选择商品分类:</label><el-input id="cateId" v-model="cateId" placeholder="请选择商品分类" />
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="8">
              <label>选择缩略图</label>
              <el-upload
                :action="thumbPostUrl"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-change="uploadThumbFile"
                :multiple="uploadMultiple"
                name="file"
              >
                <i class="el-icon-plus" />
              </el-upload>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="8">
              <label>选择详情图</label>
              <el-upload
                :action="thumbPostUrl"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-change="uploadChange"
                :multiple="uploadMultiple"
                name="file"
              >
                <i class="el-icon-plus" />
              </el-upload>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="定价" name="second">
          <el-row :gutter="20">
            <el-col :span="8">
              <label for="basePrice">商品底价:</label><el-input id="basePrice" v-model="basePrice" placeholder="请输入商品备注" />
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="8">
              <label for="showPrice">商品标价:</label><el-input id="showPrice" v-model="showPrice" placeholder="请输入商品备注" />
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="8">
              <label for="inputPrice">商品成本:</label><el-input id="inputPrice" v-model="inputPrice" placeholder="请输入商品备注" />
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="8">
              <label>上架状态</label>
              <el-radio-group id="status" v-model="status">
                <el-radio :label="0">下架</el-radio>
                <el-radio :label="1">上架</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="third">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="商品货号" prop="type">
                <el-input v-model="basePrice" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="库存" prop="type">
                <el-input v-model="basePrice" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="重量" prop="type">
                <el-input v-model="basePrice" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="购买成功增加经验值" prop="type">
                <el-input v-model="basePrice" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="购买成功增加积分" prop="type">
                <el-input v-model="basePrice" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="排序" prop="type">
                <el-input v-model="basePrice" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="商品推荐" prop="type">
                <el-input v-model="basePrice" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="购买成功增加经验值" prop="type">
                <el-input v-model="basePrice" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="7">
              <el-form-item prop="date1" label="上架" required>
                <el-switch v-model="basePrice" active-text="是" inactive-text="否" />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="7">
              <el-form-item prop="data2" label="显示">
                <el-switch v-model="basePrice" active-text="是" inactive-text="否" />
              </el-form-item>
            </el-col>
            <el-col class="line" :span="1">-</el-col>
            <el-col :span="7">
              <el-form-item prop="data2" label="包邮">
                <el-switch v-model="basePrice" active-text="是" inactive-text="否" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <el-form-item label="商品推荐" prop="type">
                <el-checkbox-group v-model="basePrice">
                  <el-checkbox label="最新商品" name="type" />
                  <el-checkbox label="特价商品" name="type" />
                  <el-checkbox label="热卖商品" name="type" />
                  <el-checkbox label="推荐商品" name="type" />
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="商品详情" name="fourth">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="编辑详情" prop="type">
                <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
                  <textarea :id="tinymceId" class="tinymce-textarea" />
                  <div class="editor-custom-btn-container">
                    <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-row :gutter="20">
        <el-col v-show="!showInfoGroup" :span="2">
          <el-button type="primary" @click="switchInputGroups">上一步</el-button>
        </el-col>
        <el-col v-show="showInfoGroup" :span="2">
          <el-button type="primary" @click="switchInputGroups">下一步</el-button>
        </el-col>
        <el-col v-show="!showInfoGroup" :span="8">
          <el-button type="primary" @click="submit">提交</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import editorImage from './components/EditorImage'
import plugins from './plugins'
import load from './dynamicLoadScript'
import toolbar from './toolbar'

// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'
export default {
  name: 'AddGoods',
  components: { editorImage },
  data() {
    return {
      fullscreen: false,
      activeIndex: 'first',
      showInfoGroup: true,
      dialogImageUrl: '',
      dialogVisible: false,
      name: '',
      cateId: '',
      summary: '',
      title: '',
      subTitle: '',
      status: 1,
      basePrice: 0,
      inputPrice: 0,
      showPrice: 0,
      uploadFileList: [], // 详情图 多个
      uploadThumb: '', // 缩略图片
      uploadMultiple: true,
      thumbPostUrl: 'http://localhost:8081/upload/singleImage'
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
    switchInputGroups() {
      if (this.showInfoGroup === true) {
        this.showInfoGroup = false
      } else {
        this.showInfoGroup = true
      }
    },
    submit() {
      const thumb = []
      for (let i = 0; i < this.uploadThumb.length; i++) {
        thumb[i] = this.uploadThumb[i].response.data.path
      }
      // eslint-disable-next-line no-unused-vars,no-unreachable
      const images = []
      for (let i = 0; i < this.uploadFileList.length; i++) {
        images[i] = this.uploadFileList[i].response.data.path
      }
      console.log(images)
      // eslint-disable-next-line no-unreachable
      const category = {
        'name': this.name,
        'cateId': this.cateId,
        'summary': this.summary,
        'title': this.title,
        'subTitle': this.subTitle,
        'images': images,
        'thumb': thumb,
        'status': this.status,
        'basePrice': this.basePrice,
        'inputPrice': this.inputPrice,
        'showPrice': this.showPrice
      }
      this.$request.post('/admin_goods/add_goods/', category).then((res) => {
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
    },
    init() {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
    },
    initTinymce() {
      const _this = this
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        language: this.languageTypeList['en'],
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        }
        // 整合七牛上传
        // images_dataimg_filter(img) {
        //   setTimeout(() => {
        //     const $image = $(img);
        //     $image.removeAttr('width');
        //     $image.removeAttr('height');
        //     if ($image[0].height && $image[0].width) {
        //       $image.attr('data-wscntype', 'image');
        //       $image.attr('data-wscnh', $image[0].height);
        //       $image.attr('data-wscnw', $image[0].width);
        //       $image.addClass('wscnph');
        //     }
        //   }, 0);
        //   return img
        // },
        // images_upload_handler(blobInfo, success, failure, progress) {
        //   progress(0);
        //   const token = _this.$store.getters.token;
        //   getToken(token).then(response => {
        //     const url = response.data.qiniu_url;
        //     const formData = new FormData();
        //     formData.append('token', response.data.qiniu_token);
        //     formData.append('key', response.data.qiniu_key);
        //     formData.append('file', blobInfo.blob(), url);
        //     upload(formData).then(() => {
        //       success(url);
        //       progress(100);
        //     })
        //   }).catch(err => {
        //     failure('出现未知问题，刷新页面，或者联系程序员')
        //     console.log(err);
        //   });
        // },
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(arr) {
      const _this = this
      arr.forEach(v => {
        window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`)
      })
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
