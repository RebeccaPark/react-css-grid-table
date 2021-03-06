import PropTypes from 'prop-types';
import React from 'react';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Table = function (_React$Component) {
  inherits(Table, _React$Component);

  function Table() {
    classCallCheck(this, Table);
    return possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));
  }

  createClass(Table, [{
    key: 'renderRow',
    value: function renderRow(body, key, _className) {
      var className = ['Table__cell', _className].filter(Boolean).join(' ');
      return React.createElement(
        'div',
        { className: className, key: key },
        body
      );
    }
  }, {
    key: 'renderHeader',
    value: function renderHeader() {
      var _this2 = this;

      return this.props.columns.map(function (header) {
        return _this2.renderRow(header.label, header.value, 'Table__header');
      });
    }
  }, {
    key: 'renderBody',
    value: function renderBody() {
      var _this3 = this;

      return this.props.data.map(function (row) {
        return _this3.props.columns.map(function (header) {
          var _ref = header || {},
              format = _ref.format,
              className = _ref.className;

          var body = row[header.value];
          if (format) {
            body = format(row[header.value]);
          }
          return _this3.renderRow(body, row.id + ':' + header.value, className);
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var columnWidth = this.props.columns.map(function (header) {
        return header.width;
      }).join(' ');

      return React.createElement(
        'div',
        { className: 'Table', style: { gridTemplateColumns: columnWidth } },
        this.renderHeader(),
        this.renderBody()
      );
    }
  }]);
  return Table;
}(React.Component);


Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    width: PropTypes.string,
    format: PropTypes.func,
    className: PropTypes.string
  })),
  data: PropTypes.arrayOf(PropTypes.object)
};

function IconColumn(props) {
  return React.createElement(
    'div',
    { className: 'IconColumn' },
    React.createElement('span', { className: ['IconColumn__icon', props.icon].filter(Boolean).join(' ') }),
    React.createElement(
      'span',
      { className: 'IconColumn__data' },
      props.data
    )
  );
}

IconColumn.propTypes = {
  icon: PropTypes.string,
  data: PropTypes.node
};

export default Table;
export { IconColumn };
