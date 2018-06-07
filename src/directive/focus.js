import Vue from 'vue';
Vue.directive('focus', {
    update: function (el, {value}) {
      if (value) {
          console.log(el);
        el.focus()
      }
    }
})