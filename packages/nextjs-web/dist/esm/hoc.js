import { a as _inherits, b as _classCallCheck, c as _possibleConstructorReturn, d as _getPrototypeOf, e as _createClass, f as _extends, g as _asyncToGenerator, h as _objectSpread, k as _taggedTemplateLiteral } from './chunk-cc870ac4.js';
import React, { Component } from 'react';
import { a as _regeneratorRuntime } from './chunk-cc3f9e68.js';
import './chunk-fccae6e7.js';
import { componentDisplayName, httpErrors, extractFragmentData, sectionPath } from './utils.js';
import 'inflected';
import 'escape-string-regexp';
import 'moment';
import 'object-path';
import 'next/config';
import { a as SiteConfigContext } from './chunk-a9505423.js';
import PropTypes from 'prop-types';
import { redirect } from './routing.js';
import 'next/head';
import { PageTitle, MetaDescription, RelCanonical } from './components-head.js';
import gql from 'graphql-tag';

var doc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WithContentFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Content"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"teaser"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"body"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"redirectTo"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"canonicalPath"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"description"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"primarySection"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]}]}}]}}],"loc":{"start":0,"end":212}};
    doc.loc.source = {"body":"fragment WithContentFragment on Content {\n  id\n  name\n  type\n  teaser\n  body\n  published\n  redirectTo\n  canonicalPath\n  metadata {\n    title\n    description\n  }\n  primarySection {\n    id\n    name\n    alias\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

var _jsxFileName = "/base-cms/packages/nextjs-web/src/hoc/withRequestOrigin.jsx";
var withRequestOrigin = (function (Page) {
  var WithRequestOrigin =
  /*#__PURE__*/
  function (_Component) {
    _inherits(WithRequestOrigin, _Component);

    function WithRequestOrigin() {
      _classCallCheck(this, WithRequestOrigin);

      return _possibleConstructorReturn(this, _getPrototypeOf(WithRequestOrigin).apply(this, arguments));
    }

    _createClass(WithRequestOrigin, [{
      key: "render",

      /**
       *
       */
      value: function render() {
        return React.createElement(Page, _extends({}, this.props, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 28
          },
          __self: this
        }));
      }
    }], [{
      key: "getInitialProps",

      /**
       *
       */
      value: function () {
        var _getInitialProps = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee(ctx) {
          var pageProps, req, requestOrigin;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!Page.getInitialProps) {
                    _context.next = 4;
                    break;
                  }

                  _context.next = 3;
                  return Page.getInitialProps(ctx);

                case 3:
                  pageProps = _context.sent;

                case 4:
                  req = ctx.req;
                  requestOrigin = req ? "".concat(req.protocol, "://").concat(req.get('host')) : "".concat(window.location.protocol, "//").concat(window.location.host);
                  return _context.abrupt("return", _objectSpread({}, pageProps, {
                    requestOrigin: requestOrigin
                  }));

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function getInitialProps(_x) {
          return _getInitialProps.apply(this, arguments);
        }

        return getInitialProps;
      }()
    }]);

    return WithRequestOrigin;
  }(Component);

  WithRequestOrigin.displayName = "WithRequestOrigin(".concat(componentDisplayName(Page), ")");
  WithRequestOrigin.propTypes = _objectSpread({}, Page.propTypes, {
    requestOrigin: PropTypes.string.isRequired
  });
  return WithRequestOrigin;
});

var _jsxFileName$1 = "/base-cms/packages/nextjs-web/src/hoc/withContent.jsx";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    query WithContent($input: ContentQueryInput!) {\n      content(input: $input) {\n        ...WithContentFragment\n        ", "\n      }\n    }\n    ", "\n    ", "\n  "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
/**
 *
 * @param {object} params
 * @param {string|object} params.fragment The query fragment, either as
 *                                        a string or a gql AST object.
 */

var buildQuery = function buildQuery(_ref) {
  var fragment = _ref.fragment;

  var _extractFragmentData = extractFragmentData({
    fragment: fragment
  }),
      spreadFragmentName = _extractFragmentData.spreadFragmentName,
      processedFragment = _extractFragmentData.processedFragment;

  return gql(_templateObject(), spreadFragmentName, doc, processedFragment);
};
/**
 *
 * @param {object} content
 * @param {object} ctx
 * @param {object} ctx.Router
 * @param {?object} ctx.res
 * @param {string} ctx.asPath
 */

var checkContent = function checkContent(content, _ref2) {
  var Router = _ref2.Router,
      res = _ref2.res,
      asPath = _ref2.asPath;
  var redirectTo = content.redirectTo,
      canonicalPath = content.canonicalPath;

  if (redirectTo) {
    redirect({
      Router: Router,
      res: res,
      route: redirectTo
    });
  } else if (canonicalPath !== asPath) {
    redirect({
      Router: Router,
      res: res,
      route: canonicalPath
    });
  }
};
/**
 *
 * @param {object} Page
 * @param {object} options
 * @param {?string|object} options.fragment
 */

var withContent = (function () {
  var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref3$fragment = _ref3.fragment,
      fragment = _ref3$fragment === void 0 ? null : _ref3$fragment;

  return function (Page) {
    var WithContent =
    /*#__PURE__*/
    function (_Component) {
      _inherits(WithContent, _Component);

      function WithContent() {
        _classCallCheck(this, WithContent);

        return _possibleConstructorReturn(this, _getPrototypeOf(WithContent).apply(this, arguments));
      }

      _createClass(WithContent, [{
        key: "render",

        /**
         *
         */
        value: function render() {
          var _this$props = this.props,
              requestOrigin = _this$props.requestOrigin,
              canonicalPath = _this$props.canonicalPath,
              content = _this$props.content;
          var metadata = content.metadata;
          return React.createElement(React.Fragment, null, React.createElement(SiteConfigContext.Consumer, {
            __source: {
              fileName: _jsxFileName$1,
              lineNumber: 115
            },
            __self: this
          }, function (config) {
            return React.createElement(PageTitle, {
              value: metadata.title,
              siteName: config.get('name'),
              __source: {
                fileName: _jsxFileName$1,
                lineNumber: 116
              },
              __self: this
            });
          }), React.createElement(MetaDescription, {
            value: metadata.description,
            __source: {
              fileName: _jsxFileName$1,
              lineNumber: 118
            },
            __self: this
          }), React.createElement(RelCanonical, {
            origin: requestOrigin,
            pathname: canonicalPath,
            __source: {
              fileName: _jsxFileName$1,
              lineNumber: 119
            },
            __self: this
          }), React.createElement(Page, _extends({}, this.props, {
            __source: {
              fileName: _jsxFileName$1,
              lineNumber: 120
            },
            __self: this
          })));
        }
      }], [{
        key: "getInitialProps",

        /**
         *
         */
        value: function () {
          var _getInitialProps = _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee(ctx) {
            var pageProps, query, apollo, id, input, variables, _ref4, data, content, canonicalPath;

            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!Page.getInitialProps) {
                      _context.next = 4;
                      break;
                    }

                    _context.next = 3;
                    return Page.getInitialProps(ctx);

                  case 3:
                    pageProps = _context.sent;

                  case 4:
                    query = ctx.query, apollo = ctx.apollo; // Get the content id from the page query

                    id = query.id;

                    if (id) {
                      _context.next = 8;
                      break;
                    }

                    throw httpErrors.notFound('No content ID was provided.');

                  case 8:
                    // Query for the content object using the id, via the inject apollo client.
                    input = {
                      id: Number(id)
                    };
                    variables = {
                      input: input
                    };
                    _context.next = 12;
                    return apollo.query({
                      query: buildQuery({
                        fragment: fragment
                      }),
                      variables: variables
                    });

                  case 12:
                    _ref4 = _context.sent;
                    data = _ref4.data;
                    content = data.content;

                    if (content) {
                      _context.next = 17;
                      break;
                    }

                    throw httpErrors.notFound("No content was found for id '".concat(id, "'"));

                  case 17:
                    // Check content for internal/external redirects, etc.
                    checkContent(content, ctx);
                    canonicalPath = content.canonicalPath;
                    return _context.abrupt("return", _objectSpread({
                      content: content,
                      canonicalPath: canonicalPath
                    }, pageProps));

                  case 20:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function getInitialProps(_x) {
            return _getInitialProps.apply(this, arguments);
          }

          return getInitialProps;
        }()
      }]);

      return WithContent;
    }(Component);

    WithContent.displayName = "WithContent(".concat(componentDisplayName(Page), ")");
    WithContent.propTypes = _objectSpread({}, Page.propTypes, {
      canonicalPath: PropTypes.string.isRequired,
      content: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        teaser: PropTypes.string,
        body: PropTypes.string,
        redirectTo: PropTypes.string,
        metadata: PropTypes.object,
        canonicalPath: PropTypes.string.isRequired
      }).isRequired
    });
    return withRequestOrigin(WithContent);
  };
});

var doc$1 = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WithDynamicPageFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ContentPage"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"teaser"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"body"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"description"},"arguments":[],"directives":[]}]}}]}}],"loc":{"start":0,"end":138}};
    doc$1.loc.source = {"body":"fragment WithDynamicPageFragment on ContentPage {\n  id\n  name\n  type\n  teaser\n  alias\n  body\n  metadata {\n    title\n    description\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

var _jsxFileName$2 = "/base-cms/packages/nextjs-web/src/hoc/withDynamicPage.jsx";

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n    query WithDynamicPage($input: ContentPageQueryInput!) {\n      contentPage(input: $input) {\n        ...WithDynamicPageFragment\n        ", "\n      }\n    }\n    ", "\n    ", "\n  "]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 *
 * @param {object} params
 * @param {string|object} params.fragment The query fragment, either as
 *                                        a string or a gql AST object.
 */

var buildQuery$1 = function buildQuery(_ref) {
  var fragment = _ref.fragment;

  var _extractFragmentData = extractFragmentData({
    fragment: fragment
  }),
      spreadFragmentName = _extractFragmentData.spreadFragmentName,
      processedFragment = _extractFragmentData.processedFragment;

  return gql(_templateObject$1(), spreadFragmentName, doc$1, processedFragment);
};
/**
 *
 * @param {object} Page
 * @param {object} options
 * @param {?string|object} options.fragment A ContentPage fragment specifying additional fields
 */

var withDynamicPage = (function (Page) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    fragment: null
  };

  var WithDynamicPage =
  /*#__PURE__*/
  function (_Component) {
    _inherits(WithDynamicPage, _Component);

    function WithDynamicPage() {
      _classCallCheck(this, WithDynamicPage);

      return _possibleConstructorReturn(this, _getPrototypeOf(WithDynamicPage).apply(this, arguments));
    }

    _createClass(WithDynamicPage, [{
      key: "render",

      /**
       *
       */
      value: function render() {
        var _this$props = this.props,
            requestOrigin = _this$props.requestOrigin,
            page = _this$props.page;
        var metadata = page.metadata,
            alias = page.alias;
        return React.createElement(React.Fragment, null, React.createElement(SiteConfigContext.Consumer, {
          __source: {
            fileName: _jsxFileName$2,
            lineNumber: 89
          },
          __self: this
        }, function (config) {
          return React.createElement(PageTitle, {
            value: metadata.title,
            siteName: config.get('name'),
            __source: {
              fileName: _jsxFileName$2,
              lineNumber: 90
            },
            __self: this
          });
        }), React.createElement(MetaDescription, {
          value: metadata.description,
          __source: {
            fileName: _jsxFileName$2,
            lineNumber: 92
          },
          __self: this
        }), React.createElement(RelCanonical, {
          origin: requestOrigin,
          pathname: alias,
          __source: {
            fileName: _jsxFileName$2,
            lineNumber: 93
          },
          __self: this
        }), React.createElement(Page, _extends({}, this.props, {
          __source: {
            fileName: _jsxFileName$2,
            lineNumber: 94
          },
          __self: this
        })));
      }
    }], [{
      key: "getInitialProps",

      /**
       *
       */
      value: function () {
        var _getInitialProps = _asyncToGenerator(
        /*#__PURE__*/
        _regeneratorRuntime.mark(function _callee(ctx) {
          var pageProps, fragment, query, apollo, alias, input, variables, _ref2, data, contentPage;

          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!Page.getInitialProps) {
                    _context.next = 4;
                    break;
                  }

                  _context.next = 3;
                  return Page.getInitialProps(ctx);

                case 3:
                  pageProps = _context.sent;

                case 4:
                  fragment = options.fragment;
                  query = ctx.query, apollo = ctx.apollo; // Get the content alias from the page query

                  alias = query.alias;

                  if (alias) {
                    _context.next = 9;
                    break;
                  }

                  throw httpErrors.notFound('No content page alias was provided.');

                case 9:
                  // Query for the content page object using the alias, via the inject apollo client.
                  input = {
                    alias: alias
                  };
                  variables = {
                    input: input
                  };
                  _context.next = 13;
                  return apollo.query({
                    query: buildQuery$1({
                      fragment: fragment
                    }),
                    variables: variables
                  });

                case 13:
                  _ref2 = _context.sent;
                  data = _ref2.data;
                  contentPage = data.contentPage;

                  if (contentPage) {
                    _context.next = 18;
                    break;
                  }

                  throw httpErrors.notFound("No content page was found for alias '".concat(alias, "'"));

                case 18:
                  return _context.abrupt("return", _objectSpread({
                    page: contentPage
                  }, pageProps));

                case 19:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function getInitialProps(_x) {
          return _getInitialProps.apply(this, arguments);
        }

        return getInitialProps;
      }()
    }]);

    return WithDynamicPage;
  }(Component);

  WithDynamicPage.displayName = "WithDynamicPage(".concat(componentDisplayName(Page), ")");
  WithDynamicPage.propTypes = _objectSpread({}, Page.propTypes, {
    page: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      teaser: PropTypes.string,
      body: PropTypes.string,
      alias: PropTypes.string.isRequired,
      metadata: PropTypes.object
    }).isRequired
  });
  return withRequestOrigin(WithDynamicPage);
});

var _jsxFileName$3 = "/base-cms/packages/nextjs-web/src/hoc/withLayout.jsx";
var withLayout = (function (LayoutComp) {
  return function (ComposedComponent) {
    var WithLayout =
    /*#__PURE__*/
    function (_Component) {
      _inherits(WithLayout, _Component);

      function WithLayout() {
        _classCallCheck(this, WithLayout);

        return _possibleConstructorReturn(this, _getPrototypeOf(WithLayout).apply(this, arguments));
      }

      _createClass(WithLayout, [{
        key: "render",

        /**
         *
         */
        value: function render() {
          return React.createElement(LayoutComp, {
            __source: {
              fileName: _jsxFileName$3,
              lineNumber: 23
            },
            __self: this
          }, React.createElement(ComposedComponent, _extends({}, this.props, {
            __source: {
              fileName: _jsxFileName$3,
              lineNumber: 24
            },
            __self: this
          })));
        }
      }], [{
        key: "getInitialProps",

        /**
         *
         */
        value: function () {
          var _getInitialProps = _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee(ctx) {
            var pageProps;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!ComposedComponent.getInitialProps) {
                      _context.next = 4;
                      break;
                    }

                    _context.next = 3;
                    return ComposedComponent.getInitialProps(ctx);

                  case 3:
                    pageProps = _context.sent;

                  case 4:
                    return _context.abrupt("return", _objectSpread({}, pageProps));

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function getInitialProps(_x) {
            return _getInitialProps.apply(this, arguments);
          }

          return getInitialProps;
        }()
      }]);

      return WithLayout;
    }(Component);

    WithLayout.displayName = "WithLayout(".concat(componentDisplayName(ComposedComponent), ")");
    return WithLayout;
  };
});

var doc$2 = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WithWebsiteSectionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WebsiteSection"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"description"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"alias"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"description"},"arguments":[],"directives":[]}]}}]}}],"loc":{"start":0,"end":135}};
    doc$2.loc.source = {"body":"fragment WithWebsiteSectionFragment on WebsiteSection {\n  id\n  name\n  description\n  alias\n  metadata {\n    title\n    description\n  }\n}\n","name":"GraphQL request","locationOffset":{"line":1,"column":1}};

var _jsxFileName$4 = "/base-cms/packages/nextjs-web/src/hoc/withWebsiteSection.jsx";

function _templateObject$2() {
  var data = _taggedTemplateLiteral(["\n    query WithWebsiteSection($input: WebsiteSectionAliasQueryInput!, $redirect: WebsiteSectionRedirectQueryInput!) {\n      websiteSectionAlias(input: $input) {\n        ...WithWebsiteSectionFragment\n        ", "\n      }\n      websiteSectionRedirect(input: $redirect) {\n        id\n        alias\n      }\n    }\n    ", "\n    ", "\n  "]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
/**
 * Builds the website section GraphQL query.
 */

var buildQuery$2 = function buildQuery(_ref) {
  var fragment = _ref.fragment;

  var _extractFragmentData = extractFragmentData({
    fragment: fragment
  }),
      spreadFragmentName = _extractFragmentData.spreadFragmentName,
      processedFragment = _extractFragmentData.processedFragment;

  return gql(_templateObject$2(), spreadFragmentName, doc$2, processedFragment);
};
var withWebsiteSection = (function () {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$fragment = _ref2.fragment,
      fragment = _ref2$fragment === void 0 ? null : _ref2$fragment;

  return function (Page) {
    var WithWebsiteSection =
    /*#__PURE__*/
    function (_Component) {
      _inherits(WithWebsiteSection, _Component);

      function WithWebsiteSection() {
        _classCallCheck(this, WithWebsiteSection);

        return _possibleConstructorReturn(this, _getPrototypeOf(WithWebsiteSection).apply(this, arguments));
      }

      _createClass(WithWebsiteSection, [{
        key: "render",

        /**
         *
         */
        value: function render() {
          var _this$props = this.props,
              requestOrigin = _this$props.requestOrigin,
              canonicalPath = _this$props.canonicalPath,
              section = _this$props.section;
          var metadata = section.metadata;
          return React.createElement(React.Fragment, null, React.createElement(SiteConfigContext.Consumer, {
            __source: {
              fileName: _jsxFileName$4,
              lineNumber: 110
            },
            __self: this
          }, function (config) {
            return React.createElement(PageTitle, {
              value: metadata.title,
              siteName: config.get('name'),
              __source: {
                fileName: _jsxFileName$4,
                lineNumber: 111
              },
              __self: this
            });
          }), React.createElement(MetaDescription, {
            value: metadata.description,
            __source: {
              fileName: _jsxFileName$4,
              lineNumber: 113
            },
            __self: this
          }), React.createElement(RelCanonical, {
            origin: requestOrigin,
            pathname: canonicalPath,
            __source: {
              fileName: _jsxFileName$4,
              lineNumber: 114
            },
            __self: this
          }), React.createElement(Page, _extends({}, this.props, {
            __source: {
              fileName: _jsxFileName$4,
              lineNumber: 115
            },
            __self: this
          })));
        }
      }], [{
        key: "getInitialProps",

        /**
         *
         */
        value: function () {
          var _getInitialProps = _asyncToGenerator(
          /*#__PURE__*/
          _regeneratorRuntime.mark(function _callee(ctx) {
            var pageProps, query, apollo, res, Router, alias, input, variables, _ref3, data, websiteSectionAlias, websiteSectionRedirect, canonicalPath, redirectAlias, path;

            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!Page.getInitialProps) {
                      _context.next = 4;
                      break;
                    }

                    _context.next = 3;
                    return Page.getInitialProps(ctx);

                  case 3:
                    pageProps = _context.sent;

                  case 4:
                    query = ctx.query, apollo = ctx.apollo, res = ctx.res, Router = ctx.Router; // Get the section alias from the page query.
                    // Note: the section alias is required for this HOC to function properly.

                    alias = query.alias;

                    if (alias) {
                      _context.next = 8;
                      break;
                    }

                    throw httpErrors.notFound('No website section alias was provided.');

                  case 8:
                    // Query for the website section using the alias, via the injected apollo client.
                    input = {
                      alias: alias
                    };
                    variables = {
                      input: input,
                      redirect: input
                    };
                    _context.next = 12;
                    return apollo.query({
                      query: buildQuery$2({
                        fragment: fragment
                      }),
                      variables: variables
                    });

                  case 12:
                    _ref3 = _context.sent;
                    data = _ref3.data;
                    websiteSectionAlias = data.websiteSectionAlias, websiteSectionRedirect = data.websiteSectionRedirect;

                    if (!websiteSectionAlias) {
                      _context.next = 18;
                      break;
                    }

                    // The website section was found. Return it allong with the page props.
                    canonicalPath = sectionPath(alias);
                    return _context.abrupt("return", _objectSpread({
                      section: websiteSectionAlias,
                      canonicalPath: canonicalPath
                    }, pageProps));

                  case 18:
                    if (!(websiteSectionRedirect && websiteSectionRedirect.alias)) {
                      _context.next = 23;
                      break;
                    }

                    // A redirect was found for this section alias. Force a redirect.
                    redirectAlias = websiteSectionRedirect.alias;
                    path = sectionPath(redirectAlias);
                    redirect({
                      Router: Router,
                      res: res,
                      route: path
                    });
                    return _context.abrupt("return", _objectSpread({
                      section: {},
                      canonicalPath: path
                    }, pageProps));

                  case 23:
                    throw httpErrors.notFound("No website section was found for alias '".concat(alias, "'"));

                  case 24:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function getInitialProps(_x) {
            return _getInitialProps.apply(this, arguments);
          }

          return getInitialProps;
        }()
      }]);

      return WithWebsiteSection;
    }(Component);

    WithWebsiteSection.displayName = "WithWebsiteSection(".concat(componentDisplayName(Page), ")");
    WithWebsiteSection.propTypes = _objectSpread({}, Page.propTypes, {
      canonicalPath: PropTypes.string.isRequired,
      section: PropTypes.shape({
        id: PropTypes.number.isRequired,
        alias: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        seoTitle: PropTypes.string
      }).isRequired
    });
    return withRequestOrigin(WithWebsiteSection);
  };
});

export { withContent, withDynamicPage, withLayout, withRequestOrigin, withWebsiteSection };
