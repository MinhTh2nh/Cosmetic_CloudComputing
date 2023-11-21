"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _allowed = _interopRequireDefault(require("../utils/allowed"));
function Thead(props) {
  var children = props.children;
  return /*#__PURE__*/_react["default"].createElement("thead", (0, _extends2["default"])({
    "data-testid": "thead"
  }, (0, _allowed["default"])(props)), /*#__PURE__*/_react["default"].cloneElement(children, {
    inHeader: true
  }));
}
Thead.propTypes = {
  children: _propTypes["default"].node
};
Thead.defaultProps = {
  children: undefined
};
var _default = Thead;
exports["default"] = _default;