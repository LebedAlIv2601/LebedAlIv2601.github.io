function filterKvsValues(valuesList, selectedTeam, selectedPlatform, selectedHasBetaMode) {
    const filteredList = valuesList.filter((item) => {
        let teamCondition
        if(selectedTeam != 'all') {
            teamCondition = item.team === selectedTeam
        } else {
            teamCondition = true
        }

        let hasBetaCondition
        console.log(selectedHasBetaMode)
        if (selectedHasBetaMode != 'all') {
            hasBetaCondition = item.hasBeta === true
        } else {
            hasBetaCondition = true
        }
        return teamCondition && hasBetaCondition
    })
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