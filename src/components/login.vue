<template>
    <v-layout row justify-center>
        <v-dialog v-model="parse" fullscreen transition="dialog-bottom-transition" :overlay="false">
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon @click.native="dialog = false" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Login</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click.native="dialog = false" v-on:click="signup">{{login?'Login':'Signup'}}</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-layout row wrap>
                    <v-flex xs4 >

                    </v-flex>
                    <v-flex xs4 id="login-form">
                        <div v-if="login">
                            <v-form >
                                <v-text-field
                                        class="login-input"
                                        label="Email"
                                        v-model="user.email"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        class="login-input"
                                        label="Password"
                                        v-model="user.password"
                                        required
                                ></v-text-field>
                            </v-form>

                        <div>
                            <span >No Account ? <a v-on:click="toge_login()">signup</a></span>
                        </div>
                        <div>
                            <span>Forgot Your Password ? <a>Recover Password</a></span>
                        </div>
                        </div>

                        <div v-if="!login">
                            <v-form >
                                <v-text-field
                                        class="login-input"
                                        label="Email"
                                        v-model="user.email"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        class="login-input"
                                        label="User Name"
                                        v-model="user.username"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        class="login-input"
                                        label="Name"
                                        v-model="user.name"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        class="login-input"
                                        label="Surname"
                                        v-model="user.surname"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        class="login-input"
                                        label="Password"
                                        v-model="user.password"
                                        required
                                ></v-text-field>
                            </v-form>

                            <div>
                                <span>Have an  Account ? <a v-on:click="toge_login()">signin</a></span>
                            </div>
                            <div>
                                <span>Forgot Your Password ? <a>Recover Password</a></span>
                            </div>
                        </div>



                    </v-flex>
                    <v-flex xs4 >

                    </v-flex>

                </v-layout>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    export default {
        name: "login",
        parse_class:"login",
        params:['login_dialog'],
            data () {
                return {
                    login:true,
                    dialog: false,
                    notifications: false,
                    sound: true,
                    widgets: false,
                    user:{}
                }
            },
        created(){
            console.log('Login created')

        },
        methods:{
            toge_login(){
                console.log('togelelogin')
                this.login = !this.login
            },
            signup(){
                let user = new this.parse.User()
                Object.keys(this.user).forEach(k =>{
                    console.log(k,this.user[k])
                    user.set(k,this.user[k])
                } )
                user.signUp(null,{
                    success(new_user){
                        console.log('Hooray Im signed up',new_user)
                        console.log('Current User',this.parse.User.current())
                    },
                    error(failed_user,error){
                        console.log('What happened',error)
                        alert(error.message)
                    }
                })
            }
        }

    }
</script>

<style >
#login-form{
    padding-top: 20%;
}
    .input-group label{
        font-size: 25px;
    }
</style>