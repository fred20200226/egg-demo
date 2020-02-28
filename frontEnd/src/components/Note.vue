<template>
  <div class="box">
    <div class="login-out">
      <a-button type="primary" @click='$emit("loginOut")'>退出登录</a-button>
    </div>
    <div class="btn-wrap">
       <a-button type="primary" @click='showModal'>创建</a-button>
    </div>
    <div>
      <a-list
        itemLayout="horizontal"
        :dataSource="dataList"
      >
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions"><span @click="edit(item._id, item.content)">编辑</span></a>
          <a slot="actions"><span @click="del(item._id)">删除</span></a>
          <a-list-item-meta
            :description="item.content"
          >
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>

    <!-- 用于创建和编辑的弹窗 -->
    <a-modal
      :title="status"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      :confirmLoading="confirmLoading"
      okText="确认"
      cancelText="取消" 
    >
    <a-textarea placeholder="请输入内容" :rows="4" v-model="content"/>
    </a-modal>


  </div>
</template>

<script>

import { BaseUrl } from "../config/config";
import qs from 'qs'
export default {
  data () {
    return {
      visible: false,
      confirmLoading: false,
      status: '创建',
      content: "",
      nowId: "",
      dataList: []
    };
  },
  created() {
    this.getLists()
  },
  methods: {

    //拉取列表数据
    getLists() {
      this.axios.get(BaseUrl+"/note", {
        params: {},
        withCredentials: true
      }).then(res => {
        if (res.data && res.data.code == 0) {
          this.dataList = res.data.data;
        }
      }).catch(err => {
        console.log(err);
      })  
    },

    //点击编辑之后弹出编辑框
    edit(_id, content) {
      this.visible = true
      this.status = '编辑'
      this.nowId = _id;
      this.content = content;

      //拉取具体的某一条的数据
      // this.axios.get(BaseUrl+`/note/${_id}`, {
      //   params: {},
      //   withCredentials: true
      // }).then(res => {
      //   if (res.data && res.data.code == 0 && res.data.data) {
      //     this.content = res.data.data.content || ""
      //   }
      // }).catch(err => {
      //   console.log(err);
      // })  
    },
    //删除数据
    del(_id) {
      let that = this;
      that.$confirm({
        title: '删除',
        content: '确认删除?',
        cancelText: "取消",
        okText: "确认",
        onOk() {
          that.axios.delete(BaseUrl + `/note/${_id}`, qs.stringify({
            id: _id
          }), {withCredentials: true}).then(res => {
            if (res.data && res.data.code == 0) {
              that.dataList.forEach((item,i) => {
                if (item._id == _id) {
                  that.dataList.splice(i, 1);
                }
              })
              that.$message.success(res.data.msg);
            }
          }).catch(err => {
            console.log(err);
          })
        },
        onCancel() {},
      });
    },

    //显示弹窗
    showModal() {
      this.status = '创建'
      this.visible = true
    },

    //创建点击保存
    handleOk(e) {
      let that = this;
      if (!that.content) {
        that.visible = false;
        that.confirmLoading = false;
        that.content = '';
        return;
      }
      if (that.status == '编辑') {
        that.confirmLoading = true;
        const _id = that.nowId;
        that.axios.put(BaseUrl + `/note/${_id}`, qs.stringify({
          id: _id,
          content: that.content
        }), {withCredentials: true}).then(res => {
          if (res.data && res.data.code == 0) {
            that.dataList.forEach((item,i) => {
              if (item._id == _id) {
                that.$set(that.dataList[i], 'content', that.content)
              }
            })
            that.$message.success(res.data.msg);
          }
        }).catch(err => {
          console.log(err);
        }).finally(() => {
          that.visible = false;
          that.confirmLoading = false;
          that.content = '';
        })
        return;
      }
      this.confirmLoading = true;
      this.axios.post(BaseUrl+"/note", qs.stringify({
        content: that.content
      }), {withCredentials: true}).then(res => {
        if (res.data && res.data.code == 0) {
          that.getLists();
        }
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        that.visible = false;
        that.confirmLoading = false;
        that.content = '';
      })
    },

    //点击了取消
    handleCancel(e) {
      this.visible = false
      this.confirmLoading = false;
      this.content = '';
    }

  },
};

</script>
<style scoped lang="less">
 .box {
   position: relative;
 }
 .login-out {
   position: fixed;
   top: 30px;
   left: 20px;
 }
 .btn-wrap {
   position:sticky;
   margin-bottom: 20px;
   border-bottom: 1px solid #ccc;
   padding-bottom: 20px;
 }
 
</style>