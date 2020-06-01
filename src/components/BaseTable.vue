<template>
  <div class="content">
    <header v-if="filters" class="table-header">
      <div v-for="item in filters" v-bind:key="item">
        <div class="filters">
          <label class="label" :for="'input-' + item"
            >Filter by {{ item | cleanString }}:
          </label>
          <div class="control has-icons-right">
            <input
              class="input"
              :id="'input-' + item"
              type="text"
              v-model="searchObject[item]"
              :name="item"
              @keyup="setSearchObject"
            />
            <span class="icon is-small is-right">
              <font-awesome-icon icon="filter" />
            </span>
          </div>
        </div>
      </div>
    </header>
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th v-for="item in headings" v-bind:key="'th' + item">
              <div class="th-wrapper">
                <p class="th-title">
                  {{ item | cleanString }}
                </p>
                <button type="button" class="sort-button" @click="sort(item)">
                  <font-awesome-icon icon="sort" />
                </button>
              </div>
            </th>
            <th v-if="linkto"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredData" v-bind:key="item.id">
            <td
              v-for="(key, val) in item"
              v-bind:key="val"
              v-bind:class="{ 'id-string': val === 'id' }"
            >
              <span v-if="typeof key === 'object'">
                <span
                  v-for="(datum, index) in key"
                  v-bind:key="'a' + index"
                  class="cell-item"
                  >{{ datum.name }}</span
                >
              </span>
              <span v-else>{{ key }}</span>
            </td>

            <td v-if="linkto">
              <router-link :to="{ name: linkto, params: { id: item.id } }">
                Details
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <footer v-show="showPagination" class="table-footer">
      <p>
        <button type="button" class="page-button" @click="prevPage">
          <font-awesome-icon icon="caret-left" size="2x" />
          <span class="previous">Previous</span>
        </button>
        <button type="button" class="page-button" @click="nextPage">
          <span class="next">Next</span>
          <font-awesome-icon icon="caret-right" size="2x" />
        </button>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    tabledata: {
      type: Array,
      required: true
    },
    headings: {
      type: Array,
      required: true
    },
    filters: {
      type: Array
    },
    linkto: {
      type: String
    }
  },
  data() {
    return {
      currentSortDir: 'asc',
      currentSort: this.headings[0],
      pageSize: 15,
      currentPage: 1,
      searchingField: 'name',
      searchingValue: ''
    }
  },
  filters: {
    cleanString(string) {
      const cleanString =
        string.charAt(0).toUpperCase() + string.slice(1).replace(/_/g, ' ')
      return cleanString
    }
  },
  computed: {
    showPagination() {
      return this.filteredData.length > this.pageSize
    },
    searchObject: {
      get() {
        let search = {}
        this.filters.map(item => {
          search[item] = ''
        })
        return search
      },
      set(newval) {
        return newval
      }
    },
    sortedData() {
      return this.tabledata
        .slice()
        .sort((a, b) => {
          let modifier = 1
          if (this.currentSortDir === 'desc') modifier = -1
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
          return 0
        })
        .filter((row, index) => {
          let start = (this.currentPage - 1) * this.pageSize
          let end = this.currentPage * this.pageSize
          if (index >= start && index < end) return true
        })
    },
    filteredData() {
      if (this.filters) {
        return this.sortedData.filter(item => {
          return item[this.searchingField]
            .toLowerCase()
            .includes(this.searchingValue.toLowerCase())
        })
      } else {
        return this.sortedData
      }
    }
  },
  methods: {
    sort(sortby) {
      if (sortby === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = sortby
    },
    nextPage() {
      if (this.currentPage * this.pageSize < this.tabledata.length)
        this.currentPage++
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--
    },
    setSearchObject(event) {
      const field = event.target.name
      const value = event.target.value
      this.searchingField = field
      this.searchingValue = value
    }
  }
}
</script>
<style lang="sass">
@import 'bulma'
.table-wrapper
  border: 1px solid $primary
  border-radius: 5px
  padding: 1rem
.table
  font-size: 0.8rem
.th-wrapper
  display: flex
  flex-direction: row
  align-content: center
  height: 100%
.th-title
  margin-bottom: 0 !important
.sort-button
  background: none
  padding: 0
  border: none
  margin-left: 0.2rem
  font-size: 0.7rem
.table-footer
  width: 100%
  display: flex
  justify-content: center
.page-button
  @extend .button
  @extend .is-small
  @extend .is-link
  @extend .is-outlined
  margin: 1rem
  .next
    margin-right: 1rem
  .previous
    margin-left: 1rem
.filters
  @extend .field
  width: 40%
  margin-bottom: 2rem
.id-string
  font-size: 0.6rem
  font-family: monospace
.cell-item
  @extend .tag
  @extend .is-light
  margin: 0.2rem
</style>
