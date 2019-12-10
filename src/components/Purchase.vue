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
                                       :key="item.address"
                                       :value="item.address"
                                       :label="item.nickname">
                                <span style="float: left">{{ item.nickname }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.address }}</span>
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
                    <el-button type="text" @click="cryptNote">加密备注信息</el-button>
                </el-form-item>
            </el-form>
        </el-main>

        <el-dialog :visible.sync="dialogVisible">
            <el-form :model="newNickname">
                <el-form-item label="名称">
                    <el-input v-model="newNickname.nickname" />
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="newNickname.address" />
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
    import crypt from "@/crypt/crypt";
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
                    address: ''
                },
                dialogVisible: false
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                getNicknames().then(result => {
                    vm.nicknameLoading = false;
                    if (result["message"] === "success") {
                        vm.nicknames = result["data"];
                    } else {
                        vm.$alert(result["message"]);
                    }
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
                            this.$alert('交易发起失败，原因：' + result['message']);
                        }
                    }).catch(reason => {
                        this.loading = false;
                        this.$alert(reason);
                    });
                }).catch(() => {});
            },
            createNickname() {
                if (this.newNickname.nickname === '' || this.newNickname.address === '') {
                    this.$alert('请填写名称和地址');
                    return;
                }
                this.loading = true;
                addNickname(this.newNickname).then(result => {
                    this.loading = false;
                    if (result['message'] === 'success') {
                        this.dialogVisible = false;
                        this.nicknames.push(JSON.parse(JSON.stringify(this.newNickname)));
                        this.newNickname.address = '';
                        this.newNickname.nickname = '';
                    } else if (result['message'] === 'duplicate') {
                        this.$alert('地址已存在');
                    } else {
                        this.$alert('添加失败，原因：' + result['message']);
                    }
                })
            },
            cryptNote() {
                this.$prompt('输入密码', '', {
                    confirmButtonText: '加密',
                    cancelButtonText: '取消'
                }).then(({ value }) => {
                    this.form.note = crypt(value, this.form.note);
                }).catch((err) => {this.$message.error(JSON.stringify(err))});
            }
        }
    }
</script>

<style scoped>

</style>
