import React, { Component, Fragment } from "react";
import { injectIntl} from 'react-intl';
import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";
import IntlMessages from "Util/IntlMessages";
import axios from "axios";
import Dropzone from 'react-dropzone';
import _ from "lodash";
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
    Alert,
    Badge
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
import DatePicker from "react-datepicker";
import moment from "moment";
import TagsInput from "react-tagsinput";

import { connect } from "react-redux";

import {
  calluserPhoto
} from "Redux/actions";

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

import customuser from "./customuser.css";

const acceptedFileTypes = 'image/jpg, image/jpeg';

class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleTagChangeLabelOver = this.handleTagChangeLabelOver.bind(this);
        this.handleChangeDateLabelOver = this.handleChangeDateLabelOver.bind(this);
        this.handleTagChangeLabelTop = this.handleTagChangeLabelTop.bind(this);
        this.handleChangeLabelTop = this.handleChangeLabelTop.bind(this);
        this.handleChangeDateLabelTop = this.handleChangeDateLabelTop.bind(this);
        this.handleText = this.handleText.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onDismiss_a = this.onDismiss_a.bind(this);
        this.handleClickPassword = this.handleClickPassword.bind(this);

        console.log(localStorage.getItem("user_id"));

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
            items: [],
            visible: false,
            oldpassword:"",
            newpassword:"",
            visible_a: false,
            photouser:''
        };

    }

    FormDataToJSON(FormElement){
        var formData = new FormData(FormElement);
        var ConvertedJSON= {};
        for (const [key, value]  of formData.entries())
        {
            ConvertedJSON[key] = value;
        }
        return ConvertedJSON
    }

    handleText(e){
        this.setState({value: e.target.value})
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

    handleOnDrop = (files, rejectedFiles) =>{

        const iduser = localStorage.getItem("user_id");
        console.log(iduser);

        const formData = new FormData();

        const file = files[0];
        formData.append('profilePhoto', file);

        const API_URL = apiUrl_Goone+'/api/Users/'+iduser+'/uploadPhoto';
        const config = {
            headers: {'content-type': 'multipart/form-data'}
        }

        axios.post(API_URL, formData, config)
            .then((response) => {
                //handle success
                console.log("upload", response);
                this.getUserData();
            }).catch((error) => {
            console.log("error upload", error);
            //handle error
        });
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    onDismiss_a() {
        this.setState({ visible_a: false });
    }

    getUserData(){

        const iduser = localStorage.getItem("user_id");
        const token = localStorage.getItem('token');
        console.log(iduser);
        console.log(token);

        const httpReqHeaders = {
            'Authorization': token,
            'Content-Type': 'application/json'
        };
        const axiosConfigObject = {headers: httpReqHeaders};

        const API_URL = apiUrl_Goone+'/api/Users/'+iduser;

        axios.get(API_URL, axiosConfigObject)
            .then((res)=>{
                console.log("resultado ",res);
                localStorage.setItem('photouser', res.data.profilePhoto.link);
                console.log("nueva foto ",res.data.profilePhoto.link);
                this.setState({
                    items: res.data
                });
                //this.props.getUserPhoto(this.state);
                //photouser: res.data.profilePhoto.link
                //console.log(this.state);
            })
            .catch((err)=>{
                console.error(err);
            });
    }

    componentDidMount(){
        this.getUserData();
    }

    handleClick = () => { // edit personal data

        var formElement = document.getElementById("frm_user");
        var data = this.FormDataToJSON(formElement);
        const iduser = localStorage.getItem("user_id");
        const token = localStorage.getItem("token");

        const httpReqHeaders = {
            'Authorization': token,
            'Content-Type': 'application/json'
        };
        const axiosConfigObject = {headers: httpReqHeaders};

        const API_URL = apiUrl_Goone+'/api/Users/'+iduser;
        console.log(API_URL);

        axios.patch(API_URL,data, axiosConfigObject)
            .then((res)=>{
                this.setState({visible: true});
                console.log(res);
            })
            .catch((err)=>{
                console.error(err);
            });

    }

    handleClickPassword(){

        var oldpass = this.state.oldpassword;
        var newpass = this.state.newpassword;

        if(oldpass !== "" && newpass !== ""){
            const API_URL = apiUrl_Goone+'/api/Users/change-password/';
            const token = localStorage.getItem("token");
            const httpReqHeaders = {
                'Authorization': token,
                'Content-Type': 'application/json'
            };

            const axiosConfigObject = {headers: httpReqHeaders};
            let data = {
                oldPassword: oldpass,
                newPassword: newpass
            };

            axios.post(API_URL,data, axiosConfigObject)
                .then((res)=>{
                    this.setState({visible_a: true});
                    console.log(res);
                })
                .catch((err)=>{
                    console.error(err);
                });
        }else{

        }
    }


    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        {/*<BreadcrumbContainer
                            heading={<IntlMessages id="Edit Account" />}
                            match={this.props.match}
                        />*/}
                        <h1>
                            <IntlMessages id="Account" />
                        </h1>
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>

                <Row className="mb-4">
                    <Colxx xxs="12">
                        <Card>
                            <CardBody>
                                <div className="contedrop_photo">
                                <Dropzone onDrop={this.handleOnDrop} accept={acceptedFileTypes}>
                                    {({getRootProps, getInputProps}) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()}/>
                                                <p>Drag and drop  or click to upload your photo</p>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                                </div>
                            </CardBody>
                        </Card>

                        <Card>
                            <CardBody>
                                <CardTitle>
                                    <IntlMessages id="Edit Personal Data" />
                                </CardTitle>
                                <Form name="frm_user" id="frm_user">
                                <FormGroup row>

                                    <Colxx sm={6}>
                                        <FormGroup>
                                            <Label for="firstname">
                                                <IntlMessages id="First Name" />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="firstname"
                                                id="firstname"
                                                placeholder=""
                                                defaultValue={this.state.items.firstname}
                                                onChange = {(e)=>{this.state.items.firstname = e.target.value}}
                                            />
                                        </FormGroup>
                                    </Colxx>

                                    <Colxx sm={6}>
                                        <FormGroup>
                                            <Label for="lastname">
                                                <IntlMessages id="Lastname" />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="lastname"
                                                id="lastname"
                                                placeholder=""
                                                defaultValue={this.state.items.lastname}
                                                onChange = {(e)=>{this.state.items.lastname = e.target.value}}
                                            />
                                        </FormGroup>
                                    </Colxx>

                                    <Colxx sm={6}>
                                        <FormGroup>
                                            <Label for="email">
                                                <IntlMessages id="Email" />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="email"
                                                id="email"
                                                placeholder=""
                                                defaultValue={this.state.items.email}
                                                onChange = {(e)=>{this.state.items.email = e.target.value}}
                                            />
                                        </FormGroup>
                                    </Colxx>

                                    <Colxx sm={6}>
                                        <FormGroup>
                                            <Label for="phone">
                                                <IntlMessages id="Phone" />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="phone"
                                                id="phone"
                                                placeholder=""
                                                defaultValue={this.state.items.phone}
                                                onChange = {(e)=>{this.state.items.phone = e.target.value}}
                                            />
                                        </FormGroup>
                                    </Colxx>

                                    <Colxx sm={6}>
                                        <FormGroup>
                                            <Label for="companyname">
                                                <IntlMessages id="Company Name" />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="companyname"
                                                id="companyname"
                                                placeholder=""
                                                defaultValue={this.state.items.companyname}
                                                onChange = {(e)=>{this.state.items.companyname = e.target.value}}
                                            />
                                        </FormGroup>
                                    </Colxx>

                                    <Colxx sm={6}>
                                        <FormGroup>
                                            <Label for="website">
                                                <IntlMessages id="Website" />
                                            </Label>
                                            <Input
                                                type="text"
                                                name="website"
                                                id="website"
                                                placeholder=""
                                                defaultValue={this.state.items.website}
                                                onChange = {(e)=>{this.state.items.website = e.target.value}}
                                            />
                                        </FormGroup>
                                    </Colxx>

                                </FormGroup>


                                <Button color="primary" onClick={() => this.handleClick()}>
                                    <IntlMessages id="Save" />
                                </Button>
                                <br/>
                                <br/>
                                <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>Success</Alert>
                            </Form>
                                <Separator className="mb-5" />
                                <CardTitle>
                                    <IntlMessages id="Edit Authentication Password"/>
                                </CardTitle>
                                <Form name="frm_user_password" id="frm_user_password">
                                    <FormGroup row>

                                        <Colxx sm={6}>
                                            <FormGroup>
                                                <Label for="Old Password">
                                                    <IntlMessages id="Old Password" />
                                                </Label>
                                                <Input
                                                    type="password"
                                                    name="oldpassword"
                                                    id="oldpassword"
                                                    placeholder=""
                                                    defaultValue=""
                                                    onChange = {(e)=>{this.state.oldpassword = e.target.value}}
                                                />
                                            </FormGroup>
                                        </Colxx>

                                        <Colxx sm={6}>
                                            <FormGroup>
                                                <Label for="newpassword">
                                                    <IntlMessages id="New Password" />
                                                </Label>
                                                <Input
                                                    type="password"
                                                    name="newpassword"
                                                    id="newpassword"
                                                    placeholder=""
                                                    onChange = {(e)=>{this.state.newpassword = e.target.value}}
                                                />
                                            </FormGroup>
                                        </Colxx>

                                    </FormGroup>


                                    <Button color="primary" onClick={this.handleClickPassword}>
                                        <IntlMessages id="Save" />
                                    </Button>
                                    <br/>
                                    <br/>
                                    <Alert color="success" isOpen={this.state.visible_a} toggle={this.onDismiss_a}>Success</Alert>
                                </Form>
                            </CardBody>
                        </Card>
                    </Colxx>
                </Row>

                {/*<Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="forms.validation" />
                </CardTitle>
                <CardSubtitle>
                  <IntlMessages id="forms.default" />
                </CardSubtitle>

                <AvForm className="mb-5 row">
                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="avexampleName">
                        <IntlMessages id="forms.firstname" />
                      </Label>
                      <AvInput className="form-control" name="rank" id="avexampleName" required />
                      <AvFeedback>
                        <IntlMessages id="forms.firstname-message" />
                      </AvFeedback>
                    </AvGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="avexampleLastName">
                        <IntlMessages id="forms.lastname" />
                      </Label>

                      <AvInput name="testit" id="avexampleLastName" required />
                      <AvFeedback>
                        <IntlMessages id="forms.lastname-message" />
                      </AvFeedback>
                    </AvGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="avexampleCity">
                        <IntlMessages id="forms.city" />
                      </Label>
                      <AvInput name="rank" id="avexampleCity" required />
                      <AvFeedback>
                        <IntlMessages id="forms.city-message" />
                      </AvFeedback>
                    </AvGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="avexampleState">
                        <IntlMessages id="forms.state" />
                      </Label>
                      <AvInput name="rank" id="avexampleState" required />
                      <AvFeedback>
                        <IntlMessages id="forms.state-message" />
                      </AvFeedback>
                    </AvGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                      <Button outline color="primary">
                        <IntlMessages id="forms.submit" />
                      </Button>
                    </FormGroup>
                  </Colxx>
                </AvForm>

                <CardSubtitle>Tooltip</CardSubtitle>

                <AvForm className="av-tooltip mb-5 row">
                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="avexampleNameTooltip">
                        <IntlMessages id="forms.firstname" />
                      </Label>
                      <AvInput name="rank" id="avexampleNameTooltip" required />
                      <AvFeedback>
                        <IntlMessages id="forms.firstname-message" />
                      </AvFeedback>
                    </AvGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <AvGroup>
                      <Label
                        className="av-label"
                        for="avexampleLastNameTooltip"
                      >
                        <IntlMessages id="forms.lastname" />
                      </Label>
                      <AvInput
                        name="rank"
                        id="avexampleLastNameTooltip"
                        required
                      />
                      <AvFeedback>
                        <IntlMessages id="forms.lastname-message" />
                      </AvFeedback>
                    </AvGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="avexampleCityTooltip">
                        <IntlMessages id="forms.city" />
                      </Label>
                      <AvInput name="rank" id="avexampleCityTooltip" required />
                      <AvFeedback>
                        <IntlMessages id="forms.city-message" />
                      </AvFeedback>
                    </AvGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="avexampleState">
                        <IntlMessages id="forms.state" />
                      </Label>
                      <AvInput
                        name="rank"
                        id="avexampleStateTooltip"
                        required
                      />
                      <AvFeedback>
                        <IntlMessages id="forms.state-message" />
                      </AvFeedback>
                    </AvGroup>
                  </Colxx>
                  <Colxx sm={12}>
                    <FormGroup>
                      <Button outline color="primary">
                        <IntlMessages id="forms.submit" />
                      </Button>
                    </FormGroup>
                  </Colxx>
                </AvForm>
              </CardBody>
            </Card>
          </Colxx>
        </Row>*/}
            </Fragment>
        );
    }
}
export default  injectIntl(UserEdit)