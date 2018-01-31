<template>
  <div class="create-container">
    <!-- 面包屑 -->
    <div class="form-title">
      <x-breadcrumb separator=">" style="cursor: pointer;">
        <!-- 面包屑单项 -->
        <!-- <x-breadcrumb-item :to="{path: '/xxx/xxx/xxx'}">广告列表</x-breadcrumb-item> -->
      </x-breadcrumb>
    </div>
    <!-- 表单 -->
    <x-form
      :model="formData"
      :rules="rules"
      v-loading.fullscreen="loading"
      ref="formData"
      label-width="120px"
      class="advert-create">
      <!--  -->
      <!-- <x-form-item label-width="20px" prop="schedule">
        <x-date-selector
          :valid="scheduleVaild"
          v-model="formData.schedule"
          @select-complete="dateSelectorComplete">
        </x-date-selector>
      </x-form-item> -->
    </x-form>

    <div class="button-container">
      <x-button type="primary" @click.native.prevent="submit()">提交xxx</x-button>
      <x-button type="primary" @click.native.prevent="submit('next')">提交并新建xxx</x-button>
      <x-button @click.native.prevent="cancelHandler">取消</x-button>
    </div>
  </div>
</template>

<script>
  // baseComponents
  import XBreadcrumb from 'components/breadcrumb'
  import XBreadcrumbItem from 'components/breadcrumb-item'
  import XFormItem from 'components/form-item'
  import XForm from 'components/form'
  import XButton from 'components/button'

  // bizComponents

  // others
  import {flatten, values} from 'underscore'

  export default {
    computed: {

    },

    watch: {
      '$route': {
        immediate: true,
        handler (to, from) {
          // router发生变化时触发
        }
      },
    },

    methods: {
      // ======================================================================
      // 自定义函数
      // ======================================================================
      loadData () {
        // 获取表单数据
      },
      handleParams () {
        // 报表参数收集
      },
      checkIdeasRules (ideasRule) {
        let arr = flatten(values(ideasRule))
        return arr.every(value => { return value === true })
      },

      // ======================================================================
      // 事件触发函数
      // ======================================================================
      /**
       * 表单提交前参数的处理逻辑
       * @param   {Object}  formData   表单数据
       * @param   {String}  next       表单提交成功后页面执行状态
       * @returns {Object}  根据业务处理后的表单数据项
       */
      beforeSubmit (formData, next) {
        this.submitting = true
        if (!this.ideasRules.every(this.checkIdeasRules)) {
          return Promise.reject('ideasRules is false')
        }
        console.log('beforeSubmit')
        // 定义submitData，不直接改变this.formData的值，避免触发渲染
        let submitData = []
        // ******************这里添加业务相关的表单提数据处理逻辑*********************
        // ******************这里添加业务相关的表单提数据处理逻辑*********************
        return submitData
      },
      submit (next) {
        this.$refs.formData.validate((valid) => {
          if (valid) {
            let res = this.beforeSubmit(this.formData, next)
            ;(res && res.then ? res : Promise.resolve(res))
              .then(formData => {
                this.submitRequester(formData)
                  .then(data => {
                    this.loading = false
                    this.afterSubmit(data, next)
                  })
                  .catch(e => {
                    this.loading = false
                  })
              })
              .catch(e => {
                this.loading = false
              })
          } else {
            this.loading = false
          }
        })
      },
      afterSubmit (data, next) {
        // 表单提交完成后处理逻辑
      }
    },

    created: {
    },

    components: {
      XBreadcrumb,
      XBreadcrumbItem,
      XFormItem,
      XForm,
      XButton
    },

    data () {
      return {
        // 表单数据项
        formData: {

        },
        rules: {

        },
        submitRequester: null,
        // 加载相关
        edit: false,
        loading: false,
        submitting: false
      }
    }
  }
</script>

<style scoped>

</style>


