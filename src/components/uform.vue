<template>
    <div>
        <v-subheader>{{title}}</v-subheader>

        <div
                v-for="(inp ,id) in fields"
                :key="id"
        >
            <v-text-field
                    v-show="inp.type!=='select'"
                    :label="inp.label"
                    :type="inp.type"
                    v-model="inputs[inp.v_model]"
            >
            </v-text-field>
            <v-select
                    v-show="inp.type==='select'"
                    :items="inp.items"
                    v-model="inputs[inp.v_model]"
                    label="Select"
                    class="input-group--focused"
                    item-value="text"
            ></v-select>
        </div>
    </div>
</template>

<script>
    export default {
        props:['title','fields','value'],
        name: "uform",
        data(){
            return{
                inputs:this.value?this.value:{}
            }
        },
        watch:{
            inputs(){
                console.log('Inputs changed')
                this.$emit('input',this.inputs)
            },
            value(){
                this.inputs = this.value
            }
        }
    }
</script>

<style scoped>

</style>