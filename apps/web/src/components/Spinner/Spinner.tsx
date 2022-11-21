export default function Spinner() {
  return (
    // prettier-ignore
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 60 60" className="text-gray-300 w-5 h-5">
      <g className="origin-center">
        <path style={{opacity: 0.125}} fill="currentColor" d="M22.923 17.373a3.994 3.994 0 0 1-5.713 5.582l-8.374-8.57a3.994 3.994 0 0 1 5.713-5.582l8.374 8.57Z"/>
        <path style={{opacity: 0.25}} fill="currentColor" d="M3.994 33.925a3.996 3.996 0 0 1-3.949-4.04 3.992 3.992 0 0 1 4.04-3.947l11.98.141a3.996 3.996 0 0 1 3.949 4.04 3.992 3.992 0 0 1-4.04 3.947l-11.98-.14Z"/>
        <path style={{opacity: 0.375}} fill="currentColor" d="M14.386 51.164a3.994 3.994 0 0 1-5.582-5.713l8.57-8.374a3.994 3.994 0 1 1 5.582 5.713l-8.57 8.374Z"/>
        <path style={{opacity: 0.5}} fill="currentColor" d="M26.076 43.933a3.994 3.994 0 1 1 7.987.093l-.139 11.98a3.994 3.994 0 1 1-7.987-.093l.139-11.98Z"/>
        <path style={{opacity: 0.625}} fill="currentColor" d="M51.164 45.614a3.994 3.994 0 0 1-5.713 5.583l-8.374-8.57a3.994 3.994 0 1 1 5.713-5.582l8.374 8.57Z"/>
        <path style={{opacity: 0.75}} fill="currentColor" d="M43.933 33.924a3.994 3.994 0 1 1 .093-7.987l11.98.139a3.994 3.994 0 1 1-.093 7.987l-11.98-.139Z"/>
        <path style={{opacity: 0.875}} fill="currentColor" d="M42.627 22.923a3.994 3.994 0 0 1-5.582-5.713l8.57-8.374a3.994 3.994 0 0 1 5.582 5.713l-8.57 8.374Z"/>
        <path style={{opacity: 1}} fill="currentColor" d="M26.076 3.994a3.994 3.994 0 0 1 7.987.092l-.139 11.981a3.994 3.994 0 1 1-7.987-.092l.139-11.981Z"/>
        <animateTransform
          dur="1s"
          begin="0s"
          type="rotate"
          calcMode="discrete"
          repeatCount="indefinite"
          attributeName="transform"
          values="0;45;90;135;180;225;270;315"
          keyTimes="0;0.125;0.25;0.375;0.5;0.625;0.75;0.875"
        />
      </g>
    </svg>
  )
}
