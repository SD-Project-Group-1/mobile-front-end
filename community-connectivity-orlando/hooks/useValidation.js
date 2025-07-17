// Check if user is 18 or older
function isEighteenPlus(dob) {
    if (!dob) return false;

    const [mm, dd, yyyy] = dob.split('-');

    if (!mm || !dd || !yyyy) return false;

    const birthDate = new Date(`${yyyy}-${mm}-${dd}`);

    if (isNaN(birthDate)) return false;

    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18;
}

// Validate age
export async function validateAge(dob) {
    if (!dob) {
        return { valid: false, message: 'Date of birth is required.' };
    }
    if (!isEighteenPlus(dob)) {
        return {
            valid: false,
            message: 'You must be at least 18 years old to register an account.'
        };
    }
    return { valid: true, message: '' };
} 