import { useEffect } from "react";
import {useState} from "react";
import KvsRepository from "./data/KvsRepository";
import { useFetching } from "./utils/useFetching";
import LoadingIndicator from "./ui/LoadingIndicator";
import FeaturesContent from "./ui/FeaturesContent";
import { Button, FormSelect } from "react-bootstrap";
import TeamSelect from "./ui/TeamSelect";
import PlatformSelect from "./ui/PlatformSelect";

function App() {
  const [features, setFeatures] = useState([])
  const [selectedTeam, setTeam] = useState('all')
  const [selectedPlatform, setPlatform] = useState('all')

  const [getFeatures, isFeaturesLoading, isFeaturesError] = useFetching(async () => {
    const featuresList = await KvsRepository.getKvsFeatures()
    console.log(featuresList)
    setFeatures(featuresList)
  })

  useEffect(() => {
    getFeatures()
  }, [])

  const filteredFeatures = selectedTeam == 'all' ? features : features.filter((item) => item.team === selectedTeam);
  const shownFeatures = filteredFeatures.map(feature => ({
    ...feature,
    localizations: feature.localizations.map(localization => ({
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

  return (
    <div className="App" style={{padding: '0.4em 0.8em'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{display: 'flex'}}>
          <div style={{paddingRight: '0.5em'}}>
            <h5 style={{paddingRight: '0.5em'}}>Team</h5> 
            <TeamSelect selectedTeam={selectedTeam} onSelect={setTeam}></TeamSelect>
          </div>
          <div style={{paddingRight: '0.5em'}}>
            <h5 style={{paddingRight: '0.5em'}}>Platform</h5> 
            <PlatformSelect selectedPlatform={selectedPlatform} onSelect={setPlatform}></PlatformSelect>
          </div>
        </div>
        <Button onClick={getFeatures}>Обновить</Button>
      </div>
      <div style={{paddingTop: '1em'}}>
        {isFeaturesLoading 
          ? <LoadingIndicator/> 
          : <FeaturesContent features={shownFeatures} selectedTeam={selectedTeam}/>}
      </div>
    </div>
  );
}

export default App;
