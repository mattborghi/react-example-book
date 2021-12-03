export function Button({title, onClick}) {
    return (
        <button className="button button_small" onClick={onClick}>{title}</button>
    );
}