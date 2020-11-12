import React from "react";
import { useStoreActions } from "../store";

export function Dashboard(props: any) {
  const actions = useStoreActions((actions) => actions);

  function handleLogoutClick() {
    actions.destroySession();
  }

  return (
    <div>
      <hr />
      <h2>Dashboard</h2>
      <button onClick={handleLogoutClick}>Logout</button>
      <hr />
      {props.children}
    </div>
  );
}
