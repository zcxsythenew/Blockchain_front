<template>
    <el-form :model="form">
        <el-form-item label="私钥">
            <el-input v-model="form.privateKey" show-password />
        </el-form-item>
        <el-form-item>
            <el-row>
                <el-button v-loading.fullscreen.lock="loggingIn" type="primary" @click="LogIn">登录</el-button>
                <el-button @click="SignIn">注册</el-button>
                <el-button type="text" @click="ShiftDatabase">切换数据库</el-button>
            </el-row>
        </el-form-item>

        <el-dialog title="请保存您的账号信息" :visible.sync="newFormVisible">
            <el-form :model="newForm">
                <el-form-item label="地址">
                    <el-input v-model="newForm.address" />
                </el-form-item>
                <el-form-item label="公钥">
                    <el-input v-model="newForm.publicKey" />
                </el-form-item>
                <el-form-item label="私钥">
                    <el-input v-model="newForm.privateKey" />
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="请保存新数据库的信息" :visible.sync="shiftVisible">
            <el-form :model="shiftForm">
                <el-form-item label="新银行的地址">
                    <el-input v-model="shiftForm.address" />
                </el-form-item>
                <el-form-item label="新银行的公钥">
                    <el-input v-model="shiftForm.publicKey" />
                </el-form-item>
                <el-form-item label="新银行的私钥">
                    <el-input v-model="shiftForm.privateKey" />
                </el-form-item>
                <el-form-item label="新合约的地址">
                    <el-input v-model="shiftForm.transactionAddress" />
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-form>
</template>

<script>
    import {login, shiftDatabase, signIn} from '../api/user';

    export default {
        name: "LogIn",
        data() {
            return {
                form: {
                    privateKey: ''
                },
                loggingIn: false,
                signInDialog: false,
                newForm: {
                    address: '',
                    privateKey: '',
                    publicKey: ''
                },
                newFormVisible: false,
                shiftForm: {
                    address: '',
                    privateKey: '',
                    publicKey: '',
                    transactionAddress: ''
                },
                shiftVisible: false
            }
        },
        methods: {
            LogIn() {
                if (this.form.privateKey === '') {
                    this.$alert('请输入您的私钥');
                    return;
                }
                this.loggingIn = true;
                login(this.form).then(result => {
                    if (result['message'] === 'success') {
                        this.loggingIn = false;
                        this.$store.commit('login', result['data']);
                        this.$router.push('/');
                    } else {
                        this.loggingIn = false;
                        this.$alert('私钥不存在');
                    }
                }).catch(reason => {
                    this.loggingIn = false;
                    this.$alert(reason);
                });
            },
            SignIn() {
                const vm = this;
                vm.$confirm('您将创建新的账号', '', {
                    confirmButtonText: '注册',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    vm.loggingIn = true;
                    signIn().then(result => {
                        if (result['message'] === 'success') {
                            vm.loggingIn = false;
                            vm.newForm.address = result.data.address;
                            vm.newForm.privateKey = result.data.privateKey;
                            vm.newForm.publicKey = result.data.publicKey;
                            vm.newFormVisible = true;
                        } else {
                            vm.loggingIn = false;
                            vm.$alert('注册失败，原因：' + result['message']);
                        }
                    }).catch(reason => {
                        vm.loggingIn = false;
                        vm.$alert(reason);
                    });
                });
            },
            ShiftDatabase() {
                const vm = this;
                vm.$confirm('您将新建新的银行账户，并使用该账户部署新的合约。此功能仅演示使用。', '', {
                    confirmButtonText: '切换数据库',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    vm.loggingIn = true;
                    shiftDatabase().then(result => {
                        if (result['message'] === 'success') {
                            vm.loggingIn = false;
                            vm.shiftForm.address = result.user.address;
                            vm.shiftForm.privateKey = result.user.privateKey;
                            vm.shiftForm.publicKey = result.user.publicKey;
                            vm.shiftForm.transactionAddress = result.contractAddress;
                            vm.shiftVisible = true;
                        } else {
                            vm.loggingIn = false;
                            vm.$alert('切换失败，原因：' + result['message']);
                        }
                    }).catch(reason => {
                        vm.loggingIn = false;
                        vm.$alert(reason);
                    });
                }).catch(() => {});
            }
        }
    }
</script>

<style scoped>

</style>
