
import { BannerServices } from "../services/BannerServices"
import type { Banner } from "@/types/banner";
import type React from "react"
import { useEffect, useState } from "react"

const bannerServices = new BannerServices();

const AdsDisplay = () => {

    
  // Mock data for demonstration - in real app this would come from props or API
  const [ads, setAds] = useState<Banner[]>([
  
  ]);

  const fetchBanners=async()=>{
     await bannerServices.fetchAdminBanners()
     .then((res:Banner)=>{
     
        if(res){
            //@ts-expect-error reason: type mismatch
            setAds(res.data) 
        }
     })
     .catch((err)=>console.error(err))
  };
  
  useEffect(()=>{
     fetchBanners();
  },[])

  
  return (
    <div className="appointments" style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Active Advertisements</h3>
        <div style={styles.stats}>
          <span style={styles.statItem}>
            Total: <strong>{ads.length}</strong>
          </span>
          <span style={styles.statItem}>
            Active: <strong>{ads.filter((ad) => ad.status).length}</strong>
          </span>
        </div>
      </div>

      {ads.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📢</div>
          <h4 style={styles.emptyTitle}>No advertisements yet</h4>
          <p style={styles.emptyText}>Create your first banner ad to get started</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {ads.map((ad) => (
            <div key={ad.id} style={styles.card}>
              <div style={styles.imageContainer}>
                <img src={ad.bnrImg as any || "/placeholder.svg"} alt={ad.title || `Banner ${ad.id}`} style={styles.image} />
                <div style={styles.overlay}>
                  <span style={styles.adId}>ID: {ad.id}</span>
                </div>
              </div>

              <div style={styles.content}>
                <div style={styles.info}>
                  <h4 style={styles.adTitle}>{ad.title || `Banner ${ad.id}`}</h4>
                  {ad.link && (
                    <p style={styles.link}>
                      <span style={styles.linkIcon}>🔗</span>
                      {ad.link.length > 30 ? `${ad.link.substring(0, 30)}...` : ad.link}
                    </p>
                  )}
                </div>

                <div style={styles.statusContainer}>
                  <span
                    style={{
                      ...styles.statusBadge,
                      backgroundColor: ad.status ? "#dcfce7" : "#fef2f2",
                      color: ad.status ? "#166534" : "#dc2626",
                    }}
                  >
                    {ad.status ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <div style={styles.actions}>
                <button onClick={async()=>{
                    const banner:Partial<Banner>={
                        status:!ad.status
                    };
                    await bannerServices.updateBanner(banner,ad.id)
                    .then((res)=>{
                        window.location.reload();
                    })
                }}
                  
                  style={{
                    ...styles.actionButton,
                    ...styles.statusButton,
                    backgroundColor: ad.status ? "#fef2f2" : "#dcfce7",
                    color: ad.status ? "#dc2626" : "#166534",
                  }}
                  title={ad.status ? "Deactivate" : "Activate"}
                >
                  {ad.status ? "⏸️" : "▶️"}
                </button>

                {/* <button
                 
                  style={{
                    ...styles.actionButton,
                    ...styles.editButton,
                  }}
                  title="Edit"
                >
                  ✏️
                </button> */}

                <button
                onClick={async()=>{
                    await bannerServices.deleteBanner(ad.id)
                    .then((res)=>{
                        window.location.reload()
                    })
                }}
                
                  style={{
                    ...styles.actionButton,
                    ...styles.deleteButton,
                  }}
                  title="Delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    marginTop: "48px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
    paddingBottom: "16px",
    borderBottom: "1px solid #e5e7eb",
  },
  title: {
    color: "#1a1a1a",
    fontSize: "24px",
    fontWeight: "600",
    letterSpacing: "-0.5px",
    margin: "0",
  },
  stats: {
    display: "flex",
    gap: "24px",
  },
  statItem: {
    fontSize: "14px",
    color: "#6b7280",
  },
  emptyState: {
    textAlign: "center" as const,
    padding: "64px 32px",
    backgroundColor: "#f9fafb",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
  },
  emptyIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  emptyTitle: {
    color: "#1f2937",
    fontSize: "18px",
    fontWeight: "500",
    margin: "0 0 8px 0",
  },
  emptyText: {
    color: "#6b7280",
    fontSize: "14px",
    margin: "0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "24px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  imageContainer: {
    position: "relative" as const,
    height: "160px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    transition: "transform 0.2s ease",
  },
  overlay: {
    position: "absolute" as const,
    top: "12px",
    right: "12px",
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "white",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "500",
  },
  adId: {
    fontSize: "12px",
    fontWeight: "500",
  },
  content: {
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
  },
  info: {
    flex: 1,
  },
  adTitle: {
    color: "#1f2937",
    fontSize: "16px",
    fontWeight: "500",
    margin: "0 0 8px 0",
    lineHeight: "1.4",
  },
  link: {
    color: "#6b7280",
    fontSize: "13px",
    margin: "0",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  linkIcon: {
    fontSize: "12px",
  },
  statusContainer: {
    display: "flex",
    alignItems: "flex-start",
  },
  statusBadge: {
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },
  actions: {
    display: "flex",
    padding: "16px 20px",
    backgroundColor: "#f9fafb",
    borderTop: "1px solid #f3f4f6",
    gap: "8px",
  },
  actionButton: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statusButton: {
    border: "1px solid transparent",
  },
  editButton: {
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
    border: "1px solid #dbeafe",
  },
  deleteButton: {
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    border: "1px solid #fecaca",
  },
}

export default AdsDisplay
