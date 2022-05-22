import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import "./Accounts.css";
function Accounts() {
  // var sno = uuidv4 ();
  // console.log(sno,"sno")
  const [show, setShow] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [formvalues, setFormValues] = useState({
    sno: uuidv4(),
    title: "",
    selectedLanding: "",
    amount: 0,
    onSubmit: true,
  });

  const [upadetedArray, setUpdatedArray] = useState([]);

  const [onSubmit, setOnsubmit] = useState(false);

  //pop-up modal close
  const handleClose = () => {
    setFormValues({ sno: uuidv4(), title: "", selectedLanding: "", amount: 0 });
    // alert("Modal close")
    setShow(false);
  };

  //popUp modal Show
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formvalues, [name]: value });
  };
  const handleSubmit = () => {
    if ((formvalues.selectedLanding === "")) {
      alert("Please Select Landing in properly");
      console.log('ndad',formvalues.amount)
    } else if ((formvalues.selectedLanding === "income")) {
      setOnsubmit(true);
      setIncome(income + Number(formvalues.amount));
      setBalance(balance + Number(formvalues.amount));
      upadetedArray.push(formvalues);
      setUpdatedArray([...upadetedArray]);
      setFormValues({
        sno: uuidv4(),
        title: "",
        selectedLanding: "",
        amount: 0,
      });
      setShow(false);
    } else {
      setOnsubmit(true);
      setExpense(expense + Number(formvalues.amount));
      setBalance(balance - Number(formvalues.amount));
      upadetedArray.push(formvalues);
      setUpdatedArray([...upadetedArray]);
      setFormValues({
        sno: uuidv4(),
        title: "",
        selectedLanding: "",
        amount: 0,
      });
      setShow(false);
    }
  };

  const handleDelete =(sno)=>{
    console.log('Click',sno)
    const deleted = upadetedArray.filter(upadetedArray=>upadetedArray.sno===formvalues.sno)
    setUpdatedArray(deleted)
  }

  const handleEdit=(index)=>{
    console.log('edit',index)
    const edited = prompt('Title',upadetedArray[index].title)
    let updatedEdit = [...upadetedArray]
    updatedEdit[index].title =edited
    console.log(edited,'sasas')
    setFormValues(edited) 
   
    // const amountEdit = prompt('Amount edit',upadetedArray[index].amount)
    // let updateAmount = [...upadetedArray]
    // updateAmount[index].amount=amountEdit
    // console.log('Amount edited',amountEdit)
  }

  return (
    <div className="container-lg">
      <div className="row">
        <div className="col-12 text-center py-5 bal">Balance : {balance}</div>
      </div>
      <div className="container text-center">
        <div className="d-flex justify-content-around">
          <div className=" tot">Income : {income}</div>
          <div className="exp">Expense : {expense}</div>
        </div>
      </div>

      <div className="row">
        <div className="text-center py-5">
          <button
            className="btn btn-outline-secondary "
            onClick={handleShow}
            size="sm"
          >
            Add
          </button>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>EXPENSE TRACKER</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mt-5 d-flex justify-content-evenly">
                Title:{" "}
                <input
                  type="text"
                  className="textboxs"
                  name="title"
                  onChange={handleChange}
                ></input>
              </div>
              <div>
                <div className="mt-5 d-flex justify-content-evenly">
                  <div>Landing:{"  "}</div>
                  <div>
                    <select
                      className=" textboxs"
                      name="selectedLanding"
                      onChange={handleChange}
                    >
                      <option value="Choose">Choose</option>
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                    </select>{" "}
                  </div>
                </div>
              </div>
              <div className="mt-5 d-flex justify-content-evenly">
                <label>Amount: </label>
                <input
                  type="number"
                  className="textboxs"
                  onChange={handleChange}
                  value={formvalues.amount}
                  name="amount"
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="btn btn-success" onClick={handleSubmit}>
                Add Amount
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <div>
          <div>
            <div className="row outp">
              <div className="col-sm-3 col-2">S.NO</div> {" "}
              <div className="col-sm-2 col-2">Title</div>
              <div className="col-sm-2 col-2 me-3">Landing</div>
              <div className="col-sm-2 col-2 me-3"> Amount</div>
              <div className="col-sm-2 col-2"> Options</div>
            </div>
            {upadetedArray.map((upadetedArray,index) => (
              <div >
              <div className="row outp1">
                <div className="col-sm-4 col-2">{upadetedArray.sno}</div>
                <div className="col-sm-2 col-2 ">{upadetedArray.title}</div>
                <div className="col-sm-2 col-2">{upadetedArray.selectedLanding}</div>
                <div className="col-sm-2 col-2">{upadetedArray.amount}</div>
                <div className="col-sm-2 col-2">
                  <div className="row"><div className="col-sm-6 col-12" ><button className="btn-outline-info button"  onClick={()=>handleEdit(index)}>Edit</button></div> <div className="col-sm-6 col-12"><button onClick={()=>handleDelete(upadetedArray.sno)} className='button btn-outline-danger'>Remove</button></div></div></div>
              </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accounts;
