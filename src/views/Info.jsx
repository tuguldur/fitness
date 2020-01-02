import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  FormGroup,
  Input,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from "reactstrap";
// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
class info extends React.Component {
  constructor() {
    super();
    this.state = {
      member: "",
      status: "Хайх утгаа оруулна уу ?",
      value: ""
    };
  }
  change = e => {
    var value = e.target.value;
    this.setState({ value });
  };
  check = e => {
    e.preventDefault();
    var member = this.state.value;
    if (member) {
      this.setState({ member: "", status: "Уншиж байна..." });
      fetch("/get/code?nfc=" + member)
        .then(response => response.json())
        .then(value => {
          value && value.length
            ? this.setState({ member: value[0] })
            : this.setState({ member: "", status: "Хэрэглэгч олдсонгүй" });
        })
        .catch(err => this.setState({ status: "Алдаа : " + err }));
    } else {
      this.setState({ member: "", status: "Хайх утгаа оруулна уу ?" });
    }
  };
  render() {
    const { member, status } = this.state;
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={8} className="m-auto">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    Хэрэглэгчийн мэдээлэл шалгах хэсэг
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="8">
                      <FormGroup>
                        <form onSubmit={this.check}>
                          <label className="label">
                            Картын дугаар, утасны дугаар эсвэл картаа уншуулна
                            уу?
                          </label>
                          <Input
                            placeholder="Картын дугаар"
                            type="number"
                            onChange={this.change}
                            autoFocus={true}
                          />
                        </form>
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr />
                  {member ? (
                    <Row>
                      <Col md="12">
                        <h6>Хэрэглэгчийн дугаар: {member.alt_number}</h6>
                        <hr />
                      </Col>
                      <Col md="3" className="d-flex justify-content-center">
                        <img
                          alt="..."
                          className="avatar border-gray info-avatar"
                          src={require("assets/img/default-avatar.png")}
                        />
                      </Col>
                      <Col md="6">
                        <div className="mt-2">
                          <p>
                            <b>Овог Нэр</b> :
                            {member.lastname + " " + member.firstname}
                          </p>
                          <p>
                            <b>Утасны дугаар</b> : {member.phone}
                          </p>
                          <p>
                            <b>Бүртгэлийн огноо</b> : {member.created_at}
                          </p>
                        </div>
                      </Col>
                      <Col md="3">
                        <Button
                          color="info"
                          className="btn-round m-1"
                          onClick={() => alert(member.id)}
                          title="Энэхүү сунгалт нь шууд 1 сар сунгадаг учир илүү дэлгэрэнгүй сунгах бол цэснээс сунгалт хийх боломжтой"
                        >
                          Сунгалт
                        </Button>

                        <Button
                          color="secondary"
                          className="btn-round m-1"
                          onClick={() => alert(member.id)}
                        >
                          Чөлөөлөх
                        </Button>
                      </Col>
                      <Col md="12">
                        <hr className="mt-0" />
                        <h6>Идэвхтэй байгаа үйлчилгээнүүд</h6>
                        <hr />
                        <ListGroup>
                          {member.books && member.books.length ? (
                            member.books.map(book => {
                              return (
                                <ListGroupItem className="mb-1" key={book.id}>
                                  <b>Үйлчилгээний төрөл </b>{" "}
                                  {book.member_type.title}/
                                  {book.batch.description}
                                  <br />
                                  <small>
                                    дуусах хугацаа - {book.end_date} /
                                    {book.batch.name}
                                  </small>
                                  <a
                                    href={book.id}
                                    className="float-right"
                                    style={{
                                      fontSize: "12px",
                                      textTransform: "uppercase"
                                    }}
                                  >
                                    дэлгэрэнгүй
                                  </a>
                                </ListGroupItem>
                              );
                            })
                          ) : (
                            <span className="text-center p-1">
                              Үйлчилгээ идэвхжүүлээгүй байна.
                            </span>
                          )}
                        </ListGroup>
                      </Col>
                    </Row>
                  ) : (
                    <Row>
                      <Col className="m-3 text-center">
                        <span>{status}</span>
                      </Col>
                    </Row>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default info;
