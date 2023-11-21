"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _tableContext = require("../utils/tableContext");
var _TrInner = _interopRequireDefault(require("./TrInner"));
function Tr(props) {
  return /*#__PURE__*/_react["default"].createElement(_tableContext.Consumer, null, function (headers) {
    return /*#__PURE__*/_react["default"].createElement(_TrInner["default"], (0, _extends2["default"])({}, props, {
      headers: headers
    }));
  });
}
var _default = Tr;
exports["default"] = _default;