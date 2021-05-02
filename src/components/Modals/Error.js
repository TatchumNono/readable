import Modal from "../Modal";

const Error = ({ state }) => {
  return (
    <Modal ref={state}>
      <div className='card'>
        <h1>Error</h1>
        <p>Please provide the body or author of the Comment or POst</p>
        <button onClick={() => state.current.close()}>Cancel</button>
      </div>
    </Modal>
  );
};

export default Error;
