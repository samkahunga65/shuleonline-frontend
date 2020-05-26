import React, { Component } from "react";
import { connect } from "react-redux";
import "../../App.scss";
import { Work } from "../../actions/teacher";
import { getstudent } from "../../actions/student";
import Desk from "../desk";
import {
  doQuiz,
  resetQuiz,
  modAnc,
  delAnc,
  setScore,
  goToS,
  resetS,
  resetScore,
} from "../../actions/homepage";
import { Redirect, Link } from "react-router-dom";

var myAncs = [];
var wrong = [];
var done = [];
var red = [];
export class doAssigment extends Component {
  componentDidMount() {
    this.props.getstudent(this.props.me);
    this.props.Work();
    this.props.resetQuiz();
  }
  goToS = (e) => {
    let o = true;
    e.preventDefault();
    this.props.goToS();
    this.props.resetScore();
  };
  setScore = (e) => {
    e.preventDefault();
    let done = this.props.ancs.length;
    let score = 0;
    this.props.ancs.map((anc) => {
      this.props.markingScheme.map((ms) => {
        if (anc.question === ms.question && anc.choice === ms.choice) {
          score++;
        }
      });
    });
    let f = {
      done: done,
      score: score,
      owner: this.props.me,
      assignment: this.props.which,
    };
    console.log(f);
    this.props.setScore(f);
    myAncs = [];
    wrong = [];
    done = [];
    red = [];
  };
  reset = (e) => {
    e.preventDefault();
    this.props.delAnc();
    myAncs = [];
    wrong = [];
    done = [];
    red = [];
  };

  chooseAnc = (question, id, qtext, isits, ctext, which, whitcht, e) => {
    e.preventDefault();
    let ok = true;

    for (let i = 0; i < done.length; i++) {
      const element = done[i];
      if (which === element) {
        ok = false;
      }
    }
    if (ok) {
      console.log(red);
      done.push(which);
      let fll = `${whitcht}${which}`;
      red.push(fll);
      var comp = false;
      let score = 0;
      if (isits === false) {
        let m = {
          question: qtext,
          choice: ctext,
        };
        wrong.push(m);
      }

      let currAnc = { question: question, choice: id };
      myAncs.push(currAnc);
      this.props.modAnc(currAnc);
      if (myAncs.length === this.props.markingScheme.length) {
        console.log(myAncs);
        console.log("matched");
        comp = true;
        myAncs.map((anc) => {
          this.props.markingScheme.map((rAnc) => {
            console.log("maping marking scheme");
            if (rAnc.question === anc.question && rAnc.choice === anc.choice) {
              console.log(`matched ${rAnc}`);
              score++;
            }
          });
        });
      }

      if (comp) {
        console.log(`you have completed ur score is ${score}`);
        wrong.map((i) => {
          console.log(`${i.question} is not ${i.choice}`);
        });
        myAncs = [];
        wrong = [];
        done = [];
      }
    }
  };
  render() {
    if (this.props.s) {
      return <Redirect to="/s" />;
    }
    let ass = [];
    if (this.props.assignments.assignments) {
      this.props.assignments.assignments.map((work) => {
        ass.push(work);
      });
    } else {
      ass = [];
    }
    ///////
    var etu = [];
    const realdt = [];
    var whitch = this.props.which;

    // console.log(`whitch : ${whitch}`);
    let f = { questions: this.props.assignments.questions };
    let r = { choices: this.props.assignments.choices };
    realdt.push(f, r);
    // console.log(realdt);

    for (let i = 0; i < realdt.length; i++) {
      const element = realdt[i];
      // console.log("started!");
      if (element.questions) {
        element.questions.map((q) => {
          // console.log("looking for question id!");
          if (q.assignment === whitch) {
            // console.log("found id!");
            // console.log(q.assignment);
            let f = {
              question: q.question,
              id: q.id,
              choices: [],
            };
            etu.push(f);
          }
        });
      }
    }
    for (let i = 0; i < etu.length; i++) {
      const element = etu[i];
      for (let i = 0; i < realdt[1].choices.length; i++) {
        const elementrdt = realdt[1].choices[i];
        if (elementrdt.question === element.id)
          element.choices.push(elementrdt);
      }
    }

    return (
      <div className="studentAss">
        {/* <Desk etu={etu} /> */}
        <div className="sheet">
          {etu.map((q, index) => (
            <div className="question">
              <p>
                {index + 1}) {q.question}
              </p>
              <ul>
                {q.choices.map((w, idex) => (
                  <li
                    className={red.includes(`${idex}${index}`) ? "red" : "blue"}
                    onClick={(e) =>
                      this.chooseAnc(
                        w.question,
                        w.id,
                        q.question,
                        w.is_ancwer,
                        w.choice_text,
                        index,
                        idex,
                        e
                      )
                    }
                  >
                    {["a", "b", "c", "d"][idex]}) {w.choice_text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {etu.length === red.length ? (
            <div>
              <button onClick={this.reset}> reset </button>
              <button onClick={this.setScore}> submit </button>
            </div>
          ) : (
            ""
          )}
          {this.props.score !== null ? (
            <h2>you scored {this.props.score}</h2>
          ) : (
            ""
          )}
        </div>

        <button onClick={this.goToS}>go back</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  me: state.auth.user.id,
  meProfile: state.students.me,
  assignments: state.teachers.work,
  doass: state.homepage.do_quiz,
  which: state.homepage.which,
  ancs: state.homepage.ancsGiven,
  score: state.homepage.score,
  markingScheme: state.homepage.markingScheme,
  s: state.homepage.s,
});
export default connect(mapStateToProps, {
  Work,
  getstudent,
  doQuiz,
  resetQuiz,
  modAnc,
  delAnc,
  setScore,
  goToS,
  resetS,
  resetScore,
})(doAssigment);
