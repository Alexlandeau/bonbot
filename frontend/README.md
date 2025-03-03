# Demo Frontend

This project was bootstrapped with [Vite](n).

The project needs a .env file at its root to retrieve necessary env variables. The needed .env file looks as follows:

```
VITE_IPCC_SCAN_URL=your_scan_notebook_url
VITE_IPCC_RAGET_URL=your_raget_notebook_url
VITE_IPCC_HUB_URL=your_hub_url
VITE_BACKEND_URL=your_bakend_url
```

Dev backend URL is: `http://localhost:5000`

## Deployment

The app is containerized and served using nginx which is exposed on the container's port 80

## Available Scripts

In the project directory, you can run:

### `npm install`

Setup the project's environment

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://vitejs.dev/guide/static-deploy.html) for more information.


## Run bonbot

App is available at http://localhost:5173/bonbot