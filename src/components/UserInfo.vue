<template>
    <div class="UserInfo">
         <!-- 数据未返回的时候，显示这个加载动画 -->
        <div class="loading"  v-if="isLoading">
            <img src="../assets/isLoading.gif" alt="正在加载...">
        </div>
        <div class="userInfomation" v-else>
            <section>
                <img :src="userInfo.avatar_url" alt="头像">
                <span>{{userInfo.loginname}}</span>
                <p>{{userInfo.score}}积分</p>
                <p>注册时间 {{userInfo.create_at | formatDate}}</p>
            </section>
            <div class="replies">
                <p>回复的主题</p>
                <ul>
                    <li v-for="item in items" :key="item.id">
                        <router-link :to="{
                            name:'post_content',
                            params:{
                                id:item.id
                            }
                        }">
                            {{item.title}}
                        </router-link>
                    </li>
                </ul>
            </div>

            <div class="topics">
                <p>创建的主题</p>
                <ul>
                    <li v-for="item in topicItems" :key="item.id">
                        <router-link :to="{
                            name:'post_content',
                            params:{
                                id:item.id
                            }
                        }">
                            {{item.title}}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'UserInfo',
    data(){
        return{
            isLoading:false,
            userInfo:{},
            items:[],
            topicItems:[]
        }
    },
    methods:{
        getData(){
            this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
            .then(res=>{
                console.log(1);
                
                this.isLoading = false
                console.log(res);
                this.userInfo = res.data.data
                this.items = res.data.data.recent_replies
                this.topicItems = res.data.data.recent_topics
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },
    beforeMount(){
        this.isLoading = true;
        this.getData();
    }
}
</script>

<style scoped>
.userInfomation {
    background: white;
    width: 75%;
    margin: 10px auto;
  }
  .userInfomation section {
    padding: 12px;
  }
  .userInfomation img {
    width: 30px;
  }
  .userInfomation li {
    list-style:none;
  }
  .userInfomation .replies,
  .userInfomation .topics {
    font-size: 0.72rem;
    border-top: 10px #DDDDDD solid;
  }
  .userInfomation > div > p {
    padding: 12px 0 12px 12px;
    background-color: rgba(212, 205, 205, 0.17);
    font-size: 0.75rem;
    margin: 0;
  }
  .userInfomation > div >ul > li {
    padding: 4px 0 4px 12px;
    white-space: nowrap;
    font-size: 0.72rem;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 30px;
    vertical-align: middle;
  }
  .userInfomation > div >ul > li > a {
    color: #094E99;
    text-decoration: none;
  }

</style>

