const Parse = require('parse')
Parse.initialize("myAppId");
Parse.serverURL = 'http://localhost:3000/parse'
Parse.masterKey = 'myMasterKey'

const parseMixin = {
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
        init_parse: function () {
            console.log('init parse',this.$options.parse_class)
            const class_name = this.$options.parse_class
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
        }
    }
}

export default parseMixin;