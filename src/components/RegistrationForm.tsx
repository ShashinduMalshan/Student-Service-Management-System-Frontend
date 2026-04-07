import  { useState, type ChangeEvent } from 'react';
import { UserPlus, Camera, Trash } from 'lucide-react';
import { addStudent } from '../services/studentService';

interface Props { onRefresh: () => void; }

const RegistrationForm = ({ onRefresh }: Props) => {
    const [form, setForm] = useState({ name: '', email: '', course: '' });
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.course) return alert("Fill all fields");
        await addStudent(form, file);
        setForm({ name: '', email: '', course: '' });
        setFile(null);
        setPreview(null);
        onRefresh();
    };

    return (
        <div className="card">
            <div className="card-title"><UserPlus size={18} color="#4f46e5" /> New Student</div>
            
            <div className="reg-upload-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div 
                    className="reg-photo-circle" 
                    onClick={() => document.getElementById('file-input')?.click()}
                    style={{ width: '100px', height: '100px', borderRadius: '50%', border: '2px dashed #cbd5e1', margin: '0 auto', cursor: 'pointer', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    {preview ? <img src={preview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Camera color="#94a3b8" />}
                </div>
                <input id="file-input" type="file" hidden onChange={handleFileChange} />
            </div>

            <div className="form-group">
                <label className="label">Name</label>
                <input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div className="form-group">
                <label className="label">Email</label>
                <input className="input" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div className="form-group">
                <label className="label">Course</label>
                <input className="input" value={form.course} onChange={e => setForm({...form, course: e.target.value})} />
            </div>
            
            <button className="btn-primary" onClick={handleSubmit}>Register</button>
        </div>
    );
};

export default RegistrationForm;