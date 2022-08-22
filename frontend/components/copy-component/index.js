export default function CopyComponent(props) {
  return (
    <div
      style={{
        // backgroundColor: "lightgray",
        padding: "10px",
        borderRadius: "5px",
        marginTop: "5px"
      }}
    >
      <div style={{ textAlign: "end" }}>
        <span
          style={{
            cursor: "pointer",
            border: "1px solid #F56565",
            padding: "5px 10px",
            fontSize: "small",
            borderRadius: "5px",
            color: "#F56565",
          }}
          onClick={() => {
            navigator.clipboard.writeText(`{
              "nullifier":"${props.identity.nullifier}",
              "trapdoor":"${props.identity.trapdoor}",
              "secret":"${props.identity.secret}"
            }`);
            props.openToast("Text Copied to clipboard!!");
          }}
        >
          Copy
        </span>
      </div>
      <pre>{`{
"nullifier":"${props.identity.nullifier}",
"trapdoor":"${props.identity.trapdoor}",
"secret":"${props.identity.secret}"
}`}</pre>
    </div>
  );
}
