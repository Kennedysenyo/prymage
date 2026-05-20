export type ResendOTPState = {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
};

type ResendOTPAction =
  | {
      type: "LOADING";
    }
  | { type: "SUCCESS"; payload: string }
  | { type: "ERROR"; payload: string };

export const resendOTPReducer = (
  state: ResendOTPState,
  action: ResendOTPAction,
): ResendOTPState => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null, successMessage: null };
    case "SUCCESS":
      return { loading: false, error: null, successMessage: action.payload };
    case "ERROR":
      return { loading: false, error: action.payload, successMessage: null };
    default:
      return state;
  }
};
