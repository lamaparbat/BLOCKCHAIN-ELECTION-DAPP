# Blockchain e-voting system (WEB 3.O)

## Folder Structure

<img width="581" alt="Screen Shot 2022-12-21 at 23 20 58" src="https://user-images.githubusercontent.com/64581460/208968847-c6feb4f7-1729-4bc5-8a87-f562c653f43b.png">



## Backend API Docs
  1. Installation

    npm init [initialize the project setup]
    
    npm add express ts-node @types/node @types/express dotenv nodemon cors helmet pm2 multer @types/multer 
    
    npm add firebase-admin uuid node-cron pusher
    
    npm add jest ts-jest @types/jest
    
    npx test-jest config:init  [generate jest.config.js files with some prebuilt configs] ```
   
   PM2 Shell Commands
   0. ``` pm2 ping ``` [Make sure pm2 has launched]
   1. ``` pm2 start starter_file --watch --ignore-watch=node_modules```    [Start the process]
   2. ``` pm2 start starter_file -i max  ``` [Start all the process based on the total number of core]
   2. ``` pm2 log ``` [See the log details]
   3. ``` pm2 ls || pm2 status || pm2 list ``` [See the running process in table format]
   4. ``` pm2 stop process_name ``` [Stop the specific process]
   5. ``` pm2 stop all ``` [Stop all processes]
   6. ``` pm2 delete process_name ``` [Delete the specific process]
   7. ``` pm2 delete all ``` [Delete all processes]
   8. ``` pm2 monit ``` [Monit the process details including memory usage, uptime, etc]
   7. ``` pm2 restart starter_file``` [Delete all processes]

  2. Setup scalable project structute [Eg. Clean Arch.]
  3.
  
  
Author: Parbat Lama
