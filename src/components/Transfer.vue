<template>
    <el-container>
        <el-header>
            转让交易
        </el-header>
        <el-main>
            <el-table :data="tableData" v-loading="tableLoading" @selection-change="selectionChange">
                <el-table-column type="selection" />
                <el-table-column sortable
                                 prop="datetime"
                                 :filters="dateTableFilter"
                                 :formatter="formatTableTime"
                                 :filter-method="dateFilterHandler"
                                 label="交易时间"
                                 width="120" />
                <el-table-column sortable prop="obligor"
                                 :filters="obligorFilter"
                                 :filter-method="generalFilterHandler"
                                 label="债务人" />
                <el-table-column sortable prop="obligee"
                                 :filters="obligeeFilter"
                                 :filter-method="generalFilterHandler"
                                 label="债权人" />
                <el-table-column sortable prop="amount" label="金额" />
                <el-table-column sortable
                                 :sort-method="statusSortMethod"
                                 :formatter="formatTableStatus"
                                 :filters="statusFilter"
                                 :filter-method="statusFilterHandler"
                                 label="状态" />
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showTransaction(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
                <el-button @click="transferTransactions" type="primary" v-loading.fullscreen.lock="loading">转让</el-button>
            </div>
        </el-main>

        <el-header>
            往期转让
        </el-header>
        <el-main>
            <el-table :data="previousTableData" v-loading="previousTableDataLoading">
                <el-table-column sortable
                                 prop="transferDatetime"
                                 :filters="previousDateTableFilter"
                                 :formatter="formatTableTime"
                                 :filter-method="dateFilterHandler"
                                 label="转让时间"
                                 width="120"/>
                <el-table-column sortable prop="obligor"
                                 :filters="previousObligorFilter"
                                 :filter-method="generalFilterHandler"
                                 label="原债务人" />
                <el-table-column sortable prop="obligee"
                                 :filters="previousObligeeFilter"
                                 :filter-method="generalFilterHandler"
                                 label="原债权人" />
                <el-table-column sortable prop="amount" label="金额" />
                <el-table-column sortable
                                 :sort-method="statusSortMethod"
                                 :formatter="formatTableStatus"
                                 :filters="statusFilter"
                                 :filter-method="statusFilterHandler"
                                 label="状态" />
                <el-table-column label="操作" width="100">
                    <template slot-scope="previousScope">
                        <el-button type="text" @click="showTransaction(previousScope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>

        <TransactionDialog v-model="showDialog" :operation="operation" :transaction="dialogTransaction" />
    </el-container>
</template>

<script>
    import TransactionDialog from "@/components/TransactionDialog";
    import {transfer, getPreviousTransfers, getTransfer} from "@/api/transfer";
    import {formatDate, formatStatus, statusList} from "@/components/formatter/formatter";
    import {dateFilter, generalFilter} from "@/components/filter/filter";
    export default {
        name: "Transfer",
        components: {TransactionDialog},
        data() {
            return {
                tableData: [],
                tableLoading: true,
                previousTableData: [],
                previousTableDataLoading: true,
                showDialog: false,
                dialogTransaction: null,
                operation: 'view',
                multipleSelection: [],
                loading: false
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                getTransfer().then(result => {
                    vm.tableLoading = false;
                    vm.tableData = result;
                }).catch(reason => {
                    vm.$alert(reason);
                });
                getPreviousTransfers().then(result => {
                    vm.previousTableDataLoading = false;
                    vm.previousTableData = result;
                }).catch(reason => {
                    vm.$alert(reason);
                });
            })
        },
        methods: {
            formatTableTime(row, column) {
                return formatDate(row[column.property]);
            },
            formatTableStatus(row) {
                return formatStatus(row);
            },
            formatObligor(row) {
                if (row['transfer'] === 1) return row['transferTo'];
                else return row['obligor'];
            },
            dateFilterHandler(value, row, column) {
                const date1 = new Date(row[column.property]);
                const date2 = new Date(value);
                return date1.getFullYear() === date2.getFullYear()
                    && date1.getMonth() === date2.getMonth()
                    && date1.getDate() === date2.getDate();
            },
            generalFilterHandler(value, row, column) {
                return value === row[column['property']];
            },
            statusFilterHandler(value, row) {
                return statusList[value].text === this.formatTableStatus(row);
            },
            statusSortMethod(a, b) {
                const strA = this.formatTableStatus(a);
                const strB = this.formatTableStatus(b);
                if (strA < strB) return -1;
                if (strA === strB) return 0;
                return 1;
            },
            showTransaction(transaction) {
                this.dialogTransaction = transaction;
                this.showDialog = true;
                this.operation = 'view';
            },
            selectionChange(val) {
                this.multipleSelection = val;
            },
            transferTransactions() {
                if (this.multipleSelection.length !== 2) {
                    this.$alert('选择两个交易，然后进行转让');
                } else {
                    let a, b;
                    a = this.multipleSelection[0]['obligor'] === this.multipleSelection[1]['obligee'];
                    b = this.multipleSelection[1]['obligor'] === this.multipleSelection[0]['obligee'];
                    if (a || b) {
                        if (this.multipleSelection[0]['amount'] === this.multipleSelection[1]['amount']) {
                            if (a && b) {
                                this.$alert('两个交易不能成环');
                            } else {
                                this.$confirm('转让后，债权人变更的交易将失效，债务人变更的交易将继续有效', '请确认转让', {
                                    confirmButtonText: '转让',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    this.loading = true;
                                    transfer(this.multipleSelection).then(result => {
                                        this.loading = false;
                                        if (result['message'] === 'success') {
                                            this.$message('转让成功');
                                        } else {
                                            this.$alert('转让失败，原因：' + result['message']);
                                        }
                                    }).catch(reason => {
                                        this.loading = false;
                                        this.$alert(reason);
                                    })
                                });
                            }
                        } else {
                            this.$alert('两个交易的金额必须相同');
                        }
                    } else {
                        this.$alert('需有一个交易的债务人和另一个交易的债权人相同');
                    }
                }
            }
        },
        computed: {
            dateTableFilter() {
                return dateFilter(this.tableData);
            },
            previousDateTableFilter() {
                return dateFilter(this.previousTableData, 'transferDatetime');
            },
            statusFilter() {
                return statusList;
            },
            obligorFilter() {
                return generalFilter(this.tableData, 'obligor');
            },
            obligeeFilter() {
                return generalFilter(this.tableData, 'obligee');
            },
            previousObligorFilter() {
                return generalFilter(this.previousTableData, 'obligor');
            },
            previousObligeeFilter() {
                return generalFilter(this.previousTableData, 'obligee');
            }
        }
    }
</script>

<style scoped>

</style>
