// Artist-Tekuma Storage Rules:
// ===========================
// Goals:
// 			- only allow users to store data in folder with their UID
// 			- Set maximum size for any uploaded file to xMB
// 			- File type restrictions?
//
// service firebase.storage {
//   match /b/artist-tekuma-4a697.appspot.com/o { //match our storage bucket URL
//      match /portal/{thisUID}/{dir}/{filename} {
// //          allow read, write: if isLegalReq(thisUID, 50)
//           allow read, write : if (request.auth.uid == thisUID)
//     }
//   }
// }

// // Global Variable: request ; request.auth.uid
// // @param uid :the users uid
// // @param max file size allowed for upload
// function isLegalReq(uid, maxSizeInMB) {
//     return (request.auth.uid == uid && resource.size <= maxSizeInMB *1024*1024)
// }


// // no  rules (too cool for rules):
// service firebase.storage {
//   match /b/artist-tekuma-4a697.appspot.com/o {
//     match /{allPaths=**} {
//       allow read, write: if true;
//     }
//   }
// }

function isAdmin(uid) {
    return (uid == "ADMIN UID" || uid == "other UID")
}

service firebase.storage {
 match /b/art-uploads/o {
   match /{allPaths=**} {
     allow read, write: if true;
   }
 }
}
