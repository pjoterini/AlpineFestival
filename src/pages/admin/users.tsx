import AdminLayout from "@/components/AdminLayout/AdminLayout";
import Head from "next/head";
import { NextPageWithLayout } from "../_app";

const Users: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
    </>
  );
};

Users.getLayout = AdminLayout;

export default Users;
