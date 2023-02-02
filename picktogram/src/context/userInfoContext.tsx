import React, { createContext, useState, PropsWithChildren, useEffect  } from 'react'
import LocalStorage from '@/util/localStorage'
import { UserInfo } from "@/src/types/types"


export const userInfoContext = createContext<UserInfo>({
    user : {nickname : ""},
    setUser : (user) => {
      return null;
    }
});

export default function UserInfoContextProvider(props : PropsWithChildren) {
  const [user, setUser] = useState(() => {
      const userFromStorage = LocalStorage.getItem('user');
      return userFromStorage ? JSON.parse(userFromStorage) : { nickname : "" }
  })

  useEffect(() => {
    LocalStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <userInfoContext.Provider value={{user, setUser}}>
        {props.children}
    </userInfoContext.Provider>
  )
}