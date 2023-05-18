import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Modal } from "react-bootstrap";

function ModalB({ show, handleClose, handleOpen, url, title }) {
  const [showEven, setShowEven] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [countryDetails, setCountryDetails] = useState(null);

  const [modalC, setIsModalCOpen] = useState(false);

  const handleCClose = () => setIsModalCOpen(false);
  const handleCOpen = () => setIsModalCOpen(true);

  const [loading, setLoading] = useState(false);
  const [country, setInfo] = useState([]);
  const [error, setError] = useState(null);

  const fetchdata = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/?page=${page}`);
      const result = await response.json();

      setLoading(false);
      console.log({ result, page });

      if (result?.results?.length > 0) {
        setInfo((prev) => [...prev, ...result?.results]);
      }
    } catch (error) {
      setError(error?.message);
    }
  };

  console.log(country);

  useEffect(() => {
    fetchdata(page);
  }, [page]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const result = await fetchdata();
  };

  const scrollA = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop === 500) {
      setPage((p) => p + 1);
    }
  };

  return (
    <div onScroll={scrollA}>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <div>{title}</div>
          <form onSubmit={handleSearch}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              className="form-control"
              placeholder="Search Something"
            />
          </form>
        </Modal.Header>
        <Modal.Body>
          <ButtonGroup>
            <Button
              onClick={() => {
                handleClose();
                handleOpen();
              }}
            >
              All Contacts
            </Button>
            <Button>US Contacts</Button>
            <Button onClick={handleClose}>Close</Button>
          </ButtonGroup>
          <div
            onScroll={scrollA}
            style={{ height: "500px", overflowY: "scroll" }}
          >
            {country
              ?.filter((item) =>
                showEven ? (item.id % 2 === 0 ? true : false) : true
              )
              ?.map((data) => (
                <div key={data.id}>
                  <button
                    onClick={() => {
                      handleClose();
                      handleCOpen();
                      setCountryDetails(data);
                    }}
                    className="py-2"
                  >
                    {data.id} - {data?.country?.name}
                  </button>
                </div>
              ))}

            <div>{loading && <div>Loading ...</div>}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* checkbox */}
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value={showEven}
              id="defaultCheck1"
              onChange={(e) => setShowEven(e.target.value)}
            />
            <label class="form-check-label" for="defaultCheck1">
              Only Even
            </label>
          </div>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={modalC}
        onHide={handleCClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h1>Country details</h1>
            <h1>
              {countryDetails?.country?.name}(Id: {countryDetails?.id})
            </h1>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalB;
