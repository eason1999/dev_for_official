<template>
  <div class="data-index-wrapper">
    <h2>财务信息详情</h2>
    <div class="data-table-wrapper">
      <el-table :data="tableData" stripe style="width: 100%" v-loading.fullscreen.lock="loadings" element-loading-text="拼命加载中">
        <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand sub-app-form">
              <el-form-item label="开户银行:">
                <span>{{ props.row.bankType }}</span>
              </el-form-item>
              <el-form-item label="证件类型:">
                <span>{{ props.row.certificateType | papertype }}</span>
              </el-form-item>
              <el-form-item label="开户行支行:">
              <span>{{ props.row.bankName }}</span>
              </el-form-item>
              <el-form-item label="证件姓名:">
                <span>{{ props.row.certificateName }}</span>
              </el-form-item>
              <el-form-item label="银行账号:">
                <span>{{ props.row.bankAccount }}</span>
              </el-form-item>
              <el-form-item label="证件号码:">
                <span>{{ props.row.certificateNum }}</span>
              </el-form-item>
              <el-form-item label="操作:">
                <el-button type="primary" size="small" @click="handleEdit()">修改</el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="账户类型" show-overflow-tooltip>
          <template scope="props">
            <span>{{props.row.financeType | accounttype }}</span> 
          </template>
        </el-table-column>
        <el-table-column prop="accountName" label="联系人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="contactMobile" label="联系手机" show-overflow-tooltip></el-table-column>
        <el-table-column prop="contactor" label="开户人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="bankType" label="开户银行" show-overflow-tooltip></el-table-column>
        <el-table-column label="证件类型" show-overflow-tooltip> 
          <template scope="props">
            <span>{{props.row.certificateType | papertype }}</span> 
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script type="ecmascript-6">
export default {
  data () {
    return {
      tableData: [],
      loadings: false
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.load();
    });
  },
  filters: {
  	papertype (value) {
      let item;
      switch (value) {
        case 'FIRST_GENERATION_ID_CARD':
          item = '第一代身份证';
          break;
        case 'SECOND_GENERATION_ID_CARD':
          item = '第二代身份证';
          break;
        case 'PEOPLES_REPUBLIC_OF_CHINA_PASSPORT':
          item = '护照';
          break;
        case 'MAINLAND_TRAVEL_PERMIT_FOR_HONG_KONG_AND_MACAO_RESIDENTS':
          item = '港澳居民来往内地通行证';
          break;
        case 'MAINLAND_TRAVEL_PERMIT_FOR_TAIWAN_RESIDENTS':
          item = '台湾居民来往大陆通行证';
          break;
        case 'TAX_REGISTRATION_CERTIFICATE':
          item = '税务登记证';
          break;
        case 'CERTIFICATE_OF_ORGANIZATION_CODE':
          item = '组织机构代码证';
          break; 
        case 'PERMIT_FOR_OPENING_BANK_ACCOUNT':
          item = '开户许可证';
          break;          
        case 'BUSINESS_LICENSE':
          item = '营业执照';
          break;  
      }
      return item;		
  	},
  	accounttype (value) {
  	  let item;
      switch (value) {
        case '2':
          item = '个人账户';
          break; 
        case '1':
          item = '企业账户';
          break;  
      }
      return item;
  	}
  },
  components: { },
  methods: {
    load () {
      this.loadings = true;
      this.$http.get('/v1/dev/finances/user').then((res) => {
        this.loadings = false;
        let data = res.body;
        if (data.ret!=1) {
          return this.$alert(data.message, '提示：', {
            confirmButtonText: '确定'
          });
        }
        let result = data.result;
        if (JSON.stringify(result)!=='{}') {
          this.tableData.push(result);
        }
      }, () => {this.loadings = false;});
    },
    handleEdit () {
      this.$router.push({
      	path: 'index/update'
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .data-index-wrapper    
    .data-table-wrapper
      margin-bottom: 20px 
      .sub-app-form
        padding: 10px
        label
          width: 75px
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
          color: #99a9bf
        .el-form-item
          margin-right: 0
          margin-bottom: 0
          width: 48%
</style>
