import React from "react";
import AdminPromptForm from "./AdminPromptForm";
import AdminFetch from "./AdminFetch";
import ManagementWindow from "./ManagementWindow";


const index = () => {
  return (
    <div>
      <AdminPromptForm />
      <AdminFetch />
      <ManagementWindow />
    </div>
  );
};

export default index;
