function isValidLinkToRecoveryPassword(updatedAt) {

    let newDate = new Date().toISOString();
    updatedAt = updatedAt.toISOString();
    
    let newDay = Number(newDate.slice(8,10));
    let updatedDay = Number(updatedAt.slice(8,10))

    if (newDay > updatedDay) {
        return false;

    } else {
        let newHours   = Number(newDate.slice(11,13));
        let newMinutes = Number(newDate.slice(14,16));
        newMinutes += (newHours*60);

        let updatedHours = Number(updatedAt.slice(11,13));
        let updatedMinutes = Number(updatedAt.slice(14,16));
        updatedMinutes += (updatedHours*60);

        let diferenceMinutes = newMinutes - updatedMinutes;

        if (diferenceMinutes <= 20) {
            return true;

        } else {
            return false;
        }
    }
}

export { isValidLinkToRecoveryPassword }