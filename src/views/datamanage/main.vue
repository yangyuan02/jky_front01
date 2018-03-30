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
                <div class="row"></div>
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
</style>

