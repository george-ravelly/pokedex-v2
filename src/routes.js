
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import ListForRegion from "./pages/ListForRegion"

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/region/:dex" component={ListForRegion} />
            </Switch>
        </BrowserRouter>
    )
}