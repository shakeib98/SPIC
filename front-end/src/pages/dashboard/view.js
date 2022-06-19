import { Button } from "@mui/material";
import Container from "../../component/container";
import { walletContext } from "../../utils";

function View(props) {
  return (
    <>
      <Container {...props}>
        <walletContext.Consumer>
          { wallet  => {
              console.log('wallet -->',wallet)
            return (
              wallet && (
                <>
                  <h1 style={{ textAlign: "center" }}>Welcome</h1>
                  <p>This wallet isn't associated with a circle.</p>
                  <p>
                    If you are supposed to be part of a circle already, contact
                    your circle's admin to make sure they added this address:{" "}
                    {wallet}
                  </p>
                  <p>Or, create a new circle.</p>
                  <div style={{ textAlign: "center" }}>
                    <Button variant="contained" onClick={props.createACircle}>
                      Start a Circle
                    </Button>
                  </div>
                </>
              )
            );
          }}
        </walletContext.Consumer>
      </Container>
    </>
  );
}

export default View;
