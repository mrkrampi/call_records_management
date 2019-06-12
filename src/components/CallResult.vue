<template>
    <div class="text-xs-center">
        <v-dialog
                v-model="dialog"
                width="700"
        >
            <v-card>
                <v-card-title
                        class="headline grey lighten-2"
                        primary-title
                >
                    Результат дзвінка
                </v-card-title>

                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 m5>
                                <v-text-field
                                        :value="call.worker.firstName + ' ' + call.worker.lastName"
                                        label="Працівник"
                                        readonly
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md5 offset-md1>
                                <v-text-field
                                        :value="call.user.firstName + ' ' + call.user.lastName"
                                        label="Отримувач"
                                        readonly
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                                <v-text-field
                                        :value="call.duratrion"
                                        label="Тривалість"
                                        readonly
                                ></v-text-field>
                            </v-flex>
                            <v-flex md12>
                                <v-textarea
                                        flat
                                        name="input-call"
                                        label="Інформація про дзвінок"
                                        :value="callLog"
                                        readonly
                                ></v-textarea>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="primary"
                            flat
                            @click="dialog = false"
                    >
                        Зрозуміло
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "CallResult",
        data() {
            return {
                call: {
                    worker: {
                        firstName: '',
                        lastName: ''
                    },
                    user: {
                        firstName: '',
                        lastName: ''
                    },
                    duration: 0,
                },
                callLog: 'ss',
                dialog: false,
            }
        },
        mounted() {
            this.$root.$on('show-dialog', (call, callLog) => {
                this.dialog = true;
                this.call = call;
                this.callLog = callLog;
            })
        }
    }
</script>
