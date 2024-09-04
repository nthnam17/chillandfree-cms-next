const AddIcon = ({
    size = 18,
    strokeWidth = 2,
    color = 'currentColor',
    ...props
}) => (
    <svg
        fill="none"
        height={size}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        viewBox="0 0 24 24"
        width={size}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
    </svg>
);

export default AddIcon;
