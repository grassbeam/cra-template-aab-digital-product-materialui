/** Util.js
  *
  * CREATED ON 01/07/2019
  * CREATED BY LCY 
  *
  *
  **/

 export function isNullOrEmpty(str) {
   if (str === undefined || str === "undefined") {
     return true;
   }
   if (str === null) {
     return true;
   }
   if (str === "") {
     return true;
   }
   if (str === "null") {
     return true;
   }
   return false;
 };
 
 export function isNullOrUndefined(obj) {
   if (obj === undefined || obj === "undefined") {
     return true;
   }
   if (obj === null) {
     return true;
   }
   if (obj === "null") {
     return true;
   }
   return false;
 }
 
 export function normalizeString(str) {
   return isNullOrEmpty(str) ? "" : str;
 }
 
 export function toFormData(obj) {
   var form_data = "";
   if (obj != null) {
     if (typeof (obj) == 'object') {
       form_data = Object.keys(obj).map(function (key) {
         return key + '=' + obj[key]
       }).join('&');
     }
   }
   return form_data;
 }
 
 /**
   * ADDED START BY FAY 
   **/
 
 
 // Update By HAE Begin
 export function formatRupiah(angka, prefix = "Rp. ") {
   if (!isNullOrEmpty(angka)) {
     var resltAngka = angka.toString();
     var number_string = resltAngka.replace(/[^,\d]/g, '').toString(),
       split = number_string.split(','),
       sisa = split[0].length % 3,
       rupiah = split[0].substr(0, sisa),
       ribuan = split[0].substr(sisa).match(/\d{3}/gi);
 
     // tambahkan titik jika yang di input sudah menjadi angka ribuan
     if (ribuan) {
       let separator = sisa ? '.' : '';
       rupiah += separator + ribuan.join('.');
     }
 
     rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
     return prefix === undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
   }
 }
 // Update By HAE End
 
 export function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
   try {
     decimalCount = Math.abs(decimalCount);
     decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
 
     const negativeSign = amount < 0 ? "-" : "";
 
     let i = parseInt(
       (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
     ).toString();
     let j = i.length > 3 ? i.length % 3 : 0;
 
     return (
       negativeSign +
       (j ? i.substr(0, j) + thousands : "") +
       i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
       (decimalCount
         ? decimal +
         Math.abs(amount - i)
           .toFixed(decimalCount)
           .slice(2)
         : "")
     );
   } catch (e) {
     console.log(e);
   }
 };

 /**
  * 
  * @param {string} date Data of the date 
  * @param {string} format format date
  * @returns {string}
  */
 export function formatDate(date, format = "yyyy-mm-dd hh:MM:ss") {
   var dateFormat = require('dateformat');
   if (isNullOrEmpty(date)) {
     return date;
   }
   return dateFormat(date, format);
 }
 
 export function formatNumber(num) {
   if (isNullOrEmpty(num)) {
     return "0"
   }
   return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }
 
 export function daysBetween(date1, date2) {
   //Get 1 day in milliseconds
   var one_day = 1000 * 60 * 60 * 24;
 
   // Convert both dates to milliseconds
   var date1_ms = date1.getTime();
   var date2_ms = date2.getTime();
 
   // Calculate the difference in milliseconds
   var difference_ms = date2_ms - date1_ms;
 
   // Convert back to days and return
   return Math.round(difference_ms / one_day);
 }
 
 export function stringCompare(str1, str2) {
   let temp = false;
   if ((str1 + "").trim().toUpperCase() === (str2 + "").trim().toUpperCase()) {
     temp = true;
   }
   return temp;
 }
 
 export function isWeekday(date) {
   const day = date.getDay();
   return day !== 0 && day !== 6;
 }
 
 export function convertArrayObjectToLinearArray(arrayOfObject, keyObjectArray) {
   var array = [...arrayOfObject];
   var returnArray = [];
 
   array.forEach((data, i) => {
     if (typeof (data) == 'object') {
       returnArray.push(data[keyObjectArray])
     }
   })
 
   return returnArray;
 }
 
 /**
   * ADDED END BY FAY 
   **/
 
 export function normalizeFunc(func, defaultVal = (() => { })) {
   return func || defaultVal;
 }
 
 export function normalizeArr(arr) {
   return arr || [];
 }

 export function getBrowserLanguage() {
    var nav = window.navigator,
      browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
      i,
      language;
  
    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
      for (i = 0; i < nav.languages.length; i++) {
        language = nav.languages[i];
        if (language && language.length) {
          return language;
        }
      }
    }
  
    // support for other well known properties in browsers
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
      language = nav[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        return language;
      }
    }
  
    return null;
};

 export function getUrlParameter(sParam) {
   var sPageURL = window.location.search.substring(1),
     sURLVariables = sPageURL.split("&"),
     sParameterName,
     i;
 
   for (i = 0; i < sURLVariables.length; i++) {
     sParameterName = sURLVariables[i].split("=");
 
     if (sParameterName[0] === sParam) {
       return sParameterName[1] === undefined
         ? true
         : decodeURIComponent(sParameterName[1]);
     }
   }
 };
 
 
 export function convertDate(datestring = "") {
   if (isNullOrEmpty(datestring)) {
     return new Date();
   } else {
     if (stringArrayContains((navigator.appVersion + "").toLowerCase(), ["mac", "iphone"])) {
       datestring = datestring.trim().split(" ").length === 2 ? datestring.trim().replace(" ", "T") : datestring.trim();
       datestring = datestring.replace("Z", "");
       // datestring = datestring.includes("T") ? datestring+"+07:00" : datestring;
       datestring = datestring.split("T").length === 2 ? datestring + getTimezoneOffsetByHour() : datestring;
       // datestring = datestring.includes("T") ? datestring+getTimezoneOffsetByHour() : datestring;
     }
     else if (datestring.includes("-")) {
       // var format ="ddmmyyyy"
       // var dateFormat = require('dateformat');
       // var newdate =  dateFormat(datestring, format)
       // return dateFormat(datestring, format)
       var dateArray = datestring.split("-");
       var year = dateArray[0];
       // var month = parseInt(dateArray[1], 10) - 1;
       var month = dateArray[1];
       var date = dateArray[2];
       var newdate = date + month + year
       //  return new Date(year, month, date);
       return newdate;
     }
     return new Date(datestring);
   }
 }
 
 export function getTimezoneOffsetByHour() {
   let hour = (new Date().getTimezoneOffset() / 60) * -1;
   if (hour < 10 && hour > 0) {
     return "+0" + hour + ":00";
   } else if (hour === 0) {
     return "00:00";
   } else if (hour > 10) {
     return "+" + hour + ":00";
   } else {
     return hour + ":00";
   }
 };
 
 export function stringArrayContains(item, arrayItems) {
   var filterstrings = arrayItems;
   var regex = new RegExp(filterstrings.join("|"), "i");
   return regex.test(item);
 }
 
 export function getLanguageCode() {
   var tempLang = (navigator.language || navigator.userLanguage).split('-');
   if (stringCompare(tempLang[0], "id")) {
     return true
   }
   return false
 }
 

 export function arrayObjectToSingleDimensionArray(arrayObject, key) {
   let res = [];
 
   if (Array.isArray(arrayObject)) {
     for (let i = 0; i < arrayObject.length; i++) {
       const element = arrayObject[i];
       if (!isNullOrEmpty(element[`${key}`])) {
         res.push(element[`${key}`])
       }
     }
   }
 
   return res;
 }
 
 
 export function stringContains(sentence, str) {
   let temp = false;
   if ((sentence + "").trim().toUpperCase().includes((str + "").trim().toUpperCase())) {
     temp = true;
   }
   return temp;
 }
 
 
 /**
  * 
  * @param {String} text = text with formatted for replace, example: "I want to do {0}" => text "{0}" will be replaced by index 0 on replacingParam 
  * @param {Array} replacingParam = array of parameter to be inserted to text param, example: ["something"] => with text = "I want to do {0}", the result => "I want to do something"
  */
 export function replacingTextWithParam(text, replacingParam=[]) {
   var result = text;
   if(!isNullOrEmpty(text) && replacingParam.length > 0) {
     for (let i = 0; i < replacingParam.length; i++) {
         const param = replacingParam[i];
         result = result.replace(`{${i}}`, param);
     }
   }
   return result;
 }
 