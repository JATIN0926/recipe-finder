import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import { signInSucess } from "../../redux/user/UserSlice.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await axios.post(
        "/api/auth/google",
        {
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          photoURL: resultsFromGoogle.user.photoURL,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("res", res);

      const data = res.data;

      if (res.statusText === "OK") {
        dispatch(signInSucess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}
