'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var TodoItem$ToDo = require("./TodoItem.bs.js");

function TodoApp(Props) {
  var match = React.useState(function () {
        return "";
      });
  var setNewTodo = match[1];
  var newTodo = match[0];
  var match$1 = React.useState(function () {
        return {
                hd: {
                  id: 1,
                  name: "Learn ReasonML",
                  description: "Read the documentations on https://reasonml.github.io/",
                  state: /* Todo */0
                },
                tl: /* [] */0
              };
      });
  var setTodoList = match$1[1];
  var todoList = match$1[0];
  var handleSubmit = function (e) {
    e.preventDefault();
    Curry._1(setNewTodo, (function (param) {
            return "";
          }));
    return Curry._1(setTodoList, (function (prev) {
                  var append_id = List.length(prev) + 1 | 0;
                  var append = {
                    id: append_id,
                    name: newTodo,
                    description: undefined,
                    state: /* Todo */0
                  };
                  return Pervasives.$at(prev, {
                              hd: append,
                              tl: /* [] */0
                            });
                }));
  };
  var onChange = function (todo) {
    var newList = List.map((function (item) {
            var id = todo.id;
            if (item.id === id) {
              return todo;
            } else {
              return item;
            }
          }), todoList);
    return Curry._1(setTodoList, (function (param) {
                  return newList;
                }));
  };
  console.log(todoList);
  var todos = List.filter(function (todo) {
          return todo.state === /* Todo */0;
        })(todoList);
  var todos$1 = List.filter(function (todo) {
          return todo.state === /* Done */1;
        })(todoList);
  return React.createElement("div", {
              className: "container"
            }, React.createElement("h1", undefined, "TickTick"), React.createElement("div", {
                  className: "mb-5"
                }, React.createElement("form", {
                      action: "",
                      onSubmit: handleSubmit
                    }, React.createElement("input", {
                          className: "form-control",
                          placeholder: "Add task here",
                          value: newTodo,
                          onChange: (function (e) {
                              return Curry._1(setNewTodo, e.target.value);
                            })
                        }))), React.createElement("div", {
                  className: "bg-white"
                }, todos ? $$Array.of_list(List.map((function (todo) {
                              return React.createElement(TodoItem$ToDo.make, {
                                          todo: todo,
                                          onChange: onChange,
                                          key: String(todo.id)
                                        });
                            }), todos)) : React.createElement("div", {
                        style: {
                          padding: "10px"
                        }
                      }, "Empty, add some")), React.createElement("div", {
                  className: "bg-white mt-5"
                }, React.createElement("div", {
                      className: "p-3"
                    }, "Done"), todos$1 ? $$Array.of_list(List.map((function (todo) {
                              return React.createElement(TodoItem$ToDo.make, {
                                          todo: todo,
                                          onChange: onChange,
                                          key: String(todo.id)
                                        });
                            }), todos$1)) : null));
}

var make = TodoApp;

exports.make = make;
/* react Not a pure module */
