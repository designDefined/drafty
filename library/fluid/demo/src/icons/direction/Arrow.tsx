import { IconProps } from "../type";

type ArrowProps = IconProps & { direction: "up" | "down" | "left" | "right" };

export default function Arrow({
  direction,
  width = 24,
  height = 24,
  ...props
}: ArrowProps) {
  return (
    <svg
      className={``}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 12H5m14 0-4 4m4-4-4-4"
      />
    </svg>
  );
}
