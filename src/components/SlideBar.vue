<template>
    <div class="authorinfo">
        <div class="authorsummary">
            <div class="topbar">作者</div>
            <router-link :to="{
                name:'user_info',
                params:{
                    name:userinfo.loginname
                }
            }">
                <img :src="userinfo.avatar_url" >
            </router-link>
        </div>
        <div class="recent_topics">
            <div class="topbar">最近主题</div>
            <ul>
                <li v-for="list in topiclimitby5" :key="list.id">
                   <router-link :to="{
                       name:'post_content',
                       params:{
                           id:list.id,
                           loginname:list.author.loginname
                       }
                   }">
                        {{list.title}}
                   </router-link>
                </li>
            </ul>
        </div>
         <div class="recent_replies">
             <div class="topbar">最近回复</div>
             <ul>
                <li v-for="list in replylimitby5" :key="list.id">
                    <router-link :to="{
                       name:'post_content',
                       params:{
                           id:list.id,
                           loginname:list.author.loginname
                       }
                   }">
                        {{list.title}}
                   </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
export default {
    name:"SlideBar",
    data(){
        return{
            userinfo:{}
        }
    },
    methods:{
        getData(){
            // 写参数的时候，一定要注意，前边斜杠是不是齐全的
            this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.loginname}`)
            .then(res=>{
                console.log(res);
                this.userinfo = res.data.data
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },
    computed:{
        topiclimitby5(){
            if(this.userinfo.recent_topics){
                return this.userinfo.recent_topics.slice(0,5);
            }
        },
        replylimitby5(){
            if(this.userinfo.recent_replies){
                return this.userinfo.recent_replies.slice(0,5);
            }
        }
    },
    beforeMount(){
        this.getData();
    }
}
</script>


<style scoped>
.authorsummay, .recent_replies, .recent_topics {
    background-color: #fff;
  }
  .authorinfo {
    width: 328px;
    float: right;
    margin-top: 0;
  }
  li{
    padding: 3px 0 ;
  }
  .recent_replies ul, .recent_topics ul {
    margin-top: 0px;
    margin-bottom: 0px;
    list-style: none;
    padding-left: 14px;
  }

  ul a {
    font-size: 12px;
    text-decoration: none;
    color: #778087;
  }

  .topbar {
    padding: 10px;
    background-color: #f6f6f6;
    height: 16px;
    font-size: 12px;
    margin-top: 10px;
  }

  img {
    height: 48px;
    width: 48px;
    border-radius: 3px;
    margin: 10px;
  }

  .loginname {
    width: 100px;
    float: right;
    margin-top: 22px;
    margin-right: 159px;
    font-size: 14px;
  }

  .loginname a {
    text-decoration: none;
    color: #778087;
  }

  .authorsummay .topbar {
    margin-top: 0px;
  }
</style>


