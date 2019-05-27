<template>
    <div>
        <user-table></user-table>
    </div>
</template>

<script>
    import UserTable from "@/components/user/UserTable";
    export default {
        name: "UsersList",
        components: {UserTable}
    }
</script>
