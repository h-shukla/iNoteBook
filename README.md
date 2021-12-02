# iNoteBook is your notebook on the cloud
- iNoteBook is a MERN application that has login, and password encryption like features as well. 
- The backend and frontend `node_modules` are stored different than each other.
- It has custom backend written in `express.js` with `mongodb`.
- The backend has several Apis' that connect with the frontend to make the app run.

# Backend
- It provides api to createuser and perform CRUD operations on notes
- The passwords of users are stored in encrypted format using `bcryptjs`
- It provides security to the users' personal notes
- It uses `jwt` for authentication of users
- Login information is passed with auth-token in the header

# Frontend
- It connects well with backend to provide user exceptional experience

TODO:
1. Add some users and get their access token
1. Then Continue watching the video
