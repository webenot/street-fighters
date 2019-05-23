const saveData = data => {
    if (data) {
        console.log(`${data} saved`);
        return true;
    } else {
        return false;
    }
};

module.exports = {
    saveData
};