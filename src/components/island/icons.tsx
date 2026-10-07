/** Stroke icons shared with the WorkOS app (16×16 grid, currentColor). */
type IconProps = { className?: string };

function Svg({ d, className, fill }: { d: string; className?: string; fill?: boolean }) {
  return (
    <svg
      className={`ico${fill ? " ico-fill" : ""}${className ? ` ${className}` : ""}`}
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

export const Icon = {
  Clipboard: (p: IconProps) => (
    <Svg {...p} d="M6 2.5h4v2H6zM10 3.5h1.5a1 1 0 011 1v8.5a1 1 0 01-1 1h-7a1 1 0 01-1-1V4.5a1 1 0 011-1H6" />
  ),
  Note: (p: IconProps) => <Svg {...p} d="M3.5 2.5h6l3 3v8h-9zM9.5 2.5v3h3M5.5 8.5h5M5.5 11h3.5" />,
  Grid: (p: IconProps) => <Svg {...p} d="M3 3h4v4H3zM9 3h4v4H9zM3 9h4v4H3zM9 9h4v4H9z" />,
  Open: (p: IconProps) => <Svg {...p} d="M6.5 3.5h6v6M12.5 3.5L6 10M10.5 12.5h-7v-7" />,
  Close: (p: IconProps) => <Svg {...p} d="M4 4l8 8M12 4l-8 8" />,
  Palette: (p: IconProps) => (
    <Svg {...p} d="M8 2.5a5.5 5.5 0 100 11c.9 0 1.3-.6 1.1-1.3-.3-.9.3-1.7 1.2-1.7h1.7a1.5 1.5 0 001.5-1.5A5.5 5.5 0 008 2.5zM5.2 7.6h.1M6.8 5.2h.1M9.6 5.2h.1" />
  ),
  Back: (p: IconProps) => <Svg {...p} d="M9.5 3.5L5 8l4.5 4.5" />,
  Speaker: (p: IconProps) => <Svg {...p} d="M2.5 6h2.5l3.5-3v10L5 10H2.5zM11 5.5a3.5 3.5 0 010 5M12.8 3.8a6 6 0 010 8.4" />,
  Muted: (p: IconProps) => <Svg {...p} d="M2.5 6h2.5l3.5-3v10L5 10H2.5zM11 6l3.5 4M14.5 6L11 10" />,
  Play: (p: IconProps) => <Svg {...p} fill d="M5 3.2v9.6L12.8 8z" />,
  Pause: (p: IconProps) => <Svg {...p} fill d="M4.5 3h2.6v10H4.5zM8.9 3h2.6v10H8.9z" />,
  Next: (p: IconProps) => <Svg {...p} fill d="M3 3.5v9l6-4.5zM9 3.5v9l6-4.5z" />,
  Prev: (p: IconProps) => <Svg {...p} fill d="M13 3.5v9L7 8zM7 3.5v9L1 8z" />,
  Music: (p: IconProps) => <Svg {...p} d="M6 12V3.5l7-1.5v8.5M6 12a1.8 1.8 0 11-3.6 0 1.8 1.8 0 013.6 0zM13 10.5a1.8 1.8 0 11-3.6 0 1.8 1.8 0 013.6 0z" />,
  File: (p: IconProps) => <Svg {...p} d="M4 2.5h5l3 3v8H4zM9 2.5v3h3" />,
  Folder: (p: IconProps) => <Svg {...p} d="M2.5 4.5h4l1.5 1.5h5.5v6.5h-11z" />,
  Link: (p: IconProps) => <Svg {...p} d="M7 9a2.5 2.5 0 003.5 0l2-2A2.5 2.5 0 009 3.5l-1 1M9 7a2.5 2.5 0 00-3.5 0l-2 2A2.5 2.5 0 007 12.5l1-1" />,
  Code: (p: IconProps) => <Svg {...p} d="M5.5 4.5L2 8l3.5 3.5M10.5 4.5L14 8l-3.5 3.5" />,
  Text: (p: IconProps) => <Svg {...p} d="M3 4h10M3 7h10M3 10h7M3 13h5" />,
  Image: (p: IconProps) => <Svg {...p} d="M2.5 3.5h11v9h-11zM2.5 10.5l3-3 3 3 2-2 3 3M10.5 6.2a.7.7 0 100 .1" />,
  Camera: (p: IconProps) => <Svg {...p} d="M2.5 5h2.5l1.2-1.5h3.6L11 5h2.5v7.5h-11zM8 10.8a2 2 0 100-4 2 2 0 000 4z" />,
  Lock: (p: IconProps) => <Svg {...p} d="M4 7.5h8v6H4zM5.8 7.5V5.5a2.2 2.2 0 014.4 0v2" />,
  Windows: (p: IconProps) => <Svg {...p} d="M2.5 3.5h11v9h-11zM2.5 6h11" />,
  Gear: (p: IconProps) => (
    <Svg {...p} d="M8 10a2 2 0 100-4 2 2 0 000 4zM8 1.8v1.7M8 12.5v1.7M1.8 8h1.7M12.5 8h1.7M3.6 3.6l1.2 1.2M11.2 11.2l1.2 1.2M3.6 12.4l1.2-1.2M11.2 4.8l1.2-1.2" />
  ),
  More: (p: IconProps) => <Svg {...p} d="M3.5 8h.01M8 8h.01M12.5 8h.01" />,
  Trash: (p: IconProps) => <Svg {...p} d="M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 8.5h5.8l.6-8.5" />,
  Search: (p: IconProps) => <Svg {...p} d="M7 11.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM10.3 10.3L13.5 13.5" />,
  Check: (p: IconProps) => <Svg {...p} d="M3.5 8.5l3 3 6-6.5" />,
  Plus: (p: IconProps) => <Svg {...p} d="M8 3v10M3 8h10" />,
  Chevron: (p: IconProps) => <Svg {...p} d="M4 6l4 4 4-4" />,
  Stop: (p: IconProps) => <Svg {...p} d="M4.5 4.5h7v7h-7z" />,
  Restart: (p: IconProps) => <Svg {...p} d="M12.8 6.5A5 5 0 103 8.8M12.8 2.8v3.7H9.1" />,
  Download: (p: IconProps) => <Svg {...p} d="M8 2.5v8M4.8 7.5L8 10.7l3.2-3.2M3 13.5h10" />,
  Battery: (p: IconProps) => <Svg {...p} d="M2 5h10.5v6H2zM12.5 7h1.5v2h-1.5" />,
  Bolt: (p: IconProps) => <Svg {...p} fill d="M9 1.5L3.5 9h3.8L6.5 14.5 12.5 6.5H8.6z" />,
  WifiOff: (p: IconProps) => <Svg {...p} d="M2 2l12 12M5.5 8.8a3.8 3.8 0 014.2-.6M3 6.3a7.4 7.4 0 013.4-1.8M9.8 4.6A7.4 7.4 0 0113 6.3M8 12.5h.01" />,
  Sparkle: (p: IconProps) => <Svg {...p} d="M8 2l1.3 3.7L13 7l-3.7 1.3L8 12l-1.3-3.7L3 7l3.7-1.3zM12.5 11.5l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5z" />,
  Sun: (p: IconProps) => <Svg {...p} d="M8 10.8a2.8 2.8 0 100-5.6 2.8 2.8 0 000 5.6zM8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M3.4 12.6l1.1-1.1M11.5 4.5l1.1-1.1" />,
  Moon: (p: IconProps) => <Svg {...p} d="M12.8 9.8A5.3 5.3 0 016.2 3.2a5.3 5.3 0 106.6 6.6z" />,
  Cloud: (p: IconProps) => <Svg {...p} d="M4.5 12.5h7a2.7 2.7 0 00.3-5.4A3.8 3.8 0 004.6 6a3.2 3.2 0 00-.1 6.5z" />,
  Rain: (p: IconProps) => <Svg {...p} d="M4.5 9.5h7a2.5 2.5 0 00.3-5A3.5 3.5 0 004.6 3.6a3 3 0 00-.1 5.9zM5.5 11.5l-.8 2M8.5 11.5l-.8 2M11.2 11.5l-.8 2" />,
  Snow: (p: IconProps) => <Svg {...p} d="M8 2v12M3 5l10 6M13 5L3 11" />,
  Thunder: (p: IconProps) => <Svg {...p} d="M4.5 9h7a2.5 2.5 0 00.3-5A3.5 3.5 0 004.6 3.1a3 3 0 00-.1 5.9M8.5 9.5l-1.8 2.5h2.6l-1.8 2.5" />,
  Fog: (p: IconProps) => <Svg {...p} d="M3 6h10M2 8.5h12M4 11h8" />,
  Home: (p: IconProps) => <Svg {...p} d="M2.5 7.5L8 3l5.5 4.5M4 6.5v7h3v-4h2v4h3v-7" />,
  Info: (p: IconProps) => <Svg {...p} d="M8 14A6 6 0 108 2a6 6 0 000 12zM8 7.2V11M8 5h.01" />,
};
