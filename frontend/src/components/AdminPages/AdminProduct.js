import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  deleteDataProduct,
} from "../../actionCreators/AdminAction";
import { useDispatch } from "react-redux";

import { Modal, Button, Alert } from "react-bootstrap";
import EditProductModal from "./AdminProductEdit";
import AddProductModal from "./AdminProductAdd";

const AdminProduct = (props) => {
  const urlLocalhost = `${process.env.REACT_APP_API_URL}`;
  const dispatch = useDispatch();
  // ADD MODAL FORM.
  const [showAddModal, setShowAddModal] = useState(false);
  const displayAddModal = () => {
    setShowAddModal(true);
  };
  const unDisplayAddModal = (boolean) => {
    setShowAddModal(boolean);
  };

  const [showEditModal, setShowEditModal] = useState(false);
  const [dataEdit, setDataEdit] = useState({});

  const displayEditModal = (data) => {
    setDataEdit(data);
    setShowEditModal(true);
  };

  // to send to AdminProductEdit.js = function to close modal.
  const unDisplayEditModal = (boolean) => {
    setShowEditModal(boolean);
    // supaya setiap update(edit) slalu ada perubahan pada state.
  };

  // DELETE MODAL FORM.
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // dataDelete = productDatas that want to be deleted.
  const [dataDelete, setDataDelete] = useState({});

  const displayDeleteModal = (data) => {
    const deleteData = {
      ...data,
      name: data.name.S, // Assuming 'name' is a property containing a string
    };
  
    setDataDelete(deleteData);
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const handleDelete = () => {
    console.log("Deleting product with productid:", dataDelete.product_id);
    dispatch(deleteDataProduct(dataDelete.product_id.S));
    setShowDeleteModal(false);
  
    setShowDeleteModal(false);
  };
  const DeleteProductModal = () => {
    return (
      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <p>
              Are you sure want to delete this product with the name of
              <span className="text-success-s2">"{dataDelete.name}"</span> ?
            </p>
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  // alert from add product problem
  const alert = props.alertData;

  const AlertDismissible = () => {
    const [alertShow, setAlertShow] = useState(alert.show);

    if (alertShow) {
      return (
        <Alert
          variant={alert.variant}
          // BEST PRACTICE TO HANDLE ALERT THAT WILL SHOW AGAIN AFTER WE CLOSE THE ALERT. (2 FUNCTIONS IN 1 ONCLICK)
          onClose={() => {
            setAlertShow(false);
            alert.show = false;
          }}
          dismissible
        >
          <Alert.Heading className="h6 my-0">{alert.message}</Alert.Heading>
        </Alert>
      );
    }
    return <></>;
  };

  const [dataProduct, setDataProduct] = useState([]);
  const picture = (image) => {
    return {
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      height: '300px', // Adjust the height as needed
    };
  };
  useEffect(() => {
    fetch(`${urlLocalhost}/product/get`)  
      .then((response) => response.json())
      .then((data) => {
        setDataProduct(data.products);
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  return (
    <div className="text-center">
      <AlertDismissible />

      <button className="btn btn-success" onClick={displayAddModal}>
        Add Product here as Admin
      </button>

      <div className="mx-4 my-3">
      <div className="row">
      {dataProduct.map((item, index) => (
  <div className="col-md-3 mt-4" key={index}>
    <div className="card">
      {item.image && item.image.S && (
        <div
          style={picture(item.image.S)}
          className="card-img-top"
          alt="..."
        />
      )}
      <div className="card-body">
        {item.name && item.name.S && (
          <p className="font-weight-bold my-0">{item.name.S}</p>
        )}
        {item.quantity && item.quantity.N && (
          <small className="card-text text-secondary">
            Stock: {item.quantity.N}
          </small>
        )}
        <div className="d-flex d-row mb-3 justify-content-center">
          {item.productType && item.productType.S && (
            <button
              className="btn ml-3"
              style={{
                borderRadius: "7px",
                backgroundColor: "#dedede",
              }}
            >
              {item.productType.S}
            </button>
          )}
        </div>
        {item.description && item.description.S && (
          <p>{item.description.S}</p>
        )}
        <div className="d-flex d-row mt-4">
          {(item.price && item.price.N) && (
            <p className="my-0 text-success-s2 font-weight-bold">
              ${item.price.N} 
            </p>
          )}
          <div className="d-flex d-row ml-auto">
            <button
              className="btn btn-warning mr-2"
              onClick={() => displayEditModal(item)}
            >
              <i className="far fa-edit fa-lg"></i>
            </button>
            <button
              className="btn btn-danger"
              onClick={() => displayDeleteModal(item)}
            >
              <i className="far fa-trash-alt fa-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
))}
      </div>
      <DeleteProductModal />
      </div>

      <AddProductModal
        showAddModal={showAddModal}
        unDisplayAddModal={unDisplayAddModal}
      />

      <EditProductModal
        showEditModal={showEditModal}
        dataEdit={dataEdit}
        unDisplayEditModal={unDisplayEditModal}
      />
      
      <DeleteProductModal />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    alertData: state.AdminProductReducer.alert,
    dataProduct: state.AdminProductReducer.dataProduct,
  };
};

export default connect(mapStateToProps)(AdminProduct);