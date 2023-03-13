import React from 'react'
import { useQuery } from 'react-query';

export default function UserRecommend({
    user
} : {
    user : {
        nickname : string;
        token : string;
    }
}) {
  return (
    <div>UserRecommend</div>
  )
}
