import StateDrivenDataGrid from "./components/StateDrivenDataGrid.tsx";
import ApiDrivenDataGrid from "./components/ApiDrivenDataGrid.tsx";
import {DemoRow, generateRandomRows} from "./models/DemoRow.ts";
import './App.css'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {Info} from "@mui/icons-material";
import {useState} from "react";

const App = () => {
    const rows: DemoRow[] = generateRandomRows(1000)
    const [dialogOpen, setDialogOpen] = useState<string | undefined>(undefined);

    const API_DRIVEN = 'api-driven';
    const STATE_DRIVEN = 'state-driven';

    const DIALOGS_CONTENTS: { [key: string]: any } = {
        [API_DRIVEN]: {
            title: "API-driven Data Grid",
            description: <p>
                Cette DataGrid est entièrement contrôlée par la GridApiPro récupérée via le hook useGridApiRef.
                Cette approche permet de déléguer la gestion de l'état à la grille, particulièrement utile dans le cas
                d'opérations de modification des données contenues dans la grille afin de ne pas avoir à implémenter
                toute la
                logique de gestion de l'état dans le composant parent.
                <br/><br/>
                Permet également d'éviter des problèmes de performance en évitant des re-rendus inutiles du composant
                parent.
            </p>,
        },
        [STATE_DRIVEN]: {
            title: "State-driven Data Grid",
            description: <p>
                Cette DataGrid est entièrement contrôlée par l'état du composant parent.
                Cette approche permet de garder le contrôle total sur les données et leur gestion, mais peut nécessiter
                plus de code pour gérer les interactions avec la grille.
                <br/><br/>
                Permet également d'avoir une meilleure compréhension de la logique de gestion des données, ce qui peut
                être
                utile pour des cas d'utilisation spécifiques ou des opérations complexes mais nécessite d'implémenter
                toute la
                logique de gestion de l'état dans le composant parent et peut entraîner des problèmes de performance.
                <br/><br/>
                Peut également poser plusieurs problèmes dans le cas de modifications des données contenues dans la
                grille
                étant donné que la cellule/ligne en cours de modification possède son propre état durant la
                modification.
            </p>,
        }
    }

    return (
        <div className={"main-container"}>
            <h1>Data Grid Comparison</h1>
            <div className={"grids-container-parent"}>
                <div className={"grids-container-child"}>
                    <div className={"grids-container-header"}>
                        <h2>State-driven Data Grid </h2>
                        <IconButton onClick={() => setDialogOpen(STATE_DRIVEN)}>
                            <Info/>
                        </IconButton>
                    </div>
                    <StateDrivenDataGrid rows={rows}/>
                </div>
                <div className={"grids-container-child"}>
                    <div className={"grids-container-header"}>
                        <h2>API-driven Data Grid </h2>
                        <IconButton onClick={() => setDialogOpen(API_DRIVEN)}>
                            <Info/>
                        </IconButton>
                    </div>
                    <ApiDrivenDataGrid rows={rows}/>
                </div>
            </div>
            <Dialog open={!!dialogOpen} onClose={() => setDialogOpen(undefined)}>
                <DialogTitle>
                    {DIALOGS_CONTENTS[dialogOpen as string]?.title}
                </DialogTitle>
                <DialogContent>
                    {DIALOGS_CONTENTS[dialogOpen as string]?.description}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(undefined)}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default App;
