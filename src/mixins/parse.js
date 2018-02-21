const Parse = require('parse')
Parse.initialize("myAppId");
Parse.serverURL = 'http://localhost:3000/parse'
Parse.masterKey = 'myMasterKey'

const parseMixin = {
    data() {
        return {
            custom_fields: ['field1'],
            class_name: '',
            rows:[]
        }
    },
    created: function () {
        this.init_parse()
    },
    methods: {
        init_parse: function () {
            const class_name = this.$options.parse_class
            if (!class_name) return
            this.class_name = class_name
            const schema = new Parse.Schema(class_name)
            const self = this;
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

                    });


                    subscription.on('update', (object) => {
                        console.log('object updated');
                    });

                    query.find({
                        success(result){
                            self.rows = result.map(item => {
                                let row = {}
                                self.custom_fields.forEach(field => row[field] = item.get(field))
                                return row
                            })

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