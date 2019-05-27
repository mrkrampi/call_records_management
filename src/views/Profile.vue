
<template>
    <v-container fluid>
        <v-layout column>
            <v-card>
                <v-card-text>
                    <v-text-field

                            label="FirstName"></v-text-field>
                    <v-text-field

                            label="Last Name"></v-text-field>
                    <v-text-field

                            label="Email Address"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click.native="update">
                        <v-icon left dark>check</v-icon>
                        Save Changes
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-layout>
    </v-container>
</template>
<script>
    export default {
        name: "Profile"
    }
</script>

<style scoped>

</style>
