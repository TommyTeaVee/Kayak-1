import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Nav from './nav';
import MultiSlider from "multi-slider";
import * as API from '../api/API';
import * as Actions from '../actions/action';
import {connect} from 'react-redux';
import AutoComplete from 'material-ui/AutoComplete';
import cities from '../constants/cities'

class Flightadd extends Component{

    state = {

        flightId:'',
        operator:'',
        economy:'',
        business:'',
        firstclass:'',
        arrivaltime:'',
        arrivalday:'',
        departuretime:'',
        departureday:'',
        arrivaltime1:'',
        arrivalday1:'',
        departuretime1:'',
        departureday1:'',








        //
        fromsuggestion1: [],
        from1:"",
        fromsuggestion2: [],
        from2:"",
        fromsuggestion3: [],
        from3:"",
        fromsuggestion4: [],
        from4:""

    };



    handleUpdateFromInput1 = (value,textbox) => {

        this.setState({"from1":value})


        var fromsuggestion1 = cities().map((item,i)=>item.city+", "+item.state)

        this.setState({
            fromsuggestion1: fromsuggestion1
        });


    };

    handleUpdateFromInput2 = (value,textbox) => {

        this.setState({"from2":value})

        var fromsuggestion2 = cities().map((item,i)=>item.city+", "+item.state)

        this.setState({
            fromsuggestion2: fromsuggestion2
        });


    };

    handleUpdateFromInput3 = (value,textbox) => {

        this.setState({"from3":value})


        var fromsuggestion3 = cities().map((item,i)=>item.city+", "+item.state)

        this.setState({
            fromsuggestion3: fromsuggestion3
        });


    };

    handleUpdateFromInput4 = (value,textbox) => {

        this.setState({"from4":value})


        var fromsuggestion4 = cities().map((item,i)=>item.city+", "+item.state)

        this.setState({
            fromsuggestion4: fromsuggestion4
        });


    };


    handleSubmit(){
        var from_1 = this.state.from1.split(",")[0].trim();
        var from_2 = this.state.from1.split(",")[1].trim();

        var from_3 = this.state.from2.split(",")[0].trim();
        var from_4 = this.state.from2.split(",")[1].trim();

        var from_5 = this.state.from3.split(",")[0].trim();
        var from_6 = this.state.from3.split(",")[1].trim();

        var from_7 = this.state.from4.split(",")[0].trim();
        var from_8 = this.state.from4.split(",")[1].trim();



        var payload = {
            flightId :this.state.flightId ,
            operator :this.state.operator,
            imageurl:"",
            class:[
                {type:'Economy',price:this.state.economy, capacity:100},
                {type:'First',price:this.state.firstclass, capacity:100},
                {type:'Business',price:this.state.business , capacity:100}
            ],
            flights:[
                {
                    arrivaltime:this.state.arrivaltime,
                    arrivalday :this.state.arrivalday,
                    departuretime:this.state.departuretime,
                    departureday :this.state.departureday,
                    origin: {city:from_1 ,
                             state:from_2 ,
                             country:"USA", airport:"san jose airport"},
                            destination: {city:from_3, state:from_4, country:'USA', airport:"San Jose Airport"}

                },
                {
                    arrivaltime: this.state.arrivaltime1,
                    arrivalday : this.state.departureday1,
                    departuretime: this.state.departuretime1,
                    departureday : this.state.departureday1,
                    origin: {
                        city:from_5, state:from_6, country:'USA'},
                        destination: {city:from_7, state:from_8, country:'USA'}

                }
            ]
        }

        console.log(payload);
        console.log(this.state.from1.split(",")[0].trim());


    }


   render(){
    return(
       <div>
           <div className="row">
               <div className="col-sm-6">
                   <div className="md-form">
                       <i className="fa fa-plane prefix"></i>
                       <input type="text" id="Operator" placeholder="Flight Operator"  className="form-control"
                              value = {this.state.operator}
                              onChange={(event) => {
                                  this.setState({
                                      operator: event.target.value
                                  });
                              }}/>
                   </div>

               </div>
               <div className="col-sm-6">
                   <div className="md-form">
                       <input type="text" id="FlightId" placeholder="Flight Id" className="form-control"
                              value = {this.state.flightId}
                              onChange={(event) => {
                                  this.setState({
                                      flightId: event.target.value
                                  });
                              }}
                       />

                   </div>

               </div>
           </div>
           <div className="row">
               <div className="col-sm-4">
                   <div className="md-form">
                       <i className="fa fa-money prefix"></i>
                       <input type="text"  placeholder="Economy Price"  id="economy" className="form-control"
                              value = {this.state.economy}
                              onChange={(event) => {
                                  this.setState({
                                      economy: event.target.value
                                  });
                              }}
                              />
                   </div>

               </div>
               <div className="col-sm-4">
                   <div className="md-form">
                       <i className="fa fa-money prefix"></i>
                       <input type="text"  placeholder="First Class Price"  id="firstclass" className="form-control"
                              value = {this.state.firstclass}
                              onChange={(event) => {
                                  this.setState({
                                      firstclass: event.target.value
                                  });
                              }}
                       />


                   </div>

               </div>
               <div className="col-sm-4">
                   <div className="md-form">
                       <i className="fa fa-money prefix"></i>

                       <input type="text" placeholder="Business Price" id="business" className="form-control"
                       value = {this.state.business}
                       onChange={(event) => {
                           this.setState({
                               business: event.target.value
                           });
                       }}
                       />


                   </div>

               </div>

           </div>
           <div className="row">
               <div className="col-sm-3">
                   <div className="md-form">
                       <i className="fa fa-clock-o prefix"></i>

                       <input type="date" id="address" placeholder="Arrival Time"  className="form-control"
                              value = {this.state.arrivaltime}
                              onChange={(event) => {
                                  this.setState({
                                      arrivaltime: event.target.value
                                  });
                              }}
                       />


                   </div>

               </div>
               <div className="col-sm-3">
                   <div className="md-form">
                       <i className="fa fa-calendar prefix"></i>

                       <input type="date" id="address" placeholder="Arrival Day"  className="form-control"
                              value = {this.state.arrivalday}
                              onChange={(event) => {
                                  this.setState({
                                      arrivalday: event.target.value
                                  });
                              }}
                       />


                   </div>

               </div>
               <div className="col-sm-3">
                   <div className="md-form">
                       <i className="fa fa-clock-o prefix"></i>

                       <input type="date" id="address" placeholder="Departure Time"  className="form-control"
                              value = {this.state.departuretime}
                              onChange={(event) => {
                                  this.setState({
                                      departuretime: event.target.value
                                  });
                              }}
                       />


                   </div>

               </div>
               <div className="col-sm-3">
                   <div className="md-form">
                       <i className="fa fa-calendar prefix"></i>

                       <input type="date" id="address" placeholder="Departure Day"  className="form-control"
                              value = {this.state.departureday}
                              onChange={(event) => {
                                  this.setState({
                                      departureday: event.target.value
                                  });
                              }}
                       />


                   </div>

               </div>

           </div>
           <div className="row">
               <div className="col-sm-3">
                   <div className="md-form">
                       <i className="fa fa-clock-o prefix"></i>

                       <input type="date" id="address" placeholder="Arrival Time"  className="form-control"
                              value = {this.state.arrivaltime1}
                              onChange={(event) => {
                                  this.setState({
                                      arrivaltime1: event.target.value
                                  });
                              }}
                       />


                   </div>

               </div>
               <div className="col-sm-3">
                   <div className="md-form">
                       <i className="fa fa-calendar prefix"></i>

                       <input type="date" id="address" placeholder="Arrival Day"  className="form-control"
                              value = {this.state.arrivalday1}
                              onChange={(event) => {
                                  this.setState({
                                      arrivalday1: event.target.value
                                  });
                              }}
                       />


                   </div>

               </div>
               <div className="col-sm-3">
                   <div className="md-form">
                       <i className="fa fa-clock-o prefix"></i>

                       <input type="date" id="address" placeholder="Departure Time"  className="form-control"
                              value = {this.state.departuretime1}
                              onChange={(event) => {
                                  this.setState({
                                      departuretime1: event.target.value
                                  });
                              }}
                       />


                   </div>

               </div>
               <div className="col-sm-3">
                   <div className="md-form">
                       <i className="fa fa-calendar prefix"></i>

                       <input type="date" id="address" placeholder="Departure Day"  className="form-control"
                              value = {this.state.departureday1}
                              onChange={(event) => {
                                  this.setState({
                                      departureday1: event.target.value
                                  });
                              }}
                       />


                   </div>

               </div>

           </div>
           <div className="row">
               <div className="col-sm-3">
                   <div className="md-form form-group">


                       <AutoComplete
                           hintText="From"
                           dataSource={this.state.fromsuggestion1}
                           onUpdateInput={this.handleUpdateFromInput1}
                           floatingLabelText="From"
                           maxSearchResults={5}
                           underlineShow={false}
                           filter={AutoComplete.caseInsensitiveFilter}

                       />

                   </div>

               </div>
               <div className="col-sm-3">
                   <div className="md-form form-group">
                           <AutoComplete
                               hintText="From"
                               dataSource={this.state.fromsuggestion2}
                               onUpdateInput={this.handleUpdateFromInput2}
                               floatingLabelText="From"
                               maxSearchResults={5}
                               underlineShow={false}
                               filter={AutoComplete.caseInsensitiveFilter}
                           />
               </div>
               </div>
               <div className="col-sm-3">
                   <div className="md-form form-group">
                       <AutoComplete
                           hintText="From"
                           dataSource={this.state.fromsuggestion3}
                           onUpdateInput={this.handleUpdateFromInput3}
                           floatingLabelText="From"
                           maxSearchResults={5}
                           underlineShow={false}
                           filter={AutoComplete.caseInsensitiveFilter}
                       />
                   </div>

               </div>
               <div className="col-sm-3">
                   <div className="md-form form-group">
                       <AutoComplete
                           hintText="From"
                           dataSource={this.state.fromsuggestion4}
                           onUpdateInput={this.handleUpdateFromInput4}
                           floatingLabelText="From"
                           maxSearchResults={5}
                           underlineShow={false}
                           filter={AutoComplete.caseInsensitiveFilter}
                       />
                   </div>

               </div>
               <div className="col-sm-4">


               </div>
               <div className="col-sm-4">


               </div>
           </div>

           <button type="button" className="btn btn-light-blue btn-lg btn-block" onClick={()=>{this.handleSubmit()}}>Add Flight</button>


       </div>


);


   }


}

export default Flightadd;