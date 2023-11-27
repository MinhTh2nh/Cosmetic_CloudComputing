import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { addDataProduct } from "../../actionCreators/AdminAction";

const AdminProductAdd = (props) => {
  const [imageLink, setImageLink] = useState("");

  const [dataAddInput, setDataAddInput] = useState({
    image: "",
    name: "",
    price: 0,
    description: "",
    quantity: 0,
    productType: "Eyes",
  });

  const handleAddInputChange = (event) => {
    setDataAddInput({
      ...dataAddInput,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSetImageLink = (event) => {
    // Assuming you are now storing the image URL as a string
    setDataAddInput({
      ...dataAddInput,
      image: event.currentTarget.value,
    });
    setImageLink(event.currentTarget.value);
  };

  const closeAddModal = () => {
    props.unDisplayAddModal(false);
  };

  //  Form Edit Data = for image inputs, we use form data in Insomnia. So here we are.
  const FormAddData = new FormData();
  FormAddData.append("name", dataAddInput.name);
  FormAddData.append("price", dataAddInput.price);
  FormAddData.append("description", dataAddInput.description);
  FormAddData.append("quantity", dataAddInput.quantity);
  FormAddData.append("productType", dataAddInput.productType);
  FormAddData.append("image", dataAddInput.image);
   // Assuming you want to send the image
  

  const handleSubmitAdd = async (event) => {
    console.log(dataAddInput)
    event.preventDefault();
    try {
      // Use dataAddInput directly
      await props.addDataProduct(dataAddInput);
      // Reset the form inputs
      setDataAddInput({
        image: "",
        name: "",
        price: 0,
        description: "",
        quantity: 0,
        productType: "Eyes",
      });
      // Close the modal
      props.unDisplayAddModal(false);
    } catch (error) {
      console.error("Error adding product:", error);
      // Handle error as needed (show an alert, etc.)
    }
  };
  
  
  return (
    <Modal show={props.showAddModal} onHide={closeAddModal}>
      <form onSubmit={handleSubmitAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
                onChange={handleAddInputChange}
              />
            </div>
            <div className="d-flex d-row">
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Price"
                  name="price"
                  onChange={handleAddInputChange}
                  value={dataAddInput.price} />
              </div>
              {/* Stock(Frontend) = Quantity(Backend) */}
              <div className="form-group ml-3">
                <label htmlFor="quantity">Stock</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Stock"
                  name="quantity"
                  onChange={handleAddInputChange}
                  value={dataAddInput.quantity}

                />
              </div>
            </div>
            <div className="form-group">
              <label>Link Image</label>
              <input
                name="image"
                type="text"
                className="form-control"
                placeholder="Image URL"
                onChange={handleSetImageLink}
                value={dataAddInput.image}
              />
            </div>

           <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                rows="3"
                type="text"
                className="form-control"
                placeholder="Description"
                name="description"
                onChange={handleAddInputChange}
                value={dataAddInput.description}
              />
            </div>

            <div className="d-flex d-row">
              <div className="form-group ml-3 w-100">
                <label htmlFor="product-type">Select Product Type</label>
                <select
                  className="form-control"
                  name="productType"
                  onChange={handleAddInputChange}
                  value={dataAddInput.productType}
                >
                  <option value="Face">Face</option>
                  <option value="Eyes">Eyes</option>
                  <option value="Lips">Lips</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Shaving Needs">Shaving Needs</option>

                </select>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddModal}>
            Close
          </Button>
          <Button type="submit" variant="success">
            Add
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

const mapDispatchToProps = {
  addDataProduct,
};

export default connect(null, mapDispatchToProps)(AdminProductAdd);
