<template>
    <div class="standard-table" id="noticebox">
        <a-table
                bordered
                id="table_content"
                size="default"
                :loading="loading"
                :columns="columns"
                :dataSource="current"
                :pagination="pagination"
                :rowSelection="type=='index'?null:{ selectedRowKeys: selectedRowKeys, onChange: updateSelect , getCheckboxProps:getCheckboxProps, onSelect:onSelect ,fixed:true ,type:'checkbox',columnWidth:50,}"
                :rowClassName="rowClassName"
                :scroll="{x:1140}"
        >
            <!--级别-->
            <span
                    slot="level_dictText"
                    slot-scope="text,record"
                    @click="handleProDetail(record)"
            >
                <JEllipsis :value="text" :length="15"/>
            </span>
            <!--             标题-->
            <a
                    slot='title1'
                    slot-scope="text,record"
                    href="javascript:;"
                    @click="handleNoticeDetail(record)"
            >
                <JEllipsis :value="text" :length="15"/>
            </a>
            <!--            发布者 updateBy-->
            <span slot="updateBy" slot-scope="text">
        <JEllipsis :value="text" :length="15"/>
      </span>
            <!--            发布时间-->
            <span slot="releaseDate" slot-scope="text">
        <JEllipsis :value="text" :length="15"/>
      </span>
            <!--            状态-->
            <span slot="status_dictText" slot-scope="text">
        <JEllipsis :value="text" :length="15"/>
      </span>
            <!--            操作-->
            <template slot="action" slot-scope="text,record,key">
                <span v-if="record.status=='01'">
                <a style="margin-right:5px;" @click="handleEdit(record)">{{ $t('action_edit') }} </a>
                <a style="margin-right:5px;" @click="handleDel(record)">{{ $t('action_delete') }}</a>
                </span>
                <span v-else>
                <a  style="margin-right:5px;" @click="handleWithdraw(record,key)">{{ $t('notice.withdraw') }} </a>
                <a v-show="record.isTop=='false'" style="margin-right:5px;" @click="handleTop(record)">{{ $t('totop') }}</a>
                    <a v-show="record.isTop=='true'" style="margin-right:5px;" @click="handleTop(record)">取消置顶</a>
                </span>
            </template>
        </a-table>
        <Notice-detail ref="detailnotice" @reload="reload"></Notice-detail>
        <Notice-edit ref="editnotice" @reload="reload"></Notice-edit>
    </div>
</template>
<script>
    import JEllipsis from "@/components/jeecg/JEllipsis";
    import NoticeEdit from './noticeEdit'
    import NoticeDetail from './noticeDetail'
    import moment from 'moment'
    import {deleteAction, getAction} from '@/api/manage'

    export default {
        name: "noticeTable",
        components: {JEllipsis, NoticeEdit, NoticeDetail},
        props: {
            data: {
                type: Function,
                required: true
            },
            columns: {
                type: Array,
                required: true
            },
            type: {
                type: String,
                required: ''
            },
        },
        data() {
            return {
                disabled: true,
                visible: false,
                noticeId: '',
                needTotalList: [],
                selectedRowKeys: [],
                loading: true,
                total: 0,
                pageSize: 10,
                pageNumber: 1,
                currentPageSize: 10,
                defaultCurrent: 1,
                pageSizeOptions: ["10", "20", "50", "100", "500"],
                current: [],
                pagination: {},
                paramsName: {},
                selectedRows: [],
                selectedList: {},
                statusarr:['待发布','已发布'],
                getCheckboxProps: record => ({
                    props: {
                        disabled: (record.status ? record.status : "") == '02', // 换成状态就好
                    },
                }),
            };
        },
        created() {
            //数据请求参数配置
            this.paramsName = Object.assign({
                pageNo: "pageNo",
                pageSize: "pageSize"
            });
            this.needTotalList = this.initTotalList(this.columns);
            this.loadData({pageNo: this.pageNumber, pageSize: this.pageSize});
        },
        methods: {
            // 隔行换色
            rowClassName(record, index) {
                if (index % 2 === 0) return "table-row-style";
            },
            // 置頂
            handleTop(record){
                var id=record.id

                var isTop=record.isTop=='true'?'false':'true'
                getAction('/bff/noticeInfo/setTopById', {id, isTop}).then(res => {
                    if (res.success) {
                        this.loadData({})
                        this.$message.success('操作成功！')
                    }
                })
            },
            //公告详情
            handleNoticeDetail(record) {
                this.$refs.detailnotice.init(record.id)
                this.$refs.detailnotice.noticeId = record.id
                this.$refs.detailnotice.visible = true
            },
            //编辑
            handleEdit(record) {
                this.$refs.editnotice.init(record.id)
                this.$refs.editnotice.noticeId = record.id
                this.$refs.editnotice.visible = true
            },
            // 删除
            handleDel(record) {
                deleteAction('/bff/noticeInfo/', {id: record.id}).then(res => {
                    if (res.success) {
                        this.loadData({})
                        this.$message.success('删除成功！')
                    }
                })
            },
            //撤回
            handleWithdraw(record) {
                var id = record.id

                getAction('/bff/noticeInfo/releaseNoticeInfoById', {id, status: '01'}).then(res => {
                    if (res.success) {
                        this.loadData({})
                        this.$message.success('操作成功！')
                    }
                })
            },
            // 置顶
            handleTotop(record, key) {
                this.current[key].isTop = true
            },
            handleCancel() {
                this.visible = false
            },
            toSave() {
                this.$refs.newform.handleSubmit()
            },
            updateSelect(selectedRowKeys, selectedRows) {
                this.selectedRowKeys = selectedRowKeys;
                this.selectedRows = selectedRows;
                let list = this.needTotalList;
                this.needTotalList = list.map(item => {
                    return {
                        ...item,
                        total: selectedRows.reduce((sum, val) => {
                            return sum + val[item.dataIndex];
                        }, 0)
                    };
                });
                this.$emit("change", selectedRowKeys, selectedRows);
            },
            onSelect(record, selected, selectedRows, nativeEvent) {
                this.selectedList = record;
                this.$emit("onSelect", record);
            },
            initTotalList(columns) {
                const totalList = [];
                columns.forEach(column => {
                    if (column.needTotal) {
                        totalList.push({...column, total: 0});
                    }
                });
                return totalList;
            },
            reload(){
              this.loadData()
            },

            loadData(params) {
                this.selectedRowKeys = [];
                let that = this;
                that.loading = true;
                params = Object.assign({}, params);
                const remoteParams = {};
                remoteParams.pageNo = params.pageNo || that.pageNumber;
                remoteParams[that.paramsName.pageSize] =
                    params.pageSize || that.currentPageSize;
                if (params.pageNo) {
                    that.pageNumber = params.pageNo;
                    that.defaultCurrent = params.pageNo;
                }
                if (params.pageSize) {
                    that.currentPageSize = params.pageSize;
                }
                if (that.data) {
                    let dataPromise = that.data(remoteParams);
                    // debugger
                    dataPromise.then(
                        response => {
                            if (!response) {
                                that.current = [];
                                that.total = 0;
                                that.pagination = that.pager();
                                that.loading = false;
                                return;
                            }
                            let results = response["records"];
                            results = (results instanceof Array && results) || [];
                            if (results.length > 0) {
                                results.map(item => {
                                    item.title1 = item.title;
                                    item.createTime = moment(item.createTime).format('YYYY-MM-DD')
                                })
                            }
                            that.current = results;
                            that.total = response["total"] * 1;
                            // console.log("总条数"+that.total)
                            that.pagination = that.pager();
                            that.loading = false;
                        },
                        () => {
                            that.loading = false;
                        }
                    );
                }
            },
            onPagerChange(page, pageSize) {
                this.pageNumber = page;
                this.loadData({pageNo: this.pageNumber});
            },
            onPagerSizeChange(current, size) {
                this.pageSize = size;
                this.currentPageSize = size;
                this.defaultCurrent = 1;
                this.pageNumber = 1;
                // console.log(size)
                this.loadData({pageSize: size});
            },
            // onClearSelected() {
            //     this.selectedRowKeys = [];
            //     this.updateSelect([], []);
            // },
            onClearSelected () {
                this.selectedRowKeys = [];
                this.updateSelect([], []);
                this.onSelect({});
            },
            pager() {
                return {
                    total: this.total,
                    showTotal: total => {
                        return this.$t("gong") + this.total + this.$t("tiao");
                    },
                    showQuickJumper: true,
                    showSizeChanger: this.type=='index'?false:true,
                    pageSizeOptions: this.pageSizeOptions,
                    pageSize: this.pageSize,
                    defaultCurrent: this.defaultCurrent,
                    current: this.defaultCurrent,
                    onChange: this.onPagerChange,
                    onShowSizeChange: this.onPagerSizeChange,
                    simple:this.type=='index'?true:false,
                };
            },

        },

        watch: {
            selectedRows: function (selectedRows) {
                this.needTotalList = this.needTotalList.map(item => {
                    return {
                        ...item,
                        total: selectedRows.reduce((sum, val) => {
                            return sum + val[item.dataIndex];
                        }, 0)
                    };
                });
            },
            current (nVal, oVal) {
                this.onClearSelected();
            }
        },
        computed: {}

    };
</script>
<style lang="less" scoped >
    /deep/ .ant-table td {white-space: nowrap !important; }
    /deep/ .ant-table th div {white-space: nowrap !important; }
    /deep/ .ant-table-pagination { white-space: nowrap !important;}
    #noticebox{ .ant-table td { white-space: nowrap !important; }
        .ant-table th { white-space: nowrap !important; }}
</style>