import React, { useState } from 'react';
import {
  FolderLock,
  Plus,
  FileText,
  Download,
  Eye,
  Search,
  Shield,
  FileCheck,
  Calendar,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input, Select } from '../../components/ui/Input';
import { Tabs } from '../../components/ui/Tabs';
import { useData } from '../../contexts/DataContext';
import { BuildingDocument } from '../../types';

export const BuildingsDocumentsPage: React.FC = () => {
  const { documents, uploadDocument, activeWorkspace } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<BuildingDocument | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<BuildingDocument['category']>('HOA Bylaws');
  const [accessLevel, setAccessLevel] = useState<BuildingDocument['accessLevel']>('ALL_RESIDENTS');

  const filtered = documents.filter((doc) => {
    const matchesCat = selectedCategory === 'ALL' || doc.category === selectedCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    uploadDocument({
      name: name.endsWith('.pdf') ? name : `${name}.pdf`,
      category,
      fileSize: '2.4 MB',
      fileType: 'PDF',
      uploadedBy: 'Board President',
      accessLevel,
    });

    setIsModalOpen(false);
    setName('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#202B25] dark:text-[#F1F4F0]">
            Documents & Legal Repository
          </h1>
          <p className="text-sm text-[#78847C] dark:text-[#B1BDB4] mt-0.5">
            HOA declarations, audited financials, assembly minutes, and insurance binders for {activeWorkspace.name}
          </p>
        </div>
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Upload Document
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <Tabs
          activeTab={selectedCategory}
          onChange={setSelectedCategory}
          tabs={[
            { id: 'ALL', label: 'All Files', count: documents.length },
            { id: 'HOA Bylaws', label: 'HOA Bylaws' },
            { id: 'Assembly Minutes', label: 'Minutes' },
            { id: 'Insurance Policies', label: 'Insurance' },
            { id: 'Audit & Balance Sheets', label: 'Audit Records' },
          ]}
        />
        <div className="w-full sm:w-64">
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((doc) => (
          <Card key={doc.id} className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-[#E7EFE8] dark:bg-[#354A3D] text-[#234B3A] dark:text-[#8FAF9A]">
                  <FileText className="w-6 h-6" />
                </div>
                <Badge variant={doc.accessLevel === 'BOARD_ONLY' ? 'danger' : 'neutral'} size="sm">
                  {doc.accessLevel.replace('_', ' ')}
                </Badge>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#202B25] dark:text-[#F1F4F0] break-words">
                  {doc.name}
                </h3>
                <p className="text-xs text-[#234B3A] dark:text-[#8FAF9A] font-semibold mt-0.5">
                  {doc.category}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs text-[#78847C] dark:text-[#B1BDB4]">
                <span>{doc.fileSize}</span>
                <span>•</span>
                <span>Uploaded {doc.uploadDate}</span>
                <span>•</span>
                <span>By {doc.uploadedBy}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E3EAE4] dark:border-[#354A3D] flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                icon={<Eye className="w-3.5 h-3.5" />}
                onClick={() => setPreviewDoc(doc)}
              >
                Inspect
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={<Download className="w-3.5 h-3.5" />}
                onClick={() => {
                  const blob = new Blob([`Nestora Document Archive: ${doc.name}`], {
                    type: 'application/pdf',
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = doc.name;
                  a.click();
                }}
              >
                Download
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Document Preview Modal */}
      {previewDoc && (
        <Modal
          isOpen={true}
          onClose={() => setPreviewDoc(null)}
          title={previewDoc.name}
          description={`${previewDoc.category} • Certified Legal Archival Record`}
        >
          <div className="space-y-4">
            <div className="h-64 rounded-xl bg-[#F3F5F2] dark:bg-[#1D2A23] border border-[#E3EAE4] dark:border-[#354A3D] p-6 flex flex-col justify-center items-center text-center space-y-3">
              <FileCheck className="w-12 h-12 text-[#234B3A] dark:text-[#8FAF9A]" />
              <p className="font-bold text-sm text-[#202B25] dark:text-[#F1F4F0]">
                {previewDoc.name}
              </p>
              <p className="text-xs text-[#78847C] dark:text-[#B1BDB4] max-w-md">
                Verified official condominium documentation recorded in the {activeWorkspace.name} legal archive. Access permissions: {previewDoc.accessLevel}.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => setPreviewDoc(null)}>
                Close Preview
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Upload Legal or Operating Document"
        description="Store certified PDFs into the building repository"
      >
        <form onSubmit={handleUpload} className="space-y-4">
          <Input
            label="Document Title"
            placeholder="e.g. Cedar_Heights_Roof_Warranty_2026.pdf"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
          >
            <option value="HOA Bylaws">HOA Bylaws</option>
            <option value="Assembly Minutes">Assembly Minutes</option>
            <option value="Insurance Policies">Insurance Policies</option>
            <option value="Audit & Balance Sheets">Audit & Balance Sheets</option>
            <option value="Service Contracts">Service Contracts</option>
            <option value="Safety Inspections">Safety Inspections</option>
          </Select>

          <Select
            label="Access Permissions"
            value={accessLevel}
            onChange={(e) => setAccessLevel(e.target.value as any)}
          >
            <option value="ALL_RESIDENTS">All Residents & Owners</option>
            <option value="OWNERS_ONLY">Owners Only (Deed Holders)</option>
            <option value="BOARD_ONLY">Board Members Only (Confidential)</option>
          </Select>

          <div className="flex justify-end gap-3 pt-3">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Archive File
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
