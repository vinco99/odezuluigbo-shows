/**
 * Parse a YYYY-MM-DD string into a local Date at midnight.
 * Avoids the UTC off-by-one issue with `new Date("YYYY-MM-DD")`.
 */
export function parseLocalDate(input: string): Date {
    const [y, m, d] = input.split("-").map(Number);
    return new Date(y, m - 1, d);
}

export function calculateAge(birthday: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const monthDiff = today.getMonth() - birthday.getMonth();
    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthday.getDate())
    ) {
        age--;
    }
    return age;
}