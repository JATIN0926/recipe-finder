import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OAuth from "../components/OAuth/OAuth";
import toast from "react-hot-toast";
function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    // console.log(formData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await axios.post("/api/auth/signup", formData);
      console.log(res);
      const data = res.data;
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.data.message === "Signup successfully!") {
        toast.success("Registered Successful!");
        navigate("/sign-in");
      }
      // console.log(data);
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className=" mt-5 mbMedium:mt-20 w-screen max-w-full  ">
      <div className="  h-full p-3 w-full  mx-auto flex items-center justify-center gap-5">
        <div className=" w-full flex flex-col items-center justify-center gap-3 mbMedium:gap-4">
          <h1 className=" text-xl mbMini:text-2xl mbSmall:text-3xl font-bold">Register Your Account!</h1>
          <form className="flex flex-col gap-4 w-full mbSmall:w-1/2" onSubmit={handleSubmit}>
            <div>
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
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
                placeholder="Password"
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
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-base mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Sign In
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

export default SignUp;
