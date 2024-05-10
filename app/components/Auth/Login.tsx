import React,{FC, useState} from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import {AiOutlineEye,AiOutlineEyeInvisible,AiFillGithub} from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"
type Props = {
    setRoute: (route: string) => void
}

const schema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Please enter your Email"),
    password: Yup.string().required("Please enter your Password").min(6),
})

const Login:FC<Props> = (props: Props) => {
    const [show,setShow] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: schema,
        onSubmit: async({email,password}) => {
            console.log(email)
            console.log(password)
        }
    })
  return (
    <div>Login</div>
  )
}

export default Login