import Header from './Header';
import Footer from './Footer';
import Home from './Home';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="header">
        <Header />
      </div>
      <div className="content">
        <Switch>
          <Route path="/"><Home /></Route>
        </Switch>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </Router>
  );
}
