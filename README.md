# katkat_backend

Backend of my In-Style project.

- Authentication:

  - register:

  > Path: http://localhost:5001/auth/register
  > req.body
  > {
  > "email": "hikmet@mikmet.com",
  > "password": "hikmetmikmet"
  > }

  - login:
    > Path: http://localhost:5001/auth/login
    > request

  ```
  {
  "email": "hikmet@mikmet.com",
  "password": "hikmetmikmet"
  }
  ```

  response

  ```
  res.cookie:
  "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.  eyJ1c2VySWQiOiJmZTQ3NzIzYi0wNDM1LTQ5NmQtOTU0OS0wNTNmNTA2ZDFmZmUiLCJ1c2VyTGV2ZWwiOiJiYXNpYyIsImlhdCI6MTcyODY0MzI2NiwiZXhwIjoNzI4  NjQ0MTY2fQ.OQRV03mmZK8HYzXR1CKDl1Z3F_m6Oa1PfaxEEdUHMJg; Path=/; HttpOnly; SameSite=Strict"
  res.setHeader:
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.  eyJ1c2VySWQiOiJmZTQ3NzIzYi0wNDM1LTQ5NmQtOTU0OS0wNTNmNTA2ZDFmZmUiLCJ1c2VyTGV2ZWwiOiJiYXNpYyIsImlhdCI6MTcyODY0MzI2NiwiZXhwIjoNzI4  NjQzMjk2fQ.YX9CiVgSPrqXaX2g6EWOw3D1b0VodEmEU94FFwvlhMU"
  ```

- auth check:

  > Path: http://localhost:5001/auth/check

- database model sync after change

  > Path: http://localhost:5001/dbSync

  syncWhat = all syncing all

- forgot-password:

  > Path: http://localhost:5001/auth/login/forgot-password

- reset-password:

  - inputs:

    1. current password
    2. new password
    3. new password again
