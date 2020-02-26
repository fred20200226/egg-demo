<template>
  <div id="app">
    <div class="container">
      <component 
        :is="nowCom" 
        @loginSuccess="loginSuccess" 
        @loginOut="loginOut">
      </component>
    </div>
  </div>
</template>
<script>
import Login from "./components/Login";
import Note from "./components/Note";
import {BaseUrl} from "./config/config";
export default {
  name: 'app',
  components: {
    Login,
    Note
  },
  data() {
    return {
      nowCom: Login
    }
  },
  mounted() {},
  methods: {
    //点击登录成功
    loginSuccess(msg) {
      this.$message.success(msg);
      this.nowCom = Note;
    },

    //退出登录
    loginOut() {
      this.nowCom = Login;
    }
  },
}
</script>

<style>
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.container {
  width: 1000px;
  height: 80vh;
  padding: 20px;
  border: 1px solid #ccc;
  margin: 10vh auto;
  position: relative;
  overflow: auto; 
}
</style>
