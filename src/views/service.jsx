import React from "react";
import moment from "moment";
import "moment/locale/mn";
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  // modal
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  // input, forms
  Form,
  FormGroup,
  Input
} from "reactstrap";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
class service extends React.Component {
  constructor() {
    super();
    this.state = {
      service: false,
      edit_service: false,
      status: { msg: "Түр хүлээнэ үү.....", error: false },
      modal: false
    };
  }
  fetch_service = () => {
    this.setState({ status: { msg: "Түр хүлээнэ үү.....", error: false } });
    fetch("/api/get/service")
      .then(res => res.json())
      .then(service => this.setState({ service }))
      .catch(err => {
        this.setState({
          status: {
            msg: "Алдаа гарлаа та дараа дахин оролдоно уу?",
            error: err.toString()
          }
        });
      });
  };
  componentDidMount() {
    // moment.locale("mn");
    this.fetch_service();
  }
  toggle = service => {
    this.setState({
      modal: !this.state.modal,
      edit_service: service.id !== undefined ? service : false
    });
  };
  change = event => {
    let { name, value } = event.target;
    console.log(name, value);
    this.setState(state => ({
      edit_service: { ...state.edit_service, [name]: value }
    }));
  };
  render() {
    const { service, status, edit_service } = this.state;
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={8} className="m-auto">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Үйлчилгээнүүд</CardTitle>
                </CardHeader>
                <CardBody>
                  {service !== false ? (
                    <Table responsive className="table-hover">
                      <thead className="text-primary">
                        <tr>
                          <th>№</th>
                          <th>Нэр</th>
                          <th>Тайлбар</th>
                          <th>Үнэ</th>
                          <th>Үүсгэсэн</th>
                        </tr>
                      </thead>
                      <tbody>
                        {service.map(service => {
                          const {
                            id,
                            title,
                            description,
                            price,
                            created_at
                          } = service;
                          return (
                            <tr key={id} onClick={() => this.toggle(service)}>
                              <td>{id}</td>
                              <td>{title}</td>
                              <td>{description || "Тайлбаргүй"}</td>
                              <td>
                                {new Intl.NumberFormat("en-IN", {
                                  maximumSignificantDigits: 3
                                }).format(price)}{" "}
                                ₮
                              </td>
                              <td>
                                {moment(created_at)
                                  .add(8, "hours")
                                  .fromNow()}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  ) : (
                    <div className="text-center d-block p-3">
                      <span>{status.msg}</span>
                      <br />
                      {status.error && (
                        <span className="text-warning">
                          Алдаа: {status.error}
                        </span>
                      )}
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} centered={true}>
          <ModalBody>
            <h6>Үйлчилгээ засах</h6>
            <hr />
            <Form>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label>Үйлчилгээний нэр</label>
                    <Input
                      defaultValue={edit_service.title}
                      autoFocus={true}
                      placeholder="Үйлчилгээний нэр"
                      name="title"
                      autoComplete="off"
                      required
                      onChange={event => this.change(event)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label>Үнэ</label>
                    <Input
                      defaultValue={edit_service.price}
                      placeholder="Үнэ"
                      name="price"
                      autoComplete="off"
                      required
                      type="number"
                      onChange={event => this.change(event)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>Тайлбар</label>
                    <Input
                      defaultValue={edit_service.description}
                      placeholder="Тайлбар"
                      name="description"
                      autoComplete="off"
                      required
                      onChange={this.change}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Устгах</Button>
            <Button color="secondary">Хадгалах</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default service;
