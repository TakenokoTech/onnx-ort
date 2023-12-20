import {useEffect} from "react";
import OrtService from "~/services/OrtService";

export default function App() {
    useEffect(() => {
        new OrtService().execute()
    })
    return (
        <h1>Hello world!</h1>
    );
}
