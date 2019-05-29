<template>
    <nav>
        <v-toolbar :clipped="primaryDrawer.clipped" app fixed>
            <v-toolbar-side-icon
                    v-if="primaryDrawer.type !== 'permanent'"
                    @click="primaryDrawer.model = !primaryDrawer.model"
            ></v-toolbar-side-icon>
            <v-toolbar-title>Проект</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn v-if="!isLogin" @click="login">Увійти</v-btn>
            <div v-else>
                <v-label>{{name}}</v-label>
                <v-icon
                        small
                        class="mx-3"
                        @click="logout"
                >
                    logout
                </v-icon>
            </div>
        </v-toolbar>
        <v-navigation-drawer
                v-model="primaryDrawer.model"
                :permanent="primaryDrawer.type === 'permanent'"
                :temporary="primaryDrawer.type === 'temporary'"
                :clipped="primaryDrawer.clipped"
                :floating="primaryDrawer.floating"
                absolute
                overflow
                app
        >
            <v-toolbar>
                <v-list dense>
                    <v-list-tile>
                        <v-list-tile-title class="title">
                            Меню
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-toolbar>

            <v-divider></v-divider>

            <v-list class="pt-1">
                <v-list-tile
                        v-for="item in items"
                        :key="item.title"
                        @click="go(item.path)"
                >
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

        </v-navigation-drawer>
    </nav>
</template>

<script>
    export default {
        name: "Navigation",
        data() {
            return {
                drawer: false,
                primaryDrawer: {
                    model: false,
                    type: 'temporary',
                    clipped: true,
                    floating: true,
                },
                footer: {
                    inset: true
                },
                items: [
                    {title: 'Профіль', path: '/profile'},
                    {title: 'Користувачі', path: '/users'},
                    {title: 'Працівники', path: '/workers'},
                    {title: 'Мої дзвінки', path: '/my-calls'},
                    {title: 'Дзвінки', path: '/calls'},
                ],
            }
        },
        computed: {
            isLogin() {
                return this.$store.state.isAuth;
            },
            name() {
                return `${this.$store.state.user.firstName} ${this.$store.state.user.lastName}`
            }
        },
        methods: {
            go(path) {
                this.$router.push(path)
            },
            logout() {
                localStorage.clear();
                this.isAuth = false;
                this.$store.dispatch('logout');
                this.$router.push('/login');
            },
            login() {
                this.$router.push("/login");
            }
            // check(roles) {
            //     const appRoles = localStorage.getItem("role");
            //     return roles.indexOf(appRoles) !== -1;
            // }
        }
    }
</script>
