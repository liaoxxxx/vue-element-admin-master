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
            <el-col :span="20">
              <el-form-item label="选择缩略图" prop="type">
                <el-upload
                  :file-list="uploadThumb"
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
            <el-col :span="20">
              <el-form-item label="选择详情图" prop="type">
                <el-upload
                  :file-list="uploadFileList"
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
      /* */
      goodsCateList: [],
      thumbPostUrl: 'http://localhost:8081/upload/singleImage',
      uploadMultiple: true,
      uploadFileList: [], // 详情图 多个
      uploadThumb: [], // 缩略图片
      activeIndex: 'first',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  watch: {
  },
  created() {
    this.init()
  },
  mounted() {
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    init() {
      const id = this.$route.query.id
      if (id === undefined || id === 0) {
        this.$notify({
          title: '出错了',
          message: '分类id错误',
          type: 'error'
        })
        this.$router.push({ path: '/goods/category/list', query: { }})
      }
      if (id > 0) {
        this.$request.get('/admin_goods/findoneWithAllGoodsCate/' + id).then((res) => {
          res = res.data
          const data = res.data
          if (res.status === 1) {
            this.goodsObj = data.goods
            this.goodsCateList = data.goodsCategoryList
            //  json.decode
            const images = JSON.parse(this.goodsObj.images)
            const FileList = []
            images.forEach(function(item, index) {
              FileList[index] = { 'url': process.env.VUE_APP_BASE_DOMAIN + item }
            })
            // 缩略图
            const thumbJson = JSON.parse(this.goodsObj.thumb)
            const thumbFileList = []
            thumbJson.forEach(function(item, index) {
              thumbFileList[index] = { 'url': process.env.VUE_APP_BASE_DOMAIN + item }
            })
            this.uploadFileList = FileList
            this.uploadThumb = thumbFileList
            this.goodsObj.isNoPostage = true
            console.table(this.goodsObj)
          }
        })
      }
    },
    submit() {
      // eslint-disable-next-line no-unused-vars
      const images = []
      for (let i = 0; i < this.uploadFileList.length; i++) {
        images[i] = this.uploadFileList[i].response.data.path
      }

      const thumb = []
      for (let i = 0; i < this.uploadFileList.length; i++) {
        thumb[i] = this.uploadFileList[i].response.data.path
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
      console.log(this.uploadThumb)
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

.el-upload-list__item{
  float: left;
}
</style>
