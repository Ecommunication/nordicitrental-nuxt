import Vue from 'vue'

Vue.filter('formatPrice', function (val) {
    const formattedPrice = new Intl.NumberFormat('da-DK').format(parseInt(val));
    return 'Kr. ' + formattedPrice + ',-';
});
