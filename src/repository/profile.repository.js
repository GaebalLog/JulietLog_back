import db from '@/database';
import { verifyToken } from "@/utils";
const { Profile, Preference } = db;

export const profileRepository = {
    findUserIdByToken: (token) => {
        const result = verifyToken(token);
        return result.userId;
    },
    findUserInformationById: async (userId) => {
        const profile = await Profile.findOne({
            where: { userId },
            attributes: ['nickname', 'imageUrl'],
        });
        const preference = await Preference.findOne({
            where: { userId },
            attributes: ['darkmodeStatus']
        });
        return {
            userId,
            nickname: profile.dataValues.nickname,
            imageUrl: profile.dataValues.imageUrl || '',
            darkmode: preference.dataValues.darkmodeStatus ? 1 : 0
        }
    },
    findNicknameByIds: async (userIds) => {
        return await Profile.findAll({
            attributes: ['nickname'],
            where: { [Op.in]: userIds }
        })
    },
    findByUserId: async (userId) => {
        return await Profile.findOne({ where: { userId } });
    },
    updateProfile: async (userId, data) => {
        return await Profile.update(data, { where: { userId } });
    }
}