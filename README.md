## 💻 소개
Picktogram은 디자이너를 위한 SNS 서비스입니다.

## 🔥 Deploy
AWS EC2를 통해 배포하였습니다. 
http://3.34.219.42:3000


로컬에서 실행하려면 아래 순서를 따르면 됩니다.

1. 레포지토리를 클론합니다.
```
git clone
```

2. picktogram 폴더로 들어갑니다.
```
cd picktogram
```

3. package를 설치하고, 개발 모드로 실행합니다.
```
npm install

npm run dev
```

## ⭐ Skill
* Next.js
* Typescript
* React Query
* React Hook Form
* Emotion
* Nestia SDK를 이용한 통신 (백엔드와의 연동 방식)

## 📌 주요 기능
* Nestia SDK

  ![image](https://github.com/picktogram/front/assets/77627957/bfcbbb90-f272-4566-b09f-95a9017b4bdf)

  * npm으로 Nestia Sever Apis를 다운 받으면 SDK를 사용할 수 있습니다

  ![sdk 활용 1](https://github.com/picktogram/front/assets/77627957/4a85f812-709d-4ae3-ad9e-1c64d50fcc98)

  * 자동완성이 지원되고 보낼 바디 타입과 받을 리턴 타입이 유추됩니다. 


* 회원가입 / 로그인
  * 자체 회원가입을 지원합니다.
  * 회원가입, 로그인 과정에서 React Hook Form을 활용한 Validation을 이루어집니다.
  * Authentication 과정을 Sever-side로 진행하여, 리디렉션 전에 인증되지 않은 콘텐츠의 깜빡임을 방지합니다. (관련 내용 : https://nextjs.org/docs/pages/building-your-application/routing/authenticating )

* 게시글 / 댓글 조회

    ![무한스크롤11](https://github.com/picktogram/front/assets/77627957/cea3f3e7-e207-4251-9b61-500f09af965a)

    * 게시글은 무한 스크롤을 통해 제공합니다.
  
    * 댓글은 페이지네이션을 통해 제공합니다.
      
* 게시글 / 댓글 작성

  ![이미지 업로드 과정](https://github.com/picktogram/front/assets/77627957/cc02743c-0fbd-4182-9aa1-2323cbe24ae9)

  
  * 이미지 업로드 기능을 제공합니다.
    
  ![image](https://github.com/picktogram/front/assets/77627957/9c63d118-088b-4dfb-9665-5677b8a1f172)

  * 댓글이 없는 게시글을 추천합니다. 페이지네이션으로 제공됩니다.
 
  
    
  * 게시글과 댓글 작성 빈도로 측정되는 점수가 있습니다. 이를 활용한 추천 유저 기능을 추가할 예정입니다.
 
  * 디자이너가 게시한 게시글의 이미지를 활용한 보다 적극적인 댓글 기능을 추가할 예정입니다. (ex. 이미지의 특정 위치에 댓글을 추가하여 의견 제공하기)
  
* 팔로우 / 언팔로우
  
  ![image](https://github.com/picktogram/front/assets/77627957/c52429e4-74d8-4856-809b-849ad3bdab8d)

  * 날 팔로우한 유저를 추천합니다. 페이지네이션으로 제공됩니다.

## Pages

### Login Page
![image](https://github.com/picktogram/front/assets/77627957/9cdcf9a9-82ec-42c8-9ad9-f29e15973da9)

### Index Page
![image](https://github.com/picktogram/front/assets/77627957/659455c3-43a5-444e-8c70-f5844e3fb4c7)


### User Page
![image](https://github.com/picktogram/front/assets/77627957/4acaf7b9-9a7e-4a55-8f39-d7c6cebcaf49)
* 나의 페이지

![image](https://github.com/picktogram/front/assets/77627957/b8d04f76-7d7a-49b2-a0ce-5137cc792f7a)
* 다른 유저의 페이지
