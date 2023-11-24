"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./user.controller");
exports.default = {
    signup: user_controller_1.signup,
    signin: user_controller_1.signin,
    signinGoogle: user_controller_1.signinGoogle,
    getUserData: user_controller_1.getUserData,
    putUserData: user_controller_1.putUserData,
    deactivateUser: user_controller_1.deactivateUser,
    forgotPassword: user_controller_1.forgotPassword,
    refreshPassword: user_controller_1.refreshPassword
};
