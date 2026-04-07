import { Search, X } from 'lucide-react';

interface Props {
    value: string;
    onChange: (val: string) => void;
    onSearch: (id: string) => void;
}

const SearchHeader = ({ value, onChange, onSearch }: Props) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') onSearch(value);
    };

    return (
        <div className="search-section" style={{
            background: 'white',
            padding: '12px',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            gap: '10px',
            maxWidth: '550px',
            margin: '0 auto 40px auto',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
        }}>
            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                    type="number"
                    className="input"
                    style={{ paddingRight: '35px', margin: 0 }}
                    placeholder="Search by Student ID..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                {value && (
                    <X 
                        size={16} 
                        style={{ position: 'absolute', right: 10, cursor: 'pointer', color: '#94a3b8' }} 
                        onClick={() => onChange('')} 
                    />
                )}
            </div>
            <button 
                className="btn-primary" 
                style={{ width: 'auto', padding: '0 20px' }}
                onClick={() => onSearch(value)}
            >
                <Search size={18} />
            </button>
        </div>
    );
};

export default SearchHeader;