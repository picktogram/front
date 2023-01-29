import React, { createContext, useState, PropsWithChildren  } from 'react'

interface UserInfo {
    nickname : string
    setNickName : (name:string) => void
}

export const userInfoContext = createContext<UserInfo>({
    nickname : "",
    setNickName : (name) => {
    }
});

export default function UserInfoContextProvider(props : PropsWithChildren) {
  const [nickname, setNickName] = useState("")

  return (
    <userInfoContext.Provider value={{nickname, setNickName}}>
        {props.children}
    </userInfoContext.Provider>
  )
}