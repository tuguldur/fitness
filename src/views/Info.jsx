import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
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
class Info extends React.Component {
  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={8} className="m-auto">
              <Card>
                <CardHeader>
                  <h5 className="title">Хэрэглэгчийн мэдээлэл шалгах хэсэг</h5>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="8">
                      <FormGroup>
                        <label className="label">
                          Картын дугаар, утасны дугаар эсвэл картаа уншуулна уу?
                        </label>
                        <Input
                          placeholder="Картын дугаар"
                          type="text"
                          defaultValue="XXXXXXXX"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col md="12">
                      <h6>Хэрэглэгчийн дугаар: 0987654321</h6>
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
                          <b>Овог Нэр</b> : Mandakh Gantugs
                        </p>
                        <p>
                          <b>Утасны дугаар</b> : 89111046
                        </p>
                        <p>
                          <b>Бүртгэлийн огноо</b> : 2019-10-15 07:24:37
                        </p>
                      </div>
                    </Col>
                    <Col md="3">
                      <Button
                        color="info"
                        className="btn-round"
                        title="Энэхүү сунгалт нь шууд 1 сар сунгадаг учир илүү дэлгэрэнгүй сунгах бол цэснээс сунгалт хийх боломжтой"
                      >
                        <i className="now-ui-icons ui-1_simple-add"></i>
                        Сунгалт
                      </Button>
                      <Button color="secondary" className="btn-round">
                        <i className="now-ui-icons ui-1_simple-remove"></i>
                        Чөлөөлөх
                      </Button>
                    </Col>
                    <Col md="12">
                      <hr className="mt-0" />
                      <h6>Идэвхтэй байгаа үйлчилгээнүүд</h6>
                      <hr />
                      <ListGroup>
                        <ListGroupItem>
                          <b>Үйлчилгээний төрөл </b> example/ttt
                          <br />
                          <small> дуусах хугацаа - 2020-01-21 / Жишээ</small>
                          <a
                            href="#"
                            className="float-right"
                            style={{
                              fontSize: "12px",
                              textTransform: "uppercase"
                            }}
                          >
                            дэлгэрэнгүй
                          </a>
                        </ListGroupItem>
                      </ListGroup>
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

export default Info;
