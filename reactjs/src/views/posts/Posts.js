import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import Slider from './Slider'
import { fetchPostsRequest } from '../../actions/postsAction'
import PostItem from './PostItem'
import AddPost from './features/AddPost'

const Posts = () => {
    const posts = useSelector(state => state.posts.data)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchPostsRequest())
    }, [])
    
    return (
        <>
            <Container className="mb-5">
                <Slider />
            </Container>
            <Container>
            <div className="row justify-content-between">
                <div className="col-auto fw-bold fs-5">
                    BẢNG TIN
                </div>
                <div className="col" />
                {/* <div className="col-auto">
                    <AppSearch value={filters.q} onSearch={handleSearchTerm} />
                </div> */}
                <div className="col-auto">
                    <AddPost />
                </div>
            </div>
            </Container>
            <Container>
                {posts.map((post, index) => (
                    <PostItem key={index} post={post} />
                ))}
            </Container>
        </>
    )
}

export default Posts