document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a mobile device
    const isMobile = window.innerWidth <= 768;
    
    // Function to render material cards
    function renderMaterialCard(material) {
        const card = document.createElement('div');
        card.className = 'material-card';
        
        // Create card content
        card.innerHTML = `
            <div class="material-icon">
                <i class="fas ${getFileIcon(material.fileType)}"></i>
            </div>
            <div class="material-info">
                <h3>${material.title}</h3>
                <p class="material-meta">
                    <span>${material.subject}</span> • 
                    <span>${material.category}</span> • 
                    <span>${formatDate(material.uploadDate)}</span>
                </p>
                <p class="material-description">${material.description || 'No description provided'}</p>
                <p class="material-uploader">Uploaded by: ${material.uploadedBy}</p>
            </div>
            <div class="material-actions">
                <a href="#" class="btn btn-sm btn-primary download-btn">
                    <i class="fas fa-download"></i> Download
                </a>
                <a href="#" class="btn btn-sm preview-btn">
                    <i class="fas fa-eye"></i> Preview
                </a>
            </div>
        `;
        
        // Add download click handler
        const downloadBtn = card.querySelector('.download-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                handleDownload(material);
            });
        }
        
        // Add preview button for mobile
        const previewBtn = card.querySelector('.preview-btn');
        if (previewBtn) {
            previewBtn.addEventListener('click', function(e) {
                e.preventDefault();
                handlePreview(material);
            });
        }
        
        return card;
    }
    
    // Handle file download
    function handleDownload(material) {
        // Check if we have actual file data from an upload
        if (material.fileData) {
            // If we have actual file data, use it directly
            const tempLink = document.createElement('a');
            tempLink.href = material.fileData; // This is already a data URL from the upload
            tempLink.download = material.fileName;
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
        } else {
            // For sample materials without actual file data, create placeholder content
            let content = "";
            let mimeType = "text/plain";
            
            if (material.fileType.includes('pdf')) {
                content = "PDF content for " + material.title;
                mimeType = "application/pdf";
            } else if (material.fileType.includes('word')) {
                content = "Word document content for " + material.title;
                mimeType = "application/msword";
            } else if (material.fileType.includes('presentation')) {
                content = "PowerPoint content for " + material.title;
                mimeType = "application/vnd.ms-powerpoint";
            } else if (material.fileType.includes('image')) {
                // For images, create a small colored rectangle as base64
                content = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnElEQVR42u3RAQ0AAAgDIN8/9K3hHFQg03Y4IYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhLwbOyLVJ5WeZtcAAAAASUVORK5CYII=";
                mimeType = material.fileType;
            } else {
                content = "Content for " + material.title;
            }
            
            // If it's not an image with base64 data
            if (!content.startsWith('data:')) {
                const blob = new Blob([content], { type: mimeType });
                content = URL.createObjectURL(blob);
            }
            
            // Create a temporary link to download the file
            const tempLink = document.createElement('a');
            tempLink.href = content;
            tempLink.download = material.fileName;
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
            
            // Clean up the URL object
            if (!content.startsWith('data:')) {
                setTimeout(() => {
                    URL.revokeObjectURL(content);
                }, 100);
            }
        }
    }
    
    // Handle file preview for mobile
    function handlePreview(material) {
        let content = "";
        let mimeType = "text/plain";
        
        // Check if we have actual file data from an upload
        if (material.fileData) {
            // Use the actual file data
            if (window.showMobilePreview) {
                window.showMobilePreview(material.fileData, material.fileType, material.fileName);
            } else {
                alert('Preview functionality not available. Please try downloading the file instead.');
            }
        } else {
            // For sample materials without actual file data, create placeholder content
            if (material.fileType.includes('pdf')) {
                content = "PDF content for " + material.title;
                mimeType = "application/pdf";
            } else if (material.fileType.includes('word')) {
                content = "Word document content for " + material.title;
                mimeType = "application/msword";
            } else if (material.fileType.includes('presentation')) {
                content = "PowerPoint content for " + material.title;
                mimeType = "application/vnd.ms-powerpoint";
            } else if (material.fileType.includes('image')) {
                // For images, create a small colored rectangle as base64
                content = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAnElEQVR42u3RAQ0AAAgDIN8/9K3hHFQg03Y4IYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQgghhLwbOyLVJ5WeZtcAAAAASUVORK5CYII=";
                mimeType = material.fileType;
            } else {
                content = "Content for " + material.title;
            }
            
            // If it's not an image with base64 data
            if (!content.startsWith('data:')) {
                const blob = new Blob([content], { type: mimeType });
                content = URL.createObjectURL(blob);
            }
            
            if (window.showMobilePreview) {
                window.showMobilePreview(content, mimeType, material.fileName);
            } else {
                alert('Preview functionality not available. Please try downloading the file instead.');
            }
            
            // Clean up the URL object
            if (!content.startsWith('data:') && content !== "") {
                setTimeout(() => {
                    URL.revokeObjectURL(content);
                }, 3000); // Longer timeout to allow preview to work
            }
        }
    }
    
    // Helper function to get appropriate icon based on file type
    function getFileIcon(fileType) {
        if (fileType.includes('pdf')) {
            return 'fa-file-pdf';
        } else if (fileType.includes('word') || fileType.includes('doc')) {
            return 'fa-file-word';
        } else if (fileType.includes('presentation') || fileType.includes('powerpoint') || fileType.includes('ppt')) {
            return 'fa-file-powerpoint';
        } else if (fileType.includes('image')) {
            return 'fa-file-image';
        } else if (fileType.includes('video')) {
            return 'fa-file-video';
        } else if (fileType.includes('audio')) {
            return 'fa-file-audio';
        } else if (fileType.includes('zip') || fileType.includes('archive')) {
            return 'fa-file-archive';
        } else if (fileType.includes('text') || fileType.includes('txt')) {
            return 'fa-file-alt';
        } else {
            return 'fa-file';
        }
    }
    
    // Helper function to format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }
    
    // Expose functions for use in other scripts
    window.renderMaterialCard = renderMaterialCard;
    window.handleDownload = handleDownload;
    window.handlePreview = handlePreview;
}); 