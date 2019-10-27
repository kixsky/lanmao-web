<template>
  <div>
    <Row>
      <div class="dr_title">我是Title</div>
    </Row>
    <Row>
      <Col span="4">
        <Menu :theme="theme1" active-name="1">
          <MenuItem name="1" to="/desk">
            <Icon type="ios-paper" />控制台
          </MenuItem>
         <MenuItem name="2" to="/book">
            <Icon type="ios-people" />预约中心
          </MenuItem>
         <MenuItem name="3" to="/order">
            <Icon type="ios-people" />订单管理
          </MenuItem>
          <MenuItem name="4" to="/mech">
            <Icon type="ios-paper" />技师管理
          </MenuItem>
          <MenuItem name="5" to="/user">
            <Icon type="ios-people" />用户管理
          </MenuItem>
          <MenuItem name="6" to="/coupon">
            <Icon type="ios-people" />优惠券
          </MenuItem>
          <Submenu name="7">
            <template slot="title">
              <Icon type="ios-stats" />统计分析
            </template>
            <MenuGroup title="使用">
              <MenuItem name="6-1">新增和启动</MenuItem>
              <MenuItem name="6-2">活跃分析</MenuItem>
              <MenuItem name="6-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
              <MenuItem name="6-4">用户留存</MenuItem>
              <MenuItem name="6-5">流失用户</MenuItem>
            </MenuGroup>
          </Submenu>
          <MenuItem name="7">
            <Icon type="ios-construct" />综合设置
          </MenuItem>
        </Menu>
      </Col>
      <Col span="20">
        <router-view />
      </Col>
    </Row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      theme1: "light"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center-me {
  margin: 0 auto;
}
.dr_title {
    height: 60px;
    background: red;
}
</style>
