import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import history from './../history';
import "../Style/css/Home.css";
import {
    URL_BY_WORLD_WIDE,
    RAPID_API_VALUE_HOST,
    RAPID_API_VALUE_KEY,
    GET,
} from "../utils/constants";
import '../Style/css/loadercss.scss';
import { SemipolarLoading } from 'react-loadingg';
import Button from 'react-bootstrap/Button'


import { StatsCard } from "../components/StatsCard.jsx";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valueArray: '',
            loaded: true,
        };
        // this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        this.loginFun()
    }
    loginFun() {
        let myheaders = {
            "x-rapidapi-host": RAPID_API_VALUE_HOST,
            "x-rapidapi-key": RAPID_API_VALUE_KEY
        }
        fetch(URL_BY_WORLD_WIDE, {
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
                    this.setvall(res)
                }, 3000);
            })
            .catch(error => console.log('Authorization failed : ' + error.message));
    }
    setvall(val) {
        this.setState({
            valueArray: val
        }, () => {
            this.setState({
                loaded: false
            })
        })
    }
    render() {
        return (
            <div className="content">
                {/* <Grid> */}
                <div>
                    {!this.state.loaded ?
                        <div style={{marginTop:10,justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
                            <Row style={{justifyContent:'center'}}>
                                <Col lg={3} sm={6}>
                                    <StatsCard
                                        bigIcon={<i className="pe-7s-server text-warning" />}
                                        statsText="Total Cases"
                                        statsValue={this.state.valueArray.total_cases}
                                        statsIcon={<i className="fa fa-refresh" />}
                                        statsIconText="Updated now"
                                    />
                                </Col>
                                <Col lg={3} sm={6}>
                                    <StatsCard
                                        bigIcon={<i className="pe-7s-wallet text-success" />}
                                        statsText="Total Deaths"
                                        statsValue={this.state.valueArray.total_deaths}
                                        statsIcon={<i className="fa fa-calendar-o" />}
                                        statsIconText="Updated now"
                                    />
                                </Col>
                                <Col lg={3} sm={6}>
                                    <StatsCard
                                        bigIcon={<i className="pe-7s-graph1 text-danger" />}
                                        statsText="Total Recovered"
                                        statsValue={this.state.valueArray.total_recovered}
                                        statsIcon={<i className="fa fa-clock-o" />}
                                        statsIconText="Updated now"
                                    />
                                </Col>
                            </Row>
                            <Row style={{justifyContent:'center'}}>
                                <Col lg={3} sm={6}>
                                    <StatsCard
                                        bigIcon={<i className="pe-7s-attention text-info" />}
                                        statsText="New Cases"
                                        statsValue={this.state.valueArray.new_cases}
                                        statsIcon={<i className="fas fa-calendar-plus" />}
                                        statsIconText="Updated now"
                                    />
                                </Col>
                                <Col lg={3} sm={6}>
                                    <StatsCard
                                        bigIcon={<i className="pe-7s-delete-user text-danger" />}
                                        statsText="New Deaths"
                                        statsValue={this.state.valueArray.new_deaths}
                                        statsIcon={<i className="fa fa-refresh" />}
                                        statsIconText="Updated now"
                                    />
                                </Col>
                                <Col lg={3} sm={6}>
                                    <div style={{justifyContent:'center', alignItems:'center',display:'flex',paddingBottom:20}}>
                                
                                 <Button 
                                 onClick={()=>{
                                    history.push('/Home', {
                                    })
                                }}variant="outline-info">View All</Button>{' '}
                                </div>
                                </Col>

                            </Row>
                        </div> :
                        <div>
                            <SemipolarLoading
            color={'yellow'} />
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Dashboard;
