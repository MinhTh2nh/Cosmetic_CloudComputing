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
function TdInner(props) {
  var headers = props.headers,
    children = props.children,
    columnKey = props.columnKey,
    className = props.className,
    colSpan = props.colSpan;
  var classes = "".concat(className || '', " pivoted");
  if (colSpan) {
    return /*#__PURE__*/_react["default"].createElement("td", (0, _extends2["default"])({
      "data-testid": "td"
    }, (0, _allowed["default"])(props)));
  }
  return /*#__PURE__*/_react["default"].createElement("td", (0, _extends2["default"])({
    "data-testid": "td"
  }, (0, _allowed["default"])(props), {
    className: classes
  }), /*#__PURE__*/_react["default"].createElement("div", {
    "data-testid": "td-before",
    className: "tdBefore"
  }, headers[columnKey]), children !== null && children !== void 0 ? children : /*#__PURE__*/_react["default"].createElement("div", null, "\xA0"));
}
TdInner.propTypes = {
  children: _propTypes["default"].node,
  headers: _propTypes["default"].shape({}),
  columnKey: _propTypes["default"].number,
  className: _propTypes["default"].string,
  colSpan: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string])
};
TdInner.defaultProps = {
  children: undefined,
  headers: undefined,
  columnKey: undefined,
  className: undefined,
  colSpan: undefined
};
var _default = TdInner;
exports["default"] = _default;