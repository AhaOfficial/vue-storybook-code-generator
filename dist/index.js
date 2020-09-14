"use strict";
exports.__esModule = true;
exports.useStorybook = function (_a) {
    var component = _a.component, componentName = _a.componentName, componentInner = _a.componentInner, CodeViewer = _a.CodeViewer;
    var props = {};
    var generateCode = function () {
        var propValues = [];
        try {
            for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
                var argumentName = _a[_i];
                propValues.push(argumentName + "=\"" + props[argumentName] + "\"");
            }
        }
        catch (e) { }
        var template = "<" + componentName + " " + propValues.join(' ') + "/>";
        if (typeof componentInner == 'string' && componentInner.length > 0)
            template = "<" + componentName + " " + propValues.join(' ') + ">" + componentInner + "</" + componentName + ">";
        return template;
    };
    return {
        template: function (args, _a) {
            var argTypes = _a.argTypes;
            props = args;
            var propValues = [];
            try {
                for (var _i = 0, _b = Object.keys(props); _i < _b.length; _i++) {
                    var argumentName = _b[_i];
                    propValues.push(":" + argumentName + "=\"" + argumentName + "\"");
                }
            }
            catch (e) { }
            var template = "<" + componentName + " " + propValues.join(' ') + "/>";
            if (typeof componentInner == 'string' && componentInner.length > 0)
                template = "<" + componentName + " " + propValues.join(' ') + ">" + componentInner + "</" + componentName + ">";
            return {
                props: Object.keys(argTypes),
                components: component,
                template: template
            };
        },
        code: function (args, _a) {
            var argTypes = _a.argTypes;
            return {
                props: {},
                components: { CodeViewer: CodeViewer },
                template: "<CodeViewer code='" + generateCode() + "' />"
            };
        }
    };
};
