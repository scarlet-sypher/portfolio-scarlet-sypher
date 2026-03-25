import resumePdf from "../assets/resume/ayush-jha.pdf";
export default function Resume() {
  return (
    <div
      className="h-full w-full flex flex-col"
      style={{ background: "rgba(10,10,18,0.6)" }}
    >
      <iframe
        src={resumePdf}
        title="Resume"
        style={{
          flex: 1,
          width: "100%",
          border: "none",
          background: "transparent",
        }}
      />
    </div>
  );
}
