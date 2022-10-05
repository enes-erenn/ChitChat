import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";
import App from "../components/App/App";

const Home = () => {
  const router = useRouter();
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      router.push("/register");
    }
    if (currentUser) {
      setIsLoading(false);
    }
  }, [router, currentUser]);

  if (isLoading) {
    return (
      <>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          Loading...
        </p>
      </>
    );
  }

  if (currentUser === false) {
    return router.push("/register");
  }

  if (currentUser && !isLoading) {
    return (
      <>
        <App />
      </>
    );
  }
};

export default Home;
