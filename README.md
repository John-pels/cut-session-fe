# cut-session-fe

A Single Page Application with an Embeddable Widget built using Vite, Vanilla HTML & CSS, TypeScript, Redux, REST API, and Toastify.

## Live URL: [link](https://cut-sessions.netlify.app/)

> **Technologies used:**
>
> - HTML
> - CSS
> - TypeScript
> - Redux
> - Vite
> - REST API
> - Toastify for Notification

> #### To run the app on your local computer
>
> - yarn install or npm run install
> - yarn dev or npm run dev
> - open your browser and type [http://127.0.0.1:5173/](http://127.0.0.1:5173/) into the address bar

> #### To run a production build
>
> - yarn build or npm run build

> # Routing System
>
> ### User routes:
>
> - [/](https://cut-sessions.netlify.app/) is where users will get to login
> - [/register](https://cut-sessions.netlify.app/register) is where users will get to create an account
> - [/dashboard](https://cut-sessions.netlify.app/dashboard) is where users will get to see all available studios or merchants
> - [/dashboard/studio/:merchantId](https://cut-sessions.netlify.app/dashboard/studio/83fjdcndscksncsis485sjccid) is where users will get to see all sessions for the selected studio screen
> - [/dashboard/book/:sessionId](https://cut-sessions.netlify.app/dashboard/book/83fjdcndscksncsis485sjccid) is where users will get to book a studio session
>
> ### Merchant/Studio routes:
>
> - [/merchant/login](https://cut-sessions.netlify.app/merchant/login) is where merchants will get to login
> - [/merchant/register](https://cut-sessions.netlify.app/merchant/register) is where merchants will get to create an account
> - [/merchant/dashboard](https://cut-sessions.netlify.app/merchant/dashboard) is where merchants will get to see their sessions, embeddable widget code, and also search options
> - [/merchant/session/create](https://cut-sessions.netlify.app/merchant/session/create) is where merchants will get to create a studio session
