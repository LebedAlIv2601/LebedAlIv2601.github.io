import KvsService from "./KvsService"

export default class KvsRepository {

    static async getKvsFeatures(){
        const featuresList = (await KvsService.getKvsFeatures()).data.result.data
        const features = featuresList.map((feature) => {
            const localizations = feature.value.localizations
            return {
                name: feature.name, 
                team: feature.team, 
                createdAt: feature.createdAt,
                description: feature.description, 
                localizations: Object.keys(localizations)
                .sort((a, b) => sortAlphabetWithDefault(a, b))
                .map(localization => ({
                    name: localization,
                    platforms: Object.keys(localizations[localization].platforms)
                    .sort((a, b) => a.localeCompare(b))
                    .map(platform => ({
                        name: platform,
                        versions: Object.keys(localizations[localization].platforms[platform].versions)
                        .sort((a, b) => sortVersions(a, b))
                        .map(version => ({
                            name: version,
                            value: localizations[localization].platforms[platform].versions[version]
                        }))
                    }))
                }))
            }
        })
        return features.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

}

function sortVersions(a, b) {
    if (a === "default") return -1;
    if (b === "default") return 1;
    let left = getArrayFromVersion(a);
    let right = getArrayFromVersion(b);
    if (isLessVersion(left, right)) {
        return 1;
    }
    if (!isLessVersion(left, right)) {
        return -1;
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