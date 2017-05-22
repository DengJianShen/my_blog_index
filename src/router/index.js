import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '../pages/IndexPage'
import ArticlePage from '../pages/ArticlePage'
import MyListPage from '../pages/MyListPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: IndexPage
    },
    {
      path: '/mylist/:id',
      component: MyListPage
    },
    {
      path: '/mylist',
      component: MyListPage
    },
    {
      path: '/article/:id',
      component: ArticlePage
    }
  ]
})
