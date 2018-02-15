import * as $ from 'jquery';
/* Import Mat design lite */
// require('material-design-lite');
/* Import Mat design web */
/**
 * mdc
 */
//import * as mdc from 'material-components-web';
// import {MDCSelect} from "@material/select/index";
/*Import Bootstrap*/
// require('popper.js');
// require('bootstrap');
$(() => {
    //Code JS goes here
    $('body').append('<p>Hello from Js</p>');
    /**
     * MDC
     */
    //mdc.autoInit();

    const select = new MDCSelect(document.querySelector('.mdc-select'));
    select.listen('MDCSelect:change', () => {
        /*alert(`Selected "${select.selectedOptions[0].textContent}" at index ${select.selectedIndex} ` +
            `with value "${select.value}"`);*/
    });
});
