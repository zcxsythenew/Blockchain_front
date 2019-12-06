<template>
    <el-dialog title="交易详情" :before-close="hide" :visible.sync="visible">
        <el-table :data="tableData">
            <el-table-column label="项目" property="title" />
            <el-table-column label="内容" property="content" />
        </el-table>
        <span slot="footer">
            <el-button type="primary"
                       v-if="operation === 'settle'"
                       @click="settleTransaction"
                       v-loading.fullscreen.lock="loading">结算</el-button>
            <el-button type="primary"
                       v-if="operation === 'discount'"
                       @click="discountTransaction"
                       v-loading.fullscreen.lock="loading">贴现</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import {transactionDetail} from "@/components/formatter/formatter";
    import {settle} from "@/api/settle";
    import {discount} from "@/api/discount";

    export default {
        name: "TransactionDialog",
        props: ['transaction', 'visible', 'operation'],
        data() {
            return {
                loading: false
            }
        },
        computed: {
            tableData() {
                return transactionDetail(this.transaction);
            }
        },
        model: {
            prop: 'visible',
            event: 'hide'
        },
        methods: {
            hide() {
                this.$emit('hide', false);
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
                            this.$message('交易ID：' + this.transaction.id + '，结算成功');
                            // this.visible = false;
                            this.hide();
                        } else {
                            this.$alert('交易ID：' + this.transaction.id + '，结算失败，原因：' + result);
                        }
                    }).catch(reason => {
                        this.loading = false;
                        this.$alert(reason);
                    });
                });
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
                            this.$message('交易ID：' + this.transaction.id + '，贴现成功');
                            // this.visible = false;
                            this.hide();
                        } else {
                            this.$alert('交易ID：' + this.transaction.id + '，贴现失败，原因：' + result);
                        }
                    }).catch(reason => {
                        this.loading = false;
                        this.$alert(reason);
                    });
                });
            }
        }
    }
</script>

<style scoped>

</style>
