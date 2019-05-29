<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container fluid grid-list-md>
        <v-layout >
            <v-flex md4>
                <v-data-iterator
                        :items="items"
                        :rows-per-page-items="rowsPerPageItems"
                        :pagination.sync="pagination"
                        content-tag="v-layout"
                        hide-actions
                        row

                >
                    <template v-slot:item="props">
                        <v-flex md11>
                            <v-card>
                                <v-card-title><h4>Статистика по працівнику</h4></v-card-title>
                                <v-divider></v-divider>
                                <v-list dense>
                                    <v-list-tile>
                                        <v-list-tile-content>Середня тривалість:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">{{ props.item.avgDuration }}
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>Максимальна тривалість:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">{{ props.item.maxDuration }}
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>Мінімальна тривалість:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">{{ props.item.minDuration }}
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-content>Загальна тривалість:</v-list-tile-content>
                                        <v-list-tile-content class="align-end">{{ props.item.fullDuration }}
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                            </v-card>
                        </v-flex>
                    </template>
                </v-data-iterator>
            </v-flex>
            <v-flex md12>
                <v-card>

                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 md6>
                                    <v-text-field v-model="user.worker.firstName" label="Імя"></v-text-field>
                                </v-flex>
                                <v-flex xs12 md6>
                                    <v-text-field v-model="user.worker.lastName" label="Прізвище"></v-text-field>
                                </v-flex>
                                <v-flex xs12 md12>
                                    <v-text-field v-model="user.worker.address" label="Адрес"></v-text-field>
                                </v-flex>
                                <v-flex xs12 md6>
                                    <v-text-field v-model="user.worker.phoneNumber" label="Номер телефону"></v-text-field>
                                </v-flex>
                                <v-flex xs12 md6>
                                    <v-text-field v-model="user.worker.email" label="Email"></v-text-field>
                                </v-flex>
                                <v-flex md6>
                                    <v-text-field v-model="user.worker.salary" label="Зарплата"></v-text-field>
                                </v-flex>
                                <v-flex md6>
                                    <v-menu
                                            min-width="240px"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            v-model="menu"
                                    >
                                        <v-text-field
                                                :value="user.worker.birthday"
                                                slot="activator"
                                                label="Дата народження"
                                                prepend-icon="date_range"
                                        ></v-text-field>
                                        <v-date-picker
                                                v-model="user.worker.birthday"
                                                no-title
                                                scrollable
                                        >
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="menu = false">OK</v-btn>
                                        </v-date-picker>
                                    </v-menu>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn flat color="red" @click="saveChanges">Зберегти зміни</v-btn>
                        <v-btn flat color="blue" v-if="showChange" @click="changePass">Змінити пароль</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <new-password></new-password>
    </v-container>
</template>

<script>
    import {HTTP} from "@/util/HTTP";
    import NewPassword from "@/components/NewPassword";

    export default {
        name: "Profile",
        components: {NewPassword},
        data() {
            return {
                user: {
                    worker: {}
                },
                rowsPerPageItems: [4, 8, 12],
                pagination: {
                    rowsPerPage: 4
                },
                items: [],
                menu: false,
                showChange: false,
            }
        },
        computed: {
            apiLink() {
                const id = this.$route.params.id;
                if (id) {
                    this.showChange = false;
                    return `${id}/analytic`;
                } else {
                    this.showChange = true;
                    return 'my-profile'
                }
            }
        },
        methods: {
            showNormalTime(time) {
                return `${parseInt(time / 60)} хв. ${time % 60} с.`
            },
            saveChanges() {
                HTTP({
                    method: "PUT",
                    url: `/api/workers/${this.user.worker.id}`,
                    data: this.user.worker,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(item => {
                    if (this.apiLink === 'my-profile') {
                        this.user.worker = item.data;
                        localStorage.setItem('user', JSON.stringify(item.data));
                        this.$store.state.user = item.data;
                    }
                    this.$root.$emit("call-snackbar", "Профіль відредаговано");
                }).catch(err => console.log(err));
            },
            changePass() {
                this.$root.$emit('change-pass');
            }
        },
        mounted() {
            HTTP.get(`/api/workers/${this.apiLink}`)
                .then(response => {
                    this.user = response.data;
                    this.items.push({
                        avgDuration: this.showNormalTime(this.user.averageDuration),
                        maxDuration: this.showNormalTime(this.user.maxDuration),
                        minDuration: this.showNormalTime(this.user.minDuration),
                        fullDuration: this.showNormalTime(this.user.fullDuration)
                    })
                })
                .catch(error => console.log(error));
        }
    }
</script>
