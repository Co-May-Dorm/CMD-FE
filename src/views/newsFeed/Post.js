import React from "react";
import { useState } from "react";
import { array } from "yup";
import pin_icon from "../../assets/icons/pin.svg";
import three_dot_icon from "../../assets/icons/three_dot.svg";
import comment_icon from "../../assets/icons/comment.svg";

const list_images1 = [
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
  "https://i.pinimg.com/originals/c7/e6/26/c7e62671469026f9806a6dd2b0a20350.jpg",
  "https://1.bp.blogspot.com/-ciJx92ftXls/YGLZXgbmRgI/AAAAAAAArCg/iA9A_uU0qewj8ZgCpv6mCRqNuvo2YlZZACNcBGAsYHQ/s0/1d83a6d88d8be5b041a9a98fd5048311.jpeg",
];

export default function Post(props) {
  const [reacted, setReact] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [quantityReact, setQuantityReact] = useState(3);
  const reaction = () => {
    if (reacted) {
      setQuantityReact(quantityReact - 1);
    } else {
      setQuantityReact(quantityReact + 1);
    }
    setReact(!reacted);
  };
  const renderImage = () => {
    const new_array = [...list_images1];
    new_array.splice(0, 1);
    if (list_images1.length > 1) {
      return (
        <>
          <div className="main_images">
            {/* image main */}
            <img alt="images" src={list_images1[0]}></img>
          </div>
          <div className="grid_images d-flex flex-column">
            {/* other images  */}
            {new_array.map((image, key) => (
              <img key={key} alt="images" src={image}></img>
            ))}
          </div>
        </>
      );
    }
  };
  return (
    <div key={props.myKey+"a"} className="post bg-white rounded">
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
            <img alt="more" src={three_dot_icon}></img>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="text mt-1 mb-1 fw-normal" dangerouslySetInnerHTML={{__html:props.html}}></div>
        {/* <div className="images">
          <img
            alt="images"
            src="https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80"
          ></img>
        </div> */}
      </div>
      <div className="react">
        <div
          onClick={() => setShowComment(!showComment)}
          className="react-item comment d-flex"
        >
          <img alt="comment" src={comment_icon}></img>
          <span>67</span>
        </div>
        <div onClick={reaction} className="react-item react_heart d-flex">
          <div className={reacted === false ? "heart1" : "heart2"}></div>
          <span>{quantityReact}</span>
        </div>
      </div>
      <div
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
      </div>
    </div>
  );
}
