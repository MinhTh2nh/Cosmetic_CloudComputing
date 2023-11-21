"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _allowed = _interopRequireDefault(require("../utils/allowed"));
function Th(props) {
  return /*#__PURE__*/_react["default"].createElement("th", (0, _extends2["default"])({
    "data-testid": "th"
  }, (0, _allowed["default"])(props)));
}
var _default = Th;
exports["default"] = _default;