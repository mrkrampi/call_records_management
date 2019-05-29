<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-layout>
            <v-dialog v-model="dialog" max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Змінити пароль</span>
                        <v-spacer></v-spacer>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex>
                                    <v-text-field label="Новий пароль" v-model="newPass" type="password"></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" flat @click="changePass">Змінити</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
    import {HTTP} from "@/util/HTTP";

    export default {
        name: "NewPassword",
        data() {
            return {
                dialog: false,
                newPass: ''
            }
        },
        methods: {
            changePass() {
                HTTP.post('/api/auth/change-password', {
                    data: this.newPass
                })
                    .then(response => {
                        console.log(response)
                    })
                    .finally(() => {
                        this.newPass = '';
                        this.dialog = false
                    });
            }
        },
        mounted() {
            this.$root.$on('change-pass', () => this.dialog = true);
        }
    }
</script>
