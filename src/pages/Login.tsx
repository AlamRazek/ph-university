import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/features/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHform from "../components/form/PHform";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  // const { register } = useForm({
  //   defaultValues: {
  //     userId: "0002",
  //     password: "admin12345",
  //   },<<<<<<<<<<<<<<<<<<<<<<
  // });

  const defaultValues = {
    userId: "0002",
    password: "admin12345",
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logged in", { duration: 2000 });

    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      toast.success("Logged in", { id: toastId, duration: 2000 });
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 1000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHform onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type="text" name="userId" label="ID:" />

        <PHInput type="text" name="password" label="Password" />

        <Button htmlType="submit">Login</Button>
      </PHform>
    </Row>
  );
};

export default Login;
