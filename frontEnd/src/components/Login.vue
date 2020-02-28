<template>
<div>
  你可以随便输入用户名和密码登录，登录进行的编辑操作会保留
  <a-form
    :form="form"
    @submit="handleSubmit"
    class="login-form"
  >
    <a-form-item
      label="用户名"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 8 }"
    >
      <a-input
        autoComplete="off"
        v-decorator="[
          'userName',
          {rules: [{ required: true, message: '输入用户名' }]}
        ]"
      />
    </a-form-item>
    <a-form-item
      label="密码"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 8 }"
    >
      <a-input
        autoComplete="off"
        v-decorator="[
          'password',
          {rules: [{ required: true, message: '输入密码' }]}
        ]"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 3, offset: 8 }">
      <a-button type="primary" html-type="submit">
        登录
      </a-button>
    </a-form-item>
  </a-form>
</div>
</template>

<script>
import {BaseUrl} from "../config/config.js";
import qs from 'qs'
export default {
  data () {
    return {
      form: this.$form.createForm(this),
    };
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.axios.post(BaseUrl+"/login", 
          qs.stringify(values),
          { withCredentials: true }
        ).then(res => {
          if (res.data && res.data.code == 0) {
            this.$emit('loginSuccess', res.data.msg)
          }
        }).catch(err => {
          console.log(err);
        })
      });
    }
  },
};
</script>
<style>
  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
  }
</style>