import Modal from "../Modal";

const DeleteConfirm = ({ method, message, id, state }) => {
  return (
    <Modal ref={state}>
      <div className='card'>
        <h1>Confirm!</h1>
        <p>Do you want to delete this {message}</p>
        <button onClick={() => state.current.close()}>Cancel</button>
        <button onClick={() => method(id)}>Delete</button>
      </div>
    </Modal>
  );
};

export default DeleteConfirm;
