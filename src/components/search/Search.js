import './Search.css';

export function Search({value, onChange}) {
    return (
        <div className="Search">
            <input type="text" value={value} onChange={onChange} placeholder="Filter titles" />
        </ div>
    )
}