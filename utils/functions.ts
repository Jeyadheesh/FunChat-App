// import { doc, getDoc } from "firebase/firestore";
// import useLoader from "../store/useLoaders";
// import useUser from "../store/useUser";
// import { db } from "../config/firebase";

// export const getUserData = async (userId: any) => {
//   const { userData, setUserData } = useUser();
//   const { imgLoading, setImgLoading } = useLoader();
//   try {
//     setImgLoading(true);
//     const docRef = doc(db, "users", userId);
//     const docSnap = await getDoc(docRef);
//     setUserData(docSnap.data());
//     console.log(docSnap.data());
//     setImgLoading(false);
//   } catch (error) {
//     console.log(error.message);
//     setImgLoading(false);
//   }
// };
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const handleUploadImg = async (curUserUid: any, receiverUid: any) => {
  try {
    console.log("upload img in ");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      // base64: true,
    });

    if (!result.canceled) {
      const messagesRef = collection(db, `messages`);
      // console.log(result);
      //   setImageUri(result.assets[0].uri);
      // console.log()
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();

      const imagesRef = ref(storage, "messageImgs/" + Date.now());
      const uploadTask = uploadBytesResumable(imagesRef, blob);

      uploadTask.on("state_changed", (snapshot) => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // console.log("File available at", downloadURL);
          const docData = await addDoc(messagesRef, {
            senderUid: curUserUid,
            receiverUid: receiverUid,
            message: downloadURL,
            isString: false,
            createdAt: serverTimestamp(),
            createdDate: new Date(Date.now()).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
            createdTime: new Date(Date.now()).toLocaleTimeString(),
          });
        });
      });
    } else {
      console.log("Image Picker Canceled");
    }
  } catch (error) {
    console.log(error.message);
  } finally {
    return false;
  }
};
