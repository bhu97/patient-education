import env from "react-native-config";

export const envConfiguration = {
  api: {
    host: env.BASE_URL,
    timeout: 400000,
    timeoutErrorMessage: "Something Went Wrong!",
  },
  envName : env.ENV_NAME,
};
