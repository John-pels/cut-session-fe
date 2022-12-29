# cut-session-fe

A Single Page Application with an Embeddable Widget built using Vite, Vanilla HTML & CSS, TypeScript, Redux, REST API, and Toastify.

## Live URL: [link](https://cut-sessions.netlify.app/)

> **Technology tools:**
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

> #### To run a production build
>
> - yarn build or npm run build

> # Routing System
>
> ### User routes:
>
> - _/_ is where users will get to login
> - _/register_ is where users will get to create an account
> - _/dashboard_ is where users will get to see all available studios or merchants
> - _/dashboard/studio/:merchantId_ is where users will get to see all sessions for the selected studio screen
> - _/dashboard/studio/:merchantId_ is where users will get to book a studio session
>
> ### Merchant/Studio routes:
>
> - _/merchant/login_ is where merchants will get to login
> - _/merchant/register_ is where merchants will get to create an account
> - _/merchant/dashboard_ is where merchants will get to see their sessions, embeddable widget code, and also search options
> - _/merchant/session/create_ is where merchants will get to create a studio session
