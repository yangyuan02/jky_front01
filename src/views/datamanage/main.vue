<template>
    <div>
        <div class="data">
            <div class="table_header">
                <ul>
                    <li style="width:20%;">评价内容</li>
                    <li style="width:20%;">具体评价内容</li>
                    <li style="width:20%;">指标</li>
                    <li style="width:20%;">自评等级</li>
                    <li style="width:20%;">材料操作</li>
                </ul>
            </div>
            <div class="table_body">
                <div class="row clear" v-for="(one_item,one_index) in table" :key="one_index">
                    <div class="cell_2" v-for="(two_item,two_index) in one_item" :key="two_index">
                        <div class="cell_2" v-for="(three_item,three_index) in two_item" :key="three_index">
                            <div class="cell">
                                <span style="color:#fff;background:red;">  {{three_item.one=='a'?'':three_item.one}} </span>
                                <span style="color:green">  {{three_item.two=='b'?'':three_item.two}} </span>
                                <span style="color:black">  {{three_item.three}} </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                table: []
            }
        },
        methods: {
            getData() {
                this.$ajax.get('/api/role_points', {}).then((res) => {
                    this.table = res.data
                    // console.log(this.table)
                }, (err) => {
                    console.log(err)
                })
            },
            grade(level, point_id) { //评分
                this.$ajax.post('/api/role_points/save_point', {
                    "point_id": point_id,
                    "self_point": level
                }).then((res) => {
                    console.log(res.data)
                }, (err) => {
                    console.log(err)
                })
            },
            goDatail(id) { //跳转详情
                this.$router.push({
                    name: 'upload',
                    params: {
                        id: id
                    }
                })
            }
        },
        created() {
            this.getData()
        }
    }
</script>

<style>
    .data {
        width: 1053px;
        margin-top: 36px;
        margin-left: 40px;
    }
    .table_header ul {
        display: flex;
        height: 52px;
        background: #2dc9b9;
        align-items: center;
        color: #fff;
    }
    .table_header ul li {
        text-align: center;
    }
    .table_body {
        width: 100%;
    }
    .table_body .row{
        border: 1px solid red;
    }
    .table_body .row .cell span{
        display: inline-block;
    }
    .table_body .row .cell span:nth-child(1){
        width: 20%;
    }
    .table_body .row .cell span:nth-child(2){
        width: 20%;
    }
    .table_body .row .cell span:nth-child(3){
        width: 20%;
    }
</style>

