<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-card>
            <v-card-title>
                Працівники
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
                       <td @click="showPort(props.item.id)">{{ props.item.firstName + ' ' + props.item.lastName }}</td>
                       <td @click="showPort(props.item.id)">{{ props.item.address }}</td>
                       <td @click="showPort(props.item.id)">{{ props.item.phoneNumber }}</td>
                       <td @click="showPort(props.item.id)">{{ props.item.salary }}</td>
                       <td @click="showPort(props.item.id)">{{ props.item.birthday }}</td>
                       <td @click="showPort(props.item.id)">{{ props.item.email }}</td>
                    <td class="justify-center layout px-0">
                        <v-icon
                                small
                                class="mr-2"
                                @click="editItem(props.item)"
                        >
                            edit
                        </v-icon>
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
        name: "WorkerTable",
        data() {
            return {
                pagination: {
                    rowsPerPage: 10
                },
                search: '',
                items: [],
                loading: true,
                headers: [
                    {text: 'ПІБ', value: 'name', sortable: false},
                    {text: 'Адреса', value: 'address', sortable: false},
                    {text: 'Номер телефону', value: 'phoneNumber', sortable: false},
                    {text: 'Зарплата', value: 'salary', sortable: false},
                    {text: 'Дата народження', value: 'birthday', sortable: false},
                    {text: 'Email', value: 'email', sortable: false},
                    {text: 'Дії', value: 'action', sortable: false}
                ],
            }
        },
        methods: {
            async deleteItem(item) {
                try {
                    await HTTP.delete(`api/workers/` + item.id);
                    this.$root.$emit("call-snackbar", "Запис видалено");
                    let index = this.items.findIndex(x => x.id === item.id);
                    this.items.splice(index, 1);
                } catch (e) {
                    console.log(e);
                }
            },
            editItem(item) {
                this.$root.$emit("item-edit-dialog", item);
            },
            showPort(id) {
                this.$router.push(`/portfolio/${id}`)
            }
        },
        async mounted() {
            try {
                const {data} = await HTTP.get('/api/workers');
                this.items = data;
            } catch (e) {
                console.log(e);
            } finally {
                this.loading = false;
            }

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
