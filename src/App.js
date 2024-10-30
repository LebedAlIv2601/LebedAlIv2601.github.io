import { useEffect } from "react";
import {useState} from "react";
import KvsRepository from "./data/KvsRepository";
import { useFetching } from "./utils/useFetching";
import LoadingIndicator from "./ui/LoadingIndicator";
import { Button, FormSelect } from "react-bootstrap";
import TeamSelect from "./ui/selects/TeamSelect";
import PlatformSelect from "./ui/selects/PlatformSelect";
import ValueTypeSelect from "./ui/selects/ValuesSelect";
import KvsValuesContent from "./ui/KvsValuesContent";
import filterKvsValues from "./utils/filterKvsValues";
import './App.css';
import ErrorPlaceholder from "./ui/ErrorPlaceholder";

function App() {
  const [features, setFeatures] = useState([])
  const [remoteValues, setRemoteValues] = useState([])
  const [selectedTeam, setTeam] = useState('all')
  const [selectedPlatform, setPlatform] = useState('all')
  const [selectedValueType, setValueType] = useState('features')

  const [getKvsValues, isKvsValuesLoading, isKvsValuesError] = useFetching(async () => {
    const kvsValuesModel = await KvsRepository.getKvsFeatures()
    console.log(kvsValuesModel)
    setFeatures(kvsValuesModel.features)
    setRemoteValues(kvsValuesModel.remoteValues)
  })

  useEffect(() => {
    getKvsValues()
  }, [])

  const shownFeatures = filterKvsValues(features, selectedTeam, selectedPlatform);
  const shownRemoteValues = filterKvsValues(remoteValues, selectedTeam, selectedPlatform);

  const shownValues = selectedValueType === 'features' ? shownFeatures : shownRemoteValues;

  return (
    <div className="App" style={{padding: '0.4em 0.8em'}}>
      <div className="topcontainer">
        <div className="controls">
          <div>
            <h5 style={{paddingRight: '0.5em'}}>Team</h5> 
            <TeamSelect selectedTeam={selectedTeam} onSelect={setTeam}></TeamSelect>
          </div>
          <div>
            <h5 style={{paddingRight: '0.5em'}}>Platform</h5> 
            <PlatformSelect selectedPlatform={selectedPlatform} onSelect={setPlatform}></PlatformSelect>
          </div>
          <div>
            <h5 style={{paddingRight: '0.5em'}}>Value Type</h5> 
            <ValueTypeSelect selectedValueType={selectedValueType} onSelect={setValueType}></ValueTypeSelect>
          </div>
        </div>
        <Button onClick={getKvsValues}>Обновить</Button>
      </div>
      <div style={{paddingTop: '1em'}}>
        {isKvsValuesLoading 
          ? <LoadingIndicator/> 
          : isKvsValuesError 
          ? <ErrorPlaceholder/>
          : shownValues.length == 0
          ? <h5 style={{paddingRight: '0.5em'}}>Ничего нет по таким параметрам</h5> 
          : <KvsValuesContent values={shownValues} selectedTeam={selectedTeam}/>}
      </div>
    </div>
  );
}

export default App;
