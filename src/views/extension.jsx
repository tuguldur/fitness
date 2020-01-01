import React from "react";
// plugins
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// reactstrap components
import {
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  CardTitle,
  FormGroup,
  Input,
  Button
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
class extensions extends React.Component {
  constructor() {
    super();
    this.state = {
      type: false,
      service: false,
      startDate: new Date(),
      endDate: "",
      put_phone: "",
      put_type: "",
      put_service: ""
    };
  }
  componentDidMount() {
    this.fetch_selection();
  }
  fetch_selection = () => {
    fetch("/api/get/type")
      .then(res => res.json())
      .then(type => this.setState({ type }))
      .catch(err => console.log(err));
    fetch("/api/get/service")
      .then(res => res.json())
      .then(service => this.setState({ service }))
      .catch(err => console.log(err));
  };
  check = e => {
    e.preventDefault();
  };
  change = e => {
    let name = "put_" + e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  };
  render() {
    const { type, service, startDate, endDate } = this.state;
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={6} className="m-auto">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Хэрэглэгчийн сунгалт хийх</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={12}>
                      <FormGroup>
                        <label className="label">Утасны дугаар</label>
                        <Input
                          placeholder="Утасны дугаар"
                          type="number"
                          name="phone"
                          onChange={this.change}
                          autoFocus={true}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={12}>
                      <FormGroup>
                        <label className="label">Үйлчилгээ сонгох</label>
                        <select
                          placeholder="Үйлчилгээ сонгох"
                          className="form-control"
                          defaultValue="1"
                          name="service"
                          onChange={this.change}
                          autoComplete="off"
                          required
                        >
                          {service && service.length ? (
                            service.map(service => {
                              return (
                                <option value={service.id} key={service.id}>
                                  {service.title}
                                </option>
                              );
                            })
                          ) : (
                            <option>loading...</option>
                          )}
                        </select>
                      </FormGroup>
                    </Col>
                    <Col md={12}>
                      <FormGroup>
                        <label className="label">Төрөл сонгох</label>
                        <select
                          placeholder="Төрөл сонгох"
                          className="form-control"
                          defaultValue="1"
                          name="type"
                          onChange={this.change}
                          autoComplete="off"
                          required
                        >
                          {type && type.length ? (
                            type.map(type => {
                              return (
                                <option value={type.id} key={type.id}>
                                  {type.name}
                                </option>
                              );
                            })
                          ) : (
                            <option>loading...</option>
                          )}
                        </select>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label className="label">Эхлэх огноо</label>
                        <br />
                        <DatePicker
                          className="form-control"
                          dateFormat="yyyy/MM/dd"
                          selected={startDate}
                          onChange={startDate => this.setState({ startDate })}
                          minDate={new Date()}
                          placeholderText="Эхлэх"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <label className="label">Дуусах огноо</label>
                        <br />
                        <DatePicker
                          className="form-control d-block"
                          placeholderText="Дуусах"
                          selected={endDate}
                          dateFormat="yyyy/MM/dd"
                          onChange={endDate => this.setState({ endDate })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Button
                        color="info"
                        className="btn-round w-100"
                        onClick={() => {
                          const {
                            put_phone,
                            put_service,
                            put_type,
                            startDate,
                            endDate
                          } = this.state;
                          console.log(
                            put_phone,
                            put_service,
                            put_type,
                            startDate,
                            endDate
                          );
                        }}
                      >
                        Хадгалах
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default extensions;
