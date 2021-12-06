type ButtonProps = {
    children: React.ReactNode;
    onClick: () => void;
};

export function Button({children, onClick} : ButtonProps) {
    return (
        <button className="button button_small" onClick={onClick}>{children}</button>
    );
}