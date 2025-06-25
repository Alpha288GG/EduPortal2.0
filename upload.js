            reader.onload = function() {
                // Simulate upload delay
                setTimeout(() => {
                    // Get existing materials or initialize empty array
                    let materials = JSON.parse(localStorage.getItem('materials') || '[]');
                    
                    // Create new material object
                    const newMaterial = {
                        id: Date.now().toString(),
                        title: title,
                        academicYear: academicYear,
                        semester: semester,
                        subject: subject,
                        category: category,
                        fileName: file.name,
                        fileType: file.type,
                        fileSize: file.size,
                        description: description,
                        uploadDate: new Date().toISOString(),
                        uploadedBy: userName,
                        // Store the complete file data for demo purposes
                        fileData: reader.result
                    };
                    
                    // Add to materials array
                    materials.push(newMaterial);
                    
                    // Save to localStorage
                    localStorage.setItem('materials', JSON.stringify(materials));
                    
                    showSuccess('Material uploaded successfully!');
                    
                    // Reset form
                    uploadForm.reset();
                    
                    // Reset dropdowns
                    if (semesterSelect) semesterSelect.disabled = true;
                    if (subjectSelect) subjectSelect.disabled = true;
                    
                    // Reset button
                    if (uploadBtn) {
                        uploadBtn.disabled = false;
                        uploadBtn.textContent = 'Upload Material';
                    }
                }, 2000);
            }; 