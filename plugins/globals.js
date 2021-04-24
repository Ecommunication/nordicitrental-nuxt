import Vue from 'vue'

Vue.filter('imageUrl', function (val) {
    return 'http://localhost:1337' + val;
});
