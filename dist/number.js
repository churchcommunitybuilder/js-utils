export var convertToInt = function (item, fallback) {
    if (fallback === void 0) { fallback = 0; }
    var parsedInt = parseInt(item, 10);
    return Number.isNaN(parsedInt) ? fallback : parsedInt;
};
//# sourceMappingURL=number.js.map