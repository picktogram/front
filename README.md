## 💻 소개
Picktogram은 디자이너를 위한 SNS 서비스입니다.

## 🔥 Deploy
AWS EC2를 통해 배포하였습니다. 
http://3.34.219.42:3000

## 

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

## 📓 학습 내용

https://sunrise-push-ffa.notion.site/Picktogram-3437f9ef750b43e78ca09c3aae0df46d

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

    ![ezgif com-video-to-gif](https://github.com/picktogram/front/assets/77627957/611c178b-8559-4fd5-bf97-1b3804519ae6)


    * 게시글은 무한 스크롤을 통해 제공합니다.
  
    * 댓글은 더보기 버튼을 통해 추가됩니다.
    
    * 특정 게시글 확인 이후 뒤로가면 기존 스크롤이 유지됩니다.
      
      
* 게시글 / 댓글 작성

  ![ezgif com-video-to-gif (2)](https://github.com/picktogram/front/assets/77627957/9a2024ce-0dd9-40ea-a20d-7b43aead9311)

 
  * 게시글 작성 과정에서 이미지 업로드 기능을 제공합니다.

   ![ezgif com-video-to-gif (1)](https://github.com/picktogram/front/assets/77627957/566307dd-e770-45ea-a66f-08451e287678)

  * 게시글 이미지 위의 특정 좌표에 할당되는 댓글을 작성할 수 있습니다.
  * 이미지 위의 댓글은 클릭하거나 마우스를 올리는 것으로 확인 할 수 있습니다.
  * 일반적인 댓글 작성도 가능합니다. 이 경우에는 이미지 위에 해당 댓글은 표시되지 않습니다.
    
  ![image](https://github.com/picktogram/front/assets/77627957/9c63d118-088b-4dfb-9665-5677b8a1f172)


  * 댓글이 없는 게시글을 추천합니다. 페이지네이션 형태로 제공됩니다.
    
  
* 팔로우 / 언팔로우
  
  ![image](https://github.com/picktogram/front/assets/77627957/c52429e4-74d8-4856-809b-849ad3bdab8d)

  * 날 팔로우한 유저를 추천합니다. 페이지네이션 형태로 제공됩니다.
    
 
* 유저 프로필 수정

  ![ezgif com-video-to-gif (3)](https://github.com/picktogram/front/assets/77627957/4f0508cd-ddc9-49fb-9b26-ea53a0280a7d)


  * 커버 이미지를 수정할 수 있습니다.
  * 프로필 이미지를 수정할 수 있습니다.
  * 소개글을 수정할 수 있습니다.


 * 게시글과 댓글 작성 빈도로 측정되는 점수가 있습니다. 이를 활용한 추천 유저 기능을 추가할 예정입니다.
 * 대댓글 기능을 추가할 예정입니다.
 * 게시글 검색 기능을 추가할 예정입니다.


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

### Board Page
![image](https://github.com/picktogram/front/assets/77627957/2c67b693-dc88-4a48-9887-4c44c9619111)



