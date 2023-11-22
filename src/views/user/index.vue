<template>
    <div class="container">
        <!-- 表格 -->
        <div class="table_button_top">
            <el-col :span="12">
                <el-button type="primary" size="medium" @click="dialogFormVisible = true">新增</el-button>
                <el-button type="danger" size="medium" @click="batchDelete">删除</el-button>
            </el-col>
            <el-col :span="5"></el-col>
            <el-col :span="7" style=" position: flex;float: right;">
                <el-input placeholder="请输入内容" size="medium" v-model="search_content" clearable
                    style="width:80%;"></el-input>
                <el-button class="search_bth" size="medium" icon="el-icon-search" @click="search"></el-button>
            </el-col>
        </div>

        <el-table border lazy :load="load" class="book_table" :data="tableData" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="id" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.userId }}</span>
                </template>
            </el-table-column>
            <el-table-column label="姓名" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.username }}</span>
                </template>
            </el-table-column>
            <el-table-column label="密码" width="180">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.userPassword }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage4" :page-sizes="[10, 20, 50, 100]" :page-size="10"
                layout="total, sizes, prev, pager, next, jumper" :total="400">
            </el-pagination>
        </div>
        <!-- 嵌套表单——添加用户 -->
        <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
            <el-form :model="form" enctype="multipart/form-data">
                <el-form-item label="用户姓名：" :label-width="formLabelWidth">
                    <el-input v-model="form.username" placeholder="请输入姓名" autocomplete="off" style="width: 90%;"></el-input>
                </el-form-item>
                <el-form-item label="初始密码：" :label-width="formLabelWidth">
                    <el-input show-password v-model="form.userPassword" placeholder="请输入密码" autocomplete="off"
                        style="width: 90%;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import batchDeleteUser from '@/api/user'
import axios from 'axios'
export default {
    components: {

    },
    data() {
        return {
            dialogFormVisible: false,
            search_content: '',
            value: [],
            selectedUsers: [], // 存储选择的用户
            selectUserList: [], //以数组形式存储要删除的用户列表
            tableData: [],
            currentPage4: 4,
            // 添加用户表单
            form: {
                username: '',
                userPassword: '',
            },
            formLabelWidth: '120px',

        };
    },
    created() {
        // 初始化，获取用户列表
        this.getUserForm();
    },
    methods: {
        getUserForm() {
            this.$axios.get("/user/user")
                .then(response => {
                    // console.log('获取数据成功：', response.data.data.user);
                    this.tableData = response.data.data.user;
                })
                .catch(error => {
                    console.error('请求失败：', error);
                });
        },
        // 多选框改变触发事件
        handleSelectionChange(selection) {
            this.selectedUsers = selection;
            let arr = new Array;
            // selection是选择的行数据，其中包含了被勾选的用户信息
            for (let i = 0; i < this.selectedUsers.length; i++) {
                arr[i] = this.selectedUsers[i].id;
            }
            this.selectUserList = arr;
        },
        // 批量删除用户
        batchDelete() {
            return new Promise((resolve, reject) => {
                batchDeleteUser(this.selectUserList).then((resolve) => {
                    console.log(resolve)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 搜索
        search() {

        },
        // 编辑
        handleEdit(index, row) {
            console.log(index, row);
        },
        // 删除单个用户
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        // 添加用户确认按钮
        addUser() {
            this.dialogFormVisible = false;
            console.log(this.form.username)
            this.$axios.post("/user/insertUser?username=" + this.form.username + "&userPassword=" + this.form.userPassword)
                .then(response => {
                    if (response.data.code == 20000) {
                        this.$message({
                            message: '用户添加成功！',
                            type: 'success'
                        });
                        this.getUserForm();
                    }
                })
                .catch(error => {
                    console.error('请求失败：', error);
                });

        },
        // 表格懒加载
        load() {

        }

    }
};

</script>

<style scoped>
.container {
    background-color: white;
    width: 95%;
    margin: 30px auto 0 auto;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 2px 2px 6px #a7a7a7;
}

.container .table_button_top {
    padding-bottom: 40px;
}

.container .pagination {
    margin-top: 20px;
}

.container .floating-container {
    z-index: 1000;
}
</style>