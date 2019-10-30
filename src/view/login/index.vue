<template>
  <div class="main-div">
    <div class="ms-login">
      <div>
        <p>
          懒猫后台系统
        </p>
      </div>
      <div class="ms-d">
        <span>登陆名</span>
        <Input v-model="loginName" placeholder="登陆名" style="width: 280px" />
      </div>
      <div class="ms-d">
        <span>密码</span>
        <Input v-model="password" placeholder="密码" style="width: 280px" />
      </div>
      <div class="login-div">
        <Button type="error" long @click="login">登陆</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      loginName: '',
      password: ''
    };
  },
  methods: {
    login() {
      var self = this;
      var params = {
        loginName: this.loginName,
        password: this.password
      }
      this.$http.post(this.$api.DepMember.Login, params, false)
      .then(res => {
        var resData = res.data;
        if (resData.code == 0) {
          self.$router.push({
            path: '/main'
          });
        } else {
          self.$Message.error(resData.message);
        }
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main-div {
  position: relative;
  width: 100%;
  height: 700px;
  background: url(../../assets/bg.jpeg) no-repeat 50%;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 380px;
  height: 160px;
  margin: -80px 0 0 -190px;
  padding: 10px 0 0 0;
  span {
    width: 80px;
    display: block;
    float: left;
    text-align: center;
  }
  .login-div {
    margin: 10px 0 0 0;
    padding: 0 10px 0 10px;
    text-align: center;
  }
  .ms-d {
    margin-top: 10px;
  }
  p {
    text-align: center;
  }
}
</style>
