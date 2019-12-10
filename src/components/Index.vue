<template>
    <el-container>
        <el-header>
            所有交易
        </el-header>
        <el-main>
            <el-table :data="tableData" v-loading="tableLoading">
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
                                 :formatter="formatObligor"
                                 label="原债务人" />
                <el-table-column sortable prop="obligee"
                                 :filters="obligeeFilter"
                                 :filter-method="generalFilterHandler"
                                 :formatter="formatObligee"
                                 label="原债权人" />
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
        </el-main>

        <TransactionDialog v-model="showDialog" v-bind:transaction="dialogTransaction" />
    </el-container>
</template>

<script>
    import {transactions} from "@/api/transactions";
    import {formatStatus, formatDate, statusList} from "@/components/formatter/formatter";
    import {dateFilter, generalFilter} from "@/components/filter/filter";
    import TransactionDialog from "@/components/TransactionDialog";

    export default {
        name: "Index",
        components: {TransactionDialog},
        data() {
            return {
                tableData: [],
                tableLoading: true,
                showDialog: false,
                dialogTransaction: null
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                transactions().then(result => {
                    if (result["message"] === "success") {
                        vm.tableLoading = false;
                        vm.tableData = result["data"];
                    } else {
                        vm.$alert(result["message"]);
                    }
                }).catch(reason => {
                    vm.$alert(reason);
                })
            })
        },
        methods: {
            formatTableTime(row, column) {
                return formatDate(row[column.property]);
            },
            formatObligor(row) {
                if (row['obligorNickname']) {
                    return row['obligorNickname'];
                }
                return row['obligor'];
            },
            formatObligee(row) {
                if (row['obligeeNickname']) {
                    return row['obligeeNickname'];
                }
                return row['obligee'];
            },
            formatTableStatus(row) {
                return formatStatus(row);
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
            }
        },
        computed: {
            dateTableFilter() {
                return dateFilter(this.tableData);
            },
            obligeeFilter() {
                return generalFilter(this.tableData, 'obligee');
            },
            obligorFilter() {
                return generalFilter(this.tableData, 'obligor');
            },
            statusFilter() {
                return statusList;
            }
        }
    }
</script>

<style scoped>

</style>
