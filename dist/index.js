import R from 'ramda';
var isStringAndEmpty = function (str) {
    return typeof str === 'string' && str.replace(/\s/g, '').length === 0;
};
export var hasValue = R.complement(R.anyPass([R.isEmpty, R.isNil, R.equals(false), isStringAndEmpty]));
//# sourceMappingURL=index.js.map