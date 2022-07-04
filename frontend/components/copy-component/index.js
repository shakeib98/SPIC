export default function CopyComponent(props) {
  return (
    <div
      style={{
        backgroundColor: "lightgray",
        padding: "10px",
        borderRadius: "5px",
      }}
    >
      <div style={{ textAlign: "end" }}>
        <span
          style={{
            cursor: "pointer",
            border: "1px solid #0076d4",
            padding: "5px 10px",
            fontSize: "small",
            borderRadius: "5px",
            color: "#0076d4",
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
