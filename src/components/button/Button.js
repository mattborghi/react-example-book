import './Button.css';

export function Button({title, onClick}) {

    return (
        <button className="Button" onClick={onClick}>{title}</button>
    );
}