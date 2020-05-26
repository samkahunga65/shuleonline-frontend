import React, { useState } from "react";
import "../App.scss";

export default function Desk({ etu, funcs }) {
  // const [questioestion] = useState([
  //   {
  //     question: "how is ur day",
  //     choicea: "good",
  //     choiceb: "bad",
  //     choicec: "medium",
  //     choiced: "better",
  //   },
  //   {
  //     question: "how is ur gf",
  //     choicea: "good",
  //     choiceb: "bad",
  //     choicec: "medium",
  //     choiced: "better",
  //   },
  // ]);
  // const [realdt, setData] = useState([
  //   {
  //     assignments: [
  //       {
  //         id: 39,
  //         title: "teitlist",
  //         darasa: 8,
  //         completed: false,
  //         educator: 27,
  //       },
  //       { id: 38, title: "tlist", darasa: 8, completed: false, educator: 27 },
  //     ],
  //   },

  //   {
  //     questions: [
  //       { id: 3, question: "how is ur gf", assignment: 39 },
  //       { id: 4, question: "how is ur life", assignment: 38 },
  //     ],
  //   },

  //   {
  //     choices: [
  //       { id: 37, is_ancwer: false, choice_text: "goood", question: 3 },
  //       { id: 38, is_ancwer: false, choice_text: "bad", question: 3 },
  //       { id: 39, is_ancwer: false, choice_text: "medium", question: 3 },
  //       { id: 40, is_ancwer: false, choice_text: "better", question: 3 },
  //       { id: 47, is_ancwer: false, choice_text: "goood", question: 4 },
  //       { id: 48, is_ancwer: false, choice_text: "bad", question: 4 },
  //       { id: 49, is_ancwer: false, choice_text: "medium", question: 4 },
  //       { id: 40, is_ancwer: false, choice_text: "better", question: 4 },
  //     ],
  //   },
  // ]);

  // var etu = [];

  // realdt[1].questions.map((q) => {
  //   let f = {
  //     question: q.question,
  //     id: q.id,
  //     choices: [],
  //   };
  //   etu.push(f);
  // });
  // realdt[2].choices.map((q) => {
  //   for (let i = 0; i < etu.length; i++) {n, setQu
  //     const element = etu[i];
  //     if (element.id === q.question) {
  //       let f = {
  //         choice_text: q.choice_text,
  //       };

  //       element.choices.push(f);
  //     }
  //   }
  // });
  // console.log(etu);
  function ancSelect() {
    console.log("qweqweqwe");
    alert("qweqweqwe");
  }

  return (
    <div>
      <div className="sheet">
        {etu.map((q, index) => (
          <div className="question">
            <p>
              {index + 1}) {q.question}
            </p>
            <ul>
              {q.choices.map((w, index) => (
                <li onClick={ancSelect}>
                  {["a", "b", "c", "d"][index]}) {w.choice_text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
// (
//   <ul>
//   <li>a) {q.choicea}</li>
//   <li>b) {q.choiceb}</li>
//   <li>c) {q.choicec}</li>
//   <li>d) {q.choiced}</li>
// </ul>

// )
