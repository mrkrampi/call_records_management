<template>
    <v-app id="sandbox">
        <navigation></navigation>
        <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import Navigation from '@/components/Navigation';
    import HelloWorld from './components/HelloWorld.vue'

    export default {
        name: 'app',
        components: {
            HelloWorld,
            Navigation
        },
    }
</script>
