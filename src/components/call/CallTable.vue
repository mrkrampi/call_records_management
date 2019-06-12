<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-card>
            <v-card-title>
                Дзвінки
                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Пошук"
                        single-line
                        hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                    :headers="headers"
                    :items="items"
                    :loading="loading"
                    :pagination.sync="pagination"
                    :search="search"
                    class="elevation-10"
            >
                <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
                <template v-slot:items="props">
                    <td>{{ showNormalTime(props.item.duratrion) }}</td>
                    <td>{{ getDate(props.item.callDate) }}</td>
                    <td>{{ getTime(props.item.callDate) }}</td>
                    <td>{{ props.item.status }}</td>
                    <td>{{ props.item.worker.firstName + ' ' + props.item.worker.lastName }}</td>
                    <td>{{ props.item.user.firstName + ' ' + props.item.user.lastName }}</td>
                    <td class="justify-center layout px-0">
                        <v-icon
                                small
                                @click="deleteItem(props.item)"
                        >
                            delete
                        </v-icon>
                    </td>
                </template>
                <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
                <template v-slot:no-data>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script>
    import {HTTP} from "@/util/HTTP";

    export default {
        name: "CallTable",
        props: {
            currentOnly: Boolean,
        },
        data() {
            return {
                pagination: {
                    rowsPerPage: 10
                },
                search: '',
                items: [],
                loading: true,
                headers: [
                    {text: 'Тривалість', value: 'name', sortable: false},
                    {text: 'Дата дзвінка', value: 'address', sortable: false},
                    {text: 'Час дзвінка', value: 'address', sortable: false},
                    {text: 'Статус', value: 'phoneNumber', sortable: false},
                    {text: 'Працівник', value: 'birthday', sortable: false},
                    {text: 'Клієнт', value: 'email', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false}
                ],
            }
        },
        watch: {
            whose: {
               async handler(whose) {
                    try {
                        const { data } = await HTTP.get(`/api/calls/${whose}`);
                        this.items = data;
                    } catch (e) {
                        console.log(e);
                    } finally {
                        this.loading = false;
                    }
                },
                immediate: true
            }
        },
        computed: {
            whose() {
                return this.currentOnly ? "my" : '';
            }
        },
        methods: {
            async deleteItem(item) {
                try {
                    await HTTP.delete(`api/calls/` + item.id);

                    this.$root.$emit("call-snackbar", "Запис видалено");
                    const index = this.items.findIndex(x => x.id === item.id);
                    this.items.splice(index, 1);
                } catch (e) {
                    console.log(e);
                }
            },
            showNormalTime(time) {
                return `${parseInt(time / 60)} хв. ${time % 60} с.`
            },
            getDate(date) {
                return date.split('@')[0];
            },
            getTime(date) {
                return date.split('@')[1];
            }
        },
        mounted() {
            this.$root.$on("edit-item", (item) => {
                let index = this.items.findIndex(x => x.id === item.id);
                this.items.splice(index, 1, item);
            });
            this.$root.$on("add-item", (item) => {
                this.items.unshift(item);
            });
        }
    }
</script>
