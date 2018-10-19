<template>
  <div id="toolbar">
    <div v-for="(category, categoryId, index) of categories" :key="categoryId">
      <div v-b-toggle=categoryId class="category" :ref="categoryId" v-on:click=clickAccordeon>
        <div class="category-name">{{ category.name }}</div>
        <i>
          <font-awesome-icon class="icon" icon="chevron-down" />
        </i>
      </div>
      <b-collapse :id=categoryId>
        <ul>
          <div v-for="tool in category.tools" :key="tool.name">
            <router-link v-if=tool.url v-bind:to=tool.url :data-name=tool.name :data-category="categoryId">{{ tool.name }}</router-link>
            <li v-else class="tool" v-on:click=clickHandler :data-name=tool.name :data-category="categoryId">{{ tool.name }}</li>
          </div>
        </ul>
      </b-collapse>
      <hr class="separator" v-if="index < Object.keys(category.tools).length">
    </div>
  </div>
</template>

<script>
window.categories = {
  C1: {
    name: 'Network',
    tools: [
      { name: 'Latency Graph', url: '/ping' },
      { name: 'tool2' }
    ]
  },
  C2: {
    name: 'Steganography',
    tools: [
      { name: 'Image Diff Checker', url: '/imgDiffCheck' },
      { name: 'tool4' }
    ]
  },
  C3: {
    name: 'Category 3',
    tools: [
      { name: 'tool5' },
      { name: 'tool6' }
    ]
  }
}

export default {
  name: 'Toolbar',
  data () {
    return { categories: window.categories }
  },
  methods: {
    clickHandler: function (event) {
      window.categories[event.target.dataset.category].tools.push({ name: 'toolx' })

      setInterval(() => {
        this.$forceUpdate()
      }, 1000)
    },
    clickAccordeon: function (el) {
      el.target.nextElementSibling.setAttribute('icon', el.target.parentNode.classList.contains('collapsed') ? 'chevron-up' : 'chevron-down')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#toolbar {
  padding-top: 5px;
  width: 15vw;
  min-width: 125px; /* Need Media Query for device < 768px width*/
  border-right: 1px solid black;
  height: 80vh;
}

.separator {
  margin: 5px;
}

.category {
  min-height: 25px;
  height: 8vh;
  width: calc(100% - 10px);
  position: relative;
  cursor: pointer;
}

.category-name {
  margin: auto;
  position: absolute;
  display: table;
  top: 0px;
  bottom: 0px;
  left: 10px;
}

.icon {
  margin: auto;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 10px;
}
</style>
