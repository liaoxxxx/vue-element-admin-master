<template>
  <div class="add-category-container">
    <el-form ref="form" label-width="140px">
      <el-tabs v-model="activeIndex" @tab-click="handleTabClick">
        <el-tab-pane label="商品摘要" name="first" class="goods-price-group">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="商品货号" prop="type">
                <el-input v-model="goodsObj.shelvesNo" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="商品名称" prop="type">
                <el-input v-model="goodsObj.name" placeholder="请输入商品名称" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="商品标题" prop="type" placeholder="请输入商品标题">
                <el-input v-model="goodsObj.title" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="商品副标题" prop="type">
                <el-input v-model="goodsObj.subTitle" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="商品备注" prop="type">
                <el-input v-model="goodsObj.summary" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="选择商品分类" prop="type">
                <el-select v-model="goodsObj.cateId" placeholder="请选择">
                  <el-option
                    v-for="item in goodsCateList"
                    :key="item.id"
                    :label="item.cateName"
                    :value="item.id"
                  >
                    <span style="float: left">{{ item.id }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.cateName }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="选择缩略图" prop="type">
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
              </el-form-item>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="选择详情图" prop="type">
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
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="定价" name="second">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="商品底价" prop="type">
                <el-input v-model="goodsObj.basePrice" placeholder="请输入商品底价" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="商品标价" prop="type">
                <el-input v-model="goodsObj.showPrice" placeholder="请输入商品标价" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="商品成本价" prop="type">
                <el-input v-model="goodsObj.inputPrice" placeholder="请输入商品成本价" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="third">
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="库存" prop="type">
                <el-input v-model="goodsObj.storeCount" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="体积" prop="type">
                <el-input v-model="goodsObj.volumetric" placeholder="请输入 长*宽*高(cm)" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="重量" prop="type">
                <el-input v-model="goodsObj.weight" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item label="购买成功增加积分" prop="type">
                <el-input v-model="goodsObj.memberCredit" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="排序" prop="type">
                <el-input v-model="goodsObj.sort" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="商品推荐" prop="type">
                <el-input v-model="goodsObj.recommendSort" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="购买成功增加经验值" prop="type">
                <el-input v-model="goodsObj.experienceCredit" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item prop="date1" label="上架" required>
                <el-switch v-model="goodsObj.isShelves" active-text="是" inactive-text="否" active-value="1" inactive-value="0" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="data2" label="显示">
                <el-switch v-model="goodsObj.isVisible" active-text="是" inactive-text="否" active-value="1" inactive-value="0" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="data2" label="包邮">
                <el-switch v-model="goodsObj.isNoPostage" active-text="是" inactive-text="否" active-value="1" inactive-value="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="5">
              <el-form-item prop="data2" label="最新商品">
                <el-switch v-model="goodsObj.isNew" active-text="是" inactive-text="否" active-value="1" inactive-value="0" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="data2" label="特价商品">
                <el-switch v-model="goodsObj.isSpecialOffer" active-text="是" inactive-text="否" active-value="1" inactive-value="0" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="data2" label="热卖商品">
                <el-switch v-model="goodsObj.isHot" active-text="是" inactive-text="否" active-value="1" inactive-value="0" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item prop="data2" label="推荐商品">
                <el-switch v-model="goodsObj.isRecommend" active-text="是" inactive-text="否" active-value="1" inactive-value="0" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-button type="primary" @click="submit">提交</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddGoods',
  data() {
    return {
      goodsObj: {
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
        uploadThumb: [], // 缩略图片
        sort: 1,
        shelvesNo: '00001',
        storeCount: 100,
        weight: 1,
        recommendSort: 1,
        memberCredit: 50,
        experienceCredit: 50,
        /*    */
        volumetric: '',
        isShelves: 1,
        isNoPostage: 0,
        isVisible: 1,
        isNew: 1,
        isSpecialOffer: 0,
        isHot: 0,
        isRecommend: 0
      },
      goodsCateList: [],
      thumbPostUrl: 'http://localhost:8081/upload/singleImage',
      uploadMultiple: true,
      uploadThumb: [],
      uploadFileList: [],
      activeIndex: 'first',
      dialogImageUrl: '',
      dialogVisible: false
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
    // window.addEventListener('storage', this.afterQRScan)
    this.getGoodsCate()
  },
  mounted() {
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    submit() {
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
    getGoodsCate() {
      this.$request.get('/admin_goods/getAllGoodsCate/').then((res) => {
        res = res.data
        this.goodsCateList = res.data.goodsCateList
        // console.log(this.goodsCateList)
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
