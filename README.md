## 주제
이미지 안에 있는 영어 텍스트를 추출하여 한국어로 번역해주는 웹사이트

## 팀원
최준민: 웹 프론트엔드, API 연동<br>
곽영주: 웹 백엔드 및 파일 업로드 구현<br>
조성윤: 기획(총괄) 및 AWS 인스턴스, 버켓 관리<br>

## 프로젝트 소개
이 프로젝트는 이미지에서 영문을 인식하여 한글로 번역을 도와주는 웹 사이트를 서비스하기 위해 만들어졌습니다.<br>
이 웹 사이트를 통해 사용자들은 여행, 영문 자료 독해 등의 영문 사용이 필요한 활동에 편의를 제공받을 수 있습니다.<br>

## 개발 내용
AWS 인스턴스로 가성머신을 생성하여 웹서버 구축하고 nodejs와 expressjs 사용하여 웹 개발을 하였습니다.<br>
S3 버켓을 생성하여 사용자로부터 받은 이미지를 multer-s3 모듈을 사용하여 버켓을 저장합니다.<br>
그리고 이미지에서 영어 텍스트를 추출하는 rekognition API를 사용하여 이미지가 저장된 버켓에 접근하여 해당 이미지에서 텍스트를 추출합니다.<br>
추출한 텍스트를 papago API를 사용하여 한국어로 변역한 후, 서버단에서 json 형식으로 이미지에서 추출한 영어 텍스트와 번역한 한국어를 프론트 단으로 전달합니다.<br>
프론트 단에서는 웹 사이트를 reload하지 않기 위해 비동기 처리 방식인 ajax를 사용하여 json 형식으로 값을 받아 웹 사이트로 보여줍니다.<br>

## 결과물 소개

### [다이어그램]
![image](https://user-images.githubusercontent.com/75197352/144335338-cf2d3648-b301-4872-a4b9-759d47dcc75c.png)

### [웹 화면]
![image](https://user-images.githubusercontent.com/77434165/144563888-4bc18f4a-c937-45bd-aa46-c36a8a739bea.png)

### [시연영상]
[https://youtu.be/wz0Ie8uwR_k](https://youtu.be/wz0Ie8uwR_k)

## 사용 방법

### 1. AWS 인스턴스 생성하여 가상머신 구동
```bash
/* ssh로 생성된 가상머신에 원격 접속 */
```
![image](https://user-images.githubusercontent.com/77434165/144564174-1c7736e3-c7d1-472a-9da2-46f6be9aaa3b.png)

### 2. 웹 구동
```bash
$ npm start
```
![image](https://user-images.githubusercontent.com/77434165/144564260-bfb0ffd6-bd3a-4ead-a672-0940c25b341a.png)

### 3. 이미지 업로드
```
1. 파일 선택 버튼 클릭
2. 번역할 텍스트가 있는 이미지 선택
```
![image](https://user-images.githubusercontent.com/77434165/144564489-f6e57b49-afd6-47c7-b656-485ece110c19.png)

### 4. 텍스트 추출하여 번역
```
변환 버튼 클릭
```
![image](https://user-images.githubusercontent.com/77434165/144564577-670564d4-40cf-4426-8262-ffb98f825a02.png)

## 필요성 및 활용방안
번역하기 힘든 영어 텍스트가 들어간 이미지 파일에서 텍스트를 추출한 뒤에 번역합니다.<br>
여행, 독서, 공부 등 다방면에서 활용이 가능합니다.<br>
이후 웹을 반응형으로 만들어 모바일에서 볼 수 있도록 활용할 수 있습니다.<br>
