export var toTitleCase = function (str) {
    return str
        .toLowerCase()
        .split(' ')
        .map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); })
        .join(' ');
};
//# sourceMappingURL=string.js.map