<template>
  <div id="IndexPage">
    <div class="container">
      <div class="content-wrap">
        <TagInfo :info="tagInfo"></TagInfo>
        <h1>最新文章</h1>
        <ArticleList :listdata="articleList"></ArticleList>
        <Pagination :limit="limit" :total="total"></Pagination>
      </div>
      <div class="sidebar-wrap">
        <NoticeList :info="noticeList"></NoticeList>
        <TagList :listdata="tagList"></TagList>
        <CommentList :listdata="commentList"></CommentList>
      </div>
    </div>
  </div>
</template>

<script>
  import TagInfo from '../components/TagInfo'
  import NoticeList from '../components/NoticeList'
  import TagList from '../components/TagList'
  import CommentList from '../components/CommentList'
  import ArticleList from '../components/ArticleList'
  import Pagination from '../components/Pagination'
  export default {
    data() {
      return {
        'articleList': [],
        'tagInfo': {
          'title': 'web前端工程师',
          'info': 'Web前端开发工程师，主要职责是利用(X)HTML/CSS/JavaScript/Flash等各种Web技术进行客户端产品的开发。完成客户端程序（也就是浏览器端）的开发，开发JavaScript以及Flash模块，同时结合后台开发技术模拟整体效果，进行丰富互联网的Web开发，致力于通过技术改善用户体验。',
          'link': 'http://baike.baidu.com/link?url=HTxAQ40uyUqDT5NwFlm7iCgmciJMWQswVqoE7OV-YxRA93sUthAXtJUvWe_M7XAHLjzHzr_VDeXDwuUgGn0LHMuq8s9ZrWU8S2KvdERuSIv_b_ngdfrvrJB9rKXXk7eZ'
        },
        'navFull':false,
        'noticeList': [],
        'tagList': [],
        'total': 0,
        'limit':10,
        'page':1,
        'commentList': []
      }
    },
    mounted() {
      const that = this;
      that.getTags();
      that.getNotices();
      that.getArticles(1);
      that.getComment();
      that.$bus.$on('on-change',function(val){
         that.page = val;
         that.getArticles();
      })
    },
    methods: {
      // 获取最新评论
      getComment() {
        const that = this;
        that.$http.get(that.$home + '/blog/comment/list?limit=5&page=1').then(response => {
          if (response.body.errcode == 0) {
            that.commentList = response.body.comment;
            that.commentState = true;
          }
        }, response => {
          console.log('获取失败');
        })
      },
      // 获取文章
      getArticles() {
        const that = this;
        that.$http.get(that.$home + '/blog/article/list?limit='+ that.limit +'page=' + that.page).then(response => {
          if (response.body.errcode == 0) {
            that.articleList = response.body.article;
            that.total = response.body.count;
          }
        }, response => {
          console.log('获取失败');
        })
      },
      // 获取所有标签
      getTags() {
        const that = this;
        that.$http.get(that.$home + '/blog/tag/list?limit=0&page=1').then(response => {
          if (response.body.errcode == 0) {
            that.tagList = response.body.tag;
          }
        }, response => {
          console.log('获取失败')
        })
      },
      // 获取公告列表
      getNotices() {
        const that = this;
        that.$http.get(that.$home + '/blog/notice/list?limit=5&page=1').then(response => {
          if (response.body.errcode == 0) {
            that.noticeList = response.body.notice;
          }
        }, response => {
          console.log('获取失败');
        })
      },
    },
    components: {
      TagInfo,
      NoticeList,
      TagList,
      CommentList,
      ArticleList,
      Pagination
    }
  }
</script>

<style>
  
</style>
