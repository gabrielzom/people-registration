function isValidLinkToRecoveryPassword(updatedAt) {

    let newDate = new Date().toISOString();
    updatedAt = updatedAt.toISOString();
    let newDay = parseInt(newDate.slice(8,10));
    let updatedDay = parseInt(updatedAt.slice(8,10))

    if (newDay > updatedDay) return false;

    let newHours   = parseInt(newDate.slice(11,13));
    let newMinutes = parseInt(newDate.slice(14,16));
    newMinutes += (newHours*60);
    let updatedHours = parseInt(updatedAt.slice(11,13));
    let updatedMinutes = parseInt(updatedAt.slice(14,16));
    updatedMinutes += (updatedHours*60);
    let diferenceMinutes = newMinutes - updatedMinutes;

    if (diferenceMinutes <= 20) return true;

    return false;
}

export { isValidLinkToRecoveryPassword }