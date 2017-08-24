<template>
  <el-menu :unique-opened="true" @select="handleSelect" router :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
    <el-menu-item index="/dev/index"><i class="el-icon-message"></i>首页</el-menu-item>
    <el-menu-item index="/dev/app/index"><i class="el-icon-menu"></i>应用管理</el-menu-item>
    <el-menu-item index="/dev/data/index"><i class="el-icon-menu"></i>数据管理</el-menu-item>
    <el-menu-item index="/dev/finance/index"><i class="el-icon-menu"></i>财务管理</el-menu-item>
    <el-menu-item index="/dev/user/index"><i class="el-icon-menu"></i>用户管理</el-menu-item>
	<el-menu-item index="/dev/sdkapi"><i class="el-icon-menu"></i>SDK/API文档</el-menu-item>
  </el-menu> 
</template>

<script type="esmascript-6">
export default {
  data () {
    return {
      indexpath: '/adm/adv/campaign'	
    };
  },
  methods: {
  	handleSelect (index, indexPath) {
      this.indexpath = index;		
  	},
	handleOpen (key, keyPath) {
	  console.log(key, keyPath);
	},
	handleClose (key, keyPath) {
	  console.log(key, keyPath);
	}
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.el-menu
		height: 100%
</style>
