import { Button, Chip } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Services from "../classes/fetch";
import Container from "../components/container";
import { getStorageItem, setStorageItem } from "../util";

function Home() {
  const [isUserDataExist, setUserDataBool] = useState(false);
  const [userCircles, setUserCircles] = useState([]);

  const { account, library } = useWeb3React();
  const router = useRouter();

  const isConnected = typeof account === "string" && !!library;

  const setInitialData = async () => {
    const circleData = await getStorageItem("circleData");
    await setStorageItem("circleData", circleData ? circleData : {});
    const publicCircles = await getStorageItem("publicCircles");
    await setStorageItem("publicCircles", publicCircles ? publicCircles : []);
    const getVotingDetails = await getStorageItem("votingDetails");
    await setStorageItem(
      "votingDetails",
      getVotingDetails ? getVotingDetails : []
    );
  };

  const fetchUserInfo = async () => {
    const res = await Services.Get("/");
    const data = await getStorageItem("circleData");
    // const publicCircles = await getStorageItem("publicCircles");
    const circles = data[account] ? data[account] : [];
    console.log("circlesss -->", circles);
    if (data && data[account]) {
      setUserDataBool(true);
    }
    setUserCircles(circles);
  };

  useEffect(() => {
    console.log("library -->", library);
    setInitialData();
    fetchUserInfo();
  }, [account]);

  return (
    <div>
      <Container>
        {isConnected && (
          <>
            <h1 style={{ textAlign: "center" }}>Welcome</h1>
            {!isUserDataExist ? (
              <>
                {" "}
                <p>{`This wallet isn't associated with a circle.`}</p>
                <p>
                  {`If you are supposed to be part of a circle already,
                        contact your circle's admin to make sure they added this
                        address`}
                  : {account}
                </p>
                <p>Or, create a new circle.</p>
              </>
            ) : (
              <>
                <p>Hey {account}, welcome back start managing your circles,</p>
                <p>or explore other organizations.</p>
              </>
            )}
            <div style={{ textAlign: "center" }}>
              <Button
                style={{ marginRight: "15px" }}
                variant="contained"
                onClick={() => router.push("/explore")}
              >
                Explore Organizations
              </Button>
              <Button
                variant="contained"
                onClick={() => router.push("/circle")}
              >
                Start a Circle
              </Button>
            </div>
            <div>
              <h3>{`Manage your circles:`}</h3>
              {!!userCircles.length ? (
                userCircles.map((el) => {
                  console.log("el ---", el);
                  // const isAdmin = el.user.filter(
                  //   (els) => els.Contributers === account && els.Admin === "Yes"
                  // );

                  return (
                    // eslint-disable-next-line react/jsx-key
                    <div
                      style={{
                        padding: "30px",
                        backgroundColor: "#efefef",
                        borderRadius: 10,
                        marginBottom: "20px",
                      }}
                    >
                      <div style={{ display: "inline-block", width: "30%" }}>
                        <h2>{el.user.circleName} Circle</h2>
                        <h5>{el.user.organizationName} Organization</h5>
                      </div>
                      <div style={{ display: "inline-block", width: "40%" }}>
                        <p>
                          Epoch: {format(parseISO(el.epoch.from), "MM/dd/yyyy")}{" "}
                          to {format(parseISO(el.epoch.to), "MM/dd/yyyy")}
                        </p>
                      </div>
                      <div style={{ display: "inline-block", width: "30%" }}>
                        <Chip
                          onClick={() => router.push("/admin/" + el.user.id)}
                          label="Manage"
                          variant="outlined"
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div
                  style={{
                    padding: "30px",
                    backgroundColor: "#efefef",
                    borderRadius: 10,
                    marginBottom: "20px",
                  }}
                >
                  <p style={{ textAlign: "center" }}>No circles found</p>
                </div>
              )}
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

export default Home;
