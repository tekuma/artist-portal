// Artist-Tekuma Storage Rules:
// ===========================

// Goals:
// 			- only allow users to store data in folder with their UID
// 			- Set maximum size for any uploaded file to xMB
// 			- File type restrictions?
//
//
//
// service firebase.storage {
//   match /b/art-uploads/o { //match our storage bucket URL
//      match /portal/{thisUID}/{dir}/{filename} {
//           allow read, write : if (request.auth.uid == thisUID || isAdmin() )
//     }
//   }
// }






// checks if is from an admin user.
function isAdmin() {
		return (request.auth.uid == 'cacxZwqfArVzrUXD5tn1t24OlJJ2' ||
    		request.auth.uid == 'JZ2H4oD34vaTwHanNVPxKKHy3ZQ2' ||
            request.auth.uid == 'naomiUID' ||
            request.auth.uid == 'scottUID' ||
            request.auth.uid == 'marwanUID' );
}

function hasPermission(uid) {
    return (request.auth.uid == uid)
}

function uploadIsLegal(maxSizeInMB) {
    return (request.resource.size <= maxSizeInMB *1024*1024
        && request.resource.contentType.matches('image/.*'))
}

// 20MB set as max file upload size.
function isValidUpload(uid) {
    return ( (hasPermission(uid) || isAdmin()) && uploadIsLegal(20) )
}

// service firebase.storage {
//     match /b/art-uploads/o {
//         match /portal/{thisUID}/{dir}/{filename} {
//             allow read, write: if isValidUpload(thisUID);
//         }
//     }
//  }
//
//
// NOTE: This allows all writing to bucket. Dangerous.
service firebase.storage {
 match /b/art-uploads/o {
   match /{allPaths=**} {
     allow read, write: if true;
   }
 }
}
