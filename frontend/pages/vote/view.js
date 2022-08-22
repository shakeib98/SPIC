import {
  Box,
  Button,
  TextField,
  Container,
  Stack,
  Heading,
  Text,
  Input,
} from "@chakra-ui/react";
import Table from "../../components/table";
import Dialog from "../../components/Dialog";
import CopyComponent from "../../components/copy-component";
import Loader from "../../components/progress";
import { capitalizeFirstLetter } from "../../util";
import { ArrowForwardIcon, MinusIcon } from "@chakra-ui/icons";
import format from "date-fns/format";
import { parseISO } from "date-fns";

function View(props) {
  const becomeVoterModalProps = {
    title: "Become a voter",
    handleSubmit: props.isVoterCompleted
      ? props.toggleBecomeVoterModal
      : props.onBecomeVoterClick,
    handleClose: props.toggleBecomeVoterModal,
    open: props.becomeVoterModal,
    submitLabel: props.isVoterCompleted ? "Ok" : "Submit",
    loader: props.loader,
  };
  const withdrawNftModalProps = {
    title: "Withdraw NFT",
    handleSubmit: props.withdrawNFT,
    handleClose: props.togglewithdrawNftModal,
    open: props.withdrawNftModal,
    submitLabel: "Withdraw",
    loader: props.loader,
  };
  const castVoteModalProps = {
    title: "Cast a vote",
    handleSubmit: props.onVoteClick,
    handleClose: props.onToggleCastVoteModal,
    open: props.castVoteModal,
    submitLabel: "vote",
    loader: props.loader,
  };
  return (
    <>
      <Container mb={20} {...props}>
        <Stack>
          <Heading
            _light={{
              color: "brand.600",
            }}
            fontWeight="semibold"
            textTransform="uppercase"
            letterSpacing="wide"
            mb={4}
            mt={10}
            textAlign="center"
          >
            Vote In Circle
          </Heading>
          <Text style={{marginBottom:"15px"}}>
            {`You can start voting in this ${capitalizeFirstLetter(
              props.table.name
            )} Circle of ${capitalizeFirstLetter(
              props.table.organizationName
            )} Organization. Just become a voter in this organization and vote for your preferred contributor in this circle.`}
          </Text>
          <Button
            size={"lg"}
            fontWeight={"bold"}
            px={6}
            colorScheme={"red"}
            bg={"red.400"}
            _hover={{ bg: "red.500" }}
            onClick={props.toggleBecomeVoterModal}
          >
            Become Voter
          </Button>
        </Stack>
        <Stack>
          <Heading
            _light={{
              color: "brand.600",
            }}
            fontWeight="semibold"
            // textTransform="uppercase"
            letterSpacing="wide"
            mb={4}
            mt={10}
            textAlign="center"
          >
            Circle Information
          </Heading>
          <Text mb={5}>
            You can vote for the contributors listed below after you have become
            a voter in this circle. The voting in the circle must be done during
            the below mentioned epoch.
          </Text>
          <Box
            style={{ margin: "20px 0px 20px 0px" }}
            p={5}
            shadow="lg"
            borderWidth="1px"
            borderRadius={5}
          >
            <Stack direction={"row"} justifyContent={"space-around"} mb={3}>
              <Text fontWeight={"bold"}>Epoch From</Text>
              <Text fontWeight={"bold"}>Epoch To</Text>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-around"}>
              <Text>
                {props.table.epochFrom &&
                  format(parseISO(props.table.epochFrom), "dd/MM/yyyy")}
              </Text>
              <Text>
                {props.table.epochTo &&
                  format(parseISO(props.table.epochTo), "dd/MM/yyyy")}
              </Text>
            </Stack>
          </Box>
          <Box
            style={{ margin: "0px 0px 20px 0px" }}
            p={5}
            shadow="lg"
            borderWidth="1px"
            borderRadius={5}
          >
            <Stack direction={"row"} justifyContent={"space-around"} mb={3}>
              <Text w="80%" textAlign={"center"} fontWeight={"bold"}>
                Contributors
              </Text>
              <Text fontWeight={"bold"}>Action</Text>
            </Stack>
            {props.table.contributors?.map((el) => {
              return (
                <Stack direction={"row"} justifyContent={"space-between"}>
                  <Text w="75%" noOfLines={1}>
                    {el}
                  </Text>
                  <Text
                  textAlign={"end"}
                    cursor={"pointer"}
                    onClick={() =>
                      el.toString().toLowerCase() ===
                      props.account?.toString().toLowerCase()
                        ? props.onGetReward(el)
                        : props.onToggleCastVoteModal(el)
                    }
                  >
                    {el.toString().toLowerCase() ===
                    props.account?.toString().toLowerCase()
                      ? "Get Reward"
                      : "Vote"}
                  </Text>
                </Stack>
              );
            })}
          </Box>
        </Stack>
        <Stack>
          <Heading
            _light={{
              color: "brand.600",
            }}
            fontWeight="semibold"
            // textTransform="uppercase"
            letterSpacing="wide"
            mb={4}
            mt={10}
            textAlign="center"
          >
            Vote Information
          </Heading>
          <Text>
            Currently the circle supports 8 participants who can vote in the
            circle, below mentioned stats shows how many voters have contributed
            in this circle. After the epoch is ended voters can withdraw their
            NFT with their reward for voting in the circle.
          </Text>
          <Box
            style={{ margin: "20px 0px 20px 0px" }}
            p={5}
            shadow="lg"
            borderWidth="1px"
            borderRadius={5}
          >
            <Stack direction={"row"} justifyContent={"space-around"} mb={3}>
              <Text fontWeight={"bold"}>Voters Count</Text>
              <Text fontWeight={"bold"}>Votes Casted</Text>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-around"}>
              <Text>
                {props.table.voterCount ? `0${props.table.voterCount}` : 0}/08
              </Text>
              <Text>
                {props.table.votesCount ? `0${props.table.votesCount}` : 0}/08
              </Text>
            </Stack>
          </Box>
          <Button
            size={"lg"}
            fontWeight={"bold"}
            px={6}
            colorScheme={"red"}
            bg={"red.400"}
            _hover={{ bg: "red.500" }}
            onClick={props.togglewithdrawNftModal}
          >
            Withdraw
          </Button>
        </Stack>
        <Dialog {...becomeVoterModalProps}>{voterView(props)}</Dialog>
        <Dialog {...withdrawNftModalProps}>{withdrawView(props)}</Dialog>
        <Dialog {...castVoteModalProps}>{castVoteView(props)}</Dialog>
      </Container>
    </>
  );
}

export default View;

function voterView(props) {
  return (
    <div>
      {props.isVoterCompleted ? (
        <div>
          <p style={{ fontSize: "small", marginTop: "0px" }}>
            {`Notice, kindly copy the bellow information for further process, this will be needed when you'll be casting a vote or withdrawing your NFT.`}
          </p>

          <CopyComponent {...props} />
        </div>
      ) : (
        <div>
          <p style={{ fontSize: "small", marginTop: "0px" }}>
            We need a bit of information from you before you become a voter.{" "}
            <br />
            Anyone holding Nft of this organization is eligible to become a
            voter.
            <br />
            If you want to become a voter in this organization kindly enter the
            Nft id that will be securely locked in contract.
          </p>
          <Input
            style={{
              width: "400px",
              marginTop: "20px",
              // border: "1px solid grey",
              background: "inherit",
            }}
            name="nft"
            value={props?.nft}
            id="nft"
            placeholder="NFT ID"
            onChange={props?.onChange}
          />
        </div>
      )}
    </div>
  );
}

function withdrawView(props) {
  return (
    <div>
      <p style={{ fontSize: "small", marginTop: "0px" }}>
        We need a bit of information from you before you withdraw NFT. <br />
        Anyone who had become a voter by locking the Nft can withdraw their Nft
        by simply giving below information.
      </p>
      <Input
        style={{ width: "400px", marginTop: "10px", background: "inherit" }}
        name="nullifier"
        value={props?.identity.nullifier}
        id="nullifier"
        placeholder="Nullifier"
        onChange={props?.onChangeIdentity}
      />
      <Input
        style={{ width: "400px", marginTop: "10px", background: "inherit" }}
        name="trapdoor"
        value={props?.identity.trapdoor}
        id="trapdoor"
        placeholder="Trapdoor"
        onChange={props?.onChangeIdentity}
      />
      <Input
        style={{ width: "400px", marginTop: "10px", background: "inherit" }}
        name="secret"
        value={props?.identity.secret}
        id="secret"
        placeholder="Secret"
        onChange={props?.onChangeIdentity}
      />{" "}
      <Input
        style={{ width: "400px", marginTop: "10px", background: "inherit" }}
        name="contributor"
        value={props?.contributor}
        id="contributor"
        placeholder="Contributor Address"
        onChange={props?.onChangeAddress}
      />
    </div>
  );
}

function castVoteView(props) {
  return (
    <div>
      <p style={{ fontSize: "small", marginTop: "0px" }}>
        We need a bit of information from you before you cast a vote. <br />
        Anyone who had become a voter by locking the Nft can cast a vote but he
        needs to input the nullifier, trapdoor and secret that was provided to
        him.
        <br />
        Your identity will be hidden and the transaction will be going through a
        relayer.
      </p>
      <Input
        style={{ width: "400px", marginTop: "10px", background: "inherit" }}
        name="nullifier"
        value={props?.identity.nullifier}
        id="nullifier"
        placeholder="Nullifier"
        onChange={props?.onChangeIdentity}
      />
      <Input
        style={{ width: "400px", marginTop: "10px", background: "inherit" }}
        name="trapdoor"
        value={props?.identity.trapdoor}
        id="trapdoor"
        placeholder="Trapdoor"
        onChange={props?.onChangeIdentity}
      />
      <Input
        style={{ width: "400px", marginTop: "10px", background: "inherit" }}
        name="secret"
        value={props?.identity.secret}
        id="secret"
        placeholder="Secret"
        onChange={props?.onChangeIdentity}
      />
    </div>
  );
}

{
  /* <Box
sx={{
  // backgroundColor: "#eef3ed",
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
  {!!props?.voteTable.length ? <Table data={!!props?.voteTable.length ? props?.voteTable : ""} /> : <p
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
        <CopyToClipboard text={JSON.stringify(props.identity.current)} />
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
</Box> */
}
