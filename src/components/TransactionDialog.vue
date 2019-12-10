<template>
    <el-dialog title="交易详情" :before-close="hide" :visible.sync="visible">
        <el-table :data="tableData">
            <el-table-column label="项目" property="title" />
            <el-table-column label="内容" property="content" />
        </el-table>
        <span slot="footer">
            <el-row>
                <el-button @click="decryptNote" type="text">解密备注信息</el-button>
                <el-button v-if="waitingForVerify"
                           @click="verify"
                           v-loading.fullscreen.lock="loading">认证交易</el-button>
                <el-button v-if="waitingForVerifyDiscount"
                           @click="verifyDiscount"
                           v-loading.fullscreen.lock="loading">认证贴现</el-button>
                <el-button v-if="waitingForVerifyDiscount"
                           @click="cancelDiscount"
                           v-loading.fullscreen.lock="loading">拒绝贴现</el-button>
                <el-button v-if="waitingForVerifySettle"
                           @click="verifySettle"
                           v-loading.fullscreen.lock="loading">认证结算</el-button>
                <el-button v-if="waitingForVerifySettle"
                           @click="cancelSettle"
                           v-loading.fullscreen.lock="loading">拒绝结算</el-button>
                <el-button type="primary"
                           v-if="operation === 'settle'"
                           @click="settleTransaction"
                           v-loading.fullscreen.lock="loading">结算</el-button>
                <el-button type="primary"
                           v-if="operation === 'discount'"
                           @click="discountTransaction"
                           v-loading.fullscreen.lock="loading">贴现</el-button>
            </el-row>
        </span>
    </el-dialog>
</template>

<script>
    import {transactionDetail} from "@/components/formatter/formatter";
    import {cancelSettle, settle, verifySettle} from "@/api/settle";
    import {cancelDiscount, discount, verifyDiscount} from "@/api/discount";
    import {verifyTransaction} from "@/api/transactions";
    import decrypt from "@/crypt/decrypt";

    export default {
        name: "TransactionDialog",
        props: ['transaction', 'visible', 'operation'],
        data() {
            return {
                loading: false,
                decryptedNote: ''
            }
        },
        computed: {
            tableData() {
                return transactionDetail(this.transaction, this.decryptedNote);
            },
            admin() {
                return this.$store.state.admin;
            },
            waitingForVerify() {
                return this.$store.state.admin
                    && this.transaction
                    && this.transaction.verified === false;
            },
            waitingForVerifyDiscount() {
                return this.$store.state.admin
                    && this.transaction
                    && this.transaction.discount
                    && this.transaction.discountVerified === false;
            },
            waitingForVerifySettle() {
                return this.$store.state.admin
                    && this.transaction
                    && this.transaction.settle
                    && this.transaction.settleVerified === false;
            }
        },
        model: {
            prop: 'visible',
            event: 'hide'
        },
        methods: {
            hide() {
                this.$emit('hide', false);
                this.decryptedNote = '';
            },
            verify() {
                this.$confirm('请确认认证交易', '', {
                    confirmButtonText: '认证',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loading = true;
                    verifyTransaction(this.transaction).then(result => {
                        this.loading = false;
                        if (result['message'] === 'success') {
                            this.$message('认证成功');
                            // this.visible = false;
                            this.hide();
                        } else {
                            this.$alert('认证失败，原因：' + result['message']);
                        }
                    })
                }).catch(() => {});
            },
            verifyDiscount() {
                this.$confirm('请确认认证贴现', '', {
                    confirmButtonText: '认证',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loading = true;
                    verifyDiscount(this.transaction).then(result => {
                        this.loading = false;
                        if (result['message'] === 'success') {
                            this.$message('认证成功');
                            // this.visible = false;
                            this.hide();
                        } else {
                            this.$alert('认证失败，原因：' + result['message']);
                        }
                    })
                }).catch(() => {});
            },
            cancelDiscount() {
                this.$confirm('请确认拒绝贴现', '', {
                    confirmButtonText: '拒绝',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loading = true;
                    cancelDiscount(this.transaction).then(result => {
                        this.loading = false;
                        if (result['message'] === 'success') {
                            this.$message('拒绝成功');
                            // this.visible = false;
                            this.hide();
                        } else {
                            this.$alert('拒绝失败，原因：' + result['message']);
                        }
                    })
                }).catch(() => {});
            },
            verifySettle() {
                this.$confirm('请确认认证结算', '', {
                    confirmButtonText: '认证',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loading = true;
                    verifySettle(this.transaction).then(result => {
                        this.loading = false;
                        if (result['message'] === 'success') {
                            this.$message('认证成功');
                            // this.visible = false;
                            this.hide();
                        } else {
                            this.$alert('认证失败，原因：' + result['message']);
                        }
                    })
                }).catch(() => {});
            },
            cancelSettle() {
                this.$confirm('请确认拒绝结算', '', {
                    confirmButtonText: '拒绝',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loading = true;
                    cancelSettle(this.transaction).then(result => {
                        this.loading = false;
                        if (result['message'] === 'success') {
                            this.$message('拒绝成功');
                            // this.visible = false;
                            this.hide();
                        } else {
                            this.$alert('拒绝失败，原因：' + result['message']);
                        }
                    })
                }).catch(() => {});
            },
            settleTransaction() {
                this.$confirm('请确认收款后点击结算', '', {
                    confirmButtonText: '结算',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loading = true;
                    settle(this.transaction).then(result => {
                        this.loading = false;
                        if (result['message'] === 'success') {
                            this.$message('结算成功');
                            // this.visible = false;
                            this.hide();
                        } else {
                            this.$alert('结算失败，原因：' + result['message']);
                        }
                    }).catch(reason => {
                        this.loading = false;
                        this.$alert(reason);
                    });
                }).catch(() => {});
            },
            discountTransaction() {
                this.$confirm('请确认贴现', '', {
                    confirmButtonText: '贴现',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loading = true;
                    discount(this.transaction).then(result => {
                        this.loading = false;
                        if (result['message'] === 'success') {
                            this.$message('贴现成功');
                            // this.visible = false;
                            this.hide();
                        } else {
                            this.$alert('贴现失败，原因：' + result['message']);
                        }
                    }).catch(reason => {
                        this.loading = false;
                        this.$alert(reason);
                    });
                }).catch(() => {});
            },
            decryptNote() {
                this.$prompt('输入密码', '', {
                    confirmButtonText: '解密',
                    cancelButtonText: '取消'
                }).then(({ value }) => {
                    this.decryptedNote = decrypt(value, this.transaction.note);
                }).catch(() => {});
            }
        }
    }
</script>

<style scoped>

</style>
