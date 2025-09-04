const STORAGE_KEY = 'school_files';

export async function fetchFiles() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function uploadFile(formData) {
  const files = await fetchFiles();
  const file = formData.get('file');
  const blobUrl = URL.createObjectURL(file);
  const newFile = {
    id: Date.now(),
    name: file.name,
    url: blobUrl,
  };
  files.unshift(newFile);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
}
