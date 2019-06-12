<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-dialog v-model="dialog" max-width="700">
        <template v-slot:activator="{ on }">
            <v-btn fab dark color="indigo" v-on="on" fixed right bottom>
                <v-icon dark>add</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">{{formTitle}}</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 md6>
                            <v-text-field v-model="item.firstName" label="Імя"></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-text-field v-model="item.lastName" label="Прізвище"></v-text-field>
                        </v-flex>
                        <v-flex xs12 md12>
                            <v-text-field v-model="item.address" label="Адрес"></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-text-field v-model="item.phoneNumber" label="Номер телефону"></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-text-field v-model="item.email" label="Email"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="close">Відмінити</v-btn>
                <v-btn color="blue darken-1" flat @click="save">Зберегти</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {HTTP} from "@/util/HTTP";

    export default {
        name: "UserDialog",
        data() {
            return {
                dialog: false,
                item: {},
                menu: false,
            }
        },
        computed: {
            formTitle() {
                return this.item.id ? "Редагування" : "Додавання";
            }
        },
        watch: {
            dialog(newValue) {
                if (!newValue) {
                    this.close();
                }
            }
        },
        methods: {
            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.item = Object.assign({}, this.defaultCategory);
                }, 300)
            },
            async save() {
                try {
                    const {data} = await HTTP({
                        method: this.item.id ? "PUT" : "POST",
                        url: "api/users/" + (this.item.id || ""),
                        data: this.item,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    this.close();
                    this.$root.$emit("call-snackbar", this.item.id ? "Запис відредаговано" : "Запис додано");
                    this.$root.$emit((this.item.id ? "edit" : "add") + "-item", data)
                } catch (e) {
                    console.log(e);
                }
            }
        },
        mounted() {
            this.$root.$on("item-edit-dialog", (item) => {
                this.item = Object.assign({}, item);
                this.dialog = true;
            });
        }
    }
</script>
