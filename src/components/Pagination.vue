<template>
    <div class="pagination">
                <!-- 如果changeBtn不传递参数，会把默认的原生的event对象传递进去 -->
        <button @click="changeBtn">首页</button>
        <button @click="changeBtn">上一页</button>
        <button v-if="judge" class="pagebtn">......</button>
        <button v-for="btn in pagebtns" :key="btn.id" @click="changeBtn(btn)"
        :class="[{currentPage:btn == currentPage},'pagebtn']">
            {{btn}}
        </button>
        <button @click="changeBtn">下一页</button>
    </div>
</template>


<script>
import $ from 'jquery'
export default {
    name:"Pagination",
    data(){
        return {
            pagebtns:[1,2,3,4,5,"......"],
            currentPage:1,
            judge:false
        }
    },
    methods:{
        changeBtn(page){
            // 如果点击的是首页，上一页，下一页这3个按钮的话，传递进来的就不是数字了，而是event对象
            if(typeof page != 'number'){
                switch(page.target.innerText){
                    case '上一页':
                    // 当点击上一页的时候，当前备选按钮的上一个按钮，触发一次点击
                    $('button.currentPage').prev().click();
                    break;

                    case '下一页':
                    $('button.currentPage').next().click();
                    break;

                    case '首页':
                    this.pagebtns = [1,2,3,4,5,'......'];
                    this.changeBtn(1);
                    break;

                    default:
                    break;
                }
                return
            }
            this.currentPage = page;
            if(page > 4){
                this.judge = true;
            }
            if(page === this.pagebtns[4]){
                this.pagebtns.shift();   //移出第一个
                this.pagebtns.splice(4,0,this.pagebtns[3]+1); //添加最后一个
            }else if(page === this.pagebtns[0]&& page !=1){
                this.pagebtns.unshift(this.pagebtns[0]-1);  //当点击第一个元素的时候，在数组第一个位置加一个元素
                this.pagebtns.splice(5,1);   //然后数组最后一个元素删除
            }
            // 子组件给父组件(PostList),传递参数,参数传递过去后，PostList根据传递的页数去渲染页面
            this.$emit('handle',this.currentPage);
        }
    }
}
</script>


<style scoped>
.pagination {
    margin-top: 5px;
    margin-bottom: 20px;
    background-color: white;
    padding: 6px 20px;
    border-radius: 5px;
    /*box-shadow: 0px 2px 9px #888888;*/
    border: 1px solid #888888;
  }

  button {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #778087;
    border-radius: 3px;
    outline: none;
    height: 21px;
    cursor: pointer;
    padding: 0 2px;
    width: 55px;
    height: 29px;
  }

  .pagebtn {
    position: relative;
    bottom: 1px;
    width: 40px;
    margin: 0 4px;
  }

  .currentPage {
    color: white;
    background-color: #1f1b1b;

  }
</style>


