export function Button({children, onClick}) {
    return (
        <button className="button button_small" onClick={onClick}>{children}</button>
    );
}