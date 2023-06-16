import React from "react";

import { Route, Switch } from "react-router-dom";
import PageRender from "../PageRender";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={PageRender} />
      <Route exact path="/:appName" component={PageRender} />
      <Route exact path="/:appName/:page" component={PageRender} />
      <Route exact path="/:appName/:page/:id" component={PageRender} />
      <Route exact path="/:appName/:page/:slug" component={PageRender} />
      <Route exact path="/:appName/:page/:slug/:id" component={PageRender} />
    </Switch>
  );
};

export default Routes;
