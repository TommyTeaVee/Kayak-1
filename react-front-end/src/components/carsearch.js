import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import * as API from '../api/API';
import * as Actions from '../actions/action';
import {connect} from 'react-redux';
import cities from '../constants/cities'
import Toggle from 'material-ui/Toggle';

class Carsearch extends Component {


    componentWillMount(){

    }
    state = {

        //textbox values
        city:"",
        startdate:"",
        enddate:"",

        // UI State

        citysuggestion: [],
        travelerpopup:false,
        returndateenable:false

      };
       handleSubmit(){

        var startdate =moment(this.state.startdate).month()+"/"+
        moment(this.state.startdate).date()+"/"+
        moment(this.state.startdate).year()
        var enddate =moment(this.state.enddate).month()+"/"+
        moment(this.state.enddate).date()+"/"+
        moment(this.state.enddate).year()

        console.log("From=>"+this.state.city)
        console.log("Stat date=>"+startdate)
        console.log("Return Date=>"+enddate)


        // call Api for search here......
        //API CALL


           const payload = {
               'pickupcity':this.state.city.split(",")[0].trim(),
               'pickupstate':this.state.city.split(",")[1].trim(),
               'dropoffcity':this.state.city.split(",")[0].trim(),
               'dropoffstate':this.state.city.split(",")[1].trim(),
               'startdate' : startdate,
               'enddate' : enddate,
               'searchtype': "car",
               'dropoff' : this.state.returndateenable ? 'DIFFERENT-DROPOFF' : 'SAME-DROPOFF'
            }

           API.checkSession().then((data)=>{
               console.log("inside the check session response");
               console.log(data);

               if(data.status===201){

                   API.addHistory(payload)
                       .then((res) => {


                           if (res.status == 200) {


                               console.log("Success...")

                           }else if (res.status == 401) {

                               //  this.props.history.push('/');
                           }
                       });
               }

           })



           console.log('payload', payload);

           localStorage.setItem("carsearchcriteria", JSON.stringify(payload));
           this.props.history.push("/carlist");


      }


      handleUpdateCityInput = (value,textbox) => {

        this.setState({"city":value})

        var citysuggestion = cities().map((item,i)=>item.city+", "+item.state)

        this.setState({
            citysuggestion: citysuggestion
        });

      };



    handleStartDate(event, date){
        this.setState({startdate: date})
    }
    handleEndDate(event, date){
        this.setState({enddate: date})
    }
    styles = {

         toggle: {
           marginBottom: 16,
         },
         thumbOff: {
           backgroundColor: '#ffcccc',
         },
         trackOff: {
           backgroundColor: '#ff9d9d',
         },
         thumbSwitched: {
           backgroundColor: 'red',
         },
         trackSwitched: {
           backgroundColor: '#ff9d9d',
         },
         labelStyle: {
           color: 'red',
         },
       };
    handleToggle(){
        this.setState({
            returndateenable:!this.state.returndateenable
        })
    }


    render(){
        return(
            <div>
            <div className="card" style={{backgroundColor:'#E4E5EA',
             borderRadius: '0px',paddingTop:'3%',paddingBottom:'3%',zIndex:"1"}}>
                    <table>
                        <tr>
                        <td>Same Dropoff</td>
                        <td><Toggle

                                thumbStyle={this.styles.thumbOff}
                                trackStyle={this.styles.trackOff}
                                thumbSwitchedStyle={this.styles.thumbSwitched}
                                trackSwitchedStyle={this.styles.trackSwitched}
                                labelStyle={this.styles.labelStyle}
                                defaultToggled={false}
                                onToggle={this.handleToggle.bind(this)}
                            /></td>
                        <td>Different Dropoff</td>
                        </tr>
                     </table>
            <div className="card-body">
            <div className="row">


            <div className="col-sm-6">
            <div style={{backgroundColor:'white',paddingLeft:"5%",paddingRight:"5%"}}>
            <div>
            <AutoComplete
                    hintText="City"
                    dataSource={this.state.citysuggestion}
                    onUpdateInput={this.handleUpdateCityInput}
                    floatingLabelText="From"
                    maxSearchResults={5}
                    underlineShow={false}
                    fullWidth={false}
                    filter={AutoComplete.caseInsensitiveFilter}
            />
            <AutoComplete
                    hintText="City"
                    dataSource={this.state.citysuggestion}
                    onUpdateInput={this.handleUpdateCityInput}
                    floatingLabelText="To"
                    maxSearchResults={5}
                    underlineShow={false}
                    fullWidth={false}
                    disabled={!this.state.returndateenable}
                    filter={AutoComplete.caseInsensitiveFilter}
            />
            </div>
            </div>

            </div>
            <div className="col-sm-2" style={{backgroundColor:'white',paddingLeft:"2%",paddingRight:"5%"}}>
            <DatePicker hintText="Start Date" mode="landscape"
            onChange={this.handleStartDate.bind(this)}
            floatingLabelText="Start Date"/>
            </div>
            <div className="col-sm-2" style={{backgroundColor:'white',paddingLeft:"0%",paddingRight:"5%"}}>
            <DatePicker hintText="Return Date" mode="landscape"
            onChange={this.handleEndDate.bind(this)}
            floatingLabelText="Return Date"/>
            </div>

            <div className="col-sm-2" >

            <button type="button" className="btn btn-deep-orange"
            onClick={()=>this.handleSubmit()}
            style={{marginLeft:"-0%",height:'60px'}}>
                 <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
            </div>

          </div>
            </div>

        </div>


        </div>
        )
    }
}


export default withRouter(Carsearch);
