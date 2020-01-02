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
class type extends React.Component {
  constructor() {
    super();
    this.state = {
      type: false,
      edit_type: false,
      status: { msg: "Түр хүлээнэ үү.....", error: false },
      modal: false
    };
  }
  fetch_type = () => {
    this.setState({ status: { msg: "Түр хүлээнэ үү.....", error: false } });
    fetch("/api/get/type")
      .then(res => res.json())
      .then(type => this.setState({ type }))
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
    this.fetch_type();
  }
  toggle = type => {
    this.setState({
      modal: !this.state.modal,
      edit_type: type.id !== undefined ? type : false
    });
  };
  change = event => {
    let { name, value } = event.target;
    console.log(name, value);
    this.setState(state => ({
      edit_type: { ...state.edit_type, [name]: value }
    }));
  };
  render() {
    const { type, status, edit_type } = this.state;
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={8} className="m-auto">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Төрөл</CardTitle>
                </CardHeader>
                <CardBody>
                  {type !== false ? (
                    <Table responsive className="table-hover">
                      <thead className="text-primary">
                        <tr>
                          <th>№</th>
                          <th>Нэр</th>
                          <th>Тайлбар</th>
                          <th>Үүсгэсэн</th>
                        </tr>
                      </thead>
                      <tbody>
                        {type.map(type => {
                          const { id, name, description, created_at } = type;
                          return (
                            <tr key={id} onClick={() => this.toggle(type)}>
                              <td>{id}</td>
                              <td>{name}</td>
                              <td>{description || "Тайлбаргүй"}</td>
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
                <Col md="12">
                  <FormGroup>
                    <label>Нэр</label>
                    <Input
                      defaultValue={edit_type.name}
                      placeholder="Нэр"
                      name="name"
                      autoComplete="off"
                      required
                      onChange={this.change}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>Тайлбар</label>
                    <Input
                      defaultValue={edit_type.description}
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
export default type;
