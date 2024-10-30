function filterKvsValues(valuesList, selectedTeam, selectedPlatform) {
    const filteredList = selectedTeam == 'all' ? valuesList : valuesList.filter((item) => item.team === selectedTeam);
    const shownItems = filteredList.map(item => ({
        ...item,
        localizations: item.localizations.map(localization => ({
            ...localization,
            platforms: localization.platforms.filter(platform => {
                if (selectedPlatform == 'all') {
                    return true;
                } else if (selectedPlatform == 'android+huawei') {
                    return platform.name == 'android' || platform.name == 'huawei';
                } else {
                    return platform.name == selectedPlatform;
                }
            })
        }))
    }));
    return shownItems;
}

export default filterKvsValues;