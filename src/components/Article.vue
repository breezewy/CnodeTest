<template>
    <div class="article">
        <!-- 如果正在加载，显示此div -->
        <div class="loading"  v-if="isLoading">
            <img src="../assets/isLoading.gif" alt="正在加载...">
        </div>
        <div v-else>
            <div class="topic_header">
                <div class="topic_title">{{post.title}}</div>
                <ul>
                    <li>•发布于 {{post.create_at | formatDate}}</li>
                    <li>•作者 {{post.author.loginname}}</li>
                    <li>•{{post.visit_count}} 次浏览</li>
                    <li>•来自 {{post | tabFormatter}}</li>
                </ul>
                <!-- 帖子内容 -->
                <div v-html="post.content" class="topic_content"></div>
            </div>

            <div id="reply">
                <div class="topbar">{{post.reply_count}} 回复</div>
                <!-- 遍历回复的数组 -->
                <div v-for="(reply,index) in post.replies" :key="reply.id" class="replySec">
                   <div class="replyUp">
                    <router-link :to="{
                      name:'user_info',
                      params:{
                        loginname:reply.author.loginname
                      }
                    }">
                      <img :src="reply.author.avatar_url" alt="头像">
                      <span>{{reply.author.loginname}}</span>
                    </router-link>
                   
                    <span>
                      {{index+1}}楼
                    </span>
                    <span>
                      •{{reply.create_at | formatDate}}
                    </span>
                    <span v-if="reply.ups.length>0">
                         ☝ {{reply.ups.length}} 
                    </span>
                    <span v-else></span>
                   </div>
                   <p v-html="reply.content"></p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name:"Arcitle",
    data(){
        return {
            isLoading:false,
            post:{}   //代表当前文章页的所有的内容，所有属性
        }
    },
    methods:{
      getArticleData(){   //这里的API是获取文章详情的API，需要穿id参数,我们点击帖子标题的时候，已经把参数传递给路由了
                          //可以通过 this.$router.params.id  拿到路由接受的参数
        this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
                  .then(res=>{
                    this.isLoading = false;
                    this.post = res.data.data
                  })
                  .catch(err=>{
                    console.log(err);
                  })
      }
      
    },
    beforeMount(){
      this.isLoading = true;
      this.getArticleData();
    },
    // 专门用来检测路由变化的方法
    watch:{
      '$route'(to,from){
        this.getArticleData();
      }
    }
}
</script>

<style>
/* @import url('../assets/markdown-github.css'); */
.topbar {
    padding: 10px;
    background-color: #f6f6f6;
    height: 16px;
    font-size: 12px;
    margin-top: 10px;
  }

  .article:not(:first-child) {
    margin-right: 340px;
    margin-top: 15px;
  }

  #reply, .topic_header {
    background-color: #fff;
  }

  #reply {
    margin-top: 15px;
  }

  #reply img {
    width: 30px;
    height: 30px;
    position: relative;
    bottom: -9px;
  }

  #reply a, #reply span {
    font-size: 13px;
    color: #666;
    text-decoration: none;
  }
  .replySec{
    border-bottom:1px solid #e5e5e5;
    padding:0 10px;
  }

  .loading {
    text-align: center;
    padding-top: 300px;
  }

  .replyUp a:nth-of-type(2) {
    margin-left: 0px;
    display: inline-block;
  }

  .topic_header {
    padding: 10px;
  }

  .topic_title {
    font-size: 20px;
    font-weight: bold;
    padding-top: 8px;
  }

  .topic_header ul {
    list-style: none;
    padding: 0px 0px;
    margin: 6px 0px;
  }

  .topic_header li {
    display: inline-block;
    font-size: 12px;
    color: #838383;
  }

  .topic_content {
    border-top: 1px solid #e5e5e5;
    padding: 0 10px;
  }

  .markdown-text img {
    width: 92% !important;
  }
</style>

