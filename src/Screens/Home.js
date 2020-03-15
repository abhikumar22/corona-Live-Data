import React, { Component } from "react";
// import history from './../history';
import "../Style/css/Home.css";
import Loader from 'react-loaders'
import '../Style/css/loadercss.scss';
import { WindMillLoading } from 'react-loadingg';




export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueArray: '',
      value: '',
      valueArrayOriginal: '',
      loaded: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value }, () => {
      this.filterList(this.state.value)
    });

  }

  filterList(value) {
    let users = this.state.valueArrayOriginal;
    let q = value
    if (value != null && value !== '') {
      users = users.filter(function (user) {
        return user.country_name.toLowerCase().includes(q); // returns true or false
      });
      this.setState({ valueArray: users });
    }

  }


  renderData(value, index) {
    return (
      <tr index={index}>
        <td>{value.country_name}</td>
        <td>{value.cases}</td>
        <td>{value.region}</td>
        <td>{value.deaths}</td>
        <td>{value.total_recovered}</td>
        <td>{value.new_deaths}</td>
        <td>{value.new_cases}</td>
        <td>{value.serious_critical}</td>
      </tr>
    )
  }

  componentDidMount() {
    this.loginFun()
  }


  loginFun(event) {
    console.log("hello")
    let myheaders = {
      "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
      "x-rapidapi-key": "2cc27567fdmsh9471ff424af48c5p10e5c2jsn5743f7c953fb"
    }
    fetch('https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php', {
      method: 'GET',
      headers: {
        ...myheaders,
        'Accept': 'application/json',
        'Content-Type': 'application/json',

      },
      // body: JSON.stringify({
      //   username: this.state.value,
      // })
    })
      .then(response => response.json())
      .then(res => {
        console.log("data", res.countries_stat)
        setTimeout(() => {
          this.setvall(res.countries_stat) // this.setState({ position: 1 });
        }, 3000);

        // history.push('/AllUserScreen',{ uid: res.uid })

      })
      .catch(error => console.log('Authorization failed : ' + error.message));
  }

  setvall(val) {
    this.setState({
      valueArray: val,
      valueArrayOriginal: val,
    }, () => {
      this.setState({
        loaded: false
      })
    })
  }

  render() {
    return (
      <div className="Home">



        {!this.state.loaded ?
          <div>
            <label>
              Enter Country to Search:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <h2 style={{ textAlign: 'center', alignSelf: 'center' }}>Corona Virus Live Stats</h2>
            <table className="table">
              <thead>
                <tr className="th">
                  <th>Country</th>
                  <th>Cases</th>
                  <th>Region</th>
                  <th>Deaths</th>
                  <th>Total Recovered</th>
                  <th>New Deaths</th>
                  <th>New Cases</th>
                  <th>Serious Critical</th>
                </tr>
                {this.state.valueArray.map(this.renderData)}

              </thead>
            </table>
          </div>
          : <div>
            {/* <h5>Fetching Live Data ....</h5> */}
            <WindMillLoading />
          </div>}
      </div>


    );
  }
}
