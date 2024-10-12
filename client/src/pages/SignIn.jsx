import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSucess,
} from "../redux/user/UserSlice";
import OAuth from "../components/OAuth/OAuth";
import toast from "react-hot-toast";
function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    // console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("All Fields are required"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        toast.error("Something went wrong!");
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSucess(data));
        toast.success("Sign in Successful!");
        navigate("/");
      }
      // console.log(data);
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className=" mt-16 mbMedium:mt-20 w-screen max-w-full  ">
      <div className="  h-full p-3 w-full  mx-auto flex items-center justify-center gap-5">
        <div className=" w-full flex flex-col items-center justify-center gap-4">
          <h1 className=" text-xl mbMini:text-2xl font-bold">Sign in to your Account!</h1>
          <form className="flex flex-col gap-4 w-full mbSmall:w-1/2" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="*********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don`t Have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
