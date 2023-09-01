import { createPost, updatePost, deletePost, getByPostDetail, getPostsByPage, addBookmark } from '@/repository/index';

export const postService = {
    createPost: async (postData) => {
        try {
            console.log('service, postData::', postData);
            const post = await createPost(postData);
            return post;
        } catch (error) {
            throw new Error('Error creating post');
        }
    },

    updatePost: async (postData) => {
        try {
            console.log('service', postData);
            const post = await updatePost(postData);
            return post;
        } catch (error) {
            console.log(error)
            throw new Error('Error updating post');
        }
    },

    deletePost: async (post_id) => {
        try {
            console.log('service', post_id)
            const post = await deletePost(post_id);
            return post;
        } catch (error) {
            console.log(error)
            throw new Error('Error delete post');
        }
    },
    getByPostDetail: async (postId) => {
        try {
            const post = await getByPostDetail(postId);
            return post;
        } catch (error) {
            console.log(error);
            throw new Error('Error get detail post');
        }
    },

    getPostsByPage: async (page, pageSize, order, id, sort) => {
        try {
            console.log('service, order', order);
            const post = await getPostsByPage(page, pageSize, order, id, sort); 
            return post;
        } catch (error) {
            console.log(error);
            throw new Error('Error get listbyPage post');
        }
    }, 

    addBookmark: async (user_id, post_id) => {
        try {
            console.log(user_id, post_id)
            const post = await addBookmark(user_id, post_id);
            return post;
        } catch (error) {
            console.log(error);
            throw new Error('Error get listbyPage post');
        }
    },
}