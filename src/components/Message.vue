<template>
  <div>
    <div class="message-form" v-if="showstate==true">
      <div class="mask" @click="hideMessage()"></div>
      <div class="message">
        <div class="title">
          <label>标题：</label>
          <input type="text" class="form-control" v-model="title" placeholder="请输入标题">
        </div>
        <div class="content">
          <label>内容：</label>
          <textarea class="form-control" v-model="content" placeholder="请输入内容"></textarea>
        </div>
        <div class="footer clearfix">
          <div class="btn cancel pull-left" @click="hideMessage()">取消</div>
          <div class="btn commit pull-right" @click="commitMessage">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showstate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: '',
      content: '',
    }
  },
  methods: {
    hideMessage() {
      this.$bus.$emit('toggleShow', false);
    },
    commitMessage() {
      const that = this;
      if (that.title == '') {
        alert('请先输入标题');
      } else if (that.content == '') {
        alert('请先输入内容');
      } else {
        that.$http.post(that.$home + '/blog/message/add', {
          title: that.title,
          content: that.content
        }).then(response => {
          if (response.body.errcode == 0) {
            alert('留言成功');
            that.title = '';
            that.content = '';
            that.hideMessage();
          }
        }, response => {
          alert('留言失败');
        })
      }
    }
  }
}
</script>

<style>
.message-form {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
}

.message-form .message {
  position: absolute;
  z-index: 5;
  top: 50%;
  left: 50%;
  width: 530px;
  margin-left: -265px;
  margin-top: -195.5px;
  padding: 15px;
  background-color: #fff;
  border-radius: 6px;
}

.message-form .message label {
  width: 100%;
  margin: 10px 0;
}

.message-form .message textarea {
  height: 200px;
}

.message-form .message .footer {
  margin-top: 10px;
}

.message-form .message .footer .btn {
  width: 100px;
  text-align: center;
  line-height: 35px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
}

.message-form .message .footer .btn.commit {
  color: #1ab394;
  border-color: #1ab394;
}
</style>
