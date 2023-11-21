"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _allowed = _interopRequireDefault(require("../utils/allowed"));
function Tbody(props) {
  return /*#__PURE__*/_react["default"].createElement("tbody", (0, _extends2["default"])({
    "data-testid": "tbody"
  }, (0, _allowed["default"])(props)));
}
var _default = Tbody;
exports["default"] = _default;