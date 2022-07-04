import { Button } from "@mui/material";
import Container from "../../components/container";

function View(props) {
  return (
    <>
      <Container {...props}>
        <>
          <h1 style={{ textAlign: "center" }}>Explore Organizations</h1>
          <div>
            {!!props?.circles?.length &&
              props.circles.map((el) => (
                // eslint-disable-next-line react/jsx-key
                <div
                  style={{
                    display: "inline-flex",
                    border: "1px solid lightgrey",
                    borderRadius: 5,
                    margin: "0px 20px 20px 0px",
                    padding: "20px",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <h4 style={{ marginBottom: "-10px" }}>
                    {el.organization} Organization
                  </h4>
                  <p style={{ textAlign: "center" }}>{el.circle} Circle</p>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => props.createACircle(el.id)}
                  >
                    Join
                  </Button>
                </div>
              ))}
          </div>
        </>
      </Container>
    </>
  );
}

export default View;
