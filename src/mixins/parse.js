import router from "../router";

const Parse = require('parse')
Parse.initialize("myAppId");
Parse.serverURL = 'http://localhost:3000/parse'
Parse.masterKey = 'myMasterKey'

const parseMixin = function({router}){
    router.beforeEach((to, from, next) => {
        console.log('to',to,'from',from)
        console.log('Router in Parse',);
        let redirect_to_login = to.path!=='/login'
                         && !Parse.User.current();

        let redirect_to_home = to.path === '/login'
                                && Parse.User.current()

        if(redirect_to_login){
            console.log('Redirected to login')
            return next('/login')
        }

        if(redirect_to_home){
            console.log('Rederict to home')
            return next('/')
        }

        console.log('Default')
        return next()
        // ...
    })

  return  {
        data() {
        return {
            custom_fields: ['field1'],
            class_name: '',
            $rows:[]
        }
    },
        created: function () {
            this.init_parse()
        },
        methods: {
            getRoles(){
                var Role
            }

        ,
            init_parse: function () {
                console.log('init parse',this.$options.parse_class)
                const class_name = this.$options.parse_class
                const account = this.$options.account
                if(account) this.user = Parse.User
                if (!class_name) return
                this.class_name = class_name
                const schema = new Parse.Schema(class_name)
                const self = this;
                console.log('class_name',class_name)
                this.parse = Parse;
                schema.get({
                    success(_schema) {
                        self.custom_fields = Object.keys(_schema.fields)
                            .filter(field => !['ACL', 'createdAt', 'updatedAt', 'objectId'].includes(field))
                        let query = new Parse.Query(self.class_name)
                        let subscription = query.subscribe();


                        subscription.on('open', () => {
                            console.log('subscription opened');
                        });

                        subscription.on('create', (object) => {
                            console.log('object created',object);
                            self.$rows.push(object)
                        });


                        subscription.on('update', (object) => {
                            console.log('object updated',object);
                            self.$rows = self.rows.map(row => row.id===object.id?object:row)
                        });

                        query.find({
                            success(result){
                                self.$rows = result
                            },
                            error(){
                                console.log('Query Fail')
                            }
                        })
                    },
                    error() {
                        console.log('Get Schema fail')
                    }
                })
            },
            login(user){
                console.log('Login')
                return new Promise(((resolve, reject) => {
                    const _user = new Parse.User()
                    _user.set('username',user.email)
                    _user.set('password',user.password)
                    Parse.User.logIn(user.email,user.password,{
                        success:resolve,
                        error(us,er){
                            console.log("Login Fail",er)
                            reject(er)
                        }
                    })

                }))

            },
            sign_out(){
                return new Promise(((resolve, reject) =>{
                    Parse.User.logOut()
                        .then(resolve)
                        .catch(reject)

                } ))

            },
            signup(user){
                console.log('Signup')
                return new Promise((resolve, reject) => {
                    let _user = new Parse.User()
                    Object.keys(user)
                        .forEach(key => _user.set(key,user[key]))
                    _user.set('username',user.email)

                    _user.signUp(null,{
                        success(new_user){

                            resolve(new_user)
                        },
                        error(failed_user,_error){
                            console.log('rejecting',_error)
                            reject(_error)
                        }
                    })
                    console.log(_user)
                })

            }
        }
    }
}

export default parseMixin;