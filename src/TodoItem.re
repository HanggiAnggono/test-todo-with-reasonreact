module Styles = {
  open Css;

  let container =
    style([
      display(flexBox),
      padding(Css.px(10)),
      alignItems(Css.center),
    ]);

  let editable = style([outline(px(0), solid, transparent)]);
};

type todoState =
  | Todo
  | Done;

type description = Some(string) | None;

type todo = {
  id: int,
  name: string,
  description: description,
  // or you can simply use option
  // description: option(string),
  state: todoState,
};

[@react.component]
let make = (~todo: todo, ~onChange: todo => unit) => {
  let handleChange = (e: ReactEvent.Form.t) => {
    let checked = e->ReactEvent.Form.target##checked;

    onChange({...todo, state: checked ? Done : Todo});
  };

  <div
    className={Css.merge([
      Styles.container,
      switch (todo.state) {
      | Done => Css.style([Css.opacity(0.3)])
      | Todo => ""
      },
    ])}>
    <div>
      <label className={Css.style([Css.paddingBottom(Css.px(0))])}>
        <input
          type_="checkbox"
          onChange=handleChange
          checked={todo.state === Done}
        />
      </label>
    </div>
    <div className={Css.style([Css.paddingLeft(Css.px(10))])}>
      <div contentEditable=true className=Styles.editable>
        {React.string(todo.name)}
      </div>
      <div className={Css.style([Css.color(Css.gray)])}>
        {React.string(
           switch (todo.description) {
           | Some(description) => description
           | None => ""
           },
         )}
      </div>
    </div>
  </div>;
};
