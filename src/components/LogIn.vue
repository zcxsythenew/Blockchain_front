<template>
    <el-form :model="form">
        <el-form-item label="用户ID">
            <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="私钥">
            <el-input v-model="form.privateKey" show-password />
        </el-form-item>
        <el-form-item>
            <el-button v-loading.fullscreen.lock="loggingIn" type="primary" @click="LogIn">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import { login } from '../api/user';

    export default {
        name: "LogIn",
        data() {
            return {
                form: {
                    username: '',
                    privateKey: ''
                },
                loggingIn: false
            }
        },
        methods: {
            LogIn() {
                this.loggingIn = true;
                login(this.form).then(result => {
                    if (result) {
                        this.$store.commit({
                            type: 'login',
                            username: this.form.username,
                            privateKey: this.form.privateKey,
                        });
                        this.$router.push('/');
                    } else {
                        this.$alert('ID或私钥不正确');
                    }
                }).catch(reason => {
                    this.$alert(reason);
                });
            }
        }
    }
</script>

<style scoped>

</style>
