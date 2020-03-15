import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';



import "./assests/css/animate.min.css";
import "./assests/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assests/css/demo.css";
import "./assests/css/pe-icon-7-stroke.css";


import './Style/css/index.css';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';

ReactDOM.render(    
    <Router> 
        <App />
    </Router>,
    document.getElementById('root')
    );

