import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  FormGroup,
  Label,
  Button,
  Form,
  Input
} from "reactstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";
import { Colxx, Separator } from "Components/CustomBootstrap";
import { NavLink } from "react-router-dom";
import ReactSiemaCarousel from "Components/ReactSiema/ReactSiemaCarousel";
import PerfectScrollbar from "react-perfect-scrollbar";
import ReactTable from "react-table";
import DataTablePagination from "Components/DataTables/pagination";
import CircularProgressbar from "react-circular-progressbar";
import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";

import { LineShadow } from "Components/Charts";
import commentsData from "Data/comments.json";
import productsData from "Data/products.json";
import cakeData from "Data/dashboard.cakes.json";


import {
  visitChartConfig,
  conversionChartConfig,
} from "Constants/chartConfig";

const comments = commentsData.data;
const dataTableData = productsData.data;
const cakes = cakeData.data;

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

const selectData = [
  { label: "Cake", value: "cake", key: 0 },
  { label: "Cupcake", value: "cupcake", key: 1 },
  { label: "Dessert", value: "dessert", key: 2 }
];


export default class UserAdd extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      selectedOptions: []
    };
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <BreadcrumbContainer
              heading={<IntlMessages id="menu.content" />}
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>

        <Row>
          <Colxx lg="12" xl="6">

            <Row>
              <Colxx md="12" className="mb-4">
                <Card>
                  <CardBody>
                    <CardTitle>
                      <IntlMessages id="ADD USER" />
                    </CardTitle>
                    <Form className="dashboard-quick-post">
                      <FormGroup row>
                        <Label sm={3}>
                          <IntlMessages id="Name" />
                        </Label>
                        <Colxx sm={9}>
                          <Input type="text" name="name" />
                        </Colxx>
                      </FormGroup>

                      <FormGroup row>
                        <Label sm={3}>
                          <IntlMessages id="Email" />
                        </Label>
                        <Colxx sm={9}>
                          <Input type="text" name="email" />
                        </Colxx>
                      </FormGroup>

                      <FormGroup row>
                        <Label sm={3}>
                          <IntlMessages id="Phone" />
                        </Label>
                        <Colxx sm={9}>
                          <Input type="text" name="phone" />
                        </Colxx>
                      </FormGroup>

                      <FormGroup row>
                        <Label sm={3}>
                          <IntlMessages id="Address" />
                        </Label>
                        <Colxx sm={9}>
                          <Input type="text" name="address" />
                        </Colxx>
                      </FormGroup>

                      
                      <Button className="float-right" color="primary">
                      <IntlMessages id="Save" />
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Colxx>
            </Row>
          </Colxx>

        </Row>






      </Fragment>
    );
  }
}
