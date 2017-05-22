<template>
  <div>
    <div class="comment-list">
      <SidebarTitle title="最新评论"></SidebarTitle>
      <ul class="comment-box">
        <li v-for="item in listdata" @click="goPage(item.article._id)">
          <div class="headimg" style="background-image: url('https://secure.gravatar.com/avatar/?s=100&d=mm')"></div>
          <div class="info">
            <h3>{{item.from.ip}}</h3>
            <p>{{item.content}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SidebarTitle from './SidebarTitle'
export default {
  props: {
    listdata: {
      type: Array
    }
  },
  methods: {
    goPage(id) {
      this.$router.push({
        path: '/article/' + id
      })
    }
  },
  components: {
    SidebarTitle
  }
}
</script>

<style>
.comment-list {
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #eaeaea;
}

.comment-list .comment-box li {
  padding: 10px;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.comment-list .comment-box li .headimg {
  width: 36px;
  height: 36px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-list .comment-box li .info {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.comment-list .comment-box li .info h3 {
  color: #1ab394;
  font-weight: 700;
  font-size: 12px;
}

.comment-list .comment-box li .info p {
  font-size: 12px;
  color: #999;
  margin: 5px 0;
  line-height: 18px;
}
</style>
