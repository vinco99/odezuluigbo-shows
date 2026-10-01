'use client'

export function showToast(msg: string) {
    const t = document.getElementById("toast");
    if(!t) return;
    t.innerHTML = msg;
    t.classList.add("show");

    window.setTimeout(() => {
        t.classList.remove("show");
    }, 3000);
}
