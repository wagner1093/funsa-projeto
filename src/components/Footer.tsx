export default function Footer() {
  return (
    <div
      style={{
        backgroundColor: "hsl(216, 50%, 16%)",
        height: 300,
        borderWidth: 0,
        borderStyle: "none",
        outline: "none",
        position: "relative",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      <p style={{ color: "white", padding: 40, margin: 0 }}>FOOTER TEST - Se a linha diagonal aparece aqui, o problema vem de CIMA do footer.</p>
    </div>
  );
}
