# katkat_backend

Backend of my In-Style project.

- Authentication:

  - register:

    > Path: http://localhost:5001/auth/register

    - inputs:

      1. id
      2. username
      3. email
      4. password

  - login:

    > Path: http://localhost:5001/auth/login

    - inputs:

      1. email
      2. password

  - forgot-password:

    > Path: http://localhost:5001/auth/login/forgot-password

  - reset-password:

    - inputs:

      1. current password
      2. new password
      3. new password again
