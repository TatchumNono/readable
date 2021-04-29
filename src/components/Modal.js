import { createPortal } from "react-dom";
import {
  useState,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import "./modal.css";

const modalElement = document.getElementById("modal-root");

/*the 'children' key word is the props recieved from the parent component
It is destructred directly in the modal function and used just by writing children instead of props.children
*/
const Modal = ({ children, defaultOpened = false }, ref) => {
  const [isOpen, setIsOpen] = useState(defaultOpened);

  //this hook is used to make the states and functions accessible to the parents components when using useRef
  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    []
  );

  const handleEscape = useCallback((event) => {
    if (event.keyCode === 27) setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleEscape, false);
    return () => document.removeEventListener("keydown", handleEscape, false);
  }, [handleEscape, isOpen]);

  console.log(isOpen);

  return createPortal(
    isOpen ? <div className='modal'>{children}</div> : null,
    modalElement
  );
};
//forwardRef is used to forward the reference to the Modal component.
export default forwardRef(Modal);
