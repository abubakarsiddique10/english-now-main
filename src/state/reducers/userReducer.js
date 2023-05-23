import { FETCHING_ERROR, FETCHING_START, FETCHING_SUCCESS, UPDATE_COMMENT, UPDATE_LIKE, UPDATE_POST } from "../actionTypes/actionTypes"

export const initialState = {
    loading: false,
    posts: [],
    error: "",
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_START:
            return {
                ...state,
                loading: true,
            }
        case FETCHING_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.payload,
            }
        case FETCHING_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }
        case UPDATE_COMMENT:
            state.posts.filter(post => {
                if (post._id === action.payload.id) {
                    return post.comments = action.payload.comments
                }
            });
            return {
                ...state
            }
        case UPDATE_LIKE:
            state.posts.filter(post => {
                if (post._id === action.payload.id) {
                    return post.likes = action.payload.likes
                }
            })
            return {
                ...state
            }
        default:
            return state
    }
}