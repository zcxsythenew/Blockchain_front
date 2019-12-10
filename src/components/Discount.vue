<template>
    <el-container>
        <el-header>
            交易贴现
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
                <el-table-column sortable
                                 :sort-method="obligorSortMethod"
                                 :formatter="formatObligor"
                                 :filters="obligorFilter"
                                 :filter-method="obligorFilterHandler"
                                 label="债务人" />
                <el-table-column sortable prop="amount" label="金额" />
                <el-table-column sortable
                                 :sort-method="statusSortMethod"
                                 :formatter="formatTableStatus"
                                 :filters="statusFilter"
                                 :filter-method="statusFilterHandler"
                                 label="状态" />
                <el-table-column label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showTransaction(scope.row)">贴现</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>

        <el-header>
            往期贴现
        </el-header>
        <el-main>
            <el-table :data="previousTableData" v-loading="previousTableDataLoading">
                <el-table-column sortable
                                 prop="datetime"
                                 :filters="previousDateTableFilter"
                                 :formatter="formatTableTime"
                                 :filter-method="dateFilterHandler"
                                 label="交易时间"
                                 width="120"/>
                <el-table-column sortable
                                 :sort-method="obligorSortMethod"
                                 :formatter="formatObligor"
                                 :filters="previousObligorFilter"
                                 :filter-method="obligorFilterHandler"
                                 label="债务人" />
                <el-table-column sortable prop="amount" label="金额" />
                <el-table-column sortable
                                 :sort-method="statusSortMethod"
                                 :formatter="formatTableStatus"
                                 :filters="statusFilter"
                                 :filter-method="statusFilterHandler"
                                 label="状态" />
                <el-table-column label="操作" width="100">
                    <template slot-scope="previousScope">
                        <el-button type="text" @click="showPreviousTransaction(previousScope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>

        <TransactionDialog v-model="showDialog" :operation="operation" :transaction="dialogTransaction" />
    </el-container>
</template>

<script>
    import TransactionDialog from "@/components/TransactionDialog";
    import {getDiscount, getPreviousDiscounts} from "@/api/discount";
    import {formatDate, formatStatus, statusList} from "@/components/formatter/formatter";
    import {dateFilter} from "@/components/filter/filter";

    export default {
        name: "Discount",
        components: {TransactionDialog},
        data() {
            return {
                tableData: [],
                tableLoading: true,
                previousTableData: [],
                previousTableDataLoading: true,
                showDialog: false,
                dialogTransaction: null,
                operation: 'view'
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                getDiscount().then(result => {
                    if (result["message"] === "success") {
                        vm.tableLoading = false;
                        vm.tableData = result["data"];
                    } else {
                        vm.$alert(result["message"]);
                    }
                }).catch(reason => {
                    vm.$alert(reason);
                });
                getPreviousDiscounts().then(result => {
                    if (result["message"] === "success") {
                        vm.previousTableDataLoading = false;
                        vm.previousTableData = result["data"];
                    } else {
                        vm.$alert(result["message"]);
                    }
                }).catch(reason => {
                    vm.$alert(reason);
                });
            });
        },
        methods: {
            formatTableTime(row, column) {
                return formatDate(row[column.property]);
            },
            formatTableStatus(row) {
                return formatStatus(row);
            },
            formatObligor(row) {
                if (row['transfer'] === 1) {
                    if (row['transferToNickname']) {
                        return row['transferToNickname'];
                    }
                    return row['transferTo'];
                }
                else {
                    if (row['obligorNickname']) {
                        return row['obligorNickname'];
                    }
                    return row['obligor'];
                }
            },
            dateFilterHandler(value, row, column) {
                const date1 = new Date(row[column.property]);
                const date2 = new Date(value);
                return date1.getFullYear() === date2.getFullYear()
                    && date1.getMonth() === date2.getMonth()
                    && date1.getDate() === date2.getDate();
            },
            obligorFilterHandler(value, row) {
                return value === this.formatObligor(row);
            },
            obligorSortMethod(a, b) {
                const strA = this.formatObligor(a);
                const strB = this.formatObligor(b);
                if (strA < strB) return -1;
                if (strA === strB) return 0;
                return 1;
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
                this.operation = 'discount';
            },
            showPreviousTransaction(transaction) {
                this.dialogTransaction = transaction;
                this.showDialog = true;
                this.operation = 'view';
            },
            obligorFilterFactory(data) {
                let filter = [];
                let str;
                for (let i in data) {
                    if (!data.hasOwnProperty(i)) continue;
                    str = this.formatObligor(data[i]);
                    if (!filter.find(f => f.value === str)) {
                        filter.push({ text: str, value: str });
                    }
                }
                filter.sort((a, b) => {
                    if (a.value < b.value) return -1;
                    if (a.value === b.value) return 0;
                    return 1;
                });
                return filter;
            }
        },
        computed: {
            dateTableFilter() {
                return dateFilter(this.tableData);
            },
            previousDateTableFilter() {
                return dateFilter(this.previousTableData);
            },
            statusFilter() {
                return statusList;
            },
            obligorFilter() {
                return this.obligorFilterFactory(this.tableData);
            },
            previousObligorFilter() {
                return this.obligorFilterFactory(this.previousTableData);
            }
        }
    }
</script>

<style scoped>

</style>
