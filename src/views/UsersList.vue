<template>
    <div>
        <user-table></user-table>
        <user-dialog></user-dialog>
        <call-result></call-result>
    </div>
</template>

<script>
    import UserTable from "@/components/user/UserTable";
    import CallResult from "@/components/CallResult";
    import UserDialog from "@/components/user/UserDialog";

    export default {
        name: "UsersList",
        components: {UserDialog, CallResult, UserTable}
    }
</script>
