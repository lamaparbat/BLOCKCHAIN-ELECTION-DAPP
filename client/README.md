## Documentation 🚀🚀 [Installation guide]

   ### Frontend setup
   1. Download and install NodeJS [Link: https://nodejs.org/en/download/]
   2. Donwload and install VSCode [Link: https://code.visualstudio.com/download]
   3. Open the vscode and create a folder for frontend.
   4. Go inside the recently created folder and init the react project using your fav react-installer like CRA || Vite
      - ``` cd folder_name ```
      - ``` npx create-next-app app_name --typescript ``` [init next project]
      - ``` npm i web3 pusher-js ```
      - ``` npm run dev ``` [run the react project]


   ### Enable Audiences in Vercel Analytics
      Step 1: npm install @vercel/analytics
      
      Step 2: Import and Add this component to _app.jsx root file inside  '/pages/_app.tsx'
            <img width="552" alt="Screen Shot 2023-01-31 at 16 02 19" src="https://user-images.githubusercontent.com/64581460/215732775-9dcefb25-5f6f-4cdb-929a-f55b218bf903.png">
            
      Step 3: Complete deployment in Vercel & Finally setup completed
