<template>
    <div>
        <v-dialog
                v-model="dialog"
                fullscreen
                transition="dialog-bottom-transition"
                :overlay="false"
                scrollable
        >
            <v-card tile>
                <v-toolbar card dark color="primary">
                    <v-btn icon @click.native="close()" dark>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Create a new event</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click.native="save()">Save</v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-divider></v-divider>
                    <v-list three-line subheader>
                        <v-subheader>General</v-subheader>
                        <v-list-tile avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>Title</v-list-tile-title>
                                <v-list-tile-sub-title>
                                    <v-text-field
                                            label="Event Title"
                                            v-model="event.title"
                                            required
                                            box
                                    ></v-text-field>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>Venue</v-list-tile-title>
                                <v-list-tile-sub-title>
                                    <v-text-field
                                            label="Where is it taking place"
                                            v-model="event.venue"
                                            box
                                            required
                                    ></v-text-field>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>Date</v-list-tile-title>
                                <v-list-tile-sub-title>
                                    <v-text-field
                                            label="When is it taking place"
                                            v-model="event.date"
                                            type="date"
                                            required
                                            box
                                    ></v-text-field>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>Fee</v-list-tile-title>
                                <v-list-tile-sub-title>
                                    <v-text-field
                                            label="Gate Fee"
                                            v-model="event.fee"
                                            prefix="E"
                                            box
                                            type="number"
                                            required
                                    ></v-text-field>
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>Poster</v-list-tile-title>
                                <v-list-tile-sub-title>
                                    <v-avatar>
                                        <img :src="event.poster" alt="Poster">
                                    </v-avatar>
                                    <input type="file" @change="onFileChange">
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card-text>

                <div style="flex: 1 1 auto;"></div>
            </v-card>
        </v-dialog>
    </div>

</template>

<script>
    export default {
        props: ['dialog'],
        name: "newservice",
        parse_class: 'event',
        data() {
            return {
                event: {},
                poster: {}
            }
        },
        created() {
            console.log('dialog created')
        },
        methods: {
            close() {
                this.$emit('close')
            },
            onFileChange(file) {
                this.poster = file.target.files[0]
            },
            save() {
                this.save_file({file: this.poster, name: 'poster'})
                    .then(saved_file => {
                        this.event.poster = saved_file._url
                        this.save_object(this.event)
                    })

                this.$emit('save', this.event)
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>

</style>