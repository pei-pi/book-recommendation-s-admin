<template>
    <div class="container">
        <!-- 表格 -->
        <div class="table_button_top">
            <el-col :span="12">
                <el-button type="primary" size="medium" @click="">新增</el-button>
                <el-button type="danger" size="medium" @click="">删除</el-button>
            </el-col>
            <el-col :span="5"></el-col>
            <el-col :span="7" style=" position: flex;float: right;">
                <el-input placeholder="请输入内容" size="medium" v-model="input" clearable style="width:80%;">
                </el-input>
                <el-button class="search_bth" size="medium" icon="el-icon-search"></el-button>
            </el-col>
        </div>

        <el-table border lazy :load="load" class="book_table" :data="tableData" :span-method="objectSpanMethod"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="图书分类">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="详细分类">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    <p>住址: {{ scope.row.address }}</p>
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            input: '',
            value: [],
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            multipleSelection: [],
            currentPage4: 4
        };
    },
    methods: {
        handleChange(value) {
            console.log(value);
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0 || columnIndex === 1) {
                if (rowIndex % 2 === 0) {
                    return {
                        rowspan: 2,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
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
</style>