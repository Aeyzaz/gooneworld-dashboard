import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { injectIntl} from 'react-intl';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Progress,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  CustomInput,
  CardHeader,
  CardImg
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
import classnames from "classnames";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";
import { CalendarToolbar } from "Components/Calendar/CalendarToolbar";
import { PolarShadow, LineShadow, SmallLineChart } from "Components/Charts";

import axios from 'axios';

import {
  visitChartConfig,
  conversionChartConfig,
  lineChartConfig,
  polarChartConfig,
  smallChartData1,
  smallChartData2,
  smallChartData3,
  smallChartData4
} from "Constants/chartConfig";

import BigCalendar from "react-big-calendar";
import moment from "moment";
import ReactTable from "react-table";
import CircularProgressbar from "react-circular-progressbar";
import { Chart } from "react-chartjs-2";
import ReactSiemaCarousel from "Components/ReactSiema/ReactSiemaCarousel";
import Rating from "Components/Rating";
import DataTablePagination from "Components/DataTables/pagination";
import Sortable from "react-sortablejs";

import "chartjs-plugin-datalabels";
import "react-circular-progressbar/dist/styles.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-table/react-table.css";

import eventsData from "Data/events.json";
import ticketsData from "Data/tickets.json";
import logsData from "Data/logs.json";
import productsData from "Data/products.json";
import profileStatusData from "Data/dashboard.profile.status.json";
import cakeData from "Data/dashboard.cakes.json";


import { servicePath, apiPath, apiPath_Photos } from 'Constants/defaultValues';
const apiUrl_Goone = apiPath;
const apiUrlPhotos = apiPath_Photos;

Chart.defaults.global.plugins.datalabels.display = false;

const selectData = [
  { label: "Chocolate", value: "chocolate", key: 0 },
  { label: "Vanilla", value: "vanilla", key: 1 },
  { label: "Strawberry", value: "strawberry", key: 2 },
  { label: "Caramel", value: "caramel", key: 3 },
  { label: "Cookies and Cream", value: "cookiescream", key: 4 },
  { label: "Peppermint", value: "peppermint", key: 5 }
];

const selectDataType = [
  { label: "Cake", value: "cake", key: 0 },
  { label: "Cupcake", value: "cupcake", key: 1 },
  { label: "Dessert", value: "dessert", key: 2 }
];

const dataTableColumns = [
  {
    Header: "Name",
    accessor: "name",
    Cell: props => <p className="list-item-heading">{props.value}</p>
  },
  {
    Header: "Sales",
    accessor: "sales",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "Stock",
    accessor: "stock",
    Cell: props => <p className="text-muted">{props.value}</p>
  },
  {
    Header: "Category",
    accessor: "category",
    Cell: props => <p className="text-muted">{props.value}</p>
  }
];

const recentOrders = productsData.data.slice(0, 6);
const tickets = ticketsData.data;
const events = eventsData.data;
const logs = logsData.data;
const dataTableData = productsData.data.slice(0, 12);
const profileStatuses = profileStatusData.data;
const cakes = cakeData.data;

BigCalendar.momentLocalizer(moment);

class DefaultDashboard extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);

    this.state = {
      selectedOptions: [],
      selectedOptionsType: [],
      items: [],
      itemsfav: []
    };
  }

  generateGET = (options) => {
      // Create string for GET requests in a url
      var payloads = "?";

      var i = 1;
      for (var key in options) {
        payloads += key + "=" + options[key];

        // Append & separator to all but last value
        if (i !== Object.keys(options).length) payloads += "&";

        i++;
      }

      return payloads;
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  }

  handleChangeType = selectedOptionsType => {
    this.setState({ selectedOptionsType });
  }

  slotSelected = () =>{
    alert("slotSelected");
  }

  eventSelected = () =>{
    alert("eventSelected");
  }

  dataListRender() {
      //const {selectedPageSize,currentPage,selectedOrderOption,search} = this.state;
      const selectedPageSize = 4;
      const iduser = localStorage.getItem("user_id");
      console.log("user", iduser);
      let query = {
        params: {
          filter: {
            where:{
              "hostApp":"GOW"
            },
            limit:selectedPageSize
          }
        }
      }
      //COUNTING RECORDS

      axios.get(apiUrl_Goone+'/api/userSearchData/count?',{
        params:{
          where: query.params.filter.where
        }
      })
      .then(res=> {
        console.log('total records',res);
        axios.get(apiUrl_Goone+'/api/userSearchData?'+iduser,query)
            .then(res => {
            console.log('data',res.data);

            this.state.items = res.data; 
            console.log(this.state);
            this.setState({
              selectedItems:[],
              isLoading:true
            });
        })
      });

  }

  dataListRenderFav() {

      const selectedPageSize = 4
      const iduser = localStorage.getItem("user_id");
      console.log("user", iduser);
      let query = {
        params: {
          filter: {
            where:{
              "iduser":{"=":iduser} 
            },
            limit:selectedPageSize
          }
        }
      }
      //COUNTING RECORDS
      var contador = 0;

        axios.get(apiUrl_Goone+'/api/Users/'+iduser+'/favorites')
            .then(res => {
            console.log('data',res.data);

            this.state.itemsfav = res.data.data; 
            contador = res.data.FetchedRecords;
            console.log(contador);
            console.log(this.state.items);

            this.setState({
              selectedItems:[],
              isLoading:true
            });
          });
    }

  componentDidMount() {
    this.dataListRender();
    this.dataListRenderFav();
  }

  render() {
    const {messages} = this.props.intl;
    return (
      <Fragment>
        {/*<Row>
          <Colxx xxs="12">
            <BreadcrumbContainer
              heading={<IntlMessages id="menu.default" />}
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>*/}
        <Row>
          

          <Colxx lg="12" xl="6" className="mb-4">
            <Card>
              <div className="position-absolute card-top-buttons">
                <button className="btn btn-header-light icon-button">
                  <i className="simple-icon-refresh" />
                </button>
              </div>
              <CardBody>
                <div style={{paddingLeft: '15px'}}><h5>Last Favorites</h5></div>
                <div className="scroll dashboard-list-with-thumbs">
                {this.state.itemsfav.map(product => {

                  var typetrans = "";
                  switch(product.PropertyType){
                    case 'Residential':
                    typetrans = "Sale";
                    break;
                    case 'ResidentialLease':
                    typetrans = "Lease";
                    break;

                  }

                  var typelink = "https://gooneworld.com/listings/details/"+product.City+"/"+product.StateOrProvince+"/"+typetrans+"/"+product.Slug+"/"+product.ListingKeyNumeric;
                  
                  return (
                    <Colxx xxs="12" key={product.id} className="mb-3">
                        <Card
                          onClick={event =>
                            this.handleCheckChange(event, product.id)
                          }
                          className={classnames("d-flex flex-row", {
                            active: this.state.selectedItems.includes(
                              product.id
                            )
                          })}
                        >
                          <a href={typelink} className="w-40 _w-sm-100">
                              <img
                              alt={product.UnparsedAddress}
                              src={apiUrlPhotos+product.ListingKeyNumeric+'/0.jpg'}
                              className="list-thumbnail responsive border-0"/>
                          </a>
                          <div className="">
                            <div className="_card-body">
                              
                              <a href={typelink} className="w-40 w-sm-100">
                                <p className="list-item-heading mb-1 truncate" style={{paddingTop:'10px',paddingRight: '10px'}}>
                                  {product.UnparsedAddress} 
                                </p>
                              </a>
                              
                              <p className="mb-1 text-muted text-small w-sm-100">
                                {product.City} {product.StateOrProvince} {product.PostalCode}
                              </p>
                              <p className="mb-1 text-muted text-small w-sm-100">
                                $ {product.ListPrice}
                              </p>
                            </div>

                          </div>
                        </Card>
                    </Colxx>
                  );
                
                })}
                </div>
              </CardBody>


            </Card>
          </Colxx>

          <Colxx lg="12" xl="6" className="mb-4">
            <Card>
              <div className="position-absolute card-top-buttons">
                <button className="btn btn-header-light icon-button">
                  <i className="simple-icon-refresh" />
                </button>
              </div>
              <CardBody>
                <div style={{paddingLeft: '15px'}}><h5>Last Saved Search</h5></div>
                <div className="scroll dashboard-list-with-thumbs">
                  {this.state.items.map(product => {
                  console.log("product ",product);
                  var arrnokey = ['id','City', 'StateOrProvince', 'hostApp', 'transaction_type','userId'];
                  var params = {};
                  Object.keys(product).forEach(key => {
                    if(!arrnokey.includes(key)){
                      params[key] = product[key];
                    }
                  });

                  var link_saved_search = 'https://gooneworld.com/listings/search/'+product.City+'/'+product.StateOrProvince+'/'+product.TransactionType+this.generateGET(params);

                  return (
                    <Colxx xxs="12" key={product.id} className="mb-3">
                        <Card
                          onClick={event =>
                            this.handleCheckChange(event, product.id)
                          }
                          className={classnames("d-flex flex-row", {
                            active: this.state.selectedItems.includes(
                              product.id
                            )
                          })}
                        >
                          <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                            <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                              <a href={link_saved_search} target="_blank">
                                <p className="list-item-heading mb-1 truncate">
                                  Search For {product.TransactionType} in {product.City} - {product.StateOrProvince}
                                </p>
                              </a>
                            </div>
                          </div>
                        </Card>
                    </Colxx>
                  );

                  })}
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>




      </Fragment>
    );
  }
}
export default injectIntl(DefaultDashboard);
