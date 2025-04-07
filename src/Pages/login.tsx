import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useState } from "react"
import { FcGoogle } from "react-icons/fc"
import { auth } from "../firebase"
import toast from "react-hot-toast"
import { useLoginMutation } from "../redux/api/userAPI"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { MessageResponse } from "../types/api-types"


const Login = () => {
const [gender,setgender]= useState("")
const [date,setdate]= useState("")

const [login] = useLoginMutation();

const [isUserExist, setIsUserExist] = useState<boolean>(false)

const loginHandler = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    const res = await login({
      name: user.displayName!,
      email: user.email!,
      photo: user.photoURL!,
      gender:gender,
      role: "user",
      dob: date,
      _id: user.uid,
    });

    console.log(res);
    
    if ("data" in  res) {
      toast.success(res.data?.message || "Operation Successful");
      // const data = await getUser(user.uid);
      // dispatch(userExist(data?.user!));
    } else {
      const error = res.error as FetchBaseQueryError;
      const message = (error.data as MessageResponse).message;
      toast.error(message);
    //   dispatch(userNotExist());
    }
  } catch (error) {
    toast.error("Sign In Fail");
  }
};

  return (
    <div className="login">
        <main>
            
            {isUserExist?
            <>
            <h1 className="heading">Sign In</h1>
            <div>
                <button onClick={loginHandler}>
                    <FcGoogle/><span>Sign in with Google</span>
                </button>
            </div>
            </>:
            <>
            <h1 className="heading">Sign Up</h1>
            <div>
                <label>Gender</label>
                <select value={gender} onChange={e=>setgender(e.target.value)}>
                <option value="">Select Gneder</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                </select>
            </div>
            <div>
                <label>Date of birth</label>
                <input type="date" value={date} onChange={(e)=> setdate(e.target.value)}/>
            </div>

            <div>
                <button onClick={loginHandler}>
                    <FcGoogle/><span>Sign in with Google</span>
                </button>
            </div>
            </>}
            <div className="heading" >or</div>
            <div className="heading" style={{cursor:"pointer"}}
            onClick={()=>setIsUserExist(!isUserExist)}> {isUserExist?"Login":"SignUp"}</div>
            
        </main>
    </div>
  )
}

export default Login