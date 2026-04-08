import { useState } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import { uploadProfileImage, deleteProfileImage } from '../../services/studentService';
import type { Student } from '../../types/student';

interface Props {
    student: Student;
    onClose: () => void;
    onSuccess: () => void;
}

const ImageModal = ({ student, onClose, onSuccess }: Props) => {
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = async () => {
        if (!file) return alert("Please select a file first");
        try {
            await uploadProfileImage(student.id, file);
            alert("Photo updated!");
            onSuccess();
            onClose();
        } catch (error) {
            alert("Upload failed");
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Remove profile picture?")) {
            await deleteProfileImage(student.id);
            onSuccess();
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ textAlign: 'center' }}>
                <button className="modal-close" onClick={onClose}><X size={18} /></button>
                <h4 style={{ marginTop: 0 }}>Update Profile Photo</h4>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
                    Student: <b>{student.name}</b>
                </p>

                <div style={{ marginBottom: '20px' }}>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        style={{ fontSize: '13px' }} 
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button className="btn-primary" onClick={handleUpload}>
                        <Upload size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                        Upload New Photo
                    </button>

                    {student.profileImageUrl && (
                        <button 
                            className="btn-primary" 
                            style={{ background: '#fee2e2', color: '#dc2626' }}
                            onClick={handleDelete}
                        >
                            <Trash2 size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                            Remove Current Photo
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageModal;