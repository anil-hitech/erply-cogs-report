import AppDrawer from "../components/AppDrawer";

const Layout = () => {
  // const [params] = useSearchParams();

  // const {
  //   client: { setClientCode },
  // } = useAppContext();

  // params.has("clientCode") && setClientCode(params?.get("clientCode"));

  return (
    <div className="flex flex-row ">
      <AppDrawer />
    </div>
  );
};

export default Layout;
