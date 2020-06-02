import React, { Component } from "react";
import { connect } from "react-redux";
import "../../App.scss";
import { Work } from "../../actions/teacher";
import { getstudent } from "../../actions/student";
import {
  doQuiz,
  resetQuiz,
  markingScheme,
  resetS,
  get_all_score,
} from "../../actions/homepage";
import { Redirect } from "react-router-dom";
export class studentHome extends Component {
  componentDidMount() {
    this.props.getstudent(this.props.me);
    this.props.Work();
    this.props.resetQuiz();
    this.props.resetS();
    this.props.get_all_score();
  }
  doAss = (index, e) => {
    e.preventDefault();
    console.log(index);
    this.props.doQuiz(index);
    let plip = [];
    let plop = [];

    for (let i = 0; i < this.props.assignments.questions.length; i++) {
      const question = this.props.assignments.questions[i];
      if (question.assignment === index) {
        for (let i = 0; i < this.props.assignments.choices.length; i++) {
          const choice = this.props.assignments.choices[i];
          if (choice.question === question.id) {
            let f = {
              question: question.id,
              choice: choice.is_ancwer,
              choiceid: choice.id,
            };
            console.log("plop push");
            plop.push(f);
          }
        }
      }
    }
    plop.map((f) => {
      if (f.choice === true) {
        let g = {
          question: f.question,
          choice: f.choiceid,
        };
        plip.push(g);
      }
    });
    if (plip.length > 0) {
      console.log("ms incoming");
      this.props.markingScheme(plip);
    }
  };
  whichAss = (id) => {
    // console.log(id);
  };
  render() {
    if (this.props.doass) {
      // console.log("clicked assignment");
      return <Redirect to="/doit" />;
    }

    let ass = [];
    if (this.props.assignments.assignments) {
      this.props.assignments.assignments.map((work) => {
        if (this.props.myclass) {
          if (work.darasa === this.props.myclass) {
            ass.push(work);
          }
        } else {
          ass.push(work);
        }
      });
    } else {
      ass = [];
    }

    ///////
    var etu = [];
    const realdt = [];
    var whitch = this.props.which;
    var me_now = [];
    if (etu.length > 0) {
      if (whitch !== -999) {
        me_now = etu[this.props.which];
      }
    }
    // console.log(`me_now ${me_now}`);
    let f = { questions: this.props.assignments.questions };
    let r = { choices: this.props.assignments.choices };
    realdt.push(f, r);
    // console.log(realdt);
    if (realdt[0].questions) {
      realdt[0].questions.map((q) => {
        let f = {
          question: q.question,
          id: q.id,
          choices: [],
        };
        etu.push(f);
      });
    }
    if (realdt[1].choices) {
      realdt[1].choices.map((q) => {
        for (let i = 0; i < etu.length; i++) {
          const element = etu[i];
          if (element.id === q.question) {
            let f = {
              choice_text: q.choice_text,
            };

            element.choices.push(f);
          }
        }
      });
    }
    ///adding  done assignments
    let doneass = [];
    let nlist = [];
    let nass = ass;
    let undoneass = [];
    if (this.props.scores) {
      let lst = [];
      this.props.scores.map((scr) => {
        for (let i = 0; i < nass.length; i++) {
          const element = nass[i];
          if (scr.assignment !== element.id) {
            let k = 0;
          } else {
            let f = {
              title: element.title,
              score: scr.score,
            };
            ass.splice(i, 1);
            doneass.push(f);
          }
        }
      });
    }

    return (
      <div className="studentHome">
        {doneass.length > 0 ? (
          <div className="assignments">
            <h1>Assignments</h1>
            <div className="notdone">
              {ass.map((as, index) => (
                <div className="quiz">
                  <h3
                    className="questions"
                    onClick={(e) => this.doAss(as.id, e)}
                  >
                    {as.title}
                  </h3>
                </div>
              ))}
            </div>
            <div className="done">
              <h1>These are complete</h1>
              {doneass.map((as, index) => (
                <h3 onClick={(e) => this.doAss(as.id, e)}>
                  {as.title} scored : {as.score}
                </h3>
              ))}
            </div>
          </div>
        ) : (
          <div className="assignments">
            <h1>Assignments</h1>
            <div className="notdone">
              {" "}
              {ass.map((as, index) => (
                <div className="quiz">
                  <h3 onClick={(e) => this.doAss(as.id, e)}>{as.title}</h3>
                  {/* {this.props.doass ? <Desk etu={me_now} /> : <h2></h2>} */}
                </div>
              ))}
            </div>
          </div>
        )}
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
  myclass: state.students.me.darasa,
  scores: state.homepage.scores,
});
export default connect(mapStateToProps, {
  Work,
  getstudent,
  doQuiz,
  resetQuiz,
  markingScheme,
  resetS,
  get_all_score,
})(studentHome);
