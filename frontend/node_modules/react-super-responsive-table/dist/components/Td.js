"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _tableContext = require("../utils/tableContext");
var _TdInner = _interopRequireDefault(require("./TdInner"));
function Td(props) {
  return /*#__PURE__*/_react["default"].createElement(_tableContext.Consumer, null, function (headers) {
    return /*#__PURE__*/_react["default"].createElement(_TdInner["default"], (0, _extends2["default"])({}, props, {
      headers: headers
    }));
  });
}
var _default = Td;
exports["default"] = _default;