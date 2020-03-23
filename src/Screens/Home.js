import React, { Component } from "react";
// import history from './../history';
import "../Style/css/Home.css";
import {
  URL_BY_COUNTRY,
  RAPID_API_VALUE_HOST,
  RAPID_API_VALUE_KEY,
  GET,
} from "../utils/constants";
import '../Style/css/loadercss.scss';
import { SemipolarLoading } from 'react-loadingg';
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueArray: '',
      value: '',
      valueArrayOriginal: '',
      loaded: true,
      asc:0,
      width: 0, height: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
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
        return user.country_name.toLowerCase().includes(q.toLowerCase());
      });
      this.setState({ valueArray: users });
    } else {
      this.setState({ valueArray: users });
    }
  }


  renderData(value, index) {
    return (
      <tr index={index} key={index}>
        <td>{value.country_name}</td>
        <td>{value.cases}</td>
        {/* <td>{value.region.length!=0?value.region:"N.A"}</td> */}
        <td>{value.deaths}</td>
        <td>{value.total_recovered}</td>
        <td>{value.new_deaths}</td>
        <td>{value.new_cases}</td>
        <td>{value.serious_critical}</td>
        <td>{value.active_cases}</td>
        <td>{value.total_cases_per_1m_population}</td>

      </tr>
    )

  }

  componentDidMount() {

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.loginFun()
  }


  loginFun(event) {
    let myheaders = {
      "x-rapidapi-host": RAPID_API_VALUE_HOST,
      "x-rapidapi-key": RAPID_API_VALUE_KEY
    }
    fetch(URL_BY_COUNTRY, {
      method: GET,
      headers: {
        ...myheaders,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => {
        setTimeout(() => {
          this.setvall(res.countries_stat)
        }, 100);
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

  sortArray(type) {
    let users = this.state.valueArrayOriginal;
    let sortType = this.state.asc
    if (type === 1) {
      if(sortType===0){
        users.sort(function (a, b) {
          if (a.country_name < b.country_name) { return -1; }
          if (a.country_name > b.country_name) { return 1; }
          return 0;
        })
      }else{
        users.sort(function (a, b) {
          if (a.country_name > b.country_name) { return -1; }
          if (a.country_name < b.country_name) { return 1; }
          return 0;
        })
      }
    } else {
      if(type===2){

      // console.log(typeof(users[0].cases));
        users.sort(function (a, b) {
          return sortType===0?parseInt(a.cases.replace(/[^\w ]/, '')) - parseInt(b.cases.replace(/[^\w ]/, '')):parseInt(b.cases.replace(/[^\w ]/, '')) - parseInt(a.cases.replace(/[^\w ]/, ''));
        });
        // console.warn("after",users)
      }else if(type===3){
        users.sort(function (a, b) {
          return sortType===0?a.region.replace(/[^\w ]/, '') - b.region.replace(/[^\w ]/, ''):b.region.replace(/[^\w ]/, '') - a.region.replace(/[^\w ]/, '');
        });
      }else if(type===4){
        users.sort(function (a, b) {
          return sortType===0?a.deaths.replace(/[^\w ]/, '') - b.deaths.replace(/[^\w ]/, ''):b.deaths.replace(/[^\w ]/, '') - a.deaths.replace(/[^\w ]/, '');
        });
      }else if(type===5){
        users.sort(function (a, b) {
          return sortType===0?a.total_recovered.replace(/[^\w ]/, '') - b.total_recovered.replace(/[^\w ]/, ''):b.total_recovered.replace(/[^\w ]/, '') - a.total_recovered.replace(/[^\w ]/, '');
        });
      }else if(type===6){
        users.sort(function (a, b) {
          return sortType===0?a.new_deaths.replace(/[^\w ]/, '') - b.new_deaths.replace(/[^\w ]/, ''):b.new_deaths.replace(/[^\w ]/, '') - a.new_deaths.replace(/[^\w ]/, '');

        });
      }else if(type===7){
        users.sort(function (a, b) {
          return sortType===0?a.new_cases.replace(/[^\w ]/, '') - b.new_cases.replace(/[^\w ]/, ''):b.new_cases.replace(/[^\w ]/, '') - a.new_cases.replace(/[^\w ]/, '');
        });
      }
      else if(type===8){
        users.sort(function (a, b) {
          return sortType===0?a.serious_critical.replace(/[^\w ]/, '') - b.serious_critical.replace(/[^\w ]/, ''):b.serious_critical.replace(/[^\w ]/, '') - a.serious_critical.replace(/[^\w ]/, '');
          });
       
      }else if(type===9){
        users.sort(function (a, b) {
          return sortType===0?a.active_cases.replace(/[^\w ]/, '') - b.active_cases.replace(/[^\w ]/, ''):b.active_cases.replace(/[^\w ]/, '') - a.active_cases.replace(/[^\w ]/, '');
        });
      }
      else{
        users.sort(function (a, b) {
          return sortType===0?a.total_cases_per_1m_population.replace(/[^\w ]/, '') - b.total_cases_per_1m_population.replace(/[^\w ]/, ''):b.total_cases_per_1m_population.replace(/[^\w ]/, '') - a.total_cases_per_1m_population.replace(/[^\w ]/, '');
        });
      }
    }
    this.setState({ 
      valueArray: users,
      asc:sortType===0?1:0
     })
  }



  render() {
    return (
      <div style={{backgroundColor:'#454d55'}} className="Home">
        {!this.state.loaded ?
          <div>
            <Form>
              <div style={{justifyContent:'center',alignItems:'center',width:'40%',padding:20,alignSelf:'center'}}>
  <Row>
    <Col>
      <Form.Control 
      value={this.state.value} 
      onChange={this.handleChange}
      placeholder={'Enter Country'} />
    </Col>
    
  </Row>
  </div>
</Form>
            <div className="row" style={{justifyContent:'center',alignItems:'center'}}>
            <h2 style={{ textAlign: 'center', alignSelf: 'center',color:'white' }}>Covid-19 Live Status</h2>
            <Spinner animation="grow" style={{marginLeft:10}} variant={"danger"}/>
            </div>
            
            
            <Table style={{marginTop:10}}responsive="sm" striped bordered hover variant="dark">
              <thead>
                <tr
                t
                  className="th"
                >
                  <th
                    onClick={() => {
                        this.sortArray(1)
                      
                      
                    }}
                  ><span>Country</span>
                    <span> <img alt="new" src={require('../assests/arrow.png')} /></span>
                  </th>
                  <th
                    onClick={() => {
                      this.sortArray(2)
                    }}
                  >Cases
    
                  <span> <img alt="new"  src={require('../assests/arrow.png')} /></span></th>
                  {/* <th
                    onClick={() => {
                      this.sortArray(3)
                    }}
                  >Region
    
                  <span> <img  alt="new" src={require('../assests/arrow.png')} /></span></th> */}
                  <th
                    onClick={() => {
                      this.sortArray(4)
                    }}
                  >Deaths
    
                  <span> <img alt="new"  src={require('../assests/arrow.png')} /></span></th>
                  <th
                    onClick={() => {
                      this.sortArray(5)
                    }}
                  >Total Recovered
                    <span> <img alt="new"  src={require('../assests/arrow.png')} /></span>
                  </th>
                  <th
                    onClick={() => {
                      this.sortArray(6)
                    }}
                  >New Deaths
                    <span> <img alt="new"  src={require('../assests/arrow.png')} /></span>
                  </th>
                  <th
                    onClick={() => {
                      this.sortArray(7)
                    }}
                  >New Cases
                    <span> <img alt="new"  src={require('../assests/arrow.png')} /></span>
                  </th>
                  <th
                    onClick={() => {
                      this.sortArray(8)
                    }}
                  >Serious Critical
                    <span> <img alt="new"  src={require('../assests/arrow.png')} /></span>
                  </th>
                  <th
                    onClick={() => {
                      this.sortArray(9)
                    }}
                  >Active Cases
                    <span> <img alt="new"  src={require('../assests/arrow.png')} /></span>
                  </th>
                  <th
                    onClick={() => {
                      this.sortArray(10)
                    }}
                  >Total Cases per 1m Population
                    <span> <img alt="new"  src={require('../assests/arrow.png')} /></span>
                  </th>
                </tr>
                {this.state.valueArray.map(this.renderData)}

              </thead>
            </Table>
          </div>
          : <div>
            <SemipolarLoading
            color={'yellow'}
            />
          </div>}
      </div>
    );
  }
}
