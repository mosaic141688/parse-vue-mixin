<template>
    <v-layout row pb-12>
        <v-flex xs48 offset-xs2>
            <v-card class="card--flex-toolbar">
                <v-toolbar card prominent>
                    <v-toolbar-title class="body-12 grey--text"> {{class_name}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                        <v-icon>search</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>apps</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>more_vert</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text style="height: 200px;">
                    <v-data-table
                            :headers="headers"
                            :items="rows"
                            hide-actions
                            class="elevation-1"
                    >
                        <template slot="items" slot-scope="props">
                            <td v-for="field in custom_fields">{{ props.item.get(field)}}</td>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        parse_class: 'anything',
        name: "thing-table",
        created() {
            console.log('Thing Table created')
        },
        computed:{
            headers(){
                return this.custom_fields.map(cf => {
                    return {
                        text:cf,
                        value:cf
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>