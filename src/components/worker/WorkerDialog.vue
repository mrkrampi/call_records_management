
<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-dialog v-model="dialog" max-width="600" persistent>
        <template v-slot:activator="{ on }">
            <v-btn outline dark color="indigo" v-on="on" fixed top right class="btn">
                Додати запис
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">{{formTitle}}</span>
            </v-card-title>

            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex v-for="field in fields" xs12 sm12 :class="field.size">
                            <v-text-field
                                    v-model="item[field.value]"
                                    :label="field.label"
                                    v-if="field.type === 'textField'"
                            ></v-text-field>
                            <v-select
                                    v-else-if="field.type === 'select'"
                                    :items="field.selectItems"
                                    v-model="item[field.value]"
                                    :item-text="field.field || 'name'"
                                    item-value="id"
                                    return-object
                                    :label="field.label"
                            ></v-select>
                            <v-menu
                                    v-else
                                    min-width="240px"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    v-model="field.menu"
                            >
                                <v-text-field
                                        :value="item[field.value]"
                                        slot="activator"
                                        :label="field.label"
                                        prepend-icon="date_range"
                                ></v-text-field>
                                <v-date-picker
                                        v-model="item[field.value]"
                                        no-title
                                        scrollable
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="field.menu = false">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
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
        name: "WorkerDialog",
        mounted() {

        }

    }
</script>

<style scoped>

</style>
