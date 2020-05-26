import React, { Component } from "react";
import { connect } from "react-redux";
import "../../App.scss";
import {
  sStudents,
  giveWork,
  Work,
  giveChoices,
  giveQuestion,
  falseAssingment,
  falseQuestion,
} from "../../actions/teacher";
import { get_all_score } from "../../actions/homepage";
import { checkTeacherid } from "../../actions/auth";

export class Teacher extends Component {
  state = {
    title: "",
    question: "",
    darasa: "",
    educator: "",
    aaa: "",
    bbb: "",
    ccc: "",
    ddd: "",
    anc: "",
    choices: [],
  };
  componentDidMount() {
    let o = this.props.myClass;
    this.props.checkTeacherid(this.props.user);
    this.props.Work();
    this.props.sStudents(o);
    this.props.get_all_score();
  }
  onSubmit = (e) => {
    e.preventDefault();
    const { title, darasa, educator } = this.state;
    //send assignment
    const work = {
      title,
      educator,
      darasa,
    };

    console.log(`work: : ${work}`);
    this.props.giveWork(work);
  };
  question = (e) => {
    e.preventDefault();
    console.log("sent question");
    const { question } = this.state;
    const qst = {
      question,
      assignment: this.props.assignmentId,
    };
    console.log(`qst: : ${qst}`);
    this.props.giveQuestion(qst);
  };
  choices = (e) => {
    e.preventDefault();
    console.log("sent choices");
    const lst = [
      this.state.aaa,
      this.state.bbb,
      this.state.ccc,
      this.state.ddd,
    ];
    console.log(this.state.anc);
    const which = this.state.anc - 1;
    const question = this.props.questionId;
    for (let i = 0; i < lst.length; i++) {
      const element = lst[i];
      if (i !== which) {
        const cs = {
          choice_text: element,
          question,
        };
        console.log(`cs: : ${cs}`);
        this.props.giveChoices(cs);
      } else {
        const cs = {
          choice_text: element,
          is_ancwer: true,
          question,
        };
        console.log(`cs: : ${cs}`);
        this.props.giveChoices(cs);
      }
    }
  };
  newQuestion = (e) => {
    e.preventDefault();
    this.props.falseQuestion();
  };
  newAssignment = (e) => {
    e.preventDefault();
    this.props.falseAssingment();
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  render() {
    ///create assignments checker
    let masterlist = [];
    let myassingments = [];
    ///start here making master list
    if (this.props.assignments) {
      ///create myassignments
      this.props.assignments.map((ass) => {
        if (ass.educator === this.props.user) {
          myassingments.push(ass);
        }
      });
      ///create masterlist
      for (let i = 0; i < myassingments.length; i++) {
        const ass = myassingments[i];
        let f = {
          assignment: ass.title,
          good: [],
          bad: [],
        };
        let you = this.props.myStudents;
        for (let q = 0; q < this.props.myStudents.length; q++) {
          const std = this.props.myStudents[q];

          this.props.scores.map((scr) => {
            if (scr.assignment === ass.id) {
              if (scr.owner === std.owner) {
                console.log("it reaches");
                you.splice(i, 1);
                f.good.push(std);
                console.log(`pushing${std}`);
              }
            }
          });
        }
        f.bad = you;
        masterlist.push(f);
      }
      console.log("masterlist");
      console.log(masterlist);
    }

    const { title, question, anc, aaa, bbb, ccc, ddd } = this.state;

    this.state.darasa = this.props.myClass;
    this.state.educator = this.props.user;
    return (
      <div className="teacher_home">
        <h1>
          class {this.props.myClass} {this.props.mySubject}
        </h1>
        <div className="students">
          <h1>My work</h1>
          {masterlist.map((msl) => (
            <p>
              {msl.assignment} completion rate:
              {(msl.good.length * 100) / (msl.good.length + msl.bad.length)}
            </p>
          ))}
        </div>
        <div className="ass">
          <h1>Give Assignment</h1>
          <div className="col-md-6 m-auto">
            <div className="card card-body mt-5">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Assignment</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    onChange={this.onChange}
                    value={title}
                  />
                </div>
                {this.props.gotAssignment ? (
                  <br />
                ) : (
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                      submit assingment
                    </button>
                  </div>
                )}
              </form>
              {/* give choices */}
              {this.props.gotAssignment ? (
                <form onSubmit={this.question}>
                  <div className="form-group">
                    <label>Question</label>
                    <input
                      type="text"
                      className="form-control"
                      name="question"
                      onChange={this.onChange}
                      value={question}
                    />
                  </div>
                  {this.props.gotQuestion ? (
                    <br />
                  ) : (
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">
                        submit question
                      </button>
                    </div>
                  )}
                </form>
              ) : (
                <br />
              )}
              {/* // give choices */}
              {this.props.gotQuestion ? (
                <form onSubmit={this.choices}>
                  <div className="form-group">
                    <label>a</label>
                    <input
                      type="text"
                      className="form-control"
                      name="aaa"
                      onChange={this.onChange}
                      value={aaa}
                    />
                  </div>
                  <div className="form-group">
                    <label>b</label>
                    <input
                      type="text"
                      className="form-control"
                      name="bbb"
                      onChange={this.onChange}
                      value={bbb}
                    />
                  </div>
                  <div className="form-group">
                    <label>c</label>
                    <input
                      type="text"
                      className="form-control"
                      name="ccc"
                      onChange={this.onChange}
                      value={ccc}
                    />
                  </div>
                  <div className="form-group">
                    <label>d</label>
                    <input
                      type="text"
                      className="form-control"
                      name="ddd"
                      onChange={this.onChange}
                      value={ddd}
                    />
                  </div>
                  <div className="form-group">
                    <label>ancwer?</label>
                    <select name="anc" onChange={this.onChange} value={anc}>
                      <option value="" selected>
                        ---------
                      </option>
                      <option value="1">a</option>
                      <option value="2">b</option>
                      <option value="3">c</option>
                      <option value="4">d</option>
                    </select>
                  </div>
                  {this.props.gotChoice ? (
                    <br />
                  ) : (
                    <div className="final_options">
                      <div className="form-group">
                        <button type="submit" className="btn btn-primary">
                          submit
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              ) : (
                <br />
              )}
              {this.props.gotChoice ? (
                <br />
              ) : (
                <div className="extraChioces">
                  <form onSubmit={this.newQuestion}>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">
                        new question
                      </button>
                    </div>
                  </form>
                  <form onSubmit={this.newAssignment}>
                    <div className="form-group">
                      <button type="submit" className="btn btn-primary">
                        new assingment
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  clazie: state.user.clazie,
  user: state.auth.user.id,
  myStudents: state.students.students,
  myClass: state.teachers.teacher.darasa,
  mySubject: state.teachers.teacher.subjects,
  gotAssignment: state.assignment.got_assignment,
  gotQuestion: state.assignment.got_question,
  gotChoice: state.assignment.got_choices,
  newQuestion: state.assignment.new_question,
  newAssignment: state.assignment.new_assignment,
  assignmentId: state.teachers.now_work.id,
  questionId: state.teachers.now_question.id,
  assignments: state.teachers.work.assignments,
  me: state.teachers.teacher,
  scores: state.homepage.scores,
});
export default connect(mapStateToProps, {
  sStudents,
  checkTeacherid,
  giveWork,
  giveChoices,
  giveQuestion,
  Work,
  falseAssingment,
  falseQuestion,
  get_all_score,
})(Teacher);
