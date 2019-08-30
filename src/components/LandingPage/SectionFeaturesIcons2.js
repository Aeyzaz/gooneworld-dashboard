import React, { Fragment } from "react";
import { Row, Card, CardBody } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";

export default class SectionFeaturesIcons2 extends React.Component {
    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs={{ size: "12", offset: 0 }} lg={{ size: 8, offset: 2 }} className="text-center">
                        <h1><IntlMessages id="lp.icons.title" /></h1>
                        <p>
                            <IntlMessages id="lp.icons.detail" />
                        </p>
                    </Colxx>
                </Row>

                <Row>
                    <div className="row mt-5 feature-icon-container">
                        <Colxx xxs="12" md="6" lg="6" xl="3" className="mb-4">
                            <Card>
                                <CardBody className="text-center">
                                    <div>
                                        <i className="iconsmind-Mouse-3 large-icon"></i>
                                        <h5 className="mb-4 font-weight-semibold"><IntlMessages id="Investments Loans" /></h5>
                                    </div>
                                    <div>
                                        <p className="detail-text">
                                            <IntlMessages id="lp2.icons.detail-1" />
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Colxx>

                        <Colxx xxs="12" md="6" lg="6" xl="3" className="mb-4">
                            <Card>
                                <CardBody className="text-center">
                                    <div>
                                        <i className="iconsmind-Electric-Guitar large-icon"></i>
                                        <h5 className="mb-4 font-weight-semibold"><IntlMessages id="Owner Occupied" /></h5>
                                    </div>
                                    <div>
                                        <p className="detail-text">
                                            <IntlMessages id="lp2.icons.detail-2" />
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Colxx>

                        <Colxx xxs="12" md="6" lg="6" xl="3" className="mb-4">
                            <Card>
                                <CardBody className="text-center">
                                    <div>
                                        <i className="iconsmind-Keyboard large-icon"></i>
                                        <h5 className="mb-4 font-weight-semibold"><IntlMessages id="Non-Owner Occupied" /></h5>
                                    </div>
                                    <div>
                                        <p className="detail-text">
                                            <IntlMessages id="lp2.icons.detail-3" />
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Colxx>

                        <Colxx xxs="12" md="6" lg="6" xl="3" className="mb-4">
                            <Card>
                                <CardBody className="text-center">
                                    <div>
                                        <i className="iconsmind-Three-ArrowFork large-icon"></i>
                                        <h5 className="mb-4 font-weight-semibold"><IntlMessages id="Multi-Families" /></h5>
                                    </div>
                                    <div>
                                        <p className="detail-text">
                                            <IntlMessages id="lp2.icons.detail-4" />
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Colxx>

                        <Colxx xxs="12" md="6" lg="6" xl="3" className="mb-4">
                            <Card>
                                <CardBody className="text-center">
                                    <div>
                                        <i className="iconsmind-Deer large-icon"></i>
                                        <h5 className="mb-4 font-weight-semibold"><IntlMessages id="Condominiums" /></h5>
                                    </div>
                                    <div>
                                        <p className="detail-text">
                                            <IntlMessages id="lp2.icons.detail-5" />
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Colxx>

                        <Colxx xxs="12" md="6" lg="6" xl="3" className="mb-4">
                            <Card>
                                <CardBody className="text-center">
                                    <div>
                                        <i className="iconsmind-Palette large-icon"></i>
                                        <h5 className="mb-4 font-weight-semibold"><IntlMessages id="Bridge Loans" /></h5>
                                    </div>
                                    <div>
                                        <p className="detail-text">
                                            <IntlMessages id="lp2.icons.detail-6" />
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Colxx>

                        <Colxx xxs="12" md="6" lg="6" xl="3" className="mb-4">
                            <Card>
                                <CardBody className="text-center">
                                    <div>
                                        <i className="iconsmind-Air-Balloon large-icon"></i>
                                        <h5 className="mb-4 font-weight-semibold"><IntlMessages id="SBA Loans" /></h5>
                                    </div>
                                    <div>
                                        <p className="detail-text">
                                            <IntlMessages id="lp2.icons.detail-7" />
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Colxx>

                        {/*<Colxx xxs="12" md="6" lg="6" xl="3" className="mb-4">
                            <Card>
                                <CardBody className="text-center">
                                    <div>
                                        <i className="iconsmind-Pantone large-icon"></i>
                                        <h5 className="mb-4 font-weight-semibold"><IntlMessages id="lp2.icons.title-8" /></h5>
                                    </div>
                                    <div>
                                        <p className="detail-text">
                                            <IntlMessages id="lp2.icons.detail-8" />
                                        </p>
                                    </div>
                                </CardBody>
                            </Card>
                        </Colxx>*/}

                    </div>
                </Row>
            </Fragment>
        );
    }
}
