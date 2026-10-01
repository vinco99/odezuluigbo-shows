'use client'

export function UserSearch() {
    return (
        <input type="text" id="adminUserSearch"  placeholder="Search users by name or email..." 
            style={{
                background: "var(--w10)", 
                border: "1px solid var(--w10)", 
                color: "var(--white)", 
                padding: "12px 16px", 
                borderRadius: "var(--radius)", 
                fontSize: "0.85rem", 
                width: "100%", 
                marginBottom: "16px"
            }} 
        />
    );
}