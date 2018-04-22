<template>
    <div>
        <newqueue
                :dialog="create_dialog"
                @close="create_dialog=false"
                @save="save"
        ></newqueue>
        <v-btn flat @click="create_dialog=true">
            Create new queue
        </v-btn>
    </div>
</template>

<script>
    import newqueue from './newqueue'
    export default {
        components: {newqueue},
        name: "queues",
        parse_class:'queue',
        data(){
            return{
                create_dialog:false,
                queues:[]
            }
        },
        created(){
          this.get_queues()
        },
        methods:{
            save(queue_data){
                queue_data.service = this.service_id;
                console.log('SAVE QUEUE')
                console.log(queue_data)
            },
            get_queues(){
                let service_query = [
                    {
                        query: 'equalTo',
                        field: 'created_by',
                        val: this.current_user.id
                    }
                ]

                this.run_query(service_query)
                    .then(result => {
                        console.log('Query Service', result[0].attributes)
                        let service = {}
                        if (!result[0]) return
                        Object.keys(result[0].attributes).forEach(r => service[r] = result[0].attributes[r])
                        this.service_id = result[0].id
                        let queues_query = [
                            {
                                query: 'equalTo',
                                field: 'service',
                                val: this.service_id
                            }
                        ]
                        this.run_query(_result => {
                            this.queues = _result
                            console.log('Queues',this.queues)
                        })
                    })
            }

        }
    }
</script>

<style scoped>

</style>