'use strict';

var Css = require("bs-css/src/Css.bs.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");

var container = Css.style({
      hd: Css.display(Css.flexBox),
      tl: {
        hd: Css.padding(Css.px(10)),
        tl: {
          hd: Css.alignItems(Css.center),
          tl: /* [] */0
        }
      }
    });

var editable = Css.style({
      hd: Css.outline(Css.px(0), Css.solid, Css.transparent),
      tl: /* [] */0
    });

var Styles = {
  container: container,
  editable: editable
};

function TodoItem(Props) {
  var todo = Props.todo;
  var onChange = Props.onChange;
  var handleChange = function (e) {
    var checked = e.target.checked;
    return Curry._1(onChange, {
                id: todo.id,
                name: todo.name,
                description: todo.description,
                state: checked ? /* Done */1 : /* Todo */0
              });
  };
  var match = todo.state;
  var description = todo.description;
  return React.createElement("div", {
              className: Css.merge({
                    hd: container,
                    tl: {
                      hd: match ? Css.style({
                              hd: Css.opacity(0.3),
                              tl: /* [] */0
                            }) : "",
                      tl: /* [] */0
                    }
                  })
            }, React.createElement("div", undefined, React.createElement("label", {
                      className: Css.style({
                            hd: Css.paddingBottom(Css.px(0)),
                            tl: /* [] */0
                          })
                    }, React.createElement("input", {
                          checked: todo.state === /* Done */1,
                          type: "checkbox",
                          onChange: handleChange
                        }))), React.createElement("div", {
                  className: Css.style({
                        hd: Css.paddingLeft(Css.px(10)),
                        tl: /* [] */0
                      })
                }, React.createElement("div", {
                      className: editable,
                      contentEditable: true
                    }, todo.name), React.createElement("div", {
                      className: Css.style({
                            hd: Css.color(Css.gray),
                            tl: /* [] */0
                          })
                    }, description !== undefined ? description : "")));
}

var make = TodoItem;

exports.Styles = Styles;
exports.make = make;
/* container Not a pure module */
