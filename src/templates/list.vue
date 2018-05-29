<template>
  <div class="list-container">
    <!-- 查询 -->
    <div class="list-tabs">
      <x-breadcrumb separator=">" style="cursor: pointer;">
        <!-- 填入列表页对应的面包屑 如下：-->
        <!-- <x-breadcrumb-item :to="{path: '路由地址'}">名称</x-breadcrumb-item> -->
      </x-breadcrumb>

      <x-button-group @click.native="tabClick">
        <!-- 填入相关模块入口, 主要是看你兴趣, 如下： -->
        <!-- <x-button name="contract" type="primary">合同</x-button> -->
      </x-button-group>

      <!-- 查询项控件 -->
      <div class="tags">
        <x-tag v-for="(query, index) in tags"
          :key="index"
          :closable="true"
          :close-transition="false"
          @close="delQuery(query)">
            <span :title="query.name">
              <span class="parent">{{ query.parentName }}：</span>
              <span>{{ query.name }}</span>
            </span>
        </x-tag>
      </div>
    </div>

    <!-- 列表控件 -->
    <x-table
      v-loading="loading"
      stripe
      :data="datasource"
      @sort-change="sortChange">
      <!-- 表头 -->
      <x-table-column
          label="表头"
          property="contractNo"
          align="left"
          min-width="110"
          inline-template>
        </x-table-column>
    </x-table>

    <!-- 分页控件 -->
    <div class="tableFooter">
      <x-pagination
        @sizechange="handleSizeChange"
        @currentchange="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 30, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </x-pagination>
    </div>
  </div>
</template>

<script>
  // baseComponents
  import XButton from 'components/button'
  import XButtonGroup from 'components/button-group'
  import XBreadcrumb from 'components/breadcrumb'
  import XBreadcrumbItem from 'components/breadcrumb-item'
  import XTable from 'components/table'
  import XTableColumn from 'components/table-column'
  import XPagination from 'components/pagination'
  import XTag from 'components/tag'

  // bizComponents

  // others

  export default {
    computed: {
      tags () {
        let tags = this.inputQuerys.concat(this.labelQuerys)
        tags.sort((a, b) => {
          return a.id - b.id
        })
        return tags
      }
    },

    watch: {
      '$route': {
        immediate: true,
        handler (to, from) {}
      },
    },

    methods: {
      // ======================================================================
      // 自定义函数
      // ======================================================================
      loadData () {
        // 获取数据
      },
      handleParams () {
        // 参数
      },

      // ======================================================================
      // 事件触发函数
      // ======================================================================
      sortChange (param) {
        if (param) {
          // ******* 排序字段可以根据业务自行改动 *******
          let _queryMap = {
            createTime: 'create_time',
            pv: 'pv',
            click: 'click',
            cost: 'cost',
            cpc: 'cpc',
            ctr: 'ctr'
          }
          if (param.order && param.prop) {
            this.order = param.order === 'ascending' ? 0 : 1
            this.orderBy = _queryMap[param.prop]
          } else {
            this.order = 0
            this.orderBy = ''
          }
          this.page = 1
          this.loadData()
        }
      },
      handleSizeChange (value) {
        this.pageSize = value
        this.page = 1
        this.loadData()
      },
      handleCurrentChange (value) {
        this.page = value
        this.loadData()
      },
    },

    created: {
    },

    components: {
      XButton,
      XButtonGroup,
      XBreadcrumb,
      XBreadcrumbItem,
      XTable,
      XTableColumn,
      XPagination,
      XTag
    },

    data () {
      return {
        // 查询部分
        tags: [],

        // 排序参数
        order: 0,
        orderBy: '',
        page: 1,
        pageSize: 10,
        total: 0,
        count: 0,

        // 列表部分
        loading: false,
        datasource: []
      }
    }
  }
</script>

<style scoped>

</style>
