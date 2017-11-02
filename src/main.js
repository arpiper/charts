import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#appm',
  template: "<App :dataset=dataset type='line' data-test='3'/>",
  components: {App},
  data: {
    dataset: {
      x: [10,20,30,40],
      y: [10,40,90,160],
    }
  },
})
