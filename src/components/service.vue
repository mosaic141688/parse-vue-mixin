<template>
    <div>
        <v-card>
            <v-toolbar card dark prominent color="primary">
                <v-toolbar-title>Details of your Service</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark flat @click.native="save_service">Save</v-btn>
                </v-toolbar-items>
                <v-menu bottom right offset-y>
                </v-menu>
            </v-toolbar>
            <v-card-text>
                <uform :fields="general_form.fields" :title="general_form.title" :value="general_form.data" v-model="general_form.data"></uform>
                <uform :fields="contact_form.fields" :title="contact_form.title" :value="contact_form.data"v-model="contact_form.data"></uform>
                Oprational Hours
                <div

                >


                    <v-layout row wrap>
                        <v-spacer></v-spacer>
                        <v-flex xs3  v-for="oh in operation_hours" :key="oh.id">
                            <v-card>
                                <v-card-text class="px-0">
                                    <uform :fields="oh.fields" :title="oh.title" :value="oh.data" v-model="oh.data"></uform>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>

                </div>
            </v-card-text>
            <v-card-actions xs12>
                <v-spacer></v-spacer>

                <v-btn flat color="accent">Save</v-btn>

            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import uform from './uform'

    export default {
        parse_class: 'service',
        name: "service",
        components: {uform},
        data() {
            return {
                service: {},
                //ui
                general_form: {
                    title: 'General Information',
                    data:{},
                    fields:
                        [
                            {label: "Service Name", v_model: 'name', type: 'text', id: 0},
                            {label: "Stuffs to bring", v_model: 'requirements', type: 'text', id: 2},
                            {
                                label: "Service Name",
                                v_model: 'category',
                                type: 'select',
                                id: 1,
                                items: ['Government', 'Health', 'Other']
                            }
                        ]
                },
                contact_form: {
                    title: 'Contact Information',
                    fields:
                        [
                            {label: "Physical Address", v_model: 'address', type: 'text', id: 0},
                            {label: 'Email Address', v_model: 'email', type: 'text', id: 1},
                            {label: 'Tel', v_model: 'phone', type: 'number', id: 2}
                        ]
                },
                operation_hours: [
                    {
                        title: 'Week days',
                        fields: [
                            {
                                label: "Opening Time",
                                type: 'time',
                                v_model: 'weekday_start_time'
                            },
                            {
                                label: "Closing Time",
                                type: 'time',
                                v_model: 'weekday_end_time'
                            },
                        ]


                    },
                    {
                        title: 'Saturday',
                        fields: [
                            {
                                label: "Opening Time",
                                type: 'time',
                                v_model: 'saturday_start_time'
                            },
                            {
                                label: "Closing Time",
                                type: 'time',
                                v_model: 'saturday_end_time'
                            },
                        ]


                    },
                    {
                        title: 'Sundays',

                        fields: [
                            {
                                label: "Opening Time",
                                type: 'time',
                                v_model: 'sunday_start_time'
                            },
                            {
                                label: "Closing Time",
                                type: 'time',
                                v_model: 'suinday_end_time'
                            },
                        ]

                    },
                    {
                        title: 'Public Holidays',
                        fields: [
                            {
                                label: "Opening Time",
                                type: 'time',
                                v_model: 'holidays_start_time'
                            },
                            {
                                label: "Closing Time",
                                type: 'time',
                                v_model: 'holidays_end_time'
                            },
                        ]

                    }
                ]
            }
        },
        created(){
          this.get_my_service()
        },
        methods: {
            save_service() {
                let service = {
                    ...this.general_form.data,
                    ...this.contact_form.data,
                    ...this.operation_hours.reduce((ac,oh) =>{
                        return {...ac,...oh.data}
                    } ,{})
                }

                this.save_object(service)
                    .then(obj => console.log('Saved'))
                    .catch(err => console.log('No Saved'))
            },
            get_my_service() {
                let parse_query = [
                    {
                        query: 'equalTo',
                        field: 'created_by',
                        val: this.current_user.id
                    }
                ]

                this.run_query(parse_query)
                    .then(result => {
                        console.log('Query Service', result[0].attributes)
                        let service = {}
                        if (!result[0]) return
                        Object.keys(result[0].attributes).forEach(r => service[r] = result[0].attributes[r])
                        service.id = result[0].id
                        this.general_form.data = service
                        this.contact_form.data = service
                        this.operation_hours = this.operation_hours.map(op => {
                            op.data = service;
                            return op
                        })
                    })
            }
        }

    }
</script>

<style scoped>

</style>