import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useStoreState } from "../store";

interface Props {
  children: any;
  loggedInRedirect?: string;
  loggedOutRedirect?: string;
}

export function AuthGuard(props: Props) {
  const loggedIn = useStoreState((state) => state.loggedIn);
  const rehydrated = useStoreState((state) => state.rehydrated);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn === true && props.loggedInRedirect) {
      history.replace(props.loggedInRedirect);
    }

    if (loggedIn === false && props.loggedOutRedirect) {
      history.replace(props.loggedOutRedirect);
    }
  });

  if (!rehydrated) return null;

  return rehydrated ? props.children : null;
}
