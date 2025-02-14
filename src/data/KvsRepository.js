import KvsService from "./KvsService"

export default class KvsRepository {

    static async getKvsFeatures(){
        const featuresList = (await KvsService.getKvsFeatures()).data.result.data
        const remoteValues = (await KvsService.getKvsRemoteValues()).data.result.data
        return {
            features: mapToModel(featuresList),
            remoteValues: mapToModel(remoteValues)
        }
    }

}

function mapToModel(list) {
    const newList = list.map((item) => {
        const localizations = item.value.localizations
        return {
            name: item.name, 
            team: item.team, 
            releaseVersion: item.version,
            hasBeta: Object.keys(localizations).find(localization => {
                return Object.keys(localizations[localization].platforms).find(platform => {
                    return localizations[localization].platforms[platform]?.beta !== undefined
                }) !== undefined
            }) !== undefined,
            createdAt: item.createdAt,
            description: item.description, 
            localizations: Object.keys(localizations)
            .sort((a, b) => sortAlphabetWithDefault(a, b))
            .map(localization => ({
                name: localization,
                platforms: Object.keys(localizations[localization].platforms)
                .sort((a, b) => a.localeCompare(b))
                .map(platform => {
                    const versionsList = Object.keys(localizations[localization].platforms[platform].versions)
                        .sort((a, b) => sortVersions(a, b))
                        .map(version => ({
                            name: version,
                            value: localizations[localization].platforms[platform].versions[version]
                        }))
                    if(localizations[localization].platforms[platform]?.beta !== undefined) {
                        versionsList.push(
                            {
                                name: "beta",
                                value: localizations[localization].platforms[platform]?.beta
                            }
                        )
                    }
                    return {
                        name: platform,
                        versions: versionsList
                    }
                })
            }))
        }
    })
    return newList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

function sortVersions(a, b) {
    if (a === "default") return -1;
    if (b === "default") return 1;
    let left = getArrayFromVersion(a);
    let right = getArrayFromVersion(b);
    if (isLessVersion(left, right)) {
        return -1;
    }
    if (!isLessVersion(left, right)) {
        return 1;
    }
    return 0;
}

//Получаем массив из ключа версии
function getArrayFromVersion(value) {
    const arrayFromVersion = value.split(".", 3);
    const nums = arrayFromVersion.map((item) => Number(item));
    return nums.filter((item) => !isNaN((item)));
}

function isLessVersion(compared, forСomparison) {
    if (compared[0] < forСomparison[0]) {
        return true;
    } else if (compared[0] <= forСomparison[0] && compared[1] < forСomparison[1]) {
        return true;
    } else {
        return compared[0] <= forСomparison[0] && compared[1] <= forСomparison[1] && compared[2] < forСomparison[2];
    }
}

function sortAlphabetWithDefault(a, b) {
    if (a === "default") return -1; // "default" всегда первым
    if (b === "default") return 1;  // "default" всегда первым
    return a.localeCompare(b);
}