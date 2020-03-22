import polyfills from './polyfills';
import detectTouch from './detectTouch';
import search from './search';
import rocketAnimation from './rocketAnimation';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    search();
   
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    setTimeout(function() {
        rocketAnimation();
        document.body.classList.add('animatable');
    }, 1000)
})
