import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import AppSearch from "~/components/AppSearch";
import Post from "./Post";
import { postsSelector } from "~/redux/selectors";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "~/redux/postsSlice";
import Loading from "~/components/Loading";
import icon_edit from "../../assets/icons/edit.svg";
import FormPost from "./FormPost";
const hastags = [
  { nameHastag: "hastag1", numFeeds: 123 },
  { nameHastag: "hastag2", numFeeds: 13 },
  { nameHastag: "hastag3", numFeeds: 12 },
  { nameHastag: "hastag4", numFeeds: 2 },
];

export default function NewsFeed() {
  const dispatch = useDispatch();
  const posts = useSelector(postsSelector).posts;
  const status = useSelector(postsSelector).status;
  const [filter, setFilter] = useState({ content: "" });
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  // console.log("từ reducer", posts);
  useEffect(() => {
    dispatch(fetchPosts(filter)); // Dispatch action fetchEmployees với tham số truyền vào là filters
  }, []);
  //search posts
  useEffect(() => {
    const search = setTimeout(() => {
      dispatch(fetchPosts(filter));
    }, 1000);
    return () => clearTimeout(search);
  }, [filter]);
  const searchPost = (input) => {
    setFilter({ ...filter, content: input });
  };

  return (
    <Container fluid>
      <FormPost show={show} setShow={() => setShow(!show)} />
      <Container style={{ marginTop: "-15px" }}>
        <div
          className="row"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            className="col-sm-3 d-none d-sm-none d-md-block bg-white h-100"
            style={{ height: "100vh", position: "fixed", left: 0 }}
          >
            <div className="mt-3 h-100">
              <Row>
                <AppSearch value={filter.content} onSearch={searchPost} />
              </Row>
              <Row className="mt-4 px-4">
                <Row className="fw-bold fs-5 pe-auto">Hashtag nổi bật</Row>
                {hastags.map((i, key) => (
                  <Row
                    key={key}
                    className="fw-bold ps-0 mt-1 mb-1"
                    style={{ cursor: "pointer" }}
                  >
                    <Col>#{i.nameHastag}</Col>
                    <Col className="text-grayBlue fw-light">{i.numFeeds}</Col>
                  </Row>
                ))}
              </Row>
            </div>
          </div>
          <div className="col-md-6" style={{ position: "sticky" }}>
            <div
              className=" d-none d-sm-block d-md-none position-fixed justify-content w-auto"
              style={{ right: 0, zIndex: 10 }}
            >
              <AppSearch value={filter.content} onSearch={searchPost} />
            </div>
            <div className="mainNews d-flex flex-column position-relative">
              {status === "loading" ? (
                <Loading />
              ) : status === "error" ? (
                <div className="text-center py-3">
                  Có lỗi trong quá trình lấy dữ liệu từ Server
                </div>
              ) : posts.length === 0 ? (
                <div className="mt-5 text-center">
                  Không có bài đăng khả dụng
                </div>
              ) : (
                posts.map((post) => {
                  return (
                    <Post
                      myKey={post.id}
                      title={post.title}
                      creator={post.creator}
                      html={post.content}
                      createDate={post.createDate}
                    />
                  );
                })
              )}
              <div
                className="create_post d-none d-sm-block d-md-none  position-fixed"
                style={{ right: 0 , marginTop:"25px"}}
              >
                <button className="bg-gradient" onClick={handleShow}>
                  <img alt="icon_edit" src={icon_edit}></img>
                </button>
              </div>
            </div>
          </div>
          <div
            className="col-md-3 d-none d-sm-none d-md-block p-4"
            style={{ height: "100vh", position: "fixed", right: 0 }}
          >
            <div className="create_post d-flex">
              <button className="bg-gradient" onClick={handleShow}>
                <img alt="icon_edit" src={icon_edit}></img>
              </button>
              <div className="fw-bold fs-5">Tạo bài viết mới</div>
            </div>
          </div>
        </div>
      </Container>
    </Container>
  );
}
