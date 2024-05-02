"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
exports.utils = {
    not_null_undef_empty: (data) => {
        if (data !== undefined && data !== null && data !== "") {
            return true;
        }
        else {
            return false;
        }
    },
};
