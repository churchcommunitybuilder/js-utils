export default (function (fn, duration) {
    if (duration === void 0) { duration = 250; }
    var timeout;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(function () { return fn.apply(void 0, args); }, duration);
    };
});
//# sourceMappingURL=debounce.js.map