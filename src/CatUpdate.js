import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

const CatUpdate = (props) => {

    const [editCatName, setEditCatName] = useState(props.catToUpdate.catName);
    const [editCatAge, setEditCatAge] = useState(props.catToUpdate.catAge);
    const [editCatColor, setEditCatColor] = useState(props.catToUpdate.catColor);
    const [editCatMedicine, setEditCatMedicine] = useState(props.catToUpdate.catMedicine);
    const [editCatOtherInfo, setEditCatOtherInfo] = useState(props.catToUpdate.catOtherInfo);
    const catEdit = (e, cat) => {
      e.preventDefault();
        fetch(`https://testreactserver.herokuapp.com/cat/${props.catToUpdate.catName}`, {
          method: 'PUT',
          body: JSON.stringify({
            catName: editCatName, 
            catAge: editCatAge,
            catColor: editCatColor,
            catMedicine: editCatMedicine,
            catOtherInfo: editCatOtherInfo
            }),
          headers: new Headers({
              'Content-Type': 'application/json',
          })
      }) .then((res) => {
          props.fetchCats();
          props.updateOff();
      })
    }
  

return(
    <Modal isOpen={true}>
         <ModalHeader>Update Your Bet</ModalHeader>
      <ModalBody>
        <Form onSubmit={catEdit}>
          <FormGroup>
            <Label htmlFor="catName">Edit Cat's Name</Label>
            <Input name="catName" value={editCatName} onChange={(e) => setEditCatName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="catAge">Edit Cat's Age</Label>
            <Input name="catAge" value={editCatAge} onChange={(e) => setEditCatAge(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="catColor">Edit Cat's Color</Label>
            <Input name="catColor" value={editCatColor} onChange={(e) => setEditCatColor(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="catMedicine">Edit Cat's Medicine</Label>
            <Input name="catMedicine" value={editCatMedicine} onChange={(e) => setEditCatMedicine(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="catOtherInfo">Edit Cat's Other Info</Label>
            <Input name="catOtherInfo" value={editCatOtherInfo} onChange={(e) => setEditCatOtherInfo(e.target.value)} />
          </FormGroup>
          <button type="submit">Update Cat's Information</button>
        </Form>
      </ModalBody>
    </Modal>
)
}

export default CatUpdate 