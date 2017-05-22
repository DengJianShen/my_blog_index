<template>
  <div id="app">
    <v-header></v-header>
    <SmallMenu :show="menushow"></SmallMenu>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!--<v-footer></v-footer>-->
    <Message :showstate="showstate"></Message>
  </div>
</template>

<script>
import Header from './components/Header'
import SmallMenu from './components/SmallMenu'
// import Footer from './components/Footer'
import Message from './components/Message'
export default {
  data() {
    return {
      showstate: false,
      menushow: false
    }
  },
  mounted() {
    const that = this;
    that.saveUser();
    that.$bus.$on('toggleShow', function(state) {
      that.showstate = state;
    })
    that.$bus.$on('showMenu', function(state){
      that.menushow = state;
    });
  },
  methods: {
    saveUser() {
      const that = this;
      that.$http.post(that.$home + '/blog/people/add', {
        ip: returnCitySN["cip"]
      }).then(response => {
        if (response.body.errcode == 0) {
          localStorage.setItem("_id", response.body.people[0]._id);
          localStorage.setItem("ip", response.body.people[0].ip);
        }
      }, response => {
        console.log(response);
      })
    }
  },
  components: {
    'v-header': Header,
    // 'v-footer': Footer,
    SmallMenu,
    Message
  }
}
</script>

<style>
.m-nav-full{
  margin-top: 80px;
}
@media screen and (max-width: 768px) {
  .header {
    height: 60px !important;
  }
  .nav {
    display: none !important;
  }
  .header .container {
    -webkit-justify-content: center !important;
    justify-content: center !important;
  }
  .header .header-btn {
    display: block !important;
  }
  .sidebar-wrap {
    display: none !important;
  }
  .container .content-wrap {
    width: 100% !important;
  }
  .message-form .message{
    width: 80% !important;
    margin-left: -40% !important;
    margin-top: -175.5px !important;    
  }
  .message-form .message textarea{
    height: 160px !important;
  }
}
</style>
