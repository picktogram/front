import React from 'react';

import User from '@/src/components/user/user.container'

import { userFromRequest } from '@/src/auth/tokens';
import { GetServerSidePropsContext } from 'next'
import Header from '@/src/components/commons/layout/header';

interface UserPageProps {
    user : {
        nickname : string;
    };
    token : string;
}

export const getServerSideProps = async (context : GetServerSidePropsContext) => {
    const data = await userFromRequest(context.req);

   if(!data?.token) {
       return {
         redirect : {
         destination : '/login',
         permanent : false
         }
       }
   }

   return {
       props : {
           user : data.user,
           token : data.token,
       }
     }
 }

const UserPage : React.FC<UserPageProps> = ({
    token,
    user
}) => {
    return (
        <div>
            <Header token={token}/>
            <User
                token={token}
            />
        </div>
    );
};

export default UserPage;