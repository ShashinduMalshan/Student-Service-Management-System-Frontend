import React from 'react';
import { Pencil, Trash2, Camera, User, BookOpen, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
    students: any[];
    isSearching: boolean;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onEdit: (s: any) => void;
    onDelete: (id: number) => void;
    onImageClick: (s: any) => void;
}

const StudentTable = ({ students, isSearching, currentPage, totalPages, onPageChange, onEdit, onDelete, onImageClick }: Props) => {
    return (
        <div className="card table-card" style={{ padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ background: '#f8fafc' }}>
                    <tr>
                        <th style={{ padding: '15px', textAlign: 'left', fontSize: '11px', color: '#64748b' }}>STUDENT</th>
                        <th style={{ padding: '15px', textAlign: 'left', fontSize: '11px', color: '#64748b' }}>COURSE</th>
                        <th style={{ padding: '15px', textAlign: 'center', fontSize: '11px', color: '#64748b' }}>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(s => (
                        <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '12px 15px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div 
                                        className="img-box" 
                                        onClick={() => onImageClick(s)}
                                        style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', cursor: 'pointer', background: '#f1f5f9' }}
                                    >
                                        {s.profileImageUrl ? <img src={s.profileImageUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <User size={20} color="#cbd5e1" style={{ margin: '10px' }} />}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600' }}>{s.name}</div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>ID: #{s.id}</div>
                                    </div>
                                </div>
                            </td>
                            <td style={{ padding: '12px 15px', fontSize: '14px' }}>{s.course}</td>
                            <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                                <button onClick={() => onEdit(s)} style={{ border: 'none', background: '#fffbeb', padding: '6px', borderRadius: '6px', cursor: 'pointer', marginRight: '5px' }}><Pencil size={14} color="#d97706" /></button>
                                <button onClick={() => onDelete(s.id)} style={{ border: 'none', background: '#fef2f2', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}><Trash2 size={14} color="#dc2626" /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {!isSearching && (
                <div className="pagination" style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', alignItems: 'center' }}>
                    <button className="pag-btn" disabled={currentPage === 0} onClick={() => onPageChange(currentPage - 1)}><ChevronLeft size={16} /></button>
                    <span style={{ fontSize: '12px' }}>Page {currentPage + 1} of {totalPages}</span>
                    <button className="pag-btn" disabled={currentPage + 1 >= totalPages} onClick={() => onPageChange(currentPage + 1)}><ChevronRight size={16} /></button>
                </div>
            )}
        </div>
    );
};

export default StudentTable;