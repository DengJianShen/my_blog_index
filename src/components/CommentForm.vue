<template>
  <div>
    <div class="comment-form">
      <div class="headimg" style="background-image:url('https://secure.gravatar.com/avatar/?s=100&d=mm')"></div>
      <div class="comment">
        <textarea v-model="content" rows="5" class="form-control" placeholder="请输入你要评论的内容"></textarea>
        <div class="commit-btn" @click="commitComment">提交</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cid: {
      type: String,
      default: ''
    },
    tid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      content: ''
    }
  },
  methods: {
    commitComment() {
      const that = this;
      if (localStorage.getItem('_id') && that.cid == '') {
        that.$http.post(that.$home + '/blog/comment/add', {
          article: that.$route.params.id,
          content: that.content,
          from: localStorage.getItem('_id')
        }).then(response => {
          if (response.body.errcode == 0) {
            that.$bus.$emit('on-comment', response.body.comment);
            that.content = '';
          }
        }, response => {
          console.log('评论失败');
        })
      } else if (localStorage.getItem('_id') && that.cid != '') {
        that.$http.post(that.$home + '/blog/comment/add', {
          article: that.$route.params.id,
          cid: that.cid,
          tid: that.tid,
          from: localStorage.getItem('_id'),
          content: that.content
        }).then(response => {
          if (response.body.errcode == 0) {
            that.$bus.$emit('on-reply', response.body.comment);
            that.content = '';
          }
        }, response => {
          console.log('评论失败');
        })
      }
      if (!localStorage.getItem('_id')) {
        alert('评论失败，身份无效');
      }
    }
  }
}
</script>

<style>
.comment-form {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  padding: 0 15px;
}

.comment-form .headimg {
  width: 36px;
  height: 36px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-form .comment {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  position: relative;
}

.comment-form .comment textarea {
  height: 68px;
}

.comment-form .comment .commit-btn {
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 0;
  width: 76px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #1ab394;
  color: #fff;
}
</style>
