## Firebase Permissions
for more info, see:
-  https://firebase.google.com/docs/database/security/
-  https://firebase.google.com/docs/storage/security/

### Database Rules
live at: https://console.firebase.google.com/project/artist-tekuma-4a697/database/rules
edit at: ./database.rules.json
The Firebase DB is a hierarchical JSON style data store. Inside of the namespace
of the project, access is denied by default, and must be granted before anyone can access.
For example, to grant read access to any authenticated user, add `".read" : "auth.uid != null",`
to the root of the structure.
In the artist portal:
-public  // Read by any auth'd user
- -onboarders
- - -{artist UID} // Write if last part of path == UID of requester OR admin user

-_private_
- -onboarders
- - -{artist UID} // Read AND Write if last part of path == UID of requester

-jobs // Read AND Write any auth'd user

### Storage Rules
Edit at  : https://console.firebase.google.com/project/artist-tekuma-4a697/storage/rules
stored at: ./storage.rules.js
Motivation:
	- only allow users to store data in folder with their UID
    - - OR from the admin white-list
	- Set maximum size for any uploaded file to xMB
	- File type restrictions?
