import { BannerServices } from "../services/BannerServices";
import type { Banner } from "@/types/banner";
import type React from "react"
import { useState } from "react";

const bannerServices = new BannerServices();



const BannerForm = () => {
  const [formData, setFormData] = useState<Partial<Banner>>({
    bnrImg: "",
    title: "",
    link: "",
    status: false,
  })

  const [imagePreview, setImagePreview] = useState<string>("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }))
  }

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setFormData((prev) => ({
      ...prev,
      bnrImg: file,   
    }));

    
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  }
};

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
  
    await bannerServices.uploadBanner(formData)
    .then((res)=>{
        if(res){
           
        }
    })
    .catch((err)=>console.error(err))
   
  }

  const handleReset = () => {
    setFormData({
      bnrImg: "",
      title: "",
      link: "",
      status: false,
    })
    setImagePreview("")
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.formTitle}>Banner Manager</h3>
      <form onSubmit={handleSubmit} style={styles.form}>
       

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="bnrImg">
            Banner Image
          </label>
          <div style={styles.fileInputContainer}>
            <input
              type="file"
              id="bnrImg"
              name="bnrImg"
              onChange={handleFileChange}
              style={styles.fileInput}
              accept="image/*"
              required
            />
            <label htmlFor="bnrImg" style={styles.fileInputLabel}>
              {imagePreview ? "Change Image" : "Choose Image"}
            </label>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Enter banner title"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="link">
            Link URL
          </label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="https://example.com"
          />
        </div>
         <div style={styles.row}>
        

          <div style={styles.formGroup}>
            <label style={styles.label}>Status</label>
            <label style={styles.toggleContainer}>
              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleInputChange}
                style={styles.hiddenCheckbox}
              />
              <span
                style={{
                  ...styles.toggle,
                  backgroundColor: formData.status ? "#4CAF50" : "#ccc",
                }}
              >
                <span
                  style={{
                    ...styles.toggleSlider,
                    transform: formData.status ? "translateX(20px)" : "translateX(0)",
                  }}
                />
              </span>
            </label>
          </div>
        </div>

        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.submitButton}>
            Save Banner
          </button>
          <button type="button" onClick={handleReset} style={styles.resetButton}>
            Reset
          </button>
        </div>
      </form>

      {imagePreview && (
        <div style={styles.preview}>
          <h4 style={styles.previewTitle}>Preview</h4>
          <div style={styles.previewCard}>
            <img
              src={imagePreview || "/placeholder.svg"}
              alt={formData.title || "Banner preview"}
              style={styles.previewImage}
            />
            {formData.title && <p style={styles.previewText}>{formData.title}</p>}
            <div style={styles.statusBadge}>
              <span
                style={{
                  ...styles.statusIndicator,
                  backgroundColor: formData.status ? "#4CAF50" : "#f44336",
                }}
              >
                {formData.status ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "0 auto",
    padding: "32px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    border: "1px solid #f0f0f0",
  },
  formTitle: {
    color: "#1a1a1a",
    marginBottom: "32px",
    textAlign: "center" as const,
    fontSize: "24px",
    fontWeight: "600",
    letterSpacing: "-0.5px",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
  },
  row: {
    display: "flex",
    gap: "16px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
    flex: 1,
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
    letterSpacing: "0.025em",
  },
  input: {
    padding: "12px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "15px",
    backgroundColor: "#fafafa",
    transition: "all 0.2s ease",
    outline: "none",
  },
  fileInputContainer: {
    position: "relative" as const,
  },
  fileInput: {
    position: "absolute" as const,
    opacity: 0,
    width: "100%",
    height: "100%",
    cursor: "pointer",
  },
  fileInputLabel: {
    display: "block",
    padding: "12px 16px",
    border: "2px dashed #d1d5db",
    borderRadius: "8px",
    backgroundColor: "#f9fafb",
    textAlign: "center" as const,
    cursor: "pointer",
    fontSize: "15px",
    color: "#6b7280",
    transition: "all 0.2s ease",
  },
  toggleContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  hiddenCheckbox: {
    display: "none",
  },
  toggle: {
    width: "44px",
    height: "24px",
    backgroundColor: "#ccc",
    borderRadius: "12px",
    position: "relative" as const,
    transition: "background-color 0.3s ease",
  },
  toggleSlider: {
    width: "20px",
    height: "20px",
    backgroundColor: "white",
    borderRadius: "50%",
    position: "absolute" as const,
    top: "2px",
    left: "2px",
    transition: "transform 0.3s ease",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  submitButton: {
    flex: 1,
    padding: "14px 24px",
    backgroundColor: "#FFD200",
    color: "black",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  resetButton: {
    flex: 1,
    padding: "14px 24px",
    backgroundColor: "#f3f4f6",
    color: "#374151",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  preview: {
    marginTop: "32px",
    padding: "24px",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },
  previewTitle: {
    color: "#1f2937",
    marginBottom: "16px",
    fontSize: "16px",
    fontWeight: "500",
  },
  previewCard: {
    textAlign: "center" as const,
    backgroundColor: "white",
    padding: "16px",
    borderRadius: "8px",
  },
  previewImage: {
    maxWidth: "100%",
    height: "auto",
    maxHeight: "200px",
    borderRadius: "8px",
    marginBottom: "12px",
    objectFit: "cover" as const,
  },
  previewText: {
    fontSize: "16px",
    color: "#1f2937",
    margin: "12px 0",
    fontWeight: "500",
  },
  statusBadge: {
    display: "flex",
    justifyContent: "center",
    marginTop: "12px",
  },
  statusIndicator: {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
    color: "white",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },
}

export default BannerForm
