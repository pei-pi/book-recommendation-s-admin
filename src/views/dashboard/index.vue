<template>
    <div class="dashboard-container">
        <div class="top">
            <el-row :gutter="80">
                <el-col :span="8">
                    <div class="grid-content">
                        <div class="card-panel-icon-wrapper Books">
                            <svg-icon icon-class="allBooks" class-name="card-panel-icon allBooks" />
                        </div>
    
                        <div class="message">
                            <span>图书数目</span>
                            <span>{{ this.booksSum }}</span>
                        </div>
    
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content">
                        <div class="card-panel-icon-wrapper People">
                            <svg-icon icon-class="allPeople" class-name="card-panel-icon allPeople" />
                        </div>
                        <div class="message">
                            <span>用户总数</span>
                            <span>{{ this.userSum }}</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content">
                        <div class="card-panel-icon-wrapper Borrow">
                            <svg-icon icon-class="borrow" class-name="card-panel-icon borrow" />
                        </div>
                        <div class="message">
                            <span>借阅中</span>
                            <span>{{ this.borrowSum }}</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axiosInstance from '@/main'

export default {
    name: 'Dashboard',
    computed: {
        ...mapGetters([
            'name'
        ])
    },
    data(){
        return{
            booksSum:0,
            userSum:0,
            borrowSum:0,
        }
    },
    created(){
        this.loadBooksSum();
        this.loadUsersSum();
        this.loadBorrowSum();

    },
    methods:{
        loadBooksSum(){
            axiosInstance.get('/book/getBooksCount')
            .then(res => {
                this.booksSum = res.data;
            })
            .catch(error => {
                console.error('Error:', error);
            })
        },
        loadUsersSum(){
            axiosInstance.get('/user/userCount')
            .then(res => {
                this.userSum = res.data;
            })
            .catch(error => {
                console.error('Error:', error);
            })
        },
        loadBorrowSum(){
            axiosInstance.get('/book/getBorrowBooksCount')
            .then(res => {
                this.booksSum = res.data;
            })
            .catch(error => {
                console.error('Error:', error);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.top {
    width: 100%;
    margin: 0 auto;
    .el-row {
        margin-left: 0 !important;
        margin-right: 0 !important;
        background-color: #f2f2f2;
        padding-top: 30px;
        padding-bottom: 30px;
        .el-col {
            border-radius: 4px;
        } 
        .grid-content {
            background-color: #fff;
            box-shadow: 0 0 5px 2px rgba(84, 84, 84, 0.2);
            border-radius: 2px;
            min-height: 130px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content:space-evenly;
            .card-panel-icon-wrapper {
                background-color: #fff;
                width: 80px;
                height: 80px;
                border-radius: 4px;
                font-size: 50px;
                text-align: center;
                line-height: 80px;
            } 
            .allBooks {
                fill: #36a3f7;
            }
            .allPeople{
                fill: #40c9c6;
            }
            .borrow{
                fill: #f4516c;
            }
            &:hover {
                cursor: pointer;
                .Books{
                    background-color: #36a3f7;
                }
                .People{
                    background-color: #40c9c6;
                }
                .Borrow{
                    background-color: #f4516c;
                }
                .allBooks{
                    fill:#fff;
                }
                .allPeople{
                    fill: #fff;
                }
                .borrow{
                    fill: #fff;
                }
            }
            .message {
                display: flex;
                flex-direction: column;
                margin-left: 25px;
                :first-child {
                    font-family: 'Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif';
                    font-weight: bold;
                    font-size: 16px;
                    margin-bottom: 5px;
                    color: rgba(0, 0, 0, 0.45);
                }
                :last-child {
                    font-family: 'Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif';
                    font-weight: bold;
                    font-size: 20px;
                    color: #666;
                }
            }
        }
    }
}
</style>
