Tekuma Artist Portal
=====================
### **NOTE** this code contains *proprietary* encryption keys!
### Do Not Distribute.

[logo]:https://artist.tekuma.io/logos/logo.png
![TEKUMA](https://artist.tekuma.io/logos/logo.png)

#### Development

To run a local developmental instance, clone this repo, and navigate to the CWD.
Then, do:
`npm install`
to install all dependencies and npm modules.
After installation, run:
`npm run start`
to host a local server at 'http://localhost:8080'.

#### Production
First, run `npm run build` to compile all code into the build folder
and down compile ES6 into "vanilla" JS.
To deploy to artist.tekuma.io , you must be authenticated with Google Firebase,
and have the Firebase Command Line Interface (CLI) installed. If so, simply do:
`firebase deploy`  from the root of the CWD.
