require('./scss/main.scss');
import $ from 'jquery';
import {MDCSelect} from "../node_modules/@material/select/index";
import {MDCRipple} from '../node_modules/@material/ripple/index';
$(() => {
    //Code JS goes here
    $('body').append('<p>Hello from Js</p>');
console.log('hello');

    MDCRipple.attachTo(document.querySelector('.mdc-button'));
    const select = new MDCSelect(document.querySelector('.mdc-select'));
    select.listen('MDCSelect:change', () => {
        /*alert(`Selected "${select.selectedOptions[0].textContent}" at index ${select.selectedIndex} ` +
            `with value "${select.value}"`);*/
    });
});
