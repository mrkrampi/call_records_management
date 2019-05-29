<template>
    <v-app id="sandbox">
        <navigation></navigation>
        <v-content>
            <v-container fluid>
                <router-view></router-view>
                <snackbar></snackbar>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import Navigation from '@/components/Navigation';
    import HelloWorld from './components/HelloWorld.vue'
    import Snackbar from "@/components/Snackbar";

    export default {
        name: 'app',
        components: {
            Snackbar,
            HelloWorld,
            Navigation
        },
    }
</script>
