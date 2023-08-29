import { socialLoginRepository, userRepository } from '@/repository/index';
import { createToken } from '@/utils/index'
import axios from 'axios';

const githubOptions = {
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: `http://${process.env.SERVER_URL}:${process.env.PORT || 8280}/api/auth/callback/github`
}
const googleOptions = {
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `http://${process.env.SERVER_URL}:${process.env.PORT || 8280}/api/auth/callback/google`
}
const kakaoOptions = {
    clientID: process.env.KAKAO_ID,
    clientSecret: process.env.KAKAO_SECRET,
    callbackURL: `http://${process.env.SERVER_URL}:${process.env.PORT || 8280}/api/auth/callback/kakao`
}

export const socialLoginService = {
    kakaoLoginService: async (code) => {
        try {
            const token = await axios.post('https://kauth.kakao.com/oauth/token', null, {
                params: {
                    code,
                    client_id: kakaoOptions.clientID,
                    redirect_url: kakaoOptions.callbackURL,
                    grant_type: 'authorization_code'
                }
            });
            const kakaoUser = await axios.get('https://kapi.kakao.com/v2/user/me', {
                headers: {
                    'Authorization': `Bearer ${token.data.access_token}`
                }
            });            
            const user = socialLoginRepository.findBySocialId(kakaoUser.id);
            if (user) {
                return await createToken(user.user_id);
            }
            // 요기에 createUser 해줘야댐
        } catch (error) {
            return { error };
        }
    },
    githubLoginService: async (code) => {
        try {
            const token = await axios.post('https://github.com/login/oauth/access_token', null, {
                params: {
                    code,
                    client_id: githubOptions.clientID,
                    redirect_url: githubOptions.callbackURL,
                }
            });
            const githubUser = await axios.get('https://api.github.com/user', {
                headers: {
                    'Authorization': `Bearer ${token.data.access_token}`
                }
            });
            const user = socialLoginRepository.findBySocialId(githubUser.id);
            if (user) {
                return await createToken(user.user_id);
            }
            // 요기에 createUser 해줘야댐
        } catch (error) {
            return { error };
        }
    },
    googleLoginService: async (token) => {
        try {
            const googleUser = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });            
            const user = socialLoginRepository.findBySocialId(googleUser.id);
            if (user) {
                return await createToken(user.user_id);
            }
            // 요기에 createUser 해줘야댐
        } catch (error) {
            return { error };
        }
    }
}