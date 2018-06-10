import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Cover } from '../Cover';
import { Desk } from '../Desk';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={ Cover } />
          <Route path="/desk" component={ Desk } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export { App };
