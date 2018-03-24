<template>
    <v-app>
        <v-navigation-drawer
                fixed
                :mini-variant="miniVariant"
                :clipped="clipped"
                v-model="drawer"
                app
        >
            <v-list>
                <v-list-tile
                        value="true"
                        v-for="(item, i) in items"
                        :key="i"
                >
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed app :clipped-left="clipped">
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-btn icon @click.stop="miniVariant = !miniVariant">
                <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
            </v-btn>
            <v-btn icon @click.stop="clipped = !clipped">
                <v-icon>web</v-icon>
            </v-btn>
            <v-btn icon @click.stop="fixed = !fixed">
                <v-icon>remove</v-icon>
            </v-btn>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.stop="rightDrawer = !rightDrawer">
                <v-icon>menu</v-icon>
            </v-btn>
        </v-toolbar>
        <v-content>
            <v-container fluid>
                <v-slide-y-transition mode="out-in">
                    <v-layout column align-center>
                        <router-view></router-view>
                    </v-layout>
                </v-slide-y-transition>
            </v-container>
        </v-content>
        <v-navigation-drawer
                temporary
                :right="right"
                v-model="rightDrawer"
                fixed
        >
            <v-list>
                <v-list-group
                        v-model="item.active"
                        v-for="item in right_menu_items"
                        :key="item.title"
                        :prepend-icon="item.action"
                        no-action
                >

                    <v-list-tile slot="activator">
                        <v-list-tile-action>
                            <v-icon v-html="item.icon"></v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click="subItem.action()">
                        <v-list-tile-content>
                            <v-list-tile-title>{{ subItem.title }}{{item.action}}</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <v-icon>{{ subItem.icon }}</v-icon>
                        </v-list-tile-action>
                    </v-list-tile>

                </v-list-group>
            </v-list>
        </v-navigation-drawer>
        <v-footer :fixed="fixed" app>
            <span>&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script>
    import ThingTable from "./thing-table";
    import login from './components/login'

    export default {
        components: {ThingTable, login},
        parse_class: 'anything',
        data() {
            return {
                clipped: false,
                drawer: true,
                fixed: false,
                items: [
                    {icon: 'home', title: 'Home'},
                    {icon: 'home', title: 'Events'},
                    {icon: 'home', title: 'Artists'}

                ],
                right_menu_items: [
                    {
                        icon: 'account_circle', title: 'user', items: [
                            {title: 'logout', icon: 'directions_run', action: this.logout},
                            {title: 'change password'}
                        ]
                    }
                ],

                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: 'SEEMA'
            }
        },
        computed: {
            login_dialog: () => true
        },
        created() {
            console.log('Current User', this.parse.User.current())
            if (this.parse.User.current()) {
                console.log('Current User', this.parse.User.current())
                this.access = 'home'
            }
            this.access = 'home'
            console.log('Admin', this.access)
        },
        methods: {
            logout() {
                this.sign_out()
                    .then(x => {
                        console.log('Logedout')
                        this.$router.replace('/login')
                    })
                    .catch(e =>{
                        console('Encounted error')
                        alert(e)
                    } )
            }
        }

    }

</script>
