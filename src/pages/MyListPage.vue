<template>
  <div id="MyListPage">
    <NavTag :listdata="tagList" :selected="selected"></NavTag>
    <div class="container">
      <div class="content-wrap">
        <TagInfo v-if="tagInfo" :info="tagInfo"></TagInfo>
        <h1>最新文章</h1>
        <ArticleList :listdata="articleList"></ArticleList>
        <Pagination :total="total" :limit="limit"></Pagination>
      </div>
      <div class="sidebar-wrap">
        <CommentList :listdata="commentList"></CommentList>
      </div>
    </div>
  </div>
</template>

<script>
import CommentList from '../components/CommentList'
import Pagination from '../components/Pagination'
import TagInfo from '../components/TagInfo'
import ArticleList from '../components/ArticleList'
import NavTag from '../components/NavTag'
export default {
  data() {
    return {
      tagList: [],
      total: 0,
      limit: 10,
      page: 1,
      articleList: [],
      tagInfo: '',
      commentList: [],
      selected: 0
    }
  },
  mounted() {
    const that = this;
    that.getComment();
    that.getArticles();
    that.getTags();

    that.$bus.$on('on-change', function (val) {
      that.page = val;
      that.getArticles();
    })
    that.$bus.$on('change-tag-nav', function (val) {
      that.selected = val;
      that.page = 1;
      that.tagInfo = that.tagList[val];
    })
    that.$bus.$on('change-tag-taglist', function (val) {
      that.selected = val;
      that.page = 1;
      that.tagInfo = that.tagList[val];
    })
  },
  watch: {
    '$route': function (to, from) {
      if (to.fullPath.indexOf('/mylist') < 0) {
        return
      } else {
        this.getArticles();
      }
    }
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
    // 获取对应标签的文章内容
    getArticles() {
      const that = this;
      if (!that.$route.params.id) {
        return
      } else {
        that.$http.get(that.$home + '/blog/article/fetchTag?limit=10&tag=' + that.$route.params.id + '&page=' + that.page).then(response => {
          if (response.body.errcode == 0) {
            that.articleList = response.body.article;
            that.total = response.body.count;
          }
        }, response => {
          console.log('获取失败');
        })
      }
    },
    // 获取所有标签
    getTags() {
      const that = this;
      that.$http.get(that.$home + '/blog/tag/list?limit=0&page=1').then(response => {
        if (response.body.errcode == 0) {
          that.tagList = response.body.tag;
          if (!that.$route.params.id) {
            that.$http.get(that.$home + '/blog/article/fetchTag?limit=10&tag=' + that.tagList[0]._id + '&page=' + that.page).then(response => {
              if (response.body.errcode == 0) {
                that.articleList = response.body.article;
                that.total = response.body.count;
                that.tagList.forEach((item, index) => {
                  if (item._id == that.tagList[0]._id) {
                    that.tagInfo = item;
                  }
                })
              }
            }, response => {
              console.log('获取失败');
            })
          }
          response.body.tag.forEach((item, index) => {
            if (item._id == that.$route.params.id) {
              that.tagInfo = item;
              that.selected = index;
            }
          })
          that.infoShow = true;
        }
      }, response => {
        console.log('获取失败')
      })
    },
  },
  components: {
    NavTag,
    ArticleList,
    TagInfo,
    Pagination,
    CommentList
  }
}
</script>

<style>
#MyListPage .content-wrap {
  margin-top: 15px;
}

#MyListPage .sidebar-wrap {
  margin-top: 15px;
}

#MyListPage .content-wrap h1 {
  margin: 15px;
}
</style>