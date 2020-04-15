<template>
  <div class="content">
    <div v-for="item in filters" v-bind:key="item">
      <label :for="'input-' + item">Filter by {{ item }}: </label>
      <input
        :id="'input-' + item"
        type="text"
        v-model="searchObject[item]"
        :name="item"
        @keyup="setSearchObject"
      />
    </div>

    <table class="table">
      <thead>
        <tr>
          <th v-for="item in headings" v-bind:key="'th' + item">
            <span
              >{{ item | cleanString }}
              <button type="button" @click="sort(item)">
                <font-awesome-icon icon="sort" /></button
            ></span>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredData" v-bind:key="item.id">
          <td v-for="(key, val) in item" v-bind:key="val">
            {{ key }}
          </td>

          <td>
            <router-link :to="{ name: linkto, params: { id: item.id } }">
              Edit
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      <button @click="prevPage">Previous</button>
      <button @click="nextPage">Next</button>
    </p>
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
      return this.sortedData.filter(item => {
        return item[this.searchingField]
          .toLowerCase()
          .includes(this.searchingValue.toLowerCase())
      })
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
