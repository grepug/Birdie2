<template lang="jade">
  .list-block.sortable
    ul
      li(v-for="(index, el) in list", :class="{'team2-first': (list.length / 2) === index}")
        .item-content
          .item-media(v-if="el.img")
            img(:src="el.img")
          .item-inner
            .item-title {{el.title}}
            .item-after {{el.after}}
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
    ready () {
      sortable.initSortable()
      sortable.sortableToggle('.sortable')
      $('.sortable').on('sort', () => {
        this.$dispatch('on-sort', null)
      })
    }
  }
</script>

<style lang="less">
  @import "../less/lists.less";

</style>
