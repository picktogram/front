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
            <div style={{
                width : '1600px',
                margin : '0 auto',
                border : '1px solid black',
                minHeight : '100vh',
                padding : '1rem',
                backgroundColor : 'white'
          }}>
                <User
                    token={token}
                />
            </div>
        </div>
    );
};

export default UserPage;