function DownloadSvg() {
  return (
    <svg
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DownloadButton() {
  return (
    <button className="flex items-center gap-2 rounded-lg bg-violet-100 px-4 py-2 font-semibold text-violet-800 transition-colors duration-200 hover:bg-violet-200">
      <DownloadSvg /> Download
    </button>
  );
}
