class Result extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var days = <div/>;
    if(this.props.result!=null && this.props.result!="NaN") {
      days = this.props.result;
      return (
        <div className="col-md-6 col-md-offset-1 col-xs-12">
          <h2>You have approx. lost</h2>
          <h1><p className="text-danger">{days}</p></h1>
          <h2>days of your Life Span</h2>
          </div>
        );
      }
    else {
      return (<div/>);
    }
  }
}

class FormView extends React.Component {
  constructor() {
    super();
    this.state = {
      quit:false
    };
    this.toggle_quit = this.toggle_quit.bind(this);
  }
  toggle_quit() {
    var quit = this.state.quit;
    this.setState({quit:!quit});
  }
  render() {
    var arr = Array(6).fill().map((e,i)=>i+18),
    MakeItem = function(X) {
                return <option value={X}>{X}</option>;
            };
    var endDate = <div/>;
    var quit = this.state.quit;
    if(quit)
      endDate = <div className="form-group">
        <label className="col-md-10">
          When did you stop smoking?(Approx.)
        </label>
        <div className="col-md-10">
          <input type="date" id="stpdate" className="form-control mydate"/>
        </div>
      </div>;
    else {
      endDate = <div/>;
    }
    return (
      <div className="card col-md-5 col-xs-12 form-horizontal">
        <div className="form-group">
          <label for="nocig" className="col-md-10">Number of cigarettes per day</label>
          <div className="col-md-10">
            <input type="number" id="nocig" className="form-control" min="0"/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-6">
            <label className="col-xs-12">Gender</label>
            <div>
              <label className="radio-inline">
                <input type="radio" name="genderRadio" value="option1"/>
                Female
              </label>
              <label className="radio-inline">
                <input type="radio" name="genderRadio" value="option2"/>
                Male
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <label for="age" className="col-xs-12">Age</label>
            <select className="form-control col-xs-offset-1 myselect" id="age">
              {arr.map(MakeItem)}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-10">
            When did you start smoking?(Approx.)
          </label>
          <div className="col-md-10">
            <input type="date" id="stdate" className="form-control mydate" ref={(input) => { this.startDate = input; }}/>
          </div>
        </div>
        <div className="form-group">
          <h6 className="col-md-6 col-xs-12">Did you quit smoking?</h6>
          <div className="col-md-6">
            <label className="radio-inline">
                <input type="radio" name="quitRadio" id="rad_quit" onChange={this.toggle_quit} value="1" checked={quit}/>
                Yes
            </label>
            <label className="radio-inline">
                <input type="radio" name="quitRadio" onChange={this.toggle_quit} value="0" checked={!quit}/>
                No
            </label>
          </div>
        </div>
        {endDate}
        <div className="form-group">
          <div className="col-md-10 col-md-offset-3">
            <button className="btn btn-primary" onClick={this.props.todo}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

class RootView extends React.Component {
  constructor(){
    super();
    this.state = {
      res:null
    };
    this.calculate = this.calculate.bind(this);
  }
  /* TODO
    Improve with ref */
  calculate() {
    var num = document.getElementById('nocig').value;
    var st = new Date(document.getElementById('stdate').value);
    var end ;

    if(document.getElementById('rad_quit').checked)
      end = new Date(document.getElementById('stpdate').value);
    else {
      end = new Date();
      end.setUTCHours(0,0,0,0);
    }
    if(num==null|| num<0 || st==null){
      this.setState({res:null});
      return;
    }

    var tot = (end.getTime()-st.getTime())/86400000;
    if(tot<0){
      this.setState({res:null});
      return;
    }
    tot++;
    tot = tot *num* 11;
    tot=tot/(60*24);

    this.setState({res:tot.toFixed(2)});
  }

  render(){
    return(
      <div className="row">
        <FormView todo={this.calculate}/>
        <Result result={this.state.res}/>
      </div>
    );
  }
}

ReactDOM.render(<RootView />, document.getElementById('root'));
