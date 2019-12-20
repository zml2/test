<template>
    <a-card :bordered="false">
        <div v-show="type=='index'?false:true" class="table-page-search-wrapper">
            <a-form layout="vertical">
                <a-row :gutter="24">
                    <!-- 级别 -->
                    <a-col :span="6">
                        <a-form-item :label="$t('notice.level')">
                            <mdm-dict-select-tag
                                    v-model="queryParam.level"
                                    :dict-code="'noticeImportanceLevel'"
                                    :placeholder="$t('placeholder_select')"
                            />
                        </a-form-item>
                    </a-col>
                    <!-- 标题 -->
                    <a-col :span="6">
                        <a-form-item :label="$t('notice.title')">
                            <a-input v-model="queryParam.title" :placeholder="$t('placeholder_input')"/>
                        </a-form-item>
                    </a-col>
                    <!-- 发布者 -->
                    <a-col :span="6">
                        <a-form-item :label="$t('notice.publisher')">
                            <a-input v-model="queryParam.updateBy" :placeholder="$t('placeholder_input')"/>
                        </a-form-item>
                    </a-col>

                    <a-col :span="advanced && 6 || 6 ">
            <span
                    class="table-page-search-submitButtons"
                    :style="advanced && { overflow: 'hidden' } || {} "
            >
              <a-button type="primary" @click="serachData()">{{ $t('action_search') }}</a-button>
              <a-button class="marginLeft8" @click="resetSearchForm">{{ $t('action_reload') }}</a-button>
              <a @click="toggleAdvanced" class="marginLeft16">
                <img src="@/assets/images/收起.svg" alt :class="advanced ? 'up':'down'" />
                <span class="action_togger">{{ advanced ? $t('com_packUp') : $t('com_expand') }}</span>
              </a>
            </span>
                    </a-col>
                </a-row>
                <template v-if="advanced">
                <a-row :gutter="24">
                    <!-- 发布时间 -->
                    <a-col :span="6">
                        <a-form-item :label="$t('notice.pubdate')">
                            <a-range-picker format="YYYY-MM-DD" v-model="releaseDate" @change="onChangeQueryrdt"/>
                        </a-form-item>
                    </a-col>
                </a-row>
                    </template>
            </a-form>
        </div>
        <div v-show="type=='index'?false:true" class="table-operator">
            <a-button type="primary" @click="noticePub">{{ $t('notice.publish') }}</a-button>
            <a-button type="primary" @click="handleNew">{{ $t('action_add') }}</a-button>
        </div>
        <s-table  :type="type"  ref="table"  :columns="columns" :data="loadData" ></s-table>
        <Notice-add :disabled="disabled" ref="newnotice" @reload="reload" ></Notice-add>
    </a-card>
</template>

<script>
    import STable from "./noticeTable";
    import moment from "moment";
    import {getAction} from "@/api/manage";
    import {JeecgListMixin} from "@/mixins/JeecgListMixin";
    import mdmDictSelectTag from "../../../components/mdm/MdmDictSelectTag.vue";
    import NoticeAdd from './noticeAdd'

    export default {
        name: "noticeList",
        mixins: [JeecgListMixin],
        components: {
            STable,
            mdmDictSelectTag,
            NoticeAdd,
        },
        props: {
            type: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                disabled: false,
                visible1: false,
                // 查询参数
                queryParam: {},
                advanced: false,
                releaseDate:null,
                // 表头
                columns: [
                    {
                        title: this.$t("notice.level"),
                        dataIndex: "level_dictText",
                        width: 160,
                        scopedSlots: {customRender: "level_dictText"},

                    },
                    {
                        title: this.$t("notice.title"),
                        dataIndex: "title1",
                        scopedSlots: {customRender: "title1"},
                        width: 200,
                    },
                    {
                        title: this.$t('notice.publisher'),
                        dataIndex: "updateBy",
                        scopedSlots: {customRender: "updateBy"},
                        width: 200,
                    },
                    {
                        title: this.$t('notice.pubdate'),
                        dataIndex: "releaseDate",
                        scopedSlots: {customRender: "releaseDate"},
                        width: 250,
                        align:'center',
                         sorter: (a, b) => a.releaseDate.localeCompare(b.releaseDate),
                    },
                    {
                        title: this.$t('item_status'),
                        dataIndex: "status_dictText",
                        width: 200,
                        scopedSlots: {customRender: "status_dictText"},

                    },
                    {
                        title: this.$t('action_operation'),
                        dataIndex: 'action',
                        scopedSlots: {customRender: 'action'},
                        width: 200,
                        align:'center'
                    }
                ],
                // 加载数据方法 必须为 Promise 对象
                loadData: parameter => {
                    return getAction(
                        "/bff/noticeInfo/page",
                        Object.assign(this.queryParam, parameter)
                    ).then(res => {
                        return res.result;
                    });
                },

            };
        },
        created() {
        },
        methods: {
            moment,
            // 发布按钮
            noticePub() {
                console.log(this.$refs.table.selectedRows)
                var sarr = this.$refs.table.selectedRows
                var arr = []
                var id = ''
                if (sarr.length > 0) {
                    sarr.map(item => {
                        arr.push(item.id)
                    })
                    if (arr.length == 1) {
                        id = arr[0]
                    } else {
                        id = arr.join(',');
                    }
                    getAction('/bff/noticeInfo/releaseNoticeInfoById', {id,status:'02'}).then(res => {
                        if (res.success) {
                            this.$message.success('发布成功！')
                            this.$refs.table.loadData({})
                        }
                    })
                }else{
                    this.$message.warning(this.$t('selOne'))
                }

            },
            // 新增
            handleNew() {
                this.$refs.newnotice.visible = true
            },
            toggleAdvanced() {
                this.advanced = !this.advanced;
            },
            onChangeQueryrdt(date, dateString) {
                this.queryParam.releaseDate_begin = dateString[0]
                this.queryParam.releaseDate_end = dateString[1]
            },
            serachData() {
                if(!this.releaseDate){
                    this.queryParam.releaseDate_begin = "";
                    this.queryParam.releaseDate_end = "";
                }
                this.queryParam.pageNo = 1;
                this.$refs.table.loadData(this.queryParam);
            },
            reload() {
                this.$refs.table.loadData({})
            },
            resetSearchForm() {
                this.releaseDate=null
                this.queryParam = {
                    pageNo: 1
                };
                this.$refs.table.loadData(this.queryParam);
            }
        },

    };
</script>
<style lang="less" scoped>
    /deep/ .ant-table td {white-space: nowrap !important; }
    /deep/ .ant-table th div {white-space: nowrap !important; }
    /deep/ .ant-table-pagination { white-space: nowrap !important;}
</style>
