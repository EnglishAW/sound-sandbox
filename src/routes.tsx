import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Harmonics from 'pages/harmonics'
import PageNavigation from 'components/page-navigation/page-navigation'
import WhiteNoise from 'components/white-noise/white-noise'
import RandomFrequency from './pages/random-frequency'

function Routes() {
    return (
        <Router>
            <PageNavigation/>
            <Switch>
                <Route exact path="/" component={Harmonics} />
                <Route exact path="/relative-intervals" component={Harmonics} />
                <Route exact path="/whitenoise" component={WhiteNoise} />
                <Route exact path="/random" component={RandomFrequency} />
                <Route exact path="/" component={Harmonics} />
                <Route path="/*">
                    <div>Not Found..</div>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes
