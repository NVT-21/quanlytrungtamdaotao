<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Introduce 

Một website với các chức năng: phân trang, tìm kiếm giáo viên, lớp học, khóa học. Tạo lớp học cho khóa học, sau đó tạo lịch học cho khóa học. Thêm học sinh vào lớp

- Trang đăng nhập , đăng ký :
    ![image](https://github.com/NVT-21/quanlytrungtamdaotao/assets/116005839/8e0312ae-7e4d-4797-b0cf-20e8397e0c97)
  ![image](https://github.com/NVT-21/quanlytrungtamdaotao/assets/116005839/67dd16dd-eb01-49ad-8bf5-f04857778986)
- Sau khi đăng nhập xong thì sẽ vào màn hình chính ở đấy sẽ hiện ra các khóa học của trung tâm :
  ![image](https://github.com/NVT-21/quanlytrungtamdaotao/assets/116005839/a3fa60c7-1873-481d-ad32-5ee6801dd7df)
- Rồi ta có thể ấn vào nút tạo lớp để mà tạo lớp được cho khóa học đó :
  ![image](https://github.com/NVT-21/quanlytrungtamdaotao/assets/116005839/c53397ad-a2a0-4d72-88fe-8beb667f379f)
- Ta sẽ chọn lịch học cho lớp học ta đang tạo , rồi từ lịch học , tổng số buổi học , ngày bắt đầu , sẽ tính ra được ngày kết thúc của khóa học đó
  ![image](https://github.com/NVT-21/quanlytrungtamdaotao/assets/116005839/0ad8bdf7-ed64-4b10-80b5-d3c5c6a442ad)
- Ta dăng ký học viên cho khóa học , khi ta chọn khóa học thì sẽ hiện ra các lớp của khóa học đó , khi ấn thêm thì học viên sẽ được vào khóa học , trong trường hợp
  khóa học đó không có lớp nào thì sinh viên sẽ được cho vào hàng chờ của khóa học đó 
  ![image](https://github.com/NVT-21/quanlytrungtamdaotao/assets/116005839/5d847d96-1c98-4a51-8248-a044a5183b82)
- Ta có thể phân loại được lớp học của các khóa học , biết được số người đang học khóa học , rồi có thể xem được cả danh sách học viên đang theo học , rồi có thể thêm học
  viên mà đang trong danh sách chờ của khóa học đó vào lớp 
  ![image](https://github.com/NVT-21/quanlytrungtamdaotao/assets/116005839/151b7fe7-980d-4ee6-ba82-b74f8751d231)
  ![image](https://github.com/NVT-21/quanlytrungtamdaotao/assets/116005839/d39323e7-62cb-4332-aa29-0efaa2811ef6)
  ![image](https://github.com/NVT-21/quanlytrungtamdaotao/assets/116005839/5276153e-742b-4cda-b03d-20577f0933a0)














