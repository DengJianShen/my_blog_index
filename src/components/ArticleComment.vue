<template>
  <div>
    <div class="article-comment">
      <div class="title">
        <h2>评论
          <b>{{listdata.length}}</b>
        </h2>
      </div>
      <CommentForm></CommentForm>
      <ul class="comment">
        <li v-for="(item,index) in listdata">
          <div class="comment-box">
            <div class="headimg" style="background-image: url('https://secure.gravatar.com/avatar/?s=100&d=mm')"></div>
            <div class="info">
              <h3>{{item.from.ip}}
                <span @click="reply(index)">回复</span>
              </h3>
              <p>{{item.content}}</p>
              <CommentForm :cid="item._id" :tid="item.from._id" v-if="item.replyform==1"></CommentForm>
            </div>
            <span class="floor">#{{index+1}}</span>
          </div>
          <div class="comment-box" v-for="(_item,_index) in item.reply">
            <div class="headimg" style="background-image: url('https://secure.gravatar.com/avatar/?s=100&d=mm')"></div>
            <div class="info">
              <h3>{{_item.from.ip}} 对 {{_item.to.ip}} 说：
                <span @click="c_reply(_index,index)">回复</span>
              </h3>
              <p>{{_item.content}}</p>
              <CommentForm :cid="item._id" :tid="_item.from._id" v-if="_item.replyform==1"></CommentForm>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import CommentForm from './CommentForm'
export default {
  props: {
    listdata: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      comment_index: 0,
      reply_index: 0
    }
  },
  mounted() {
    const that = this;
    that.$bus.$on('on-comment', function (data) {
      that.listdata.push(data);
    })
    that.$bus.$on('on-reply', function (data) {
      Vue.set(that.listdata[that.comment_index], 'reply', data.reply);
    })
  },
  methods: {
    reply(index) {
      const that = this;
      that.listdata.forEach((item, index) => {
        Vue.set(item, 'replyform', 0);
      });
      Vue.set(that.listdata[index], 'replyform', 1);
    },
    c_reply(_index, index) {
      const that = this;
      that.comment_index = index;
      that.reply_index = _index;
      that.listdata.forEach((item, index) => {
        Vue.set(item, 'replyform', 0);
        item.reply.forEach((_item, _index) => {
          Vue.set(_item, 'replyform', 0);
        })
      });
      Vue.set(that.listdata[index].reply[_index], 'replyform', 1);
    }
  },
  components: {
    CommentForm
  }
}
</script>

<style>
.article-comment {
  padding: 15px 0;
}

.article-comment .title {
  margin-bottom: 15px;
  font-size: 16px;
  padding: 0 15px;
}

.article-comment h2 {
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 10px;
  font-size: 20px;
}

.article-comment h2 b {
  font-weight: normal;
  color: #ff5e52;
}

.article-comment .comment .comment-box {
  padding: 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-bottom: 1px solid #eee;
}

.article-comment .comment li .comment-box:nth-of-type(1) {
  padding-left: 15px;
}

.article-comment .comment li .comment-box {
  padding-left: 55px;
}

.article-comment .comment .comment-box .headimg {
  width: 36px;
  height: 36px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border-radius: 50%;
  margin-right: 10px;
}

.article-comment .comment .comment-box .info {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.article-comment .comment .comment-box .info p {
  margin-top: 5px;
  word-wrap: break-word;
  color: #999;
}

.article-comment .comment .comment-box:hover .info h3 span {
  display: inline-block;
}

.article-comment .comment .comment-box .info h3 span {
  display: none;
  cursor: pointer;
}

.article-comment .comment .comment-box .info h3 span:hover {
  color: #1ab394;
}

.article-comment .comment .comment-box .info .comment-form {
  margin-top: 15px;
}

.article-comment .comment .comment-box .floor {
  padding-left: 15px;
}
</style>
