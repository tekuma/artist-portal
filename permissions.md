## Firebase Permissions
-  https://firebase.google.com/docs/database/security/
-  https://firebase.google.com/docs/storage/security/

### Database Rules
see: https://console.firebase.google.com/project/artist-tekuma-4a697/database/rules
The Firebase DB is a hierarchical JSON style data store. Inside of the namespace
of the project, access is denied by default, and must be granted before anyone can access.
For example, to grant read access to any authenticated user, add `".read" : "auth.uid != null",`
to the root of the structure.
In the artist portal,


### Storage Rules
see: https://console.firebase.google.com/project/artist-tekuma-4a697/storage/rules
Goals:
	- only allow users to store data in folder with their UID
    - - OR from the admin white-list 
	- Set maximum size for any uploaded file to xMB
	- File type restrictions?
