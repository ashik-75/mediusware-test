import React, { useState } from "react";
import ModalA from "./ModalA";
import ModalB from "./ModalB";

const Problem2 = () => {
  const [modalA, setIsModalAOpen] = useState(false);
  const [modalB, setIsModalBOpen] = useState(false);

  const handleAClose = () => setIsModalAOpen(false);
  const handleBClose = () => setIsModalBOpen(false);
  const handleAOpen = () => setIsModalAOpen(true);
  const handleBOpen = () => setIsModalBOpen(true);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={handleAOpen}
            className="btn btn-lg btn-outline-primary"
            type="button"
          >
            All Contacts
          </button>
          <button
            onClick={handleBOpen}
            className="btn btn-lg btn-outline-warning"
            type="button"
          >
            US Contacts
          </button>
        </div>
      </div>

      <ModalA
        title="Modal A"
        url={`https://contact.mediusware.com/api/contacts`}
        show={modalA}
        handleClose={handleAClose}
        handleOpen={handleBOpen}
      />
      <ModalB
        title="Modal B"
        url={`https://contact.mediusware.com/api/country-contacts/United%20States`}
        show={modalB}
        handleClose={handleBClose}
        handleOpen={handleAOpen}
      />
    </div>
  );
};

export default Problem2;
