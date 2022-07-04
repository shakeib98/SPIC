import { Box, Button, TextField } from "@mui/material";
import Container from "../../components/container";
import Table from "../../components/table";
import Dialog from "../../components/Dialog";
import CopyComponent from "../../components/copy-component";
import Loader from "../../components/progress"

function View(props) {
  console.log("admin --->", props);
  const becomeVoterModalProps = {
    title: "Become a voter",
    handleSubmit: props.isVoterCompleted
      ? props.toggleBecomeVoterModal
      : props.onBecomeVoterClick,
    handleClose: props.toggleBecomeVoterModal,
    open: props.becomeVoterModal,
    submitLabel: props.isVoterCompleted ? "Ok" : "Submit",
    loader: props.loader
  };
  const withdrawNftModalProps = {
    title: "Withdraw NFT",
    handleSubmit: props.withdrawNFT,
    handleClose: props.togglewithdrawNftModal,
    open: props.withdrawNftModal,
    submitLabel: "Withdraw",
    loader: props.loader
  };
  const castVoteModalProps = {
    title: "Cast a vote",
    handleSubmit: props.onVoteClick,
    handleClose: props.onToggleCastVoteModal,
    open: props.castVoteModal,
    submitLabel: "vote",
    loader: props.loader
  };

  return (
    <>
      <Container {...props}>
        <Box
          sx={{
            backgroundColor: "#eef3ed",
            padding: "0px 20px",
            borderRadius: 2,
            marginTop: 5,
            paddingBottom: 2,
            marginBottom: 10,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 style={{ display: "inline-block" }}>{props?.table.circle} Circle</h1>
            <div style={{ display: "inline-block", marginTop: 25 }}>
              <Button
                style={{ marginRight: 10 }}
                variant="outlined"
                onClick={props.togglewithdrawNftModal}
              >
                Withdraw
              </Button>
              <Button variant="outlined" onClick={props.toggleBecomeVoterModal}>
                Become Voter
              </Button>
            </div>
          </div>
          <p
            style={{
              margin: "0px",
              marginTop: "-22px",
              fontSize: "small",
              textAlign: "end",
            }}
          >
            {" "}
            <span style={{ fontWeight: "bold" }}>{`Voter's Count:`}</span>{" "}
            {`${props.circleIndex.voterIndex}/8`}
          </p>
          <p style={{ marginTop: 0 }}>
            Become a voter in this circle and start voting for your favourite
            contributer.
          </p>
          <div>
            <h4>Epoch Details</h4>
            {props?.table?.epoch ? (
              <Table data={[props?.table?.epoch]} />
            ) : (
              <p
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                <Loader />
              </p>
            )}
          </div>
          <div>
            <h4>Contributor Details</h4>
            { !!props?.voteTable.length ? <Table data={!!props?.voteTable.length ? props?.voteTable : ""} /> : <p
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                No Contributors
              </p>
            }
          </div>
          <Dialog {...becomeVoterModalProps}>
            <>
              {props.isVoterCompleted ? (
                <>
                  <p style={{ fontSize: "small", marginTop: "0px" }}>
                    {`Notice, kindly copy the bellow information for further process, this will be needed when you'll be casting a vote or withdrawing your NFT.`}
                  </p>
                  {/* <CopyToClipboard text={JSON.stringify(props.identity.current)} /> */}
                  <CopyComponent {...props} />
                </>
              ) : (
                <>
                  <p style={{ fontSize: "small", marginTop: "0px" }}>
                    We need a bit of information from you before you become a
                    voter. <br />
                    Anyone holding Nft of this organization is eligible to
                    become a voter.
                    <br />
                    If you want to become a voter in this organization kindly
                    enter the Nft id that will be securely locked in contract.
                  </p>
                  <TextField
                    style={{ width: "400px", marginTop: "10px" }}
                    name="nft"
                    value={props?.nft}
                    id="nft"
                    label="NFT ID"
                    variant="outlined"
                    onChange={props?.onChange}
                  />
                </>
              )}
            </>
          </Dialog>
          <Dialog {...withdrawNftModalProps}>
            <p style={{ fontSize: "small", marginTop: "0px" }}>
              We need a bit of information from you before you withdraw NFT.{" "}
              <br />
              Anyone who had become a voter by locking the Nft can withdraw
              their Nft by simply giving below information.
            </p>
            <TextField
              style={{ width: "400px", marginTop: "10px" }}
              name="nullifier"
              value={props?.identity.nullifier}
              id="nullifier"
              label="Nullifier"
              variant="outlined"
              onChange={props?.onChangeIdentity}
            />
            <TextField
              style={{ width: "400px", marginTop: "10px" }}
              name="trapdoor"
              value={props?.identity.trapdoor}
              id="trapdoor"
              label="Trapdoor"
              variant="outlined"
              onChange={props?.onChangeIdentity}
            />
            <TextField
              style={{ width: "400px", marginTop: "10px" }}
              name="secret"
              value={props?.identity.secret}
              id="secret"
              label="Secret"
              variant="outlined"
              onChange={props?.onChangeIdentity}
            />{" "}
            <TextField
              style={{ width: "400px", marginTop: "10px" }}
              name="contributor"
              value={props?.contributor}
              id="contributor"
              label="Contributor Address"
              variant="outlined"
              onChange={props?.onChangeAddress}
            />
          </Dialog>
          <Dialog {...castVoteModalProps}>
            <p style={{ fontSize: "small", marginTop: "0px" }}>
              We need a bit of information from you before you cast a vote.{" "}
              <br />
              Anyone who had become a voter by locking the Nft can cast a vote
              but he needs to input the nullifier, trapdoor and secret that was
              provided to him.
              <br />
              Your identity will be hidden and the transaction will be going
              through a relayer.
            </p>
            <TextField
              style={{ width: "400px", marginTop: "10px" }}
              name="nullifier"
              value={props?.identity.nullifier}
              id="nullifier"
              label="Nullifier"
              variant="outlined"
              onChange={props?.onChangeIdentity}
            />
            <TextField
              style={{ width: "400px", marginTop: "10px" }}
              name="trapdoor"
              value={props?.identity.trapdoor}
              id="trapdoor"
              label="Trapdoor"
              variant="outlined"
              onChange={props?.onChangeIdentity}
            />
            <TextField
              style={{ width: "400px", marginTop: "10px" }}
              name="secret"
              value={props?.identity.secret}
              id="secret"
              label="Secret"
              variant="outlined"
              onChange={props?.onChangeIdentity}
            />
          </Dialog>
        </Box>
      </Container>
    </>
  );
}

export default View;
