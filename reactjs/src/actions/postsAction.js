import postsApi from '../api/postsApi'
import * as actions from '../constants/ActionPost'

// Lấy danh sách bài viết
export const fetchPosts = (posts) => {
    return {
        type: actions.FETCH_POSTS,
        payload: posts
    }
}
export const fetchPostsRequest = (params) => {
    return (dispatch) => {
        postsApi.getAll(params)
            .then(response => {
                dispatch(fetchPosts(response.data.data))
            })
            .catch(error => {
                alert(error)
                console.log(error)
            })
    }
}
//

// Thêm bài viết
export const addPost = (post) => {
    return {
        type: actions.ADD_POST,
        payload: post
    }
}
export const addPostRequest = (post) => {
    return (dispatch) => {
        postsApi.add(post)
            .then(response => {
                dispatch(addPost(response.data))
            })
            .catch(error => {
                alert(error)
                console.log(error)
            })
    }
}
//

// Cập nhật thông tin của bài viết
export const updatePost = (post) => {
    return {
        type: actions.UPDATE_POST,
        payload: post
    }
}
export const updatePostRequest = (post) => {
    return (dispatch) => {
        postsApi.update(post)
            .then(response => {
                dispatch(updatePost(response.data))
            })
            .catch(error => {
                alert(error)
                console.log(error)
            })
    }
}
//

// Xóa bài viết
export const deletePost = (id) => {
    return {
        type: actions.DELETE_POST,
        payload: id
    }
}
export const deletePostRequest = (id) => {
    return (dispatch) => {
        postsApi.delete(id)
        .then(() => {
            dispatch(deletePost(id))
        })
        .catch(error => {
            alert(error)
            console.log(error)
        })
    }
}
//