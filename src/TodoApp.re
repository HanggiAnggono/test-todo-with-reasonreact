[@react.component]
let make = () => {
  let (newTodo, setNewTodo) = React.useState(() => "");
  let (todoList, setTodoList) =
    React.useState(() =>
      (
        [
          {
            id: 1,
            name: "Learn ReasonML",
            description:
              "Read the documentations on https://reasonml.github.io/"->Some,
            state: Todo,
          },
        ]:
          list(TodoItem.todo)
      )
    );

  let handleSubmit = (e: ReactEvent.Form.t) => {
    e->ReactEvent.Form.preventDefault;

    setNewTodo(_ => "");

    setTodoList(prev => {
      let append: TodoItem.todo = {
        id: List.length(prev) + 1,
        name: newTodo,
        description: None,
        state: Todo,
      };

      prev @ [append];
    });
  };

  let onChange = (todo: TodoItem.todo) => {
    let newList =
      todoList
      |> List.map((item: TodoItem.todo) => {
           switch (todo.id) {
           | id when item.id === id => todo
           | _ => item
           }
         });

    setTodoList(_ => newList);
  };

  Js.log(todoList);

  <div className="container">
    <h1> {React.string("TickTick")} </h1>
    <div className="mb-5">
      <form action="" onSubmit=handleSubmit>
        <input
          className="form-control"
          placeholder="Add task here"
          value=newTodo
          onChange={e => {
            let value = e->ReactEvent.Form.target##value;
            setNewTodo(value);
          }}
        />
      </form>
    </div>
    <div className="bg-white">
      {let todos =
         todoList |> List.filter((todo: TodoItem.todo) => todo.state === Todo);
       switch (todos) {
       | [_, ..._] =>
         todos
         |> List.map((todo: TodoItem.todo) => {
              <TodoItem key={string_of_int(todo.id)} todo onChange />
            })
         |> Array.of_list
         |> React.array
       | [] =>
         <div style={ReactDOMStyle.make(~padding="10px", ())}>
           {React.string("Empty, add some")}
         </div>
       }}
    </div>
    <div className="bg-white mt-5">
      <div className="p-3"> {React.string("Done")} </div>
      {let todos =
         todoList |> List.filter((todo: TodoItem.todo) => todo.state === Done);
       switch (todos) {
       | [_, ..._] =>
         todos
         |> List.map((todo: TodoItem.todo) => {
              <TodoItem key={string_of_int(todo.id)} todo onChange />
            })
         |> Array.of_list
         |> React.array
       | [] => React.null
       }}
    </div>
  </div>;
};
