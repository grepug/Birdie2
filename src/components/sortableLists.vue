<template lang="jade">
  .list-block.sortable
    ul
      li(v-for="(index, el) in list", :class="{'team2-first': (list.length / 2) === index}", :data-id="el.id")
        .item-content
          .item-media(v-if="el.img")
            img(:src="el.img")
          .item-inner
            .item-title(v-text="el.title")
            .item-after(v-text="el.after")
        .sortable-handler
</template>

<script>
  import sortable from '../js/sortable'
  import $ from '../js/Dom7'

  export default {
    props: {
      list: {
        require: true,
        type: Array
      }
    },
    vuex: {
      action: {
        sortable: ({dispatch}) => {
          dispatch('UI_SORTABLE_SORTED', true)
        }
      }
    },
    ready () {
      sortable.initSortable()
      // sortable.sortableToggle('.sortable')
      $('.sortable').on('sort', () => {
        this.$dispatch('on-sort', null)
      })
    },
    events: {
      'sortable-toggle': function () {
        sortable.sortableToggle('.sortable')
      }
    }
  }
</script>

<style lang="less">
  @import "../less/lists.less";

</style>
