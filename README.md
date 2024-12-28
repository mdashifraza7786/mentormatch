# MentorMatch - a platform to allow mentor-mentee interaction.

DEPLOYMENT URL for frontend - "https://mentor-match-sandy.vercel.app/"
DEPLOYMENT URL for backend - "https://mentormatch-ewws.onrender.com/"

SET-UP Instructions:

1. Clone file from github -> open GIT BASH in your local system -> select folder location -> give command - "git clone https://github.com/ZeeshanDEVPRO/MentorMatch.git" -> Now open the folder using your VS Code.
2. Frontend -> from client folder you need to start the localhost using the command "npm run dev". The localhost will direct you to frontend url on web browser.
3. Backend -> from server folder you need to start the localhost using the command "npm start". The terminal will give you PORT on which the backend is running along with the information that "mongoDB connection successfull".
4. Missing file and dependencies can be added using the command "npm i'. One can also add dependencies to package.json file for both server and client folers.
5. Websocket and all other APIs are connected from backend itself,which is deployed on above mentioned URL.


TECHNOLOGIES USED:
1. Frontend-> React.js, Tailwindcss, react-icons, react-toastify.
2. Backend-> Node.js,Express.js, cloudinary, Websocket, jsonwebtoken, bcrypt.js
3. Database-> MongoDB ATLAS(cloud database),Cloudinary
4. Deployment -> Vercel(frontend), Render(backend)
