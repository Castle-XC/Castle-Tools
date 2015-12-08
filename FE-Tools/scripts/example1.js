
// Example JavaScript File #1
// This includes the 'example' namespace

(function (window, $, example, undefined) {
    // We've created the 'example' namespace
    "use strict";

    // Here is an example of a variable that is PRIVATE to the example namespace
    var privateExample = true;

    // Here is a PUBLIC variable, accessable outside of this file
    example.publicExample = true;

    // Here is a PUBLICLY available method
    example.publicMethod = function () {
        console.log("example.publicMethod has been run!");
        console.log("example.publicExample: " + example.publicExample);

        privateMethod();
    };

    example.publicMethod();

    // Here is a PRIVATE method
    function privateMethod() {
        console.log("privateMethod has been called.");
        console.log("privateExample :" + privateExample);
    } // end functoin privateMethod()
})(window, jQuery, window.example = window.example || {});
