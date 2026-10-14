"use client";

export function UserSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search users by name or email..."
      style={{
        background: "var(--w10)",
        border: "1px solid var(--w10)",
        color: "var(--white)",
        padding: "12px 16px",
        borderRadius: "var(--radius)",
        fontSize: "0.85rem",
        width: "100%",
        marginBottom: "16px",
      }}
    />
  );
}