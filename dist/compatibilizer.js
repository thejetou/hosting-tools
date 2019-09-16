"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Compatibilizer = /** @class */ (function (_super) {
    __extends(Compatibilizer, _super);
    function Compatibilizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            compatibilized: '',
            textareas: { 'textarea-0': '' },
        };
        _this.compatibilize = function () {
            var textareas = _this.state.textareas;
            var compatibilized = [];
            for (var _i = 0, _a = Object.values(textareas).join('\n').split('\n').map(function (val) { return val.split(/ vs.? /gi); }); _i < _a.length; _i++) {
                var players = _a[_i];
                if (players.length !== 2)
                    continue;
                var p1 = players[0], p2 = players[1];
                if (!/Bye #\d+/.test(p1)) {
                    compatibilized.push(p1);
                }
                if (!/Bye #\d+/.test(p2)) {
                    compatibilized.push(p2);
                }
            }
            _this.setState({
                compatibilized: compatibilized.join('\n'),
            });
        };
        _this.handleChange = function (val, textarea) {
            var textareas = _this.state.textareas;
            textareas[textarea] = val;
            _this.setState({
                textareas: textareas,
            });
        };
        _this.appendTextarea = function () {
            var textareas = _this.state.textareas;
            var newTextarea = "textarea-" + Object.keys(_this.state.textareas).length;
            textareas[newTextarea] = '';
            _this.setState({
                textareas: textareas,
            });
        };
        return _this;
    }
    Compatibilizer.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "compatibilizer" },
            Object.entries(this.state.textareas).map(function (_a, idx) {
                var textarea = _a[0], playerlist = _a[1];
                return (React.createElement("textarea", { key: idx, value: playerlist, onChange: function (e) { return _this.handleChange(e.target.value, textarea); } }));
            }),
            React.createElement("button", { onClick: function () { return _this.appendTextarea(); } }, "Append textarea"),
            React.createElement("button", { onClick: function () { return _this.compatibilize(); } }, "Compatibilize"),
            React.createElement("textarea", { value: this.state.compatibilized, placeholder: 'Compatibilized output will be here', readOnly: true })));
    };
    return Compatibilizer;
}(React.Component));
ReactDOM.render(React.createElement(Compatibilizer, null), document.getElementById('compatibilizer'));
