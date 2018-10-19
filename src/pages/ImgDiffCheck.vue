<template>
  <div>
    <div class="image-selection">
      <h4>Image 1</h4>
      <input type="file" @change="imgChange(0)" class="file-input">
      <br>
      <input type="text" v-model="url0" class="file-url-input" placeholder="Put an URL or a base64 encoded image">
    </div>
    <div class="image-selection">
      <h4>Image 2</h4>
      <input type="file" @change="imgChange(1)" class="file-input">
      <br>
      <input type="text" v-model="url1" class="file-url-input" placeholder="Put an URL or a base64 encoded image">
    </div>
    <br>
    <input type="checkbox" id="image-compare-magnet" v-model="grab">&nbsp;
    <label for="image-compare-magnet">Width magnet</label>
    <input type="range" value="0" max="0" v-model="width0">
    <input type="range" value="0" max="0" v-model="width1">
    <div id="images">
      <img id="first-image-compare" class="image-compare" :src="url0" alt="">
      <img id="second-image-compare" class="image-compare" :src="url1" alt="">
    </div>

  </div>
</template>

<script>
const readers = [
  new FileReader(),
  new FileReader()
]

function updateImageSize () {
  [...document.querySelectorAll('input[type=range]')].forEach((input, index) => {
    let image = document.getElementsByClassName('image-compare')[index]
    input.value = input.max = image.width
    input.style.width = image.width + 'px'
  })
}

export default {
  name: 'ImgDiffCheck',
  data () {
    return { url0: '', url1: '', width0: 0, width1: 0, grab: true }
  },
  mounted: function () {
    [...document.getElementsByClassName('image-compare')].forEach((imageElement, index) => {
      imageElement.onload = () => {
        updateImageSize()
        this['width' + index] = imageElement.width
      }
    })
    readers.forEach((reader, index) => {
      reader.onload = (e) => {
        this['url' + index] = e.target.result
      }
    })
  },
  methods: {
    imgChange: function (index) {
      let el = document.querySelectorAll('input[type=file]')[index]
      if (el.files) {
        readers[index].readAsDataURL(el.files[0])
      }
    }
  },
  watch: {
    url0: function (value) {
      updateImageSize()
    },
    url1: function () {
      updateImageSize()
    },
    width0: function (width) {
      document.getElementById('first-image-compare').style.width = width + 'px'
      if (this.grab && Math.abs(width - this.width1) < 10) {
        this.width0 = this.width1
      }
    },
    width1: function (width) {
      document.getElementById('second-image-compare').style.width = width + 'px'
      if (this.grab && Math.abs(width - this.width0) < 10) {
        this.width1 = this.width0
      }
    }
  }
}
</script>

<style scoped>
img {
  float: left;
  position: absolute;
  top: 75px;
  left: 0px;
}

img:hover {
  mix-blend-mode: difference;
}

input[type="range"] {
  display: block;
  width: 0;
}

.image-selection {
  width: 49%;
  display: inline-block;
}

.file-url-input {
  margin-top: 5px;
  margin-bottom: 5px;
  width: 100%;
}

#images {
  position: relative;
}
</style>
