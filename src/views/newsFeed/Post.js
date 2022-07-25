import React from "react";
import { useState } from "react";
import FormPost from "./FormPost";
import { BiEdit, BiTrash } from "react-icons/bi";
import pin_icon from "../../assets/icons/pin.svg";
import three_dot_icon from "../../assets/icons/more.svg";
import { Row, Col, Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
// import comment_icon from "../../assets/icons/comment.svg";
import { deletePost } from "~/redux/postsSlice";
import { Dropdown } from "react-bootstrap";

export default function Post(props) {
  const dispatch = useDispatch();
  const [reacted, setReact] = useState(false);
  // const [showComment, setShowComment] = useState(false);
  const [show, setShow] = useState(false);  
  const [showWarning, setShowWarning]= useState(false)
  const [quantityReact, setQuantityReact] = useState(3);
  const reaction = () => {
    if (reacted) {
      setQuantityReact(quantityReact - 1);
    } else {
      setQuantityReact(quantityReact + 1);
    }
    setReact(!reacted);
  };
  //delete post
  const delPost =()=>{
    setShowWarning(false)
    dispatch(deletePost(props.myKey))
  }

  return (
    <>
      <FormPost
        show={show}
        setShow={() => setShow(!show)}
        id={props.myKey}
        title={props.title}
        content={props.html}
      />
      <Modal
        scrollable
        show={showWarning}
        onHide={() => setShowWarning(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>XÓA BÀI ĐĂNG</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa bài đăng
          {/* <span className="fw-bolder">{task.title}</span>? */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowWarning(false)}
          >
            Hủy
          </Button>
          <Button variant="danger" 
          onClick={delPost}
          >
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
      <div key={props.myKey + "a"} className="post bg-white rounded">
        <div className="p-header rounded-top">
          <div className="d-flex">
            <div className="avatar me-2">
              <img alt="avatar-poster" src={props.creator.avatar}></img>
            </div>
            <div className="d-flex flex-column">
              <div className="fw-bold">{props.creator.name}</div>
              <div className="text-grayBlue">{props.createDate}</div>
            </div>
          </div>
          <div className="d-flex">
            <div className="option">
              <img alt="pin" src={pin_icon}></img>
            </div>
            <div className="option">
              <Dropdown>
                <Dropdown.Toggle variant="none" id="dropdown-basic">
                  <img src={three_dot_icon} alt="More"></img>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#/action-1"
                    onClick={() => setShow(true)}
                  >
                    <BiEdit />
                    Chỉnh sửa
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2" onClick={()=>setShowWarning(true)}>
                    <BiTrash />
                    Xóa
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="content">
          <h3 className="text text-center">{props.title}</h3>
          <div
            className="text mt-1 mb-1 fw-normal"
            dangerouslySetInnerHTML={{ __html: props.html }}
          ></div>
          {/* <div className="images">
          <img
            alt="images"
            src="https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80"
          ></img>
        </div> */}
        </div>
        <div className="react">
          {/* <div
          onClick={() => setShowComment(!showComment)}
          className="react-item comment d-flex"
        >
          <img alt="comment" src={comment_icon}></img>
          <span>67</span>
        </div> */}
          <div onClick={reaction} className="react-item react_heart d-flex">
            <div className={reacted === false ? "heart1" : "heart2"}></div>
            <span>{quantityReact}</span>
          </div>
        </div>
        {/* <div
        className={`${
          showComment ? "active" : null
        } show-comment bg-white rounded-bottom ps-5 pe-5 pb-5 pt-2`}
      >
        <div className="typing-comment">
          <div className="avatar me-2">
            <img alt="avatar-poster" src="https://i.pravatar.cc/300"></img>
          </div>
          <div className="input-comment">
            <input
              className="rounded"
              placeholder="Nhập nội dung thảo luận"
            ></input>
          </div>
        </div>
      </div> */}
      </div>
    </>
  );
}
