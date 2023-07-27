import {Router} from "./components/Router";
import {GlobalProvider} from "./data/GlobalCart";

export default function App() {
    return (<><GlobalProvider><Router/></GlobalProvider></>)
}