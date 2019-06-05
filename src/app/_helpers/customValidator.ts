import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class CustomValidator {
  alphaNumericValidator(control) {
    try {
      const val = ((typeof control.value) === 'string') ? (control.value) : (control.value.value);
      if (val.match(/^[a-zA-Z0-9\ \- ]*$/)) {
        return null;
      } else {
        return { 'invalidAlphaNumericString': true };
      }
    } catch (e) { }
  }

  emailValidator(control) {
    try {
      const val = ((typeof control.value) === 'string') ? (control.value) : (control.value.value);
      if (val.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return null;
      } else {
        return { 'invalidEmailAddress': true };
      }
    } catch (e) { }
  }

  passwordValidator(control) {
    try {
      const val = ((typeof control.value) === 'string') ? (control.value) : (control.value.value);
      if (val.match(/(^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$)/)) {
        return null;
      } else {
        return { 'invalidPassword': true };
      }
    } catch (e) { }
  }

  numericValidator(control) {
    try {
      let val = control.value;
      if (val === null || val === '') return null;
      if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) {
        return { 'invalidNumber': true };
      } else {
        return null;

      }
    } catch (e) { }
  }

  gstinValidator(control) {
    try {
      const val = ((typeof control.value) === 'string') ? (control.value) : (control.value.value);
      if (val.match(/(^([0]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$)/)) {
        return null;
      } else {
        return { 'invalidGstin': true };
      }
    } catch (e) { }
  }

  panValidator(control) {
    try {
      const val = ((typeof control.value) === 'string') ? (control.value) : (control.value.value);
      if (val.match(/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/)) {
        return null;
      } else {
        return { 'invalidPan': true };
      }
    } catch (e) { }
  }

  twoDecimalValidator(control) {
    try {
      const val = ((typeof control.value) === 'string') ? (control.value) : (control.value.value);
      if (val.match(/^\d{1,100}(\.\d{1,2})?$/)) {
        return null;
      } else {
        return { 'invalidTwoDecimal': true };
      }
    } catch (e) { }
  }

  decimalValidator(control) {
    try {
      const val = ((typeof control.value) === 'string') ? (control.value) : (control.value.value);
      if (val.match(/^\d{1,100}(\.\d{1,3})?$/)) {
        return null;
      } else {
        return { 'invalidDecimal': true };
      }
    } catch (e) { }
  }

  decimalValidatorUptoTwoDecimal(control) {
    try {
      const val = ((typeof control.value) === 'string') ? (control.value) : (control.value.value);
      if (val.match(/^\d{1,10}(\.\d{1,2})?$/)) {
        return null;
      } else {
        return { 'invalidDecimal': true };
      }
    } catch (e) { }
  }

  taxValidator(control) {
    try {
      let val = control.value;
      if (val === null || val === '') return null;
      if (parseFloat(val) <= 100) {
        if (parseFloat(val) === 100) {
          return null;
        }
        let decimalIndex = val.indexOf('.');
        let decimalLength = (val.length - decimalIndex - 1);
        if (decimalLength > 2) {
          return { 'invalidTwoDecimal': true }
        }
        return null;
      } else {
        return { 'invalidTax': true }
      }

    } catch (e) {

    }
  }

  contactNum(event) {
    const pattern = /^[\d]?(?:[\d.]*)$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      const allowedKeys = ['Backspace', 'Del', 'Delete', 'Home', 'End', 'Left', 'ArrowLeft', 'Right', 'ArrowRight', 'Tab'];
      if (allowedKeys.indexOf(event.key) !== -1) { // for firefox and ie
        return true;
      }
      event.preventDefault();
    }
  }

  phoneNumberAllowValidator(event) {
    const pattern = /^[\+\d]?(?:[\d-\s()]*)$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      const allowedKeys = ['Backspace', 'Del', 'Delete', 'Home', 'End', 'Left', 'ArrowLeft', 'Right', 'ArrowRight', 'Tab'];
      if (allowedKeys.indexOf(event.key) !== -1) { // for firefox and ie
        return true;
      }
      event.preventDefault();
    }
  }


  userNameValidator(control) {
    try {
      const val = ((typeof control.value) === 'string') ? (control.value) : (control.value.value);
      if (val.match(/^[a-zA-Z0-9]*$/)) {
        return null;
      } else {
        return { 'invalidUserName': true };
      }
    } catch (e) { }
  }

  ifscValidator(control) {
    try {
      const val = ((typeof control.value) === 'string') ? (control.value) : (control.value.value);
      if (val.match(/^[A-Za-z]{4}0[A-Z0-9]{6}$/)) {
        return null;
      } else {
        return { 'InvalidIfsc': true };
      }
    } catch (e) { }
  }


  urlValidator(control) {
    try {
      const val = ((typeof control.value) === 'string') ? (control.value) : (control.value.value);
      if (val.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)) {
        return null;
      } else {
        return { 'invalidUrl': true };
      }
    } catch (e) { }
  }


  phoneFaxValidator(control) {
    try {
      let val = control.value;
      if (val === null || val === '') return null;
      if (!val.toString().match(/^(\+)?([ 0-9()-]){10,16}$/)) {
        return { 'invalidNumber': true };
      } else {
        return null;
      }
    } catch (e) { }
  }

  onlyNumberAllowed(event) {
    const pattern = /^[\+\d]*$/;

    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      const allowedKeys = ['Backspace', 'Del', 'Delete', 'Home', 'End', 'Left', 'ArrowLeft', 'Right', 'ArrowRight', 'Tab'];
      if (allowedKeys.indexOf(event.key) !== -1) { // for firefox and ie
        return true;
      }
      event.preventDefault();
    }
  }

  filterDateFormat(event, field, filterType, dt) {
    let filterValue = moment(event).format('YYYY-MM-DD').toString();
    return dt.filter(filterValue, field, filterType);
  }

  formatAmountWithComma(nStr) {
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }

  removeDecorationFromNumber(value) {
    return (value) ? (value.toString()).split(',').join('') : "";
  }
  phoneNumberAndEmail(control){
    try {
      let val = control.value;
      if (val === null || val === '') return null;
      if (!val.toString().match(/^[0-9]{10}$/) && !val.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ) {
        return { 'invalidEmailOrNumber': true };
      } else {
        return null;
      }
    } catch (e) { }
  }

  phoneNumberValidation(control){
    try {
      let val = control.value;
      if (val === null || val === '') return null;
      if (!val.toString().match(/^[0-9]{10}$/)) {
        return { 'invalidNumber': true };
      } else {
        return null;
      }
    } catch (e) { }
  }


}

















