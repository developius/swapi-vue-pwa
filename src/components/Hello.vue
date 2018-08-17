<template>
  <div class="hello">
    <h1>Star Wars API</h1>
    <select aria-label="Type of entity" v-model="selectedEntity">
      <option v-for="entity in entities" :value="entity.value" :selected="entity.selected">
        {{entity.text}}
      </option>
    </select>
    <input aria-label="Enter search query" placeholder="Search query" v-model="query"/>
    <p v-if="results.length">{{results.count}} results</p>
    <div class="info-container">
      <div :class="{ expand: !selectedResult }">
        <ul>
          <li v-for="result in results.results">
             <a @click="selectResult(result)">
               {{getName(result)}}
             </a>
          </li>
        </ul>
      </div>
      <div :class="{ collapse: !selectedResult }">
        <template v-if="selectedResult">
          <h2>{{getName(selectedResult)}}</h2>
          <p v-for="characteristic in extractRedableCharacteristics(selectedResult)">
            {{capitalise(characteristic.name)}}: {{characteristic.value}}
          </p>
          <p><small>Last updated {{selectedResult.edited | moment('Do MMMM YYYY')}}</small></p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import _debounce from 'lodash.debounce'

export default {
  name: 'hello',
  data () {
    return {
      results: [],
      entities: [],
      selectedResult: null,
      selectedEntity: null,
      query: ''
    }
  },
  methods: {
    search: _debounce(function () {
      this.results = []

      const query = this.query
      const entity = this.selectedEntity

      axios.get(`https://swapi.co/api/${entity}/?search=${query}`).then(res => {
        this.results = res.data
      }, err => {
        throw err
      })
    }, 500),
    capitalise (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    getName (obj) {
      return obj.name || obj.title
    },
    extractRedableCharacteristics (obj) {
      const blacklist = ['created', 'edited', 'url', 'name']
      const permittedTypes = ['string', 'number', 'object']

      const attrs = Object.keys(obj).filter(key => {
        const value = obj[key]

        if (blacklist.indexOf(key) !== -1) return false
        if (permittedTypes.indexOf(typeof value) === -1) return false
        if (value.indexOf('http') !== -1) return false

        return true
      }).map(key => {
        const name = this.capitalise(key.replace(/_/g, ' '))

        let value = obj[key]
        if (typeof value === 'object' && value.length !== undefined) value = value.length

        return { name, value }
      })

      return attrs
    },
    selectResult (result) {
      this.selectedResult = result
    },
    clearResults () {
      this.selectedResult = null
      this.query = null
      this.results = []
    },
    handleKeydown (e) {
      if (e.keyCode === 27) { // esc
        this.clearResults()
      }
    }
  },
  created () {
    document.addEventListener('keydown', this.handleKeydown)

    axios.get('https://swapi.co/api/?format=json').then(res => {
      this.entities = Object.keys(res.data).map(key => {
        return {
          value: key,
          text: this.capitalise(key)
        }
      })

      this.selectedEntity = this.entities[0].value
    }, err => {
      throw err
    })
  },
  watch: {
    query (value) {
      if (value) this.search()
      else this.clearResults()
    },
    selectedEntity () {
      if (this.query) this.search()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
input, select {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: .5em;
  width: 80%;
  font-size: 1em;
  padding: 0.5em 1em;
  -webkit-appearance: none;
  background-color: #fff;
  border: 1px solid #ececec;
  border-radius: 4px;
}

h1, h2 {
  font-weight: normal;
}

.info-container {
  overflow: hidden;
  display: block;
  width: 100%;
}

.info-container div {
  float: left;
  width: 100%;
  transition: all .5s;
  display: inline-block;
}

div.collapse {
  display: none;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: block;
  margin: 0 10px;
}

a {
  cursor: pointer;
  color: #35495E;
}

p {
  margin: .2em;
}

@media only screen and (min-width: 768px) {
  input, select {
    display: inline-block;
    margin-bottom: 0;
    width: initial;
  }

  .info-container div {
    width: 50%;
  }

  div.collapse {
    width: 0;
    display: inline-block;
  }

  div.expand {
    width: 100%;
  }
}

.visually-hidden {
  display: none;
}
</style>
