import CustomPasswordInput from "@/components/FormItems/CustomPasswordInput";
import CustomTextInput from "@/components/FormItems/CustomTextInput";
import { StarIcon } from "@chakra-ui/icons";
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import Logo from "./Logo";

import authServices from "@/services/auth";

import { setLogin } from "@/redux/slices/appSlice";
import useToastMessage from "@/utils/useToastMessage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styles from "./styles.module.scss";

export default function FormLogin() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const { colorMode } = useColorMode();
  const { showError, showSuccess } = useToastMessage();
  const [loading, setLoading] = useState(false);
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Your email is invalid")
      .required("Email is required to input"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required to input"),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (values: any) => {
    setLoading(true);
    authServices
      .login(values)
      .then((res: any) => {
        localStorage.setItem("token", res?.token);
        localStorage.setItem("refreshToken", res?.refreshToken);
        dispatch(setLogin(true));
        showSuccess("Success", "Login successfully");
        router.push("/");
      })
      .catch((err) => {
        showError(
          "Error",
          "Email or password is incorrect. Please check again."
        );
        // console.log(err?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loginWithSocial = (social: string) => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/${social}?redirect_url=${window.location.origin}`;
  };

  return (
    <Box
      className={styles.parent}
      bg={colorMode === "dark" ? "gray.900" : "white.100"}
      w={{ base: "100%", md: "40%" }}
    >
      <Box className={styles.formContainer}>
        <Logo sx={{ display: { base: "flex", md: "none" } }} />
        <Text
          className={styles.text}
          color={colorMode === "dark" ? "green.00" : "green.800"}
        >
          <StarIcon
            sx={{ display: { base: "none", md: "inline-block" } }}
            color="green.300"
          />{" "}
          {t("Login to use more features")}
        </Text>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "100%" }}
        >
          <CustomTextInput
            label="Email"
            error={errors["email"]}
            register={register("email")}
            isRequired={true}
            placeholder="Please enter email"
          />
          <CustomPasswordInput
            label="Password"
            error={errors["password"]}
            register={register("password")}
            isRequired={true}
            placeholder="Please enter password"
          />
          <Button
            isLoading={loading}
            type="submit"
            size="lg"
            width="100%"
            colorScheme="teal"
            sx={{ mt: "16px" }}
            bgGradient="linear(to-r, teal.500, green.500)"
            _hover={{
              bgGradient: "linear(to-r, red.500, yellow.500)",
            }}
          >
            {t("Login")}
          </Button>
        </form>
        <Box position="relative" pt={10} pb={10}>
          <Divider />
          <AbsoluteCenter
            color="gray.500"
            bg={colorMode === "dark" ? "gray.900" : "white"}
            px="4"
          >
            {t("or")}
          </AbsoluteCenter>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Button
            size="lg"
            colorScheme="teal"
            variant="outline"
            leftIcon={<Image src="/images/google.png" alt="" width={30} />}
            onClick={() => loginWithSocial("google")}
          >
            <Text width={220} textAlign="left">
              {t("Continue with Google")}
            </Text>
          </Button>
          <Button
            size="lg"
            colorScheme="teal"
            variant="outline"
            leftIcon={<Image src="/images/facebook.svg" alt="" width={30} />}
            onClick={() => loginWithSocial("facebook")}
          >
            <Text width={220} textAlign="left">
              {t("Continue with Facebook")}
            </Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
