"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _allowed = _interopRequireDefault(require("../utils/allowed"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var TrInner = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(TrInner, _React$Component);
  var _super = _createSuper(TrInner);
  function TrInner(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, TrInner);
    _this = _super.call(this, props);
    var headers = props.headers;
    if (headers && props.inHeader) {
      _react["default"].Children.map(props.children, function (child, i) {
        if (child) {
          headers[i] = child.props.children;
        }
      });
    }
    return _this;
  }
  (0, _createClass2["default"])(TrInner, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      return /*#__PURE__*/_react["default"].createElement("tr", (0, _extends2["default"])({
        "data-testid": "tr"
      }, (0, _allowed["default"])(this.props)), children && _react["default"].Children.map(children, function (child, i) {
        return child && /*#__PURE__*/_react["default"].cloneElement(child, {
          // eslint-disable-next-line react/no-array-index-key
          key: i,
          columnKey: i
        });
      }));
    }
  }]);
  return TrInner;
}(_react["default"].Component);
TrInner.propTypes = {
  children: _propTypes["default"].node,
  headers: _propTypes["default"].shape({}),
  inHeader: _propTypes["default"].bool
};
TrInner.defaultProps = {
  children: undefined,
  headers: undefined,
  inHeader: undefined
};
var _default = TrInner;
exports["default"] = _default;