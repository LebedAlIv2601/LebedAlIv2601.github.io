import KvsService from "./KvsService"

export default class KvsRepository {

    static async getKvsFeatures(){
        const featuresList = (await KvsService.getKvsFeatures()).data.result.data
        const remoteValues = (await KvsService.getKvsRemoteValues()).data.result.data
        return {
            features: mapToModel(featuresList),
            remoteValues: mapToModel(remoteValues),
            teamsList: getTeamsList(featuresList, remoteValues)
        }
    }

}

const PALETTE = [
  { bg: '#20c997', text: 'white' },   // бирюзовый
  { bg: '#6610f2', text: 'white' },   // насыщенный фиолетовый
  { bg: '#ffc107', text: 'black' },   // янтарный
  { bg: '#6f42c1', text: 'white' },   // пурпурный
  { bg: '#0dcaf0', text: 'black' },   // голубой
  { bg: '#343a40', text: 'white' },   // тёмно-серый
  { bg: '#e83e8c', text: 'white' },   // розовый
  { bg: '#28a745', text: 'white' },   // травяной зелёный
  { bg: '#fdc500', text: 'black' },   // золотисто-жёлтый
  { bg: '#17a2b8', text: 'white' },   // бирюзовый тёмный
  { bg: '#ff5733', text: 'white' },   // коралловый
  { bg: '#6ab04c', text: 'white' },   // лаймово-зелёный
  { bg: '#d35400', text: 'white' },   // кирпичный
  { bg: '#9b59b6', text: 'white' },   // сиреневый
  { bg: '#2c3e50', text: 'white' },   // тёмный индиго
];

// 🎯 фиксированные соответствия
const FIXED_COLORS = {
  green:   { bg: '#198754', text: 'white' },
  orange:  { bg: '#fd7e14', text: 'white' },
  blue:    { bg: '#0d6efd', text: 'white' },
  yellow:  { bg: '#FDE910', text: 'black' },
  supplies:{ bg: '#cc338b', text: 'white' },
  ads:     { bg: '#d10404', text: 'white' },
  common:  { bg: '#6c757d', text: 'white' }
};


function getTeamsList(features, remoteValues) {
   // 1. Собираем все команды
  const teamsSet = new Set([
    ...features.map((f) => f.team),
    ...remoteValues.map((r) => r.team),
  ]);

  // 2. Преобразуем в массив и сортируем по алфавиту
  const teams = Array.from(teamsSet).sort((a, b) => a.localeCompare(b));

  // 3. Назначаем цвета
  let paletteIndex = 0;
  const teamsWithColors = teams.map((team) => {
    // фиксированные
    if (FIXED_COLORS[team]) {
      return { name: team, ...FIXED_COLORS[team] };
    }

    // циклический выбор из палитры
    const colorPair = PALETTE[paletteIndex % PALETTE.length];
    paletteIndex++;

    return { name: team, ...colorPair };
  });

  return teamsWithColors;
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
                        .map(version => {
                            const versionValue = localizations[localization].platforms[platform].versions[version]
                            if(versionValue?.os !== undefined) {
                                const keysWithValues = Object.keys(versionValue.os)
                                    .map(os => {
                                        return os + ": " + versionValue.os[os]
                                    })
                                return {
                                    name: version,
                                    value: "OS: " + keysWithValues.join(" | ")
                                }
                            } else {
                                return {
                                    name: version,
                                    value: versionValue
                                }
                            }
                        })
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