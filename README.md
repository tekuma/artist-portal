![TEKUMA](https://artist.tekuma.io/logos/logo.png)

Tekuma Artist Portal
=====================
### **NOTE** This app is still in *closed* BETA

##  v0.2  (beta 2)

[logo]:https://artist.tekuma.io/logos/logo.png

NOTE: This README assumes you have authenticated with Google Firebase,
and have the Firebase Command Line Interface (CLI) installed.

#### Development
Development is handled on the local machine. After cloning this repo and navigating
to the CWD, first run:

`npm install`

to install all dependencies/libraries (located in the package.json).
Then, run

`npm run start`

to launch a developmental server on the localhost @
'http://localhost:8080' .

#### Staging
Before this app can be deployed, the ES6+ codebase must be transpiled and
web-packed into a build bundle. To do this, run:

`npm run build`

Then, the /build directory should be ready for deployment. You can serve the
build locally with
`firebase serve`
 -or-
 it can be deployed to a staging enviornment on Google's CDN.
 To do so, do:

 `firebase use staging`

 `firebase deploy -m "Message about the deployment"`

 to deploy to 'https://project-7614141605200030275.firebaseapp.com'

#### Production

Production builds are served through Firebase's static hosting CDN.

To deploy a production build, run:

`npm run build`

to compile all code into the build folder and down compile into "vanilla" JS.
To deploy to 'https://artist.tekuma.io' simply :

`firebase use production`

`firebase deploy -m "Message here"`

 from the root of the project directory.

 
