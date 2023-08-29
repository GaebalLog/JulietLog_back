import { asyncWrapper } from '@/common/index';
import { postService } from '@/service/index';
import { StatusCodes } from 'http-status-codes';

export const createPost = asyncWrapper(async (req, res) => {
        try {
            const { user_id, title, content, categories, img} = req.body;
            const postsInput = {
                user_id: user_id,
                title: title,
                content: content,
                categories: categories,
                img: img,
            }
            console.log(postsInput);

            const post = await postService.createPost(postsInput);

            res.status(201).json({ message: 'create success' });
        } catch (error) {
            res.status(500).json(error);
        }
})

export const updatePost = asyncWrapper(async (req, res) => {

    try {
        const { title, content, img } = req.body;
        const post_id = req.params.id;
        const postData = {
            post_id: post_id,
            title: title,
            content: content,
            img: img
        }
        console.log(postData);
        const post = await postService.updatePost(postData);

        if (post === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(201).json({ message: 'update success' });
    } catch (error) {  
        res.status(500).json(error);
    }

})

export const deletePost = asyncWrapper(async (req, res) => {
    try {
       const post_id = req.params.id;
        const post = await postService.deletePost(post_id);
        if(post === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(201).json({ message: 'delete success' });
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

export const getByPostDetail = asyncWrapper (async (req, res) => {
    try {
        const post_id = req.params.id;
        console.log(post_id)
        if (!post_id) {
            return res.status(400).json({ message: 'Post ID is missing' });
        }
        const post = await postService.getByPostDetail(post_id);
        console.log(post);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(201).json(post);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
})

