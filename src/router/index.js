import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article'
import PostList from '../components/PostList'
import UserInfo from '../components/UserInfo'
import SlideBar from '../components/SlideBar'


Vue.use(Router)

export default new Router({
  routes: [
    // 当我们输入 http://localhost:8080 敲回车的时候，进入的是这个根路由
    // 根路由对应的组件是PostList ，我们在app.vue中定义了router-view的name="main",所以router-view里显示的是PostList
    {
      name:'root',
      path:'/',
      components:{
        main:PostList,
      }
    },
    {
      name:'post_content',    //路由的名字
      path:'/topic/:id&author=:loginname' ,     //这里的id 就是PostList组件里的帖子标题被点击的时候，传递过来的参数
      components: {            //path要指向那个组件呢？ 需要在components里定义
        main:Article,          //这里用到了Article组件，需要先引入这个组件
        slidebar:SlideBar
      }
    },
    {
      name:'user_info',
      path:'/user/:loginname',
      components:{
        main:UserInfo
      },
    }
  ]
})
