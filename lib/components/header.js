'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _velocityReact = require('velocity-react');

var NodeHeader = (function (_React$Component) {
    _inherits(NodeHeader, _React$Component);

    function NodeHeader(props) {
        _classCallCheck(this, _NodeHeader);

        _get(Object.getPrototypeOf(_NodeHeader.prototype), 'constructor', this).call(this, props);
    }

    _createClass(NodeHeader, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var style = _props.style;
            var animations = _props.animations;
            var decorators = _props.decorators;

            var terminal = !this.props.node.children;
            var active = this.props.node.active;
            var linkStyle = [style.link, active ? style.activeLink : null];
            return _react2['default'].createElement(
                'a',
                {
                    href: '#',
                    ref: 'hyperlink',
                    onClick: this.props.onClick,
                    style: linkStyle },
                !terminal ? this.renderToggle(decorators, animations) : '',
                _react2['default'].createElement(decorators.Header, {
                    node: this.props.node,
                    style: style.header
                })
            );
        }
    }, {
        key: 'renderToggle',
        value: function renderToggle(decorators, animations) {
            var Toggle = decorators.Toggle;
            var style = this.props.style;
            return _react2['default'].createElement(
                _velocityReact.VelocityComponent,
                { ref: 'velocity',
                    duration: animations.toggle.duration,
                    animation: animations.toggle.animation },
                _react2['default'].createElement(Toggle, { style: style.toggle })
            );
        }
    }]);

    var _NodeHeader = NodeHeader;
    NodeHeader = (0, _radium2['default'])(NodeHeader) || NodeHeader;
    return NodeHeader;
})(_react2['default'].Component);

NodeHeader.propTypes = {
    style: _react2['default'].PropTypes.object.isRequired,
    decorators: _react2['default'].PropTypes.object.isRequired,
    animations: _react2['default'].PropTypes.object.isRequired,
    node: _react2['default'].PropTypes.object.isRequired,
    onClick: _react2['default'].PropTypes.func
};

exports['default'] = NodeHeader;
module.exports = exports['default'];