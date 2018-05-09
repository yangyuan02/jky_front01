<template>
    <div class="superv_department">
        <div class="sup_right">
            <div class="depart_head">
                省自评进度情况
            </div>
            <div class="depart_con">
                <ul>
                    <li :class="{ active:  item.total==92}" @click="goDetail(item.code)" v-for="(item,index,) in list" :key="index">
                        <p>{{item.name}}</p>
                        <p>{{item.total}}/92</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                list:[]
            }
        },
        methods: {
            getDetail() {
                this.$ajax.get("/api/ddj_provinces").then((res) => {
                    var provinces = JSON.parse(window.localStorage.getItem("provinces"))
                    res.data.data.progress.forEach(item => {
                            provinces.forEach(itemScore =>{
                                if(item.code==itemScore.code){
                                    item.name = itemScore.name
                                }
                            })
                        });
                    this.list = res.data.data.progress
                })
            },
            goDetail(code) { //跳转详情
                this.$router.push({
                    name:'supervisorList',
                    params: {
                        code: code
                    }
                })
            }
        },
        mounted() {
            this.getDetail()
        }
    }
</script>

<style>
    .superv_department {
        display: flex;
    }
    .superv_department .sup_right {
        width: 100%;
        height: 600px;
        background: #fff;
        box-shadow: 1px 1px 8px #ccc;
        padding: 20px;
    }
    .superv_department .sup_right .depar_head {
        width: 100%;
        height: 38px;
        line-height: 38px;
        text-align: center;
        background: #a4c9e9;
        color: #fff;
    }
    .superv_department .sup_right .back {
        color: #419bf6
    }
    .superv_department .sup_right .back a {
        color: #419bf6
    }
    .superv_department .sup_right .depart_head {
        height: 38px;
        line-height: 38px;
        text-align: center;
        background: #a4c9e9;
        color: #fff;
    }
    .superv_department .sup_right .depart_con ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .superv_department .sup_right .depart_con ul li {
        width: 11.5%;
        text-align: center;
        color: #00a0e9;
        border: 1px solid #00a0e9;
        margin-top: 14px;
        cursor: pointer;
    }
    .superv_department .sup_right .depart_con ul li span {
        margin-right: 8px;
    }
    .superv_department .sup_right .depart_con ul li.active {
        color: #fff;
        border: 1px solid #4adedd;
        background: #4adedd;
    }
</style>

