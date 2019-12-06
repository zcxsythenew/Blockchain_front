<template>
    <el-container>
        <el-header>
            新建交易
        </el-header>
        <el-main>
            <el-form :model="form">
                <el-form-item label="时间">
                    <el-date-picker v-model="form.datetime" type="datetime" />
                </el-form-item>
                <el-form-item label="债权人">
                    <el-row>
                        <el-select v-model="form.obligee"
                                   filterable
                                   v-loading="nicknameLoading"
                        style="width: 60%">
                            <el-option v-for="item in nicknames"
                                       :key="item.username"
                                       :value="item.username"
                                       :label="item.nickname">
                                <span style="float: left">{{ item.nickname }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.username }}</span>
                            </el-option>
                        </el-select>
                        <div style="display: inline; margin-left: 20px">
                            <el-button @click="dialogVisible = true">添加</el-button>
                        </div>
                    </el-row>
                </el-form-item>
                <el-form-item label="金额">
                    <el-input-number v-model="form.amount"
                                     :min="1"
                                     :max="999999999999999"
                                     :step="1"
                                     :step-strictly="true" />
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.note" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               @click="createTransaction"
                               v-loading.fullscreen.lock="loading">创建交易</el-button>
                </el-form-item>
            </el-form>
        </el-main>

        <el-dialog :visible.sync="dialogVisible">
            <el-form :model="newNickname">
                <el-form-item label="名称">
                    <el-input v-model="newNickname.nickname" />
                </el-form-item>
                <el-form-item label="公钥地址">
                    <el-input v-model="newNickname.username" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               @click="createNickname"
                               v-loading.fullscreen.lock="loading">添加</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-container>
</template>

<script>
    import {purchase} from '@/api/purchase'
    import {addNickname, getNicknames} from "@/api/nickname";
    export default {
        name: "Purchase",
        data() {
            return {
                form: {
                    datetime: '',
                    obligee: '',
                    amount: 100,
                    note: '',
                },
                loading: false,
                nicknameLoading: true,
                nicknames: [],
                newNickname: {
                    nickname: '',
                    username: ''
                },
                dialogVisible: false
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                getNicknames().then(result => {
                    vm.nicknameLoading = false;
                    vm.nicknames = result;
                }).catch(reason => {
                    vm.$alert(reason);
                })
            })
        },
        methods: {
            createTransaction() {
                if (this.form.datetime === '' || this.form.obligee === '' || this.form.note === '') {
                    this.$alert('请填写所有内容');
                    return;
                }
                this.$confirm('请确认发起交易', '', {
                    confirmButtonText: '发起交易',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.loading = true;
                    purchase(this.form).then(result => {
                        this.loading = false;
                        if (result['message'] === 'success') {
                            this.$message('交易发起成功');
                        } else {
                            this.$alert('交易发起失败，原因：' + result);
                        }
                    }).catch(reason => {
                        this.loading = false;
                        this.$alert(reason);
                    });
                })
            },
            createNickname() {
                this.loading = true;
                addNickname(this.newNickname).then(result => {
                    this.loading = false;
                    if (result['message'] === 'success') {
                        this.dialogVisible = false;
                        this.nicknames.push(JSON.parse(JSON.stringify(this.newNickname)));
                        this.newNickname.username = '';
                        this.newNickname.nickname = '';
                    } else {
                        this.$alert('添加失败，原因：' + result);
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
