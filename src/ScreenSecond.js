import axios from "axios"
import { useEffect, useState } from "react"
import { Tab, Nav, Col, Row, Button, Table, Modal, Form } from "react-bootstrap"
import Select from 'react-select';
export default function ScreenSecond() {
    const [show, setShow] = useState(false);
    const [getRelative, setRelative] = useState([])
    const [postApiData, setPostApiData] = useState({
        birthDetails: {
            dobDay: "",
            dobMonth: "",
            dobYear: "",
            meridiem: "",
            tobHour: "",
            tobMin: ""
        },
        birthPlace: {
            placeId: "",
            placeName: ""
        },
        firstName: "",
        gender: "",
        lastName: "",
        relationId: "",


    })
    let options = [];
    const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4ODA5NzY1MTkxIiwiUm9sZXMiOltdLCJleHAiOjE2NzY0NjE0NzEsImlhdCI6MTY0NDkyNTQ3MX0.EVAhZLNeuKd7e7BstsGW5lYEtggbSfLD_aKqGFLpidgL7UHZTBues0MUQR8sqMD1267V4Y_VheBHpxwKWKA3lQ'
    const getRelativeApi = () => {
        axios.get('https://staging-api.astrotak.com/api/relative/all', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then((res) => {
                console.log("res", res.data.data)
                setRelative(res.data.data.allRelatives)
            })
    }
    // Post Api Start Here
    const createRelativeApi = () => {
        const data = postApiData

        axios.post('https://staging-api.astrotak.com/api/relative', data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((res) => {
            console.log("restyt", res)
            setRelative(res.data.data.allRelatives)
        })
    }

    const handleClose = () => {
        console.log("post", postApiData)
        createRelativeApi()
        setPostApiData(postApiData)
        setShow(false);
    }

    const searchApi = (e) => {
        let searchInput = e;
        axios.get(`https://staging-api.astrotak.com/api/location/place?inputPlace= ${searchInput}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then((res) => {
                console.log("data", res.data.data)
                res.data.data.map((ser) => {
                    options.push({
                        value: ser.placeId,
                        label: ser.placeName,
                    });
                })
            })

    }

    const editRow = (uuid) =>{
        const data = getRelative
        console.log("data",data)
        axios.post(`https://staging-api.astrotak.com/api/relative/update/${uuid}`, data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((res)=>{
            console.log("ttt",res)
        })
    }
    const deleteRow = (indexData) => {
        axios.post(`https://staging-api.astrotak.com/api/relative/delete/${indexData}`, {}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then((res)=>{
            console.log("ttt",res)
            getRelative.splice(res, 1)
            setRelative([...getRelative])
        })
    }
    const handleShow = () => setShow(true);
    useEffect(() => {
        getRelativeApi()
    }, [])

    return (
        <div>
            <div className="container py-5">
                <Tab.Container id="left-tabs-example" defaultActiveKey="second">
                    <Row>
                        <Col sm={12}>
                            <Nav variant="pills" className="flex-row justify-content-center">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Basic Profile</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Friends & Family Profile</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={12}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <div className="wallet">
                                        <p>Basic</p>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <div className="wallet">
                                        <h6>Wallet Balance : <i class="fa fa-inr" aria-hidden="true"></i> 0 <Button variants="primary" className="brn_check">Add Money</Button></h6>
                                    </div>

                                    <Table striped bordered hover size="sm" className="mt-3">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>DOB</th>
                                                <th>TOB</th>
                                                <th>Relation</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                getRelative.map((rel, i) => {
                                                    console.log("u",rel)
                                                    return (
                                                        <tr key={i}>
                                                            <td>{rel.firstName}</td>
                                                            <td>{rel.birthDetails.dobDay + "-" + rel.birthDetails.dobMonth + "-" + rel.birthDetails.dobYear}</td>
                                                            <td>{rel.birthDetails.tobHour + ":" + rel.birthDetails.tobMin}</td>
                                                            <td>{rel.relation}</td>
                                                            <td><i className="fa fa-pencil" onClick={()=> editRow(rel.uuid)}></i> <i className="fa fa-trash" onClick={()=>deleteRow(rel.uuid)}></i></td>
                                                        </tr>
                                                    )
                                                })

                                            }

                                        </tbody>
                                    </Table>

                                    <div className="btn_center">
                                        <Button variant="warning" style={{ color: "#fff" }} onClick={handleShow}> <i className="fa fa-plus"></i> Add New Profile</Button>
                                    </div>

                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add New Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="add_user_profile">
                        <Form>
                            <Row>
                                <Col sm={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" onChange={(e) => setPostApiData({ ...postApiData, firstName: e.target.value })} />
                                    </Form.Group>
                                </Col>
                                <Col sm={6}>
                                    <Row>
                                        <Col sm={12}>
                                            <Form.Label>Date of Birth</Form.Label>
                                        </Col>
                                        <Col sm={4}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control type="number" placeholder="DD" onChange={(e) => setPostApiData({ ...postApiData, birthDetails: { ...postApiData.birthDetails, dobDay: e.target.value } })} />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={4}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control type="number" placeholder="MM" onChange={(e) => setPostApiData({ ...postApiData, birthDetails: { ...postApiData.birthDetails, dobMonth: e.target.value } })} />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={4}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control type="number" placeholder="YYYY" onChange={(e) => setPostApiData({ ...postApiData, birthDetails: { ...postApiData.birthDetails, dobYear: e.target.value } })} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={6}>
                                    <Row>
                                        <Col sm={12}>
                                            <Form.Label>Time of Birth</Form.Label>
                                        </Col>
                                        <Col sm={3}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control type="number" placeholder="HH" onChange={(e) => setPostApiData({ ...postApiData, birthDetails: { ...postApiData.birthDetails, tobHour: e.target.value } })} />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={4}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Control type="number" placeholder="MM" onChange={(e) => setPostApiData({ ...postApiData, birthDetails: { ...postApiData.birthDetails, tobMin: e.target.value } })} />
                                            </Form.Group>
                                        </Col>
                                        <Col sm={5} style={{ display: 'flex' }}>
                                            <div className="input-container">
                                                <input type="radio" name="title" value="AM" onChange={(e) => setPostApiData({ ...postApiData, birthDetails: { ...postApiData.birthDetails, meridiem: e.target.value } })} />
                                                <label className="am_time">AM</label>
                                            </div>
                                            <div className="input-container">
                                                <input type="radio" name="title" value="PM" onChange={(e) => setPostApiData({ ...postApiData, birthDetails: { ...postApiData.birthDetails, meridiem: e.target.value } })} />
                                                <label className="am_time">PM</label>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col sm={6}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Place Of Birth</Form.Label>
                                        <Select
                                            value={postApiData? postApiData.placeName : postApiData}
                                            onInputChange={(e)=> searchApi(e)}
                                            options={options}
                                            onChange={(e)=> setPostApiData({ ...postApiData, birthPlace: { ...postApiData.birthPlace, placeName: e.label } })}
                                        />
                                        {/* <Form.Control type="search" onChange={searchApi} /> */}
                                    </Form.Group>
                                </Col>
                                <Col sm={6}>
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={(e) => setPostApiData({ ...postApiData, gender: e.target.value })}>
                                        <option value="-1"></option>
                                        <option value="MALE">MALE</option>
                                        <option value="FEMALE">FEMALE</option>

                                    </Form.Select>
                                </Col>

                                <Col sm={6}>
                                    <Form.Label>Relation</Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={(e) => setPostApiData({ ...postApiData, relationId: e.target.value })}>
                                        <option value="-1"></option>
                                        {
                                            getRelative.map((rel)=>{
                                                return(
                                                  <option value={rel.relationId}>{rel.relation}</option>
                                                )
                                                 
                                            })
                                        }
                                        
                                    </Form.Select>
                                </Col>
                            </Row>

                            <Button variant="warning" onClick={handleClose} style={{ color: "#fff", marginTop: "30px" }}>
                                Save Changes
                            </Button>
                        </Form>

                    </div>
                </Modal.Body>
            </Modal>

        </div>
    )
}