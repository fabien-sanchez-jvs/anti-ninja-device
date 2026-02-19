import { useStore } from "../store";

export function NinjaMarker() {
  const { ninja } = useStore();
  if (!ninja) return null;
  return <div className="ninja-marker" style={{
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.09)",
    border: "none",
    width: "5px",
    height: "5px",
    borderRadius: "50%",
  }} />;
}
