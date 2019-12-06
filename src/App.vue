<template>
  <div id="app">
    <el-menu v-if="$store.state.loggedIn" :default-active="activeIndex" class="el-menu" mode="horizontal" @select="onMenuSelected">
      <el-menu-item index="1">区块链金融平台</el-menu-item>
      <el-menu-item index="2">采购</el-menu-item>
      <el-menu-item index="3">结算</el-menu-item>
      <el-menu-item index="4">转让</el-menu-item>
      <el-menu-item index="5">贴现</el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script>
const path_router_pair = {
  '1': '/',
  '2': '/purchase',
  '3': '/settle',
  '4': '/transfer',
  '5': '/discount'
};

export default {
  name: 'app',
  components: {

  },
  data() {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    onMenuSelected(key) {
      this.$router.push({ path: path_router_pair[key] }).then((() => {
        if (this.$route.fullPath === '/login') {
          this.activeIndex = '1';
        }
      }));
    }
  }
}
</script>

<style>
  .el-header {
    margin-top: 20px;
  }

  .el-col {
    display: inline;
  }
</style>
