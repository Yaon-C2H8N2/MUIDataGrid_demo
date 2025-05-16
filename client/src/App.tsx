import StateDrivenDataGrid from "./components/StateDrivenDataGrid.tsx";
import ApiDrivenDataGrid from "./components/ApiDrivenDataGrid.tsx";
import {DemoRow, generateRandomRows} from "./models/DemoRow.ts";
import './App.css'

const App = () => {
    const rows: DemoRow[] = generateRandomRows(1000)

    return (
        <div className={"main-container"}>
            <h1>Data Grid Comparison</h1>
            <div className={"grids-container-parent"}>
                <div className={"grids-container-child"}>
                    <h2>State-driven Data Grid</h2>
                    <StateDrivenDataGrid rows={rows}/>
                </div>
                <div className={"grids-container-child"}>
                    <h2>API-driven Data Grid</h2>
                    <ApiDrivenDataGrid rows={rows}/>
                </div>
            </div>
        </div>
    );
};

export default App;
