import React, { Component, Fragment } from "react";
import { injectIntl} from 'react-intl';
import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";
import IntlMessages from "Util/IntlMessages";
import axios from "axios";
//import optionSelect from "./optionSelect";
import {
  Row,
  Card,
  CardBody,
  Input,
  CardTitle,
  FormGroup,
  Label,
  CustomInput,
  Button,
  FormText,
  Form,
  CardSubtitle,
  Alert
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
import DatePicker from "react-datepicker";
import moment from "moment";
import TagsInput from "react-tagsinput";

import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback
} from "availity-reactstrap-validation";
import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "react-fine-uploader/gallery/gallery.css";

import { apiPath } from 'Constants/defaultValues'
const apiUrl_Goone = apiPath;

const selectData = [
  { label: "Chocolate", value: "chocolate", key: 0 },
  { label: "Vanilla", value: "vanilla", key: 1 },
  { label: "Strawberry", value: "strawberry", key: 2 },
  { label: "Caramel", value: "caramel", key: 3 },
  { label: "Cookies and Cream", value: "cookiescream", key: 4 },
  { label: "Peppermint", value: "peppermint", key: 5 }
];


// FORM 4 Residential
/*const arr_typeofproperty_4= [
      "Commercial"
      ,"Multifamily"
      ,"Retail"
      ,"Industrial"
      ,"Land"
      ,"Agricultural"
      ,"Residential Income"
      ,"Hotel"
      ,"Special"];*/

const arr_typeofproperty_4 = [
"Apartment"
,"Co-Op"
,"Condo"
,"Duplex"
,"Efficiency"
,"Fourplex"
,"Income"
,"Lease"
,"Mobile"
,"Multifamily"
,"Other"
,"Residential"
,"Single"
,"Special"
,"Townhouse"
,"Triplex"
,"Unimproved Agri/Recreatn/Moblhome"
,"Villa"];

//const arr_style_4 = ["Duplex","Triplex","Fourplex"];

const arr_transaction_type_4 = ["Rent","Sale"];

const arr_property_type_information_4 = ["Attached"
,"Detached"
,"Elevator"
,"Old Spanish"
,"Other"
,"Ranch"
,"Substantially Remodeled"
,"Stairs"];

const arr_lot_description_4 = [
"Less Than 1/4 Acre Lot"
,"1 To Less Than 2 Acre Lot"
,"1/2 To Less Than 3/4 Acre Lot"
,"1/4 To Less Than 1/2 Acre Lot"
,"10 Or More Acre Lot"
,"2 To Less Than 3 Acre Lot"
,"3 To Less Than 4 Acre Lot"
,"3/4 To Less Than 1 Acre Lot"
,"4 To Less Than 5 Acre Lot"
,"5 To Less Than 10 Acre Lot"
,"Corner Lot"
,"Cul-De-Sac Lot"
,"East Of Us 1"
,"Flood Zone Lot"
,"Golf Course Lot"
,"Interior Lot"
,"Irregular Lot"
,"Other"
,"Oversized Lot"
,"Regular Lot"
,"West Of Us 1"
,"Zero Lot Line Lot"];

const arr_water_description_4 = [
"Lake Worth Drain"
,"Municipal Water"
,"Other Water"
,"Well Water"];

const arr_waterfront_4 = ["Yes","No"];

const arr_waterfront_description_4 = [
"Bay Front"
,"Canal Front"
,"Creek Front"
,"Canal Width 1-80 Feet"
,"Canal Width 121 Feet Or More"
,"Canal Width 81-120 Feet"
,"Fixed Bridge(S)"
,"Intersecting Canals"
,"Intracoastal Front"
,"Lagoon Front"
,"Lake Front"
,"Lake Access"
,"Mangrove Front"
,"Navigable"
,"No Fixed Bridges"
,"Ocean Access"
,"Ocean Front"
,"One Fixed Bridge"
,"Other Waterfront"
,"Point Lot"
,"Pond Front"
,"Rip Rap"
,"River Front"
,"Seawall"];

const arr_water_access_4 = [
"Deeded Beach Access"
,"Boatlift"
,"Boatlock"
,"Community Boat Dock"
,"Community Boat Ramp"
,"Deeded Dock"
,"Dock Available"
,"Boat Hoists/Davits"
,"None"
,"Other"
,"Private Dock"
,"Restricted Salt Water Access"
,"Unrestricted Salt Water Access"];

const arr_construction_type_4 = [
"Aluminum Siding"
,"Concrete Block Construction"
,"Brick Exterior Construction"
,"Brick Veneer"
,"Block With Brick"
,"Construction"
,"Composition Shingle"
,"Pre-Cast Concrete Construction"
,"Elevated Construction"
,"Frame Construction"
,"Frame With Stucco"
,"Manufactured/Mobile Home"
,"Metal Construction"
,"Modular Construction"
,"New Construction"
,"Other Construction"
,"Piling Construction"
,"Pre-Fab Construction"
,"Precast Construction"
,"Siding-Asbestos"
,"Slab Construction"
,"Stone Exterior Construction"
,"Stucco Exterior Construction"
,"Under Construction"
,"Wood Siding"];

const arr_roof_description_4 = ["Aluminum Roof"
,"Bahama Roof"
,"Barrel Roof"
,"Built-Up Roof"
,"Composition Roll"
,"Concrete Roof"
,"Fiberglass Roof"
,"Flat Tile Roof"
,"Flat Roof With Facade Front"
,"Manufactured/Mobile Home"
,"Metal Roof"
,"Other Roof"
,"Roof Over"
,"Curved/S-Tile Roof"
,"Wood Shake Roof"
,"Shingle Roof"
,"Slate Roof"
,"Tar/Gravel Roof"
,"Wood Shingle Roof"];

const arr_pool_4 = ["Yes","No"];

const arr_spa_4 = ["Yes","No"];

const arr_exterior_features_4 = [
"Balconies"
,"Barbeque"
,"Barn &/Or Stalls"
,"Built-In Grill"
,"Exterior Cat Walk"
,"Wood Decking"
,"Extra Building/Shed"
,"Fence"
,"Fruit Trees"
,"Greenhouse"
,"High Impact Doors"
,"Laundry Facility"
,"Exterior Lights"
,"Open Balcony"
,"Open Porch"
,"Other Exterior"
,"Outdoor Shower"
,"Patio"
,"Room For Pool"
,"Satellite Dish"
,"Screened Balcony"
,"Screened Patio/Porch"
,"Electric Shutters"
,"Hurricane Shutters"
,"Skylights"
,"Stables"
,"Tennis Court"
,"Tv Antenna"
,"Wraparound Porch"];


const arr_floor_description_4 = [
"Carpeted Floors"
,"Ceramic Floor"
,"Clay Floors"
,"Concrete Floors"
,"Marble/Slate Floors"
,"Other Floors"
,"Parquet Floors"
,"Slate"
,"Terrazzo Floors"
,"Tile Floors"
,"Vinyl Floors"
,"Wood Floors"];

const arr_heating_description_4 = ["Central Heat"
,"Electric Heat"
,"Gas Heat"
,"Heat Strip"
,"Heat Pump/Reverse Cycle"
,"No Heat"
,"Oil Heat"
,"Other"
,"Radiant Heat"
,"Cycle Unit"
,"Solar Heat"
,"Space Heater"
,"Wall Furnace"
,"Window/Wall"
,"Zoned Heat"];

const arr_cooling_description_4 = ["Air Purifier"
,"Attic Fan"
,"Ceiling Fans"
,"Central Cooling"
,"Electric Cooling"
,"Gas Cooling"
,"Humidistat"
,"No Cooling"
,"Other"
,"Paddle Fans"
,"Ridge Vent/Turbines"
,"Thermal Attic Fan"
,"Wall/Window Unit Cooling"
,"Zoned Cooling"];

const arr_sewer_description_4 = ["Municipal Sewer","Other Sewer","Septic"];

const arr_cable_available_4 = ["Yes","No"];

const arr_rent_includes_4 = [
"Cable Tv"
,"Electric"
,"Gas"
,"Hot Water"
,"Lawn Care"
,"None"
,"Other Rent Incl"
,"Pest Control"
,"Pool Maintenance"
,"Sewer"
,"Trash Removal"
,"Water"];

const arr_terms_considered_4 = [
"Assumption"
,"Cash Only"
,"Conventional"
,"Exchange"
,"Fha"
,"Va"
,"FHA-Va Approved"
,"FHA 203K"
,"Lease Option"
,"Lease Purchase"
,"No Terms"
,"Other"
,"Owner Financing"
,"Owner Financing less 20K Down"
,"Owner Hold 2nd Mortgage"
,"Owtb Wrap"
,"Seller Will Pay Closing Costs"
,"Will Rent"];


const arr_type_of_association_4 = ["Homeowners","Condo","Other","None"];

const arr_assoc_fee_paid_per_4 = ["Monthly","None","Quarterly","Semi-Annually","Yearly"];

const arr_tax_information_4 = [
"Tax Reflects Agriculture Exemption"
,"Tax Reflects City & County Tax"
,"Tax Reflects County Only Tax"
,"Tax Reflects Disability Exemption"
,"Tax Reflects Homestead Tax"
,"New Construction"
,"Tax Reflects No Exemptions"
,"Tax Reflects No Homestead Tax"
,"Tax Reflects Other Tax Exemption"
,"Tax Reflects Widow Exemption"];

class ListingAdd_Res extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleTagChangeLabelOver = this.handleTagChangeLabelOver.bind(this);
    this.handleChangeDateLabelOver = this.handleChangeDateLabelOver.bind(this);
    this.handleTagChangeLabelTop = this.handleTagChangeLabelTop.bind(this);
    this.handleChangeLabelTop = this.handleChangeLabelTop.bind(this);
    this.handleChangeDateLabelTop = this.handleChangeDateLabelTop.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.onDismiss = this.onDismiss.bind(this);

    this.state = {
      selectedOption: "",
      selectedOptionLabelOver: "",
      selectedOptionLabelTop: "",
      startDate: null,
      startDateLabelOver: null,
      startDateLabelTop: null,
      startDateTime: null,
      startDateRange: null,
      endDateRange: null,
      embeddedDate: moment(),
      tags: [],
      tagsLabelOver: [],
      tagsLabelTop: [],
      visible: false
    };

  }

  handleClick = () => {
    
    var formElement = document.getElementById("frm_listing");
    var data = this.FormDataToJSON(formElement);
    /*data.iduser = localStorage.getItem("user_id");
    data.id = localStorage.getItem("id");*/
    //data.iduser = 11;
    var iuu = localStorage.getItem("user_id");
    var iuuu = String(iuu);
    data.iduser = iuuu.replace("\n","");

    const API_URL = apiUrl_Goone+'/api/ManualListings';

    console.log(data);

    axios.put(API_URL,data)
        .then((res)=>{
        console.log(res);
        this.setState({
          visible: true
        });
    })
    .catch((err)=>{
        console.error(err);
    });

  }

  FormDataToJSON(FormElement){
        var formData = new FormData(FormElement);
        var ConvertedJSON= {};
        for (const [key, value]  of formData.entries())
        {
            ConvertedJSON[key] = value.replace("\n","");
        }
        return ConvertedJSON
  }

  handleTagChange(tags) {
    this.setState({ tags });
  }

  handleTagChangeLabelOver(tagsLabelOver) {
    this.setState({ tagsLabelOver });
  }

  handleTagChangeLabelTop(tagsLabelTop) {
    this.setState({ tagsLabelTop });
  }

  handleChangeLabelOver = selectedOptionLabelOver => {
    this.setState({ selectedOptionLabelOver });
  };

  handleChangeLabelTop = selectedOptionLabelTop => {
    this.setState({ selectedOptionLabelTop });
  };

  handleChangeDateLabelOver(date) {
    this.setState({
      startDateLabelOver: date
    });
  }
  handleChangeDateLabelTop(date) {
    this.setState({
      startDateLabelTop: date
    });
  }

  handleChangeDate(date) {
    this.setState({
      startDate: date
    });
  }

  getComboSelect(arr){
    return arr.map((d) => <option value={d}>{d}</option>);
  }
  
  onDismiss() {
    this.setState({ visible: false });
  }
  
  render() {
    
    const {messages} = this.props.intl;

    const list_typeofproperty_4 = this.getComboSelect(arr_typeofproperty_4);
    //const list_style_4 = this.getComboSelect(arr_style_4);
    const list_transaction_type_4 = this.getComboSelect(arr_transaction_type_4);
    const list_property_type_information_4 = this.getComboSelect(arr_property_type_information_4);
    const list_lot_description_4 = this.getComboSelect(arr_lot_description_4);
    const list_water_description_4 = this.getComboSelect(arr_water_description_4);
    const list_waterfront_4 = this.getComboSelect(arr_waterfront_4);
    const list_waterfront_description_4 = this.getComboSelect(arr_waterfront_description_4);
    const list_water_access_4 = this.getComboSelect(arr_water_access_4);
    const list_construction_type_4 = this.getComboSelect(arr_construction_type_4);
    const list_roof_description_4 = this.getComboSelect(arr_roof_description_4);
    const list_pool_4 = this.getComboSelect(arr_pool_4);
    const list_spa_4 = this.getComboSelect(arr_spa_4);
    const list_exterior_features_4 = this.getComboSelect(arr_exterior_features_4);
    const list_floor_description_4 = this.getComboSelect(arr_floor_description_4);
    const list_heating_description_4 = this.getComboSelect(arr_heating_description_4);
    const list_cooling_description_4 = this.getComboSelect(arr_cooling_description_4);
    const list_sewer_description_4 = this.getComboSelect(arr_sewer_description_4);
    const list_cable_available_4 = this.getComboSelect(arr_cable_available_4);
    const list_rent_includes_4 = this.getComboSelect(arr_rent_includes_4);
    const list_terms_considered_4 = this.getComboSelect(arr_terms_considered_4);
    const list_type_of_association_4 = this.getComboSelect(arr_type_of_association_4);
    const list_assoc_fee_paid_per_4 = this.getComboSelect(arr_assoc_fee_paid_per_4);
    const list_tax_information_4 = this.getComboSelect(arr_tax_information_4);

    //const data =[{"name":"test1"},{"name":"test2"}];
    //const list_arr_for_lease = arr_for_lease.map((d) => <option value={d}>{d}</option>);

    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            {/*<BreadcrumbContainer
              heading={<IntlMessages id="Add Listing Residential Income" />}
              match={this.props.match}
            />*/}
            <h1>
              <IntlMessages id="Add Listing for Rent" />
            </h1>
            <Separator className="mb-5" />
          </Colxx>
        </Row>

        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                
                <Form name="frm_listing" id="frm_listing">
                  <input type="hidden" value="Residential" id="typedata" name="typedata"/>
                  <FormGroup row>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="mlsno">
                          <IntlMessages id="MLS" />
                        </Label>
                        <Input
                          type="text"
                          name="mlsno"
                          id="mlsno"
                          placeholder="MLS"
                        />
                      </FormGroup>
                    </Colxx>
                  </FormGroup>

                  <CardTitle>
                    <IntlMessages id="Location Information" />
                  </CardTitle>

                  <FormGroup row>
                    <Colxx sm={6}>
                      <FormGroup>
                        <Label for="address">
                          <IntlMessages id="Address" />
                        </Label>
                        <Input
                          type="text"
                          name="address"
                          id="address"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="city">
                          <IntlMessages id="City" />
                        </Label>
                        <Input
                          type="text"
                          name="city"
                          id="city"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="state">
                          <IntlMessages id="State" />
                        </Label>
                        <Input
                          type="text"
                          name="state"
                          id="state"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>
                  
                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="zipcode">
                          <IntlMessages id="Zip Code" />
                        </Label>
                        <Input
                          type="text"
                          name="zip"
                          id="zip"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="county">
                          <IntlMessages id="County" />
                        </Label>
                        <Input
                          type="text"
                          name="county"
                          id="county"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="area">
                          <IntlMessages id="Area" />
                        </Label>
                        <Input
                          type="text"
                          name="area"
                          id="area"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="zoning_information">
                          <IntlMessages id="Zoning Information" />
                        </Label>
                        <Input
                          type="text"
                          name="zoning_information"
                          id="zoning_information"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>
                  
                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="subdivision_name">
                          <IntlMessages id="Subdivision Name" />
                        </Label>
                        <Input
                          type="text"
                          name="subdivision_name"
                          id="subdivision_name"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    {/*<Colxx sm={3}>
                      <FormGroup>
                        <Label for="development_name">
                          <IntlMessages id="Development Name" />
                        </Label>
                        <Input
                          type="text"
                          name="development_name"
                          id="development_name"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>*/}

                    <Colxx sm={9}>
                      <FormGroup>
                        <Label for="legal_description">
                          <IntlMessages id="Legal Description" />
                        </Label>
                        <Input
                          type="text"
                          name="legal_description"
                          id="legal_description"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                  </FormGroup>
                  
                  <CardTitle>
                    <IntlMessages id="General Information" />
                  </CardTitle>

                  <FormGroup row>
                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="beds">
                          <IntlMessages id="Beds" />
                        </Label>
                        <Input type="select" name="beds" id="beds">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </Input>
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="baths">
                          <IntlMessages id="Baths" />
                        </Label>
                        <Input type="select" name="baths" id="baths">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </Input>
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="folionumber">
                          <IntlMessages id="Folio Number" />
                        </Label>
                        <Input
                          type="text"
                          name="folio_number"
                          id="folio_number"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                          <Label for="typeofproperty">
                            <IntlMessages id="Type of Property" />
                          </Label>
                          <Input type="select" name="typeofproperty" id="typeofproperty">
                            <option value="">Select</option>
                            {list_typeofproperty_4}
                          </Input>
                      </FormGroup>
                    </Colxx>

                    {/*<Colxx sm={3}>
                      <FormGroup>
                          <Label for="style">
                            <IntlMessages id="Style" />
                          </Label>
                          <Input type="select" name="style" id="style">
                            <option value="">Select</option>
                            {list_style_4}
                          </Input>
                      </FormGroup>
                    </Colxx>*/}

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="price">
                          <IntlMessages id="Price" />
                        </Label>
                        <Input
                          type="text"
                          name="price"
                          id="price"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="sqft_liv_area">
                          <IntlMessages id="Sqft Living Area" />
                        </Label>
                        <Input
                          type="text"
                          name="sqft_liv_area"
                          id="sqft_liv_area"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="approximate_lot_size">
                          <IntlMessages id="Approximate Lot Size" />
                        </Label>
                        <Input
                          type="text"
                          name="approximate_lot_size"
                          id="approximate_lot_size"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="approx_sqft_total_area">
                          <IntlMessages id="Approx. Sqft Total Area" />
                        </Label>
                        <Input
                          type="text"
                          name="approx_sqft_total_area"
                          id="approx_sqft_total_area"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="total_units">
                          <IntlMessages id="Total Units" />
                        </Label>
                        <Input
                          type="text"
                          name="total_units"
                          id="total_units"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="num_stories">
                          <IntlMessages id="# Stories" />
                        </Label>
                        <Input
                          type="text"
                          name="num_stories"
                          id="num_stories"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    {/*<Colxx sm={3}>
                      <FormGroup>
                        <Label for="county_land_code">
                          <IntlMessages id="County Land Code" />
                        </Label>
                        <Input
                          type="text"
                          name="county_land_code"
                          id="county_land_code"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>*/}

                    <Colxx sm={3}>
                        <FormGroup>
                          <Label for="property_type_information">
                            <IntlMessages id="Property Type Information" />
                          </Label>
                          <Input type="select" name="property_type_information" id="property_type_information">
                            <option value="">Select</option>
                            {list_property_type_information_4}
                          </Input>
                        </FormGroup>
                    </Colxx>

                    {/*<Colxx sm={3}>
                        <FormGroup>
                          <Label for="transaction_type">
                            <IntlMessages id="Transaction Type" />
                          </Label>
                          <Input type="select" name="transaction_type" id="transaction_type">
                            <option value="">Select</option>
                            {list_transaction_type_4}
                          </Input>
                        </FormGroup>
                    </Colxx>*/}
                    <Input type="hidden" name="transaction_type" id="transaction_type" value="Rent"/>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="year_built">
                          <IntlMessages id="Year Built" />
                        </Label>
                        <Input
                          type="text"
                          name="year_built"
                          id="year_built"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    
                    {/*<Colxx sm={6}>
                        <Colxx sm={4}>
                          <FormGroup check>
                            <Label check>
                              <Input type="checkbox" name="new_construction" /> New Construcction
                            </Label>
                          </FormGroup>
                        </Colxx>

                        <Colxx sm={4}>
                          <FormGroup check>
                            <Label check>
                              <Input type="checkbox" name="reo" /> Reo
                            </Label>
                          </FormGroup>
                        </Colxx>

                        <Colxx sm={4}>
                          <FormGroup check>
                            <Label check>
                              <Input type="checkbox" name="short_sale" /> Short Sale
                            </Label>
                          </FormGroup>
                        </Colxx>
                    </Colxx>*/}
                  
                  </FormGroup>
                  <br/>

                  <CardTitle>
                    <IntlMessages id="Additional Information" />
                  </CardTitle>

                  <FormGroup row>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="parking_spaces">
                          <IntlMessages id="# Parking Spaces" />
                        </Label>
                        <Input
                          type="text"
                          name="parking_spaces"
                          id="parking_spaces"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                        <FormGroup>
                          <Label for="lot_description">
                            <IntlMessages id="Lot Description" />
                          </Label>
                          <Input type="select" name="lot_description" id="lot_description">
                            <option value="">Select</option>
                            {list_lot_description_4}
                          </Input>
                        </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                        <FormGroup>
                          <Label for="water_description">
                            <IntlMessages id="Water Description" />
                          </Label>
                          <Input type="select" name="water_description" id="water_description">
                            <option value="">Select</option>
                            {list_waterfront_description_4}
                          </Input>
                        </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                        <FormGroup>
                          <Label for="waterfront">
                            <IntlMessages id="Waterfront" />
                          </Label>
                          <Input type="select" name="waterfront" id="waterfront">
                            <option value="">Select</option>
                            {list_waterfront_4}
                          </Input>
                        </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                        <FormGroup>
                          <Label for="waterfront_description">
                            <IntlMessages id="Waterfront Description" />
                          </Label>
                          <Input type="select" name="waterfront_description" id="waterfront_description">
                            <option value="">Select</option>
                            {list_waterfront_description_4}
                          </Input>
                        </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                        <FormGroup>
                          <Label for="water_access">
                            <IntlMessages id="Water Access" />
                          </Label>
                          <Input type="select" name="water_access" id="water_access">
                            <option value="">Select</option>
                            {list_water_access_4}
                          </Input>
                        </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                        <FormGroup>
                          <Label for="construction_type">
                            <IntlMessages id="Construction Type" />
                          </Label>
                          <Input type="select" name="construction_type" id="construction_type">
                            <option value="">Select</option>
                            {list_construction_type_4}
                          </Input>
                        </FormGroup>
                    </Colxx>

                    {/*<Colxx sm={3}>
                        <FormGroup>
                          <Label for="roof_description">
                            <IntlMessages id="Roof Description" />
                          </Label>
                          <Input type="select" name="roof_description" id="roof_description">
                            <option value="">Select</option>
                            {list_roof_description_4}
                          </Input>
                        </FormGroup>
                    </Colxx>*/}

                    <Colxx sm={3}>
                        <FormGroup>
                          <Label for="pool">
                            <IntlMessages id="Pool" />
                          </Label>
                          <Input type="select" name="pool" id="pool">
                            <option value="">Select</option>
                            {list_pool_4}
                          </Input>
                        </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                        <FormGroup>
                          <Label for="spa">
                            <IntlMessages id="Spa" />
                          </Label>
                          <Input type="select" name="spa" id="spa">
                            <option value="">Select</option>
                            {list_spa_4}
                          </Input>
                        </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                        <FormGroup>
                          <Label for="exterior_features">
                            <IntlMessages id="Exterior Features" />
                          </Label>
                          <Input type="select" name="exterior_features" id="exterior_features">
                            <option value="">Select</option>
                            {list_exterior_features_4}
                          </Input>
                        </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                        <FormGroup>
                          <Label for="floor_description">
                            <IntlMessages id="Floor Description" />
                          </Label>
                          <Input type="select" name="floor_description" id="floor_description">
                            <option value="">Select</option>
                            {list_floor_description_4}
                          </Input>
                        </FormGroup>
                    </Colxx>
                  </FormGroup>

                  <CardTitle>
                    <IntlMessages id="Utilities Information" />
                  </CardTitle>

                  <FormGroup row>

                    <Colxx sm={3}>
                        <FormGroup>
                          <Label for="heating_description">
                            <IntlMessages id="Heating Description" />
                          </Label>
                          <Input type="select" name="heating_description" id="heating_description">
                            <option value="">Select</option>
                            {list_heating_description_4}
                          </Input>
                        </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                        <FormGroup>
                          <Label for="cooling_description">
                            <IntlMessages id="Cooling Description" />
                          </Label>
                          <Input type="select" name="cooling_description" id="cooling_description">
                            <option value="">Select</option>
                            {list_cooling_description_4}
                          </Input>
                        </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                        <FormGroup>
                          <Label for="sewer_description">
                            <IntlMessages id="Sewer Description" />
                          </Label>
                          <Input type="select" name="sewer_description" id="sewer_description">
                            <option value="">Select</option>
                            {list_sewer_description_4}
                          </Input>
                        </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                        <FormGroup>
                          <Label for="cable_available">
                            <IntlMessages id="Cable Available" />
                          </Label>
                          <Input type="select" name="cable_available" id="cable_available">
                            <option value="">Select</option>
                            {list_cable_available_4}
                          </Input>
                        </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                        <FormGroup>
                          <Label for="rent_includes">
                            <IntlMessages id="Rent Includes" />
                          </Label>
                          <Input type="select" name="rent_includes" id="rent_includes">
                            <option value="">Select</option>
                            {list_rent_includes_4}
                          </Input>
                        </FormGroup>
                    </Colxx>
                  </FormGroup>

                  {/*<CardTitle>
                    <IntlMessages id="Finantial Information" />
                  </CardTitle>

                  <FormGroup row>
                    <Colxx sm={3}>
                        <FormGroup>
                          <Label for="terms_considered">
                            <IntlMessages id="Terms Considered" />
                          </Label>
                          <Input type="select" name="terms_considered" id="terms_considered">
                            <option value="">Select</option>
                            {list_terms_considered_4}
                          </Input>
                        </FormGroup>
                    </Colxx>

                    {//<Colxx sm={3}>
                        <FormGroup>
                          <Label for="type_of_association">
                            <IntlMessages id="Type of Association" />
                          </Label>
                          <Input type="select" name="type_of_association" id="type_of_association">
                            <option value="">Select</option>
                            {list_type_of_association_4}
                          </Input>
                        </FormGroup>
                    </Colxx>//}

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="gross_rent_income">
                          <IntlMessages id="Gross Rent Income" />
                        </Label>
                        <Input
                          type="text"
                          name="gross_rent_income"
                          id="gross_rent_income"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="net_operating_income">
                          <IntlMessages id="Net Operating Income" />
                        </Label>
                        <Input
                          type="text"
                          name="net_operating_income"
                          id="net_operating_income"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="total_expenses">
                          <IntlMessages id="Total Expenses" />
                        </Label>
                        <Input
                          type="text"
                          name="total_expenses"
                          id="total_expenses"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    {//<Colxx sm={3}>
                      <FormGroup>
                        <Label for="association_fee">
                          <IntlMessages id="Association Fee" />
                        </Label>
                        <Input
                          type="text"
                          name="association_fee"
                          id="association_fee"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                        <FormGroup>
                          <Label for="assoc_fee_paid_per">
                            <IntlMessages id="Assoc Fee Paid Per" />
                          </Label>
                          <Input type="select" name="assoc_fee_paid_per" id="assoc_fee_paid_per">
                            <option value="">Select</option>
                            {list_assoc_fee_paid_per_4}
                          </Input>
                        </FormGroup>
                    </Colxx>//}

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="total_mortgage">
                          <IntlMessages id="Total Mortgage" />
                        </Label>
                        <Input
                          type="text"
                          name="total_mortgage"
                          id="total_mortgage"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="tax_amount">
                          <IntlMessages id="Tax Amount" />
                        </Label>
                        <Input
                          type="text"
                          name="tax_amount"
                          id="tax_amount"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    <Colxx sm={3}>
                      <FormGroup>
                        <Label for="tax_year">
                          <IntlMessages id="Tax Year" />
                        </Label>
                        <Input
                          type="text"
                          name="tax_year"
                          id="tax_year"
                          placeholder=""
                        />
                      </FormGroup>
                    </Colxx>

                    {//<Colxx sm={3}>
                      <FormGroup>
                        <Label for="cap_index">
                          <IntlMessages id="Cap Index" />
                        </Label>
                        <Input
                          type="text"
                          name="cap_index"
                          id="cap_index"
                          placeholder="%"
                        />
                      </FormGroup>
                    </Colxx>//}


                    <Colxx sm={3}>
                        <FormGroup>
                          <Label for="tax_information">
                            <IntlMessages id="Tax Information" />
                          </Label>
                          <Input type="select" name="tax_information" id="tax_information">
                            <option value="">Select</option>
                            {list_tax_information_4}
                          </Input>
                        </FormGroup>
                    </Colxx>
                  </FormGroup>*/}

                  <CardTitle>
                    <IntlMessages id="Listing Description" />
                  </CardTitle>

                  <FormGroup row>
                    <Colxx sm={12}>
                        <FormGroup>
                          <Label for="comment">
                            <IntlMessages id="General Description" />
                          </Label>
                          <Input type="textarea" name="comment" id="comment" />
                        </FormGroup>
                    </Colxx>
                  </FormGroup>

                  <CardTitle>
                    <IntlMessages id="Listing Expiration" />
                  </CardTitle>

                  <FormGroup row>
                    <Colxx sm={3}>
                        <FormGroup>
                          <Label for="listing_expiration">
                            <IntlMessages id="Listing Expiration" />
                          </Label>
                          <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChangeDate}
                            placeholderText=""
                            name="listing_expiration"
                            dateFormat="YYYY-MM-DD"
                          />
                        </FormGroup>
                    </Colxx>
                  </FormGroup>

                  <Button color="primary" onClick={() => this.handleClick()} style={{'color':'#fff'}}>
                    <IntlMessages id="Save Listing" />
                  </Button>
                  <br/>
                  <br/>
                  <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>Success</Alert>
                </Form>
              </CardBody>
            </Card>
          </Colxx>
        </Row>


      </Fragment>
    );
  }
}
export default  injectIntl(ListingAdd_Res)