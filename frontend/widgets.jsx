import React from "react";
import { createRoot } from "react-dom/client";
import Clock from "./clock";
import Tabs from "./tabs";
import Weather from "./weather";


function Root() {
    return (
        <div className="row p-5 m-3" >
            <div className="row">
            <Clock/>
            <Weather />
            </div>
            <div className="row">
            <Tabs />
            </div>
        </div>
    )
}

document.addEventListener("DOMContentLoaded", () => {
    const domNode = document.getElementById("root");
    const root = createRoot(domNode);
    root.render(<Root />);
})