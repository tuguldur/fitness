import React from "react";

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
class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      member: false,
      edit_member: false,
      status: { msg: "Түр хүлээнэ үү.....", error: false },
      modal: false
    };
  }
  fetch_member = () => {
    this.setState({ status: { msg: "Түр хүлээнэ үү.....", error: false } });
    fetch("/get/member")
      .then(result => result.json())
      .then(member => this.setState({ member }))
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
    this.fetch_member();
  }
  toggle = member => {
    this.setState({
      modal: !this.state.modal,
      edit_member: member.id !== undefined ? member : false
    });
  };
  change = event => {
    let { name, value } = event.target;
    console.log(name, value);
    this.setState(state => ({
      edit_member: { ...state.edit_member, [name]: value }
    }));
  };
  render() {
    const { member, status, edit_member } = this.state;
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={8} className="m-auto">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    Бүртгэлтэй хэрэглэгчийн мэдээлэлүүд
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  {member !== false ? (
                    <Table responsive className="table-hover">
                      <thead className="text-primary">
                        <tr>
                          <th>№</th>
                          <th> КД </th>
                          <th>Овог нэр</th>
                          <th>Утасны дугаар</th>
                          <th>Гэрийн хаяг</th>
                          <th>Хүйс</th>
                        </tr>
                      </thead>
                      <tbody>
                        {member.data.map((member, index) => {
                          const {
                            id,
                            address,
                            firstname,
                            lastname,
                            phone,
                            gender,
                            alt_number
                          } = member;
                          return (
                            <tr key={id} onClick={() => this.toggle(member)}>
                              <td>{id}</td>
                              <td>{alt_number}</td>
                              <td>{`${lastname} - ${firstname}`}</td>
                              <td>{phone}</td>
                              <td>{address}</td>
                              <td>{gender === 1 ? "Эр" : "Эм"}</td>
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
            <h6>ХЭРЭГЛЭГЧ ЗАСАХ</h6>
            <hr />
            <Form>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>Картны дугаар</label>
                    <Input
                      defaultValue={edit_member.alt_number}
                      placeholder="Картны дугаар"
                      name="alt_number"
                      autoComplete="off"
                      required
                      onChange={this.change}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label>Овог</label>
                    <Input
                      defaultValue={edit_member.lastname}
                      placeholder="Овог"
                      name="lastname"
                      autoComplete="off"
                      required
                      onChange={event => this.change(event)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label>Нэр</label>
                    <Input
                      defaultValue={edit_member.firstname}
                      placeholder="Нэр"
                      name="firstname"
                      autoComplete="off"
                      required
                      onChange={event => this.change(event)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <label>Утасны дугаар</label>
                    <Input
                      defaultValue={edit_member.phone}
                      placeholder="Утасны дугаар"
                      name="phone"
                      autoComplete="off"
                      required
                      onChange={event => this.change(event)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Гэрийн хаяг</label>
                    <Input
                      defaultValue={edit_member.address}
                      placeholder="гэрийн хаяг"
                      name="address"
                      autoComplete="off"
                      required
                      onChange={event => this.change(event)}
                    />
                  </FormGroup>
                  <FormGroup className="d-flex">
                    <label style={{ margin: 0, lineHeight: "38px" }}>
                      Хүйс:
                    </label>
                    <select
                      placeholder="Картны дугаар"
                      className="form-control ml-2"
                      style={{ width: 85 }}
                      defaultValue={edit_member.gender}
                      name="gender"
                      autoComplete="off"
                      required
                      onChange={event => this.change(event)}
                    >
                      <option value="1">Эр</option>
                      <option value="2">Эм</option>
                    </select>
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
export default Users;
