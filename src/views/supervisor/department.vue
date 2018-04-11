<template>
    <div class="department">
        <SideNav></SideNav>
        <div class="sup_right">
            <div class="back">
                <i class="iconfont">&#xe617;</i>
                <a href="javascript:;">返回</a>
            </div>
            <div class="depart_head">
                被评估单位进度
            </div>
            <div class="depart_con">
                <ul>
                    <li class="active"><span>北京市</span><span>10/10</span></li>
                    <li class="active"><span>北京市</span><span>10/10</span></li>
                    <li class="active"><span>北京市</span><span>10/10</span></li>
                    <li class="active"><span>北京市</span><span>10/10</span></li>
                    <li class="active"><span>北京市</span><span>10/10</span></li>
                    <li class="active"><span>北京市</span><span>10/10</span></li>
                    <li class="active"><span>北京市</span><span>10/10</span></li>
                    <li><span>北京市</span><span>10/10</span></li>
                    <li><span>北京市</span><span>10/10</span></li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>

import SideNav from "@/components/supervisor/SideNav";

export default {
    components:{
        SideNav
    }
}
</script>

<style>
    .department{
        display: flex;
    }
    .sup_right{
        width: calc(100% - 352px - 20px - 40px);
        height: 600px;
        border:1px solid red;
        background: #fff;
        box-shadow: 1px 1px 8px #ccc;
        padding: 20px;
    }
    .sup_right .depar_head{
        width: 100%;
        height: 38px;
        line-height: 38px;
        text-align: center;
        background: #a4c9e9;
        color: #fff;
    }
    .sup_right .back{
        color: #419bf6
    }
    .sup_right .back a{
        color: #419bf6
    }
    .sup_right .depart_head{
        height: 38px;
        line-height: 38px;
        text-align: center;
        background: #a4c9e9;
        color: #fff;
    }
    .sup_right .depart_con ul{
        display: flex;
        justify-content:space-between;
        flex-wrap: wrap;
    }
    .sup_right .depart_con ul::after{
         content: "";
         flex: auto;
    }
    .sup_right .depart_con ul li{
        padding: 10px 5px;
        color: #00a0e9;
        border: 1px solid #00a0e9;
        width: 120px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 14px;
        /* margin-right: 10px; */
    }
    .sup_right .depart_con ul li:nth-child(7n){
        margin-right: 0px;
    }
    .sup_right .depart_con ul li.active{
        color: #fff;
        border:1px solid #4adedd;
        background: #4adedd;
    }
</style>

