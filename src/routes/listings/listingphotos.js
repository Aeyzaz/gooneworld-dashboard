import React, { Component, Fragment} from "react";
import { injectIntl} from 'react-intl';
import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";
//import IntlMessages from "Util/IntlMessages";
import axios from "axios";
import Dropzone from 'react-dropzone'
import request from 'superagent'
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
  CardImg,
  CardText,
  Badge
} from "reactstrap";
//import Select from "react-select";
//import CustomSelectInput from "Components/CustomSelectInput";
//import DatePicker from "react-datepicker";
import moment from "moment";
import TagsInput from "react-tagsinput";

/*import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback
} from "availity-reactstrap-validation";*/
import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "react-fine-uploader/gallery/gallery.css";

import { apiPath } from 'Constants/defaultValues'
const apiUrl_Goone = apiPath;

const acceptedFileTypes = 'image/jpg, image/jpeg';

class ListingPhotos extends Component {

  constructor(props) {
    super(props);

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
      items:[],
      photos:[]
    };


  };
  //this.handleDeletePhoto = this.handleDeletePhoto.bind(this);

  handleDeletePhoto = (etag)=>{
    this.deletePhoto(this.state.listingData.id,etag);
  };

  handleOnDrop = (files, rejectedFiles) =>{

    const idlisting = this.props.match.params.id;
    console.log(idlisting);
    
    const formData = new FormData();
    
    const file = files[0];
    formData.append('images', file);

    const API_URL = apiUrl_Goone+'/api/ManualListings/'+idlisting+'/uploadImage';
    const config = {
      headers: {'content-type': 'multipart/form-data'}
    }

    axios.post(API_URL, formData, config) 
    .then((response) => {
      //handle success
      console.log("upload", response);
      this.showPhotos(); // when upload this do shophotos, its ok? NO
    }).catch((error) => {
      console.log("error upload", error);
      //handle error
    });
  }

   async showPhotos(){

    // const idlisting = this.props.match.params.id;
    // const API_URL = 'http://104.248.211.159:3000/api/ManualListings/'+idlisting;

    // await axios.get(API_URL) 
    // .then((response) => {

    //   console.log("ok", response);

    //   this.state.photos = response.data.images; // here
    //   console.log(this.state.photos);
    // }).catch((error) => {
    //   console.log("error", error);
    // });

    // it is wrong, my code initial? YES BECAUSE API IS CALLED AFTER RENDER, REACT AND NODE ARE NON BLOCKING CALLS
    // i dont understand , YOU HAVE TO STUDY HOW BLOCKING AND NON BLOCKING CALLS WORK IN YOUR CODE BROWSER DOESNT WAIT FOR API CALL TO FINISH AND THEN MPOVE NEXT, IT KEEPS API WORKING PARALLEL AND MOVES TO NEXT LINE

 // no is necesary ASYNC, PROMISE IS NECESSARY, I USED ASYNC FOR AWAIT BUT NOW NOT USING THAT
 // THERE HAVE NEW THINGS FOR LEARN HERE, THANKS
 // 

    let images = [];
    let photos = await new Promise((resolve,reject)=>{
        const idlisting = this.props.match.params.id;
        const API_URL = apiUrl_Goone+'/api/ManualListings/'+idlisting;
        axios.get(API_URL)
        .then((response)=>{
          console.log('photos',response);
          console.log('photos',response.data.images);

          if( typeof response.data.images !== 'undefined'){
            this.setState({
              listingData: response.data
            }); // this is why we saw listings removed , because it calls render function again. ok i understand
            resolve(response);
            console.log("con images");
          }else{
            /*this.setState({
              listingData: response.data
            }); // this is why we saw listings removed , because it calls render function again. ok i understand
            */
            console.log("sin images");
          }
        })
        .catch((error)=>{
          console.log("error ",error);
          delete this.state.listingData;
          console.log(error,error);
        });
    });
  }

  componentDidMount(){
      this.showPhotos();
  }
  
  deletePhoto(listingId,etag){

    let DEL_URL = apiUrl_Goone+'/api/ManualListings/removeImageById?';
    axios.get(DEL_URL,{
      params:{
        listingId: listingId,
        etag: etag
      }
    }).then((res)=>{
      console.log('photo deleted');
      //this.showPhotos(); // not a good approach, we have to optimize it. // WHY where is _. code that i used last time ? no some days before lodash, wait
      _.remove(this.state.listingData.images,{
        etag : etag
      }); // we might need to call setState, we have to remove immediately // I THINK THAT ITS OK, yes it is,  BUT I DONT UNDERSTAND WHAT HAPPENED
      // i am removing images from state rather than calling server again. this is optimized way. // BUT IN SERVER WHAT HAPPENED nothing is happening on server here only here, we are sending req to delete the etag and then remoing that etag from our list locally, OK UNDERSTAND
      // THE LODASH HELP YOU BETTER ? Lodash help to work on Arrays better, WHAT IS _. lodash, you can use anything other than _. not necessary
      // BECASUSE this.state.listingdate.images.remove().... dont work, really? or there have another way? for now this is the only way you can search other ways on google
      // 
      console.log('new image state',this.state.listingData.images);

      this.setState({
        photoDeleted: etag
      })

    }).catch((error)=>{
      console.log('Image dont exists');
    })
  }
  
  render() {

    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            {/*<BreadcrumbContainer
              heading={<IntlMessages id="Add Listing Photos" />}
              match={this.props.match}
            />*/}
            <h1>
              Add Listing Photos
            </h1>
            <Separator className="mb-5" />
          </Colxx>
        </Row>

        <Row className="mb-4">
          <Colxx xxs="12" lg="12">
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
          </Colxx>
        </Row>

        <Row className="mb-12">
                {this.state.hasOwnProperty('listingData') ? this.state.listingData.images.map((image,index)=>{
                  //you can use cards.js its good for displaying images too, ok just that i see, Already in a card, ok i see
                  return <Colxx xxs="12" xs="6" lg="4" key={index}>
                    <Card className="mb-4" style={{ backgroundImage: `url(${image.link})`, height: '230px', backgroundSize:'cover'}}>
                      {/*<CardBody>
                        <CardSubtitle className="mb-4">{this.state.listingData.address}</CardSubtitle>
                        <CardText className="text-muted text-small mb-0 font-weight-light">09.04.2018</CardText>
                      </CardBody>*/}
                      <div className="position-relative">
                        {/*<CardImg top src={image.link} alt="Card image cap" />*/}
                        {/*<Badge color="primary" pill className="position-absolute badge-top-left">NEW</Badge>
                        <Badge color="secondary" pill className="position-absolute badge-top-left-2">TRENDING</Badge>*/}
                      </div>
                    </Card>
                    <div className="text-center">
                    <Button color="danger" className="default mb-2" size="sm" onClick={this.handleDeletePhoto.bind(this,image.etag)}>
                        Delete
                    </Button>
                    </div>
                  </Colxx>
                }) : <span>No Images</span>}    
        </Row>

      </Fragment>
    );
  
  }
}
export default ListingPhotos