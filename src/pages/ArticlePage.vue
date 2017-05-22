<template>
  <div id="ArticlePage">
    <div class="container">
      <div class="content-wrap">
        <div class="wrap">
          <v-article :info="article" :render="render"></v-article>
          <ArticleComment :listdata="articlecomment"></ArticleComment>
        </div>
      </div>
      <div class="sidebar-wrap">
        <TagList :listdata="tagList"></TagList>
        <CommentList :listdata="commentlist"></CommentList>
      </div>
    </div>
  </div>
</template>

<script>
  import TagList from '../components/TagList'
  import CommentList from '../components/CommentList'
  import ArticleComment from '../components/ArticleComment'
  import Article from '../components/Article'
  export default {
    data() {
      return {
        article: {},
        render: false,
        tagList: [],
        commentlist: [],
        articlecomment:[]
      }
    },
    mounted(){
        this.getEdit();
        this.getTags();
        this.getComment();
        this.getArticleComment();
        this.readAdd();
    },
    watch: {
      '$route': function (to, from) {
        if (to.fullPath.indexOf('/article') < 0) {
          return
        } else {
          this.getEdit();
          this.getArticleComment();
          this.readAdd();
        }
      }
    },
    methods: {
      // 获取最新评论
      getComment() {
        const that = this;
        that.$http.get(that.$home + '/blog/comment/list?limit=5&page=1').then(response => {
          if (response.body.errcode == 0) {
            that.commentlist = response.body.comment;
            that.commentState = true;
          }
        }, response => {
          console.log('获取失败');
        })
      },
      // 获取评论列表
      getArticleComment(){
        const that = this;
        that.$http.get(that.$home + '/blog/comment/fetchOne?article=' + that.$route.params.id).then(response => {
          if (response.body.errcode == 0) {
            that.articlecomment = response.body.comment;
          }
        }, response => {
          console.log('获取失败')
        })
      },
        // 文章阅读量+1
      readAdd(){
        const that = this;
        that.$http.post(that.$home + '/blog/article/readAdd',{
           _id:that.$route.params.id
        }).then(response=>{
          if (response.body.errcode == 0) {
            console.log('阅读成功');
          }
        },response=>{
          console.log('阅读失败');
        })
      },
      // 获取编辑对象
      getEdit() {
        const that = this;
        that.$http.get(that.$home + '/blog/article/fetchOne?_id=' + that.$route.params.id).then(response => {
          if (response.body.errcode == 0) {
          that.article = response.body.article;
          that.render = true;
          }
        }, response => {
          console.log('获取失败')
        })
      },
      // 获取所有标签
      getTags(){
        const that = this;
        that.$http.get(that.$home + '/blog/tag/list?limit=0&page=1').then(response => {
          if (response.body.errcode == 0) {
            that.tagList = response.body.tag;
          }
        }, response => {
          console.log('获取失败')
        })
      },
    },
    components: {
      TagList,
      CommentList,
      ArticleComment,
      'v-article': Article
    }
  }
</script>

<style>
  #ArticlePage .content-wrap {
    padding: 0 20px;
  }

  #ArticlePage .content-wrap .wrap {
    background-color: #fff;
  }
</style>
