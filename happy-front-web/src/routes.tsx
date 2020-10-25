import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import OrphanagesMap from './pages/OrphanagesMap';
import Page404 from './pages/Page-404';

function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Landing} exact />
                <Route path="/orphanages/create" component={CreateOrphanage} exact />
                <Route path="/orphanages/:id" component={Orphanage} />
                <Route path={['/show-orphanages', '/orphanages']} component={OrphanagesMap} exact />
                <Route component={Page404} />
            </Switch>
        </Router>
    );
}

export default Routes;
