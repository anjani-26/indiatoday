import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function ScreenFirst() {
    const [categoryData, setCategoryData] = useState([])
    const [categoryName, setCategoryName] = useState([])
    const [filterCategory, setFilterCategory] = useState([])


    const categoryApi = () => {
        axios.get('https://staging-api.astrotak.com/api/question/category/all')
            .then((res) => {
                setCategoryData(res.data.data)
            })
    }
    const selectCategory = (e) =>{
        categoryData.filter((elm)=>{
            console.log("elm",elm)
            if(elm.name.toLowerCase().includes(e.target.value.toLowerCase())){
                console.log("ff",elm)
                setFilterCategory([elm])
            }

         
        })

    }
    console.log("fddfgd56",  filterCategory)

    useEffect(() => {
        categoryApi()
    },[])
    return (
        <div>

            <div className="colr_money">
                <div className="add_money">
                    <h4>Wallet Balance : <i className="fa fa-inr" aria-hidden="true"></i> 0</h4>
                </div>
                <div className="btn_money">
                    <Button variants="primary" className="brn_check">Add Money</Button>
                </div>

            </div>
            <div className="container">

                <div className="ask_a_question">
                    <h4>Ask A Demo</h4>
                    <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available</p>
                </div>

                <div className="choose_category">
                    <h4>Choose Category</h4>
                    <Form.Select aria-label="Default select example" className="mb-3" onChange={selectCategory}>
                        {
                            categoryData.map((category, index) =>{
                                console.log("cate",category)
                                return(
                                   <option key={category.id} value={category.name}>{category.name}</option>
                                )
                            })
                            
                        }
                    </Form.Select>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={3} placeholder="Type a question here" />
                    </Form.Group>
                  <div className="flter_based_on_category">
                      <h5 className="mb-3">Ideas What to ask (Select Any)</h5>
                    <ul>
                        {
                            filterCategory.map((ideas)=>{
                                return(
                                    ideas.suggestions.length > 0 ? 
                                    ideas.suggestions.map((arr)=>{
                                      return(
                                        <li> <i class="fa fa-question-circle-o"  style={{color:'orange', marginRight:'5px'}}></i> {arr}</li>
                                      )
                                    }):<li style={{color:'red'}}> <i class="fa fa-database"  style={{color:'red', marginRight:'5px'}}></i> No Data Found</li>
                                )
                            })
                              
                        }
                      
                    </ul>
                  </div>
                </div>


            </div>
        </div>
    )
}