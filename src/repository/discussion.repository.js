import db from '../database/index.js';

const {Discussion, Category, DiscussionImage, DiscussionCategory, DiscussionBookmark, DiscussionLike, sequelize} = db;

export const discussionRepository = {
    getDiscussionById: async (discussionId)=>{
        return await Discussion.findByPk(discussionId);
    },

    createDiscussion: async (dto, transaction) => {
        return await Discussion.create(dto, {transaction});
    },

    createCategory: async (discussionId, categories, transaction) => {
        const category = categories.map(category => ({discussionId, category}));
        await DiscussionCategory.bulkCreate(category, {transaction});
    },

    createImage: async (discussionId, images, transaction) => {
        const image = images.map(image => ({discussionId, image}))
        await DiscussionImage.bulkCreate(image, {transaction});
    },

    updateDiscussion: async (dto, transaction) => {
        const {discussionId, title, content, thumbnail, startTime, endTime} = dto;
        await Discussion.update({title, content, thumbnail, startTime, endTime, updatedAt: new Date()},
            {where: {discussionId}}, {transaction})
    },

    updateDiscussionCategory: async (discussionId, categories, transaction) => {
        await DiscussionCategory.destroy({where: {discussionId}});
        const category = await categories.map(category => ({discussionId, category}));
        await DiscussionCategory.bulkCreate(category, {transaction});
    },

    updateDiscussionImage: async (discussionId, images, transaction) => {
        await DiscussionImage.destroy({where: {discussionId}});
        const image = images.map(image => ({discussionId, image}))
        await DiscussionImage.bulkCreate(image, {transaction});
    },
};