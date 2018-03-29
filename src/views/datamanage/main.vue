<template>
    <div>
        <Breadcrumb>
        </Breadcrumb>
        <div class="data">
            <div class="list" v-for="(item,index) in table" :key="index">
                <div class="one">{{item.one}}</div>
                <div class="two">
                    <div v-for="(two_item,_index) in item.role2" :key="_index">
                        {{two_item.two}}
                    </div>
                </div>
                <div class="three">
                    <div v-for="(two_item,_index) in item.role2" :key="_index">
                        <div v-for="(three_item,_index) in two_item.role3" :key="_index">{{three_item.three}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Breadcrumb from '@/components/common/breadcrumb'
    export default {
        data() {
            return {
                table: []
            }
        },
        components: {
            Breadcrumb
        },
        methods: {
            getData() {
                this.$ajax.get('/api/role_points', {}).then((res) => {
                    this.table= res.data.role1
                }, (err) => {
                    console.log(err)
                })
            },
            grade(level,point_id){//评分
                this.$ajax.post('/api/role_points/save_point',{"point_id":point_id,"self_point":level}).then((res)=>{
                    console.log(res.data)
                },(err)=>{
                    console.log(err)
                })
            },
            goDatail(id){//跳转详情
                this.$router.push({ name: 'upload', params: { id:  id}})
            }
        },
        created() {
            this.getData()
        }
    }
</script>

<style>
    .list{
        display: flex;
    }
    .one{
        display: flex;
        align-items: center;
        width:250px;
        justify-content: center;
    }
</style>

